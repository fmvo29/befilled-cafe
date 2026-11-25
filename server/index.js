import "dotenv/config";
import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";
import express from "express";
import { rateLimit } from "express-rate-limit";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

const sessionCookie = "befilled_session";
const sessionOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  path: "/"
};
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { message: "Too many attempts. Please wait a little before trying again." }
});

const menuSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    available: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const inventorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, min: 0 },
    unit: { type: String, required: true, trim: true },
    reorderAt: { type: Number, required: true, min: 0 },
    supplier: { type: String, default: "" }
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ["staff", "customer"], required: true }
  },
  { timestamps: true }
);

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    customer: { type: String, required: true, trim: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null, index: true },
    items: [{ name: String, quantity: Number, price: Number }],
    total: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["Preparing", "Ready", "Completed", "Cancelled"],
      default: "Preparing"
    },
    orderType: { type: String, enum: ["Dine in", "Takeaway"], default: "Dine in" }
  },
  { timestamps: true }
);

const MenuItem = mongoose.model("MenuItem", menuSchema);
const InventoryItem = mongoose.model("InventoryItem", inventorySchema);
const User = mongoose.model("User", userSchema);
const Order = mongoose.model("Order", orderSchema);

function asyncRoute(handler) {
  return (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
}

function requireAuth(req, res, next) {
  const token = req.cookies[sessionCookie];
  if (!token) return res.status(401).json({ message: "Please log in to continue." });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.clearCookie(sessionCookie, sessionOptions);
    res.status(401).json({ message: "Your session expired. Please log in again." });
  }
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "You don't have permission to do that." });
    }
    next();
  };
}

function createSession(user, res) {
  const token = jwt.sign(
    { sub: user._id.toString(), name: user.name, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  res.cookie(sessionCookie, token, { ...sessionOptions, maxAge: 24 * 60 * 60 * 1000 });
}

app.post("/api/auth/register", authLimiter, asyncRoute(async (req, res) => {
  const name = typeof req.body.name === "string" ? req.body.name.trim() : "";
  const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";
  const password = typeof req.body.password === "string" ? req.body.password : "";
  if (name.length < 2 || name.length > 80) return res.status(400).json({ message: "Enter your name (2–80 characters)." });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ message: "Enter a valid email address." });
  if (password.length < 10 || password.length > 128) return res.status(400).json({ message: "Your password must be at least 10 characters." });
  const user = await User.create({
    name,
    email,
    passwordHash: await bcrypt.hash(password, 12),
    role: "customer"
  });
  createSession(user, res);
  res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } });
}));

app.post("/api/auth/login", authLimiter, asyncRoute(async (req, res) => {
  const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";
  const password = typeof req.body.password === "string" ? req.body.password : "";
  const accountType = req.body.accountType;
  if (accountType !== undefined && !["staff", "customer"].includes(accountType)) {
    return res.status(400).json({ message: "Choose a valid account type." });
  }
  const user = await User.findOne({ email }).select("+passwordHash");
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ message: "That email and password don't match." });
  }
  if (accountType && user.role !== accountType) {
    return res.status(403).json({ message: accountType === "staff" ? "This account doesn't have staff access." : "Use Staff / Admin sign in for this account." });
  }
  createSession(user, res);
  res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } });
}));

app.get("/api/auth/me", requireAuth, asyncRoute(async (req, res) => {
  const user = await User.findById(req.user.sub);
  if (!user) {
    res.clearCookie(sessionCookie, sessionOptions);
    return res.status(401).json({ message: "Your account is no longer available." });
  }
  res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } });
}));

app.post("/api/auth/logout", (_req, res) => {
  res.clearCookie(sessionCookie, sessionOptions);
  res.status(204).end();
});

app.get("/api/menu", asyncRoute(async (_req, res) => {
  res.json(await MenuItem.find().sort({ createdAt: -1 }));
}));
app.post("/api/menu", requireAuth, requireRole("staff"), asyncRoute(async (req, res) => {
  res.status(201).json(await MenuItem.create(req.body));
}));
app.put("/api/menu/:id", requireAuth, requireRole("staff"), asyncRoute(async (req, res) => {
  const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) return res.status(404).json({ message: "Record not found." });
  res.json(item);
}));
app.delete("/api/menu/:id", requireAuth, requireRole("staff"), asyncRoute(async (req, res) => {
  const item = await MenuItem.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: "Record not found." });
  res.status(204).end();
}));

function crudRoutes(path, Model, roles = ["staff"]) {
  const authorize = [requireAuth, requireRole(...roles)];
  app.get(`/api/${path}`, ...authorize, asyncRoute(async (_req, res) => {
    res.json(await Model.find().sort({ createdAt: -1 }));
  }));
  app.post(`/api/${path}`, ...authorize, asyncRoute(async (req, res) => {
    const item = await Model.create(req.body);
    res.status(201).json(item);
  }));
  app.put(`/api/${path}/:id`, ...authorize, asyncRoute(async (req, res) => {
    const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!item) return res.status(404).json({ message: "Record not found." });
    res.json(item);
  }));
  app.delete(`/api/${path}/:id`, ...authorize, asyncRoute(async (req, res) => {
    const item = await Model.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Record not found." });
    res.status(204).end();
  }));
}

crudRoutes("inventory", InventoryItem);
app.get("/api/orders", requireAuth, asyncRoute(async (req, res) => {
  const filter = req.user.role === "staff" ? {} : { userId: req.user.sub };
  res.json(await Order.find(filter).sort({ createdAt: -1 }));
}));
app.post("/api/orders", requireAuth, requireRole("staff", "customer"), asyncRoute(async (req, res) => {
  const requestedItems = req.body.items;
  if (!Array.isArray(requestedItems) || requestedItems.length === 0 || requestedItems.length > 30) {
    return res.status(400).json({ message: "Add at least one menu item to your order." });
  }
  const menuIds = [...new Set(requestedItems.map((item) => item.menuItemId))];
  if (menuIds.some((id) => !mongoose.isValidObjectId(id))) {
    return res.status(400).json({ message: "One of the selected menu items is invalid." });
  }
  const menuItems = await MenuItem.find({ _id: { $in: menuIds }, available: true });
  if (menuItems.length !== menuIds.length) return res.status(400).json({ message: "One of those menu items is no longer available." });
  const items = requestedItems.map((requested) => {
    const menuItem = menuItems.find((item) => item._id.toString() === requested.menuItemId);
    const quantity = Number(requested.quantity);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 50) {
      throw Object.assign(new Error("Each item quantity must be between 1 and 50."), { status: 400 });
    }
    return { name: menuItem.name, quantity, price: menuItem.price };
  });
  const orderType = req.body.orderType === "Dine in" ? "Dine in" : "Takeaway";
  const customerName = req.user.role === "customer"
    ? req.user.name
    : (typeof req.body.customer === "string" ? req.body.customer.trim() : "");
  if (!customerName) return res.status(400).json({ message: "Enter the customer's name." });
  const order = await Order.create({
    orderNumber: `BF-${Date.now().toString().slice(-8)}`,
    customer: customerName,
    userId: req.user.role === "customer" ? req.user.sub : null,
    items,
    total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    orderType
  });
  res.status(201).json(order);
}));
app.put("/api/orders/:id", requireAuth, requireRole("staff"), asyncRoute(async (req, res) => {
  const allowedStatuses = ["Preparing", "Ready", "Completed", "Cancelled"];
  if (!allowedStatuses.includes(req.body.status)) return res.status(400).json({ message: "Choose a valid order status." });
  const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true });
  if (!order) return res.status(404).json({ message: "Record not found." });
  res.json(order);
}));

app.get("/api/dashboard", requireAuth, requireRole("staff"), asyncRoute(async (_req, res) => {
  const [orders, menuCount, inventory] = await Promise.all([
    Order.find().sort({ createdAt: -1 }).limit(8),
    MenuItem.countDocuments(),
    InventoryItem.find()
  ]);
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayOrders = await Order.find({ createdAt: { $gte: todayStart } });
  res.json({
    orders,
    menuCount,
    inventoryCount: inventory.length,
    lowStockCount: inventory.filter((item) => item.quantity <= item.reorderAt).length,
    todaySales: todayOrders.reduce((sum, order) => sum + order.total, 0),
    todayOrderCount: todayOrders.length
  });
}));

app.get("/api/health", (_req, res) => {
  res.json({ status: mongoose.connection.readyState === 1 ? "ok" : "database disconnected" });
});

app.use((error, _req, res, _next) => {
  if (error instanceof mongoose.Error.ValidationError || error instanceof mongoose.Error.CastError) {
    return res.status(400).json({ message: error.message });
  }
  if (error.code === 11000) return res.status(409).json({ message: "That record already exists." });
  if (error.status && error.status < 500) return res.status(error.status).json({ message: error.message });
  console.error(error);
  res.status(500).json({ message: "Something went wrong. Please try again." });
});

if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI is required. Copy .env.example to .env and configure MongoDB.");
  process.exit(1);
}
if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  console.error("JWT_SECRET must be set to a random secret of at least 32 characters.");
  process.exit(1);
}
if ((process.env.STAFF_ADMIN_EMAIL && !process.env.STAFF_ADMIN_PASSWORD) ||
    (!process.env.STAFF_ADMIN_EMAIL && process.env.STAFF_ADMIN_PASSWORD)) {
  console.error("Set both STAFF_ADMIN_EMAIL and STAFF_ADMIN_PASSWORD to create the initial staff account.");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    if (process.env.STAFF_ADMIN_EMAIL) {
      const email = process.env.STAFF_ADMIN_EMAIL.trim().toLowerCase();
      const password = process.env.STAFF_ADMIN_PASSWORD;
      if (password.length < 10) throw new Error("STAFF_ADMIN_PASSWORD must be at least 10 characters.");
      const existing = await User.findOne({ email });
      if (!existing) {
        await User.create({
          name: "Cafe Admin",
          email,
          passwordHash: await bcrypt.hash(password, 12),
          role: "staff"
        });
        console.log("Initial staff account created from environment settings.");
      } else if (existing.role !== "staff") {
        throw new Error("STAFF_ADMIN_EMAIL is already registered as a customer account.");
      }
    }
    app.listen(port, () => console.log(`Befilled API listening on http://localhost:${port}`));
  })
  .catch((error) => {
    console.error("Could not connect to MongoDB:", error.message);
    process.exit(1);
  });
