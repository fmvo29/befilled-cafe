import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight, ArrowRight, Bell, Coffee, LayoutDashboard,
  MoreHorizontal, Package, Plus, Search, MapPin, Clock3 as ClockIcon,
  ShoppingBag, Users, X, Leaf, Clock3, CircleDollarSign, SlidersHorizontal,
  Pencil, Trash2, Check, ChevronDown, AlertTriangle, Sparkles, CalendarDays,
  LockKeyhole, Mail, Menu as MenuIcon
} from "lucide-react";

const money = (value) => `₱${Number(value || 0).toLocaleString("en-PH", { minimumFractionDigits: 2 })}`;
const menuPhotos = {
  "golden latte": "coffee-latte.jpg",
  "honey oat flat white": "honey-oat-flat-white.jpg",
  "berry matcha": "matcha.jpg",
  "sea salt cookie": "cookie.jpg",
  "ube latte": "ube-latte.jpg",
  "almond croissant": "croissant.jpg",
  americano: "coffee-cup.jpg",
  cappuccino: "cappuccino.jpg",
  "dark mocha": "dark-mocha.jpg",
  "milk matcha": "milk-matcha.jpg",
  "sourdough toast": "sourdough.jpg",
  "avocado toast": "avocado-toast.jpg",
  "herb croissant": "herb-croissant.jpg",
  "mushroom melt": "mushroom-melt.jpg",
  "cheddar toastie": "cheddar-toastie.jpg",
  "olive focaccia": "olive-focaccia.jpg",
  "banana oat loaf": "banana-oat-loaf.jpg",
  "ham croissant": "ham-croissant.jpg",
  "fresh milk": "milk.jpg",
  "honey milk": "honey-milk.jpg",
  "cocoa milk": "cocoa-milk.jpg",
  "strawberry milk": "strawberry-milk.jpg"
};

function menuPhotoFor(item) {
  const name = item.name.toLowerCase();
  if (menuPhotos[name]) return `/images/menu/${menuPhotos[name]}`;
  if (name.includes("matcha") || item.category === "Tea & Matcha") return "/images/menu/matcha.jpg";
  if (name.includes("cookie")) return "/images/menu/cookie.jpg";
  if (name.includes("croissant")) return "/images/menu/croissant.jpg";
  if (name.includes("milk") || item.category === "Milk Drinks") return "/images/menu/milk.jpg";
  if (/toast|melt|focaccia|loaf/.test(name) || item.category === "Bread & Savory") return "/images/menu/sourdough.jpg";
  return "/images/menu/coffee-latte.jpg";
}

function MenuPhoto({ item, alt = "", className = "" }) {
  const [failed, setFailed] = useState(false);
  return <div className={`menu-item-photo ${className}`} aria-hidden={alt ? undefined : "true"}>
    {failed
      ? <span aria-hidden="true">{item.image || "☕"}</span>
      : <img src={menuPhotoFor(item)} alt={alt} loading="lazy" decoding="async" onError={() => setFailed(true)} />}
  </div>;
}

function CupIllustration() {
  return <svg className="cup-illustration" viewBox="0 0 200 180" role="img" aria-label="Illustration of a warm cup of coffee">
    <defs>
      <linearGradient id="cup-body" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stopColor="#fffdf7" />
        <stop offset="1" stopColor="#e9ddc9" />
      </linearGradient>
      <linearGradient id="cup-saucer" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stopColor="#e6d9ee" />
        <stop offset="1" stopColor="#a992bd" />
      </linearGradient>
      <linearGradient id="coffee" x1="0" x2="0.9" y1="0" y2="1">
        <stop offset="0" stopColor="#82543c" />
        <stop offset="1" stopColor="#4a2d23" />
      </linearGradient>
      <filter id="cup-shadow" x="-30%" y="-30%" width="160%" height="180%">
        <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#4c3825" floodOpacity=".2" />
      </filter>
    </defs>
    <g fill="none" stroke="#fff9ec" strokeLinecap="round" strokeWidth="5" opacity=".8">
      <path d="M75 26c-9-10 8-12 0-22" />
      <path d="M100 25c-9-10 8-12 0-22" />
      <path d="M125 26c-9-10 8-12 0-22" />
    </g>
    <g filter="url(#cup-shadow)">
      <ellipse cx="101" cy="148" rx="70" ry="15" fill="url(#cup-saucer)" />
      <ellipse cx="101" cy="145" rx="57" ry="9" fill="#f8f2f8" />
      <path d="M147 66h11c18 0 25 10 25 23s-9 24-25 24h-13" fill="none" stroke="#f6eee5" strokeWidth="13" />
      <path d="M150 74h8c10 0 15 5 15 15s-6 15-15 15h-9" fill="none" stroke="#a78eb6" strokeWidth="7" />
      <path d="M43 57h113l-10 66c-2 12-15 20-46 20s-44-8-46-20z" fill="url(#cup-body)" stroke="#d5c6b4" strokeWidth="2" />
      <ellipse cx="99.5" cy="58" rx="57" ry="15" fill="#f7f0e5" stroke="#d5c6b4" strokeWidth="2" />
      <ellipse cx="99.5" cy="58" rx="47" ry="10" fill="url(#coffee)" />
      <path d="M79 58c8-7 14 7 22 0s14-7 21 0" fill="none" stroke="#d4ae7f" strokeLinecap="round" strokeWidth="2.5" opacity=".9" />
      <path d="M54 77c3 23 5 38 8 44" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="4" opacity=".7" />
      <ellipse cx="99.5" cy="147" rx="38" ry="5" fill="#d2c2d9" opacity=".75" />
    </g>
    <path d="M70 157c18 9 44 10 62 0" fill="none" stroke="#fff9ec" strokeLinecap="round" strokeWidth="3" opacity=".8" />
  </svg>;
}

const demoMenu = [
  { _id: "m1", name: "Golden Latte", category: "Coffee", price: 185, description: "A smooth espresso latte with just a hint of brown-butter sweetness.", available: true, image: "☕" },
  { _id: "m2", name: "Honey Oat Flat White", category: "Coffee", price: 175, description: "Double espresso, silky oat milk, and a delicate touch of honey.", available: true, image: "🥛" },
  { _id: "m3", name: "Berry Matcha", category: "Tea & Matcha", price: 195, description: "Earthy ceremonial matcha, fresh strawberry, and softly sweet cream.", available: true, image: "🍵" },
  { _id: "m4", name: "Sea Salt Cookie", category: "Pastries", price: 95, description: "A not-too-sweet brown-butter cookie with dark chocolate and sea salt.", available: true, image: "🍪" },
  { _id: "m5", name: "Ube Latte", category: "Coffee", price: 190, description: "Espresso under a gentle swirl of creamy ube.", available: false, image: "💜" },
  { _id: "m6", name: "Almond Croissant", category: "Pastries", price: 145, description: "Flaky, buttery layers with a light almond filling.", available: true, image: "🥐" },
  { _id: "m7", name: "Americano", category: "Coffee", price: 135, description: "A bright double espresso, opened up with hot water.", available: true, image: "☕" },
  { _id: "m8", name: "Cappuccino", category: "Coffee", price: 165, description: "Rich espresso tucked under a soft, airy cap of milk.", available: true, image: "☕" },
  { _id: "m9", name: "Dark Mocha", category: "Coffee", price: 185, description: "Espresso and real dark chocolate, finished with lightly steamed milk.", available: true, image: "🍫" },
  { _id: "m10", name: "Milk Matcha", category: "Tea & Matcha", price: 180, description: "Ceremonial matcha and your choice of milk, lightly sweetened.", available: true, image: "🍵" },
  { _id: "m11", name: "Sourdough Toast", category: "Bread & Savory", price: 155, description: "Toasted sourdough with whipped herb butter and slow-roasted tomatoes.", available: true, image: "🍞" },
  { _id: "m12", name: "Avocado Toast", category: "Bread & Savory", price: 225, description: "Smashed avocado, lemon, and chili flakes on crisp sourdough.", available: true, image: "🥑" },
  { _id: "m13", name: "Herb Croissant", category: "Bread & Savory", price: 185, description: "A warm, flaky croissant filled with spinach and gentle herbed cheese.", available: true, image: "🥐" },
  { _id: "m14", name: "Mushroom Melt", category: "Bread & Savory", price: 245, description: "Golden toasted sourdough with thyme mushrooms and melted cheese.", available: true, image: "🍄" },
  { _id: "m15", name: "Cheddar Toastie", category: "Bread & Savory", price: 215, description: "Toasted country bread, ripe tomato, and sharp cheddar—simple and satisfying.", available: true, image: "🥪" },
  { _id: "m16", name: "Olive Focaccia", category: "Bread & Savory", price: 125, description: "Soft, olive-oil-rich focaccia with rosemary and a little flaky salt.", available: true, image: "🫒" },
  { _id: "m17", name: "Banana Oat Loaf", category: "Pastries", price: 110, description: "A tender banana and oat slice, gently sweet and lovely with coffee.", available: true, image: "🍌" },
  { _id: "m18", name: "Ham Croissant", category: "Bread & Savory", price: 210, description: "A crisp, warm croissant with savory ham and nutty Emmental cheese.", available: true, image: "🥐" },
  { _id: "m19", name: "Fresh Milk", category: "Milk Drinks", price: 85, description: "A chilled glass of fresh milk, simple and comforting.", available: true, image: "🥛" },
  { _id: "m20", name: "Honey Milk", category: "Milk Drinks", price: 110, description: "Warm milk gently sweetened with a little honey.", available: true, image: "🍯" },
  { _id: "m21", name: "Cocoa Milk", category: "Milk Drinks", price: 125, description: "Creamy milk with mellow cocoa—not too sweet, just right.", available: true, image: "🍫" },
  { _id: "m22", name: "Strawberry Milk", category: "Milk Drinks", price: 130, description: "Cold fresh milk blended with real strawberries.", available: true, image: "🍓" }
];
const demoInventory = [
  { _id: "i1", name: "House Espresso Blend", category: "Coffee", quantity: 3.5, unit: "kg", reorderAt: 5, supplier: "Good Cup Roasters" },
  { _id: "i2", name: "Oat Milk", category: "Dairy & milk", quantity: 18, unit: "cartons", reorderAt: 8, supplier: "Oatside PH" },
  { _id: "i3", name: "Ceremonial Matcha", category: "Tea", quantity: 1.2, unit: "kg", reorderAt: 1, supplier: "The Matcha Co." },
  { _id: "i4", name: "Whole Milk", category: "Dairy & milk", quantity: 12, unit: "liters", reorderAt: 6, supplier: "Daily Dairy" },
  { _id: "i5", name: "Brown Butter Cookies", category: "Pastries", quantity: 6, unit: "pieces", reorderAt: 10, supplier: "In-house kitchen" },
  { _id: "i6", name: "Dark Chocolate", category: "Baking", quantity: 8, unit: "kg", reorderAt: 2, supplier: "Cacao Manila" },
  { _id: "i7", name: "Vanilla Syrup", category: "Syrups", quantity: 14, unit: "bottles", reorderAt: 4, supplier: "Monin Philippines" },
  { _id: "i8", name: "Honey", category: "Syrups", quantity: 9, unit: "jars", reorderAt: 3, supplier: "Golden Hive Farm" },
  { _id: "i9", name: "Strawberries", category: "Produce", quantity: 7, unit: "kg", reorderAt: 2, supplier: "Manila Fresh Market" },
  { _id: "i10", name: "Avocados", category: "Produce", quantity: 24, unit: "pieces", reorderAt: 8, supplier: "Manila Fresh Market" },
  { _id: "i11", name: "Sourdough Loaves", category: "Bakery", quantity: 16, unit: "loaves", reorderAt: 5, supplier: "In-house kitchen" },
  { _id: "i12", name: "Croissants", category: "Bakery", quantity: 30, unit: "pieces", reorderAt: 10, supplier: "In-house kitchen" },
  { _id: "i13", name: "Bread Flour", category: "Baking", quantity: 25, unit: "kg", reorderAt: 8, supplier: "Golden Grain Supply" },
  { _id: "i14", name: "Unsalted Butter", category: "Dairy & milk", quantity: 18, unit: "kg", reorderAt: 5, supplier: "Daily Dairy" },
  { _id: "i15", name: "Cheddar Cheese", category: "Dairy & milk", quantity: 12, unit: "kg", reorderAt: 4, supplier: "Daily Dairy" },
  { _id: "i16", name: "Spinach", category: "Produce", quantity: 6, unit: "kg", reorderAt: 2, supplier: "Manila Fresh Market" },
  { _id: "i17", name: "Paper Cups", category: "Packaging", quantity: 500, unit: "pieces", reorderAt: 150, supplier: "Cafe Packaging Co." },
  { _id: "i18", name: "Takeaway Lids", category: "Packaging", quantity: 450, unit: "pieces", reorderAt: 150, supplier: "Cafe Packaging Co." },
  { _id: "i19", name: "Napkins", category: "Packaging", quantity: 1200, unit: "pieces", reorderAt: 300, supplier: "Cafe Packaging Co." },
  { _id: "i20", name: "Cocoa Powder", category: "Baking", quantity: 5, unit: "kg", reorderAt: 2, supplier: "Cacao Manila" }
];
const demoOrders = [
  { _id: "o1", orderNumber: "BF-1048", customer: "Mia Santos", items: [{ name: "Golden Latte", quantity: 2 }, { name: "Sea Salt Cookie", quantity: 1 }], total: 465, status: "Preparing", orderType: "Dine in", createdAt: new Date().toISOString() },
  { _id: "o2", orderNumber: "BF-1047", customer: "Ethan Cruz", items: [{ name: "Berry Matcha", quantity: 1 }, { name: "Almond Croissant", quantity: 1 }], total: 340, status: "Ready", orderType: "Takeaway", createdAt: new Date(Date.now() - 8 * 60000).toISOString() },
  { _id: "o3", orderNumber: "BF-1046", customer: "Lia Reyes", items: [{ name: "Honey Oat Flat White", quantity: 2 }], total: 350, status: "Completed", orderType: "Dine in", createdAt: new Date(Date.now() - 18 * 60000).toISOString() },
  { _id: "o4", orderNumber: "BF-1045", customer: "Noah Garcia", items: [{ name: "Ube Latte", quantity: 1 }, { name: "Sea Salt Cookie", quantity: 2 }], total: 380, status: "Completed", orderType: "Takeaway", createdAt: new Date(Date.now() - 31 * 60000).toISOString() }
];
const demoCustomers = [
  { name: "Mia Santos", email: "mia.santos@example.com", visits: 18, favorite: "Golden Latte", spent: 3240, lastVisit: "Today" },
  { name: "Ethan Cruz", email: "ethan.cruz@example.com", visits: 12, favorite: "Berry Matcha", spent: 2185, lastVisit: "Today" },
  { name: "Lia Reyes", email: "lia.reyes@example.com", visits: 9, favorite: "Honey Oat Flat White", spent: 1670, lastVisit: "Today" },
  { name: "Noah Garcia", email: "noah.garcia@example.com", visits: 7, favorite: "Ube Latte", spent: 1280, lastVisit: "Today" },
  { name: "Sofia Mendoza", email: "sofia.mendoza@example.com", visits: 15, favorite: "Almond Croissant", spent: 2860, lastVisit: "Yesterday" },
  { name: "Lucas Dela Cruz", email: "lucas.delacruz@example.com", visits: 11, favorite: "Americano", spent: 1950, lastVisit: "Yesterday" },
  { name: "Isabella Flores", email: "isabella.flores@example.com", visits: 8, favorite: "Strawberry Milk", spent: 1425, lastVisit: "Nov 23" },
  { name: "Gabriel Ramos", email: "gabriel.ramos@example.com", visits: 6, favorite: "Mushroom Melt", spent: 1160, lastVisit: "Nov 22" },
  { name: "Amara Villanueva", email: "amara.v@example.com", visits: 5, favorite: "Milk Matcha", spent: 940, lastVisit: "Nov 21" },
  { name: "Theo Bautista", email: "theo.bautista@example.com", visits: 4, favorite: "Sourdough Toast", spent: 720, lastVisit: "Nov 20" }
];
const seed = { menu: demoMenu, inventory: demoInventory, orders: demoOrders };
const demoUsersKey = "befilled-demo-users";
const demoSessionKey = "befilled-demo-session";
const demoOrdersKey = "befilled-demo-orders";
const demoModeKey = "befilled-demo-mode";
const demoStaffCredentials = { email: "admin@befilled.cafe", password: "PauseWithCare2026!" };

function readDemoUsers() {
  const saved = localStorage.getItem(demoUsersKey);
  return saved ? JSON.parse(saved) : [];
}

function readDemoOrders(userId) {
  const saved = localStorage.getItem(demoOrdersKey);
  const orders = saved ? JSON.parse(saved) : [];
  return orders.filter((order) => order.userId === userId);
}

function saveDemoSession(user) {
  const sessionUser = { id: user.id, name: user.name, email: user.email, role: user.role };
  localStorage.setItem(demoSessionKey, JSON.stringify(sessionUser));
  return sessionUser;
}

async function hashDemoPassword(password, savedSalt) {
  if (!globalThis.crypto?.subtle) {
    throw new Error("Browser-only accounts need a secure browser context. Open this site on localhost or HTTPS.");
  }
  const salt = savedSalt
    ? Uint8Array.from(atob(savedSalt), (character) => character.charCodeAt(0))
    : crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt, iterations: 120000, hash: "SHA-256" }, key, 256);
  const hash = Array.from(new Uint8Array(bits), (byte) => byte.toString(16).padStart(2, "0")).join("");
  return { salt: btoa(String.fromCharCode(...salt)), hash };
}

function readLocal(key) {
  try {
    const stored = localStorage.getItem(`befilled-${key}`);
    if (!stored) return seed[key];
    const records = JSON.parse(stored);
    if (key === "inventory" && Array.isArray(records) && !localStorage.getItem("befilled-inventory-expanded-v1")) {
      const existingIds = new Set(records.map((record) => record._id));
      const expandedRecords = [...records, ...demoInventory.filter((item) => !existingIds.has(item._id))];
      localStorage.setItem("befilled-inventory-expanded-v1", "true");
      localStorage.setItem("befilled-inventory", JSON.stringify(expandedRecords));
      return expandedRecords;
    }
    if (key !== "menu" || !Array.isArray(records)) return records;

    const legacyNames = {
      "Brown Butter Latte": "m1",
      "Golden Hour Latte": "m1",
      "Honey Oat Flat White": "m2",
      "Honeyed Oat Flat White": "m2",
      "Strawberry Matcha": "m3",
      "Garden Berry Matcha": "m3",
      "Sea Salt Cookie": "m4",
      "Salted Chocolate Cookie": "m4",
      "Ube Cloud": "m5",
      "Ube Velvet Latte": "m5",
      "Almond Croissant": "m6",
      "Almond Morning Croissant": "m6",
      "First Light Americano": "m7",
      "Quiet Corner Cappuccino": "m8",
      "Slow Sunday Mocha": "m9",
      "Soft Morning Matcha": "m10",
      "Sunrise Sourdough Toast": "m11",
      "Little Pause Avocado Toast": "m12",
      "Garden Herb Croissant": "m13",
      "Mellow Mushroom Melt": "m14",
      "Tomato Cheddar Toastie": "m15",
      "Olive & Sea Salt Focaccia": "m16",
      "Banana Oat Tea Loaf": "m17",
      "Ham & Emmental Croissant": "m18"
    };
    const updatedRecords = records.map((record) => {
      const sampleId = legacyNames[record.name];
      const refreshedSample = demoMenu.find((item) => item._id === (sampleId || record._id));
      return refreshedSample && sampleId
        ? { ...record, name: refreshedSample.name, category: refreshedSample.category, description: refreshedSample.description, image: refreshedSample.image }
        : record;
    });
    const existingIds = new Set(updatedRecords.map((record) => record._id));
    return [...demoMenu.filter((item) => !existingIds.has(item._id)), ...updatedRecords];
  } catch {
    return seed[key];
  }
}

function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("home");
  const [menuCategory, setMenuCategory] = useState("All");
  const [authMode, setAuthMode] = useState("login");
  const [authAudience, setAuthAudience] = useState("customer");
  const [authError, setAuthError] = useState("");
  const [authBusy, setAuthBusy] = useState(false);
  const [authReady, setAuthReady] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [publicMenu, setPublicMenu] = useState(demoMenu);
  const [customerOrders, setCustomerOrders] = useState([]);
  const [customerNotice, setCustomerNotice] = useState("");
  const [cart, setCart] = useState({});
  const [customerBusy, setCustomerBusy] = useState(false);
  const [pendingOrderItemId, setPendingOrderItemId] = useState(null);

  useEffect(() => {
    async function initialize() {
      try {
        const useLiveDatabase = import.meta.env.VITE_USE_DATABASE === "true";
        let useDemoMode = !useLiveDatabase && (import.meta.env.DEV || localStorage.getItem(demoModeKey) === "true");
        if (!useDemoMode) {
          const healthResponse = await fetch("/api/health");
          if (!healthResponse.ok || (await healthResponse.json()).status !== "ok") useDemoMode = true;
        }

        if (useDemoMode) {
          localStorage.setItem(demoModeKey, "true");
          setDemoMode(true);
          setPublicMenu(demoMenu);
          const savedUser = JSON.parse(localStorage.getItem(demoSessionKey) || "null");
          if (savedUser) {
            setUser(savedUser);
            setView(savedUser.role === "staff" ? "dashboard" : "customer");
            setCustomerOrders(readDemoOrders(savedUser.id));
          }
          return;
        }

        const [authResponse, menuResponse] = await Promise.all([fetch("/api/auth/me"), fetch("/api/menu")]);
        const currentUser = authResponse.ok ? (await authResponse.json()).user : null;
        const items = menuResponse.ok ? await menuResponse.json() : demoMenu;
        setUser(currentUser);
        setView(currentUser ? (currentUser.role === "staff" ? "dashboard" : "customer") : "home");
        setPublicMenu(items.length ? items : demoMenu);
      } catch {
        localStorage.setItem(demoModeKey, "true");
        setDemoMode(true);
        setPublicMenu(demoMenu);
        const savedUser = JSON.parse(localStorage.getItem(demoSessionKey) || "null");
        if (savedUser) {
          setUser(savedUser);
          setView(savedUser.role === "staff" ? "dashboard" : "customer");
          setCustomerOrders(readDemoOrders(savedUser.id));
        }
      } finally {
        setAuthReady(true);
      }
    }
    initialize();
  }, []);

  useEffect(() => {
    if (user?.role !== "customer") return;
    if (demoMode) {
      setCustomerOrders(readDemoOrders(user.id));
      return;
    }
    fetch("/api/orders").then(async (res) => {
      if (!res.ok) throw new Error("We couldn't load your orders.");
      setCustomerOrders(await res.json());
    }).catch((error) => setCustomerNotice(error.message));
  }, [user, demoMode]);

  function orderMenuItem(item) {
    if (!item.available) return;
    if (user?.role === "customer") {
      setCart((previous) => ({ ...previous, [item._id]: Math.min(50, Number(previous[item._id] || 0) + 1) }));
      setCustomerNotice(`${item.name} was added to your takeaway bag.`);
      setView("customer");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setPendingOrderItemId(item._id);
    setAuthAudience("customer");
    setAuthMode("login");
    setAuthError("");
    setView("auth");
  }

  function finishCustomerSignIn(sessionUser) {
    setUser(sessionUser);
    setCustomerOrders(demoMode ? readDemoOrders(sessionUser.id) : []);
    if (pendingOrderItemId) {
      const item = publicMenu.find((menuItem) => menuItem._id === pendingOrderItemId);
      if (item?.available) {
        setCart((previous) => ({ ...previous, [item._id]: Math.min(50, Number(previous[item._id] || 0) + 1) }));
        setCustomerNotice(`${item.name} was added to your takeaway bag.`);
      }
      setPendingOrderItemId(null);
    }
    setView("customer");
  }

  async function submitAuth(event) {
    event.preventDefault();
    setAuthError("");
    setAuthBusy(true);
    const formData = new FormData(event.currentTarget);
    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
      ...(authMode === "login" ? { accountType: authAudience } : {}),
      ...(authMode === "register" ? { name: formData.get("name") } : {})
    };
    try {
      if (demoMode) {
        if (authMode === "login" && authAudience === "staff") {
          const email = String(payload.email).trim().toLowerCase();
          if (email !== demoStaffCredentials.email || payload.password !== demoStaffCredentials.password) {
            throw new Error("That staff email and password don't match the browser demo credentials.");
          }
          const staffUser = saveDemoSession({
            id: "befilled-demo-staff",
            name: "Befilled Admin",
            email: demoStaffCredentials.email,
            role: "staff"
          });
          setPendingOrderItemId(null);
          setUser(staffUser);
          setView("dashboard");
          return;
        }
        const email = String(payload.email).trim().toLowerCase();
        const users = readDemoUsers();
        let demoUser;
        if (authMode === "register") {
          if (users.some((account) => account.email === email)) {
            throw new Error("An account with this email already exists in this browser. Please log in instead.");
          }
          const credentials = await hashDemoPassword(String(payload.password));
          demoUser = {
            id: crypto.randomUUID(),
            name: String(payload.name).trim(),
            email,
            role: "customer",
            passwordSalt: credentials.salt,
            passwordHash: credentials.hash
          };
          localStorage.setItem(demoUsersKey, JSON.stringify([...users, demoUser]));
        } else {
          const account = users.find((savedAccount) => savedAccount.email === email);
          if (!account) throw new Error("No local demo account was found for this email. Create an account first.");
          const credentials = await hashDemoPassword(String(payload.password), account.passwordSalt);
          if (credentials.hash !== account.passwordHash) throw new Error("That email and password don't match.");
          demoUser = account;
        }
        const sessionUser = saveDemoSession(demoUser);
        finishCustomerSignIn(sessionUser);
        return;
      }
      const response = await fetch(`/api/auth/${authMode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const responseText = await response.text();
      let result = {};
      if (responseText) {
        try {
          result = JSON.parse(responseText);
        } catch {
          if (response.ok) throw new Error("The cafe server sent an unreadable response. Please try again.");
        }
      }
      if (!response.ok) {
        throw new Error(result.message || "The cafe server couldn't complete your request. Check that the API and MongoDB are running, then try again.");
      }
      if (!result.user) throw new Error("The cafe server response was incomplete. Please try again.");
      if (result.user.role === "customer") finishCustomerSignIn(result.user);
      else {
        setPendingOrderItemId(null);
        setUser(result.user);
        setView("dashboard");
      }
    } catch (error) {
      setAuthError(error.message === "Failed to fetch"
        ? "The cafe server isn't connected yet. Refresh the page to start browser-only demo mode."
        : error.message || "We couldn't complete that request.");
    } finally { setAuthBusy(false); }
  }

  async function logout() {
    if (demoMode) localStorage.removeItem(demoSessionKey);
    else await fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    setUser(null);
    setView("home");
    setCart({});
    setPendingOrderItemId(null);
    setCustomerOrders([]);
  }

  async function updateCustomerProfile({ name, email, currentPassword, newPassword }) {
    if (!demoMode || user?.role !== "customer") throw new Error("Profile editing is not available for this account in the browser demo.");
    const users = readDemoUsers();
    const accountIndex = users.findIndex((account) => account.id === user.id);
    if (accountIndex < 0) throw new Error("Your browser demo account could not be found.");
    const account = users[accountIndex];
    const currentCredentials = await hashDemoPassword(currentPassword, account.passwordSalt);
    if (currentCredentials.hash !== account.passwordHash) throw new Error("Your current password is incorrect.");
    const normalizedEmail = email.trim().toLowerCase();
    if (name.trim().length < 2 || name.trim().length > 80) throw new Error("Enter a name between 2 and 80 characters.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) throw new Error("Enter a valid email address.");
    if (users.some((savedAccount, index) => index !== accountIndex && savedAccount.email.toLowerCase() === normalizedEmail)) {
      throw new Error("Another browser demo account already uses this email.");
    }
    let updatedAccount = { ...account, name: name.trim(), email: normalizedEmail };
    if (newPassword) {
      if (newPassword.length < 10 || newPassword.length > 128) throw new Error("Your new password must be between 10 and 128 characters.");
      const credentials = await hashDemoPassword(newPassword);
      updatedAccount = { ...updatedAccount, passwordSalt: credentials.salt, passwordHash: credentials.hash };
    }
    users[accountIndex] = updatedAccount;
    localStorage.setItem(demoUsersKey, JSON.stringify(users));
    const sessionUser = saveDemoSession(updatedAccount);
    setUser(sessionUser);
  }

  async function deleteCustomerAccount(currentPassword) {
    if (!demoMode || user?.role !== "customer") throw new Error("Account deletion is not available for this account in the browser demo.");
    const users = readDemoUsers();
    const account = users.find((savedAccount) => savedAccount.id === user.id);
    if (!account) throw new Error("Your browser demo account could not be found.");
    const credentials = await hashDemoPassword(currentPassword, account.passwordSalt);
    if (credentials.hash !== account.passwordHash) throw new Error("Your current password is incorrect.");
    localStorage.setItem(demoUsersKey, JSON.stringify(users.filter((savedAccount) => savedAccount.id !== user.id)));
    const savedOrders = JSON.parse(localStorage.getItem(demoOrdersKey) || "[]");
    localStorage.setItem(demoOrdersKey, JSON.stringify(savedOrders.filter((order) => order.userId !== user.id)));
    localStorage.removeItem(demoSessionKey);
    setUser(null);
    setView("home");
    setCart({});
    setCustomerOrders([]);
  }

  async function placeCustomerOrder() {
    const items = Object.entries(cart)
      .filter(([, quantity]) => quantity > 0)
      .map(([menuItemId, quantity]) => ({ menuItemId, quantity }));
    if (!items.length) return setCustomerNotice("Add a little something from the menu first.");
    setCustomerBusy(true);
    setCustomerNotice("");
    try {
      if (demoMode) {
        const orderItems = items.map((requested) => {
          const menuItem = publicMenu.find((item) => item._id === requested.menuItemId);
          if (!menuItem || !menuItem.available) throw new Error("One of those menu items is no longer available.");
          return { name: menuItem.name, quantity: requested.quantity, price: Number(menuItem.price) };
        });
        const savedOrders = JSON.parse(localStorage.getItem(demoOrdersKey) || "[]");
        const order = {
          _id: crypto.randomUUID(),
          userId: user.id,
          orderNumber: `BF-DEMO-${String(savedOrders.length + 1).padStart(4, "0")}`,
          items: orderItems,
          total: orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
          status: "Preparing",
          orderType: "Takeaway",
          createdAt: new Date().toISOString()
        };
        localStorage.setItem(demoOrdersKey, JSON.stringify([order, ...savedOrders]));
        setCustomerOrders((previous) => [order, ...previous]);
        setCart({});
        setCustomerNotice(`Demo order ${order.orderNumber} is saved in this browser only.`);
        return;
      }
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, orderType: "Takeaway" })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "We couldn't place that order.");
      setCustomerOrders((prev) => [result, ...prev]);
      setCart({});
      setCustomerNotice(`Order ${result.orderNumber} is in! We'll have it ready for you.`);
    } catch (error) { setCustomerNotice(error.message); }
    finally { setCustomerBusy(false); }
  }

  if (!authReady) return <div className="boot-screen"><div className="brand-word">befilled</div><span>'Tis not a small thing to pause.</span></div>;
  if (user?.role === "staff") return <ManagementApp user={user} browserDemoMode={demoMode} onLogout={logout} />;
  if (user?.role === "customer" && (view === "customer" || view === "auth")) {
    return <CustomerHome
      user={user}
      menuItems={publicMenu}
      demoMode={demoMode}
      orders={customerOrders}
      cart={cart}
      setCart={setCart}
      notice={customerNotice}
      busy={customerBusy}
      onOrder={placeCustomerOrder}
      onLogout={logout}
      onUpdateProfile={updateCustomerProfile}
      onDeleteAccount={deleteCustomerAccount}
      onHome={() => { setView("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
      onMenu={() => { setMenuCategory("All"); setView("menu"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
    />;
  }
  if (view === "auth") return <AuthPage
    mode={authMode}
    audience={authAudience}
    demoMode={demoMode}
    setMode={(mode) => { setAuthMode(mode); setAuthError(""); }}
    setAudience={(audience) => { setAuthAudience(audience); setAuthMode("login"); setAuthError(""); }}
    error={authError}
    busy={authBusy}
    onSubmit={submitAuth}
    onHome={() => { setPendingOrderItemId(null); setView("home"); setAuthError(""); }}
  />;
  if (view === "menu") return <PublicMenu
    menuItems={publicMenu}
    category={menuCategory}
    setCategory={setMenuCategory}
    onHome={() => { setView("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
    onSection={(section) => {
      setView("home");
      window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
        document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
      }));
    }}
    signedIn={user?.role === "customer"}
    onOrderItem={orderMenuItem}
    onLogin={() => { if (user?.role === "customer") setView("customer"); else { setPendingOrderItemId(null); setAuthMode("login"); setAuthError(""); setView("auth"); } }}
  />;
  return <PublicHome
    menuItems={publicMenu}
    signedIn={user?.role === "customer"}
    onOrderItem={orderMenuItem}
    onMenu={() => { setMenuCategory("All"); setView("menu"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
    onLogin={() => { if (user?.role === "customer") setView("customer"); else { setPendingOrderItemId(null); setAuthMode("login"); setAuthError(""); setView("auth"); } }}
    onRegister={() => { if (user?.role === "customer") setView("customer"); else { setPendingOrderItemId(null); setAuthMode("register"); setAuthError(""); setView("auth"); } }}
  />;
}

function PublicHome({ menuItems, onMenu, onLogin, onRegister, onOrderItem, signedIn = false }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [zoomItem, setZoomItem] = useState(null);
  const availableItems = menuItems.filter((item) => item.available);
  const highlights = [
    ...availableItems.filter((item) => item.category === "Coffee").slice(0, 1),
    ...availableItems.filter((item) => item.category === "Milk Drinks").slice(0, 1),
    ...availableItems.filter((item) => item.category === "Bread & Savory").slice(0, 1)
  ];
  return <div className="public-site">
    <header className="public-header">
      <a className="public-logo" href="#home" aria-label="Befilled Cafe home"><span>befilled</span><small>'Tis not a small thing to pause.</small></a>
      <button className="public-menu-toggle" aria-label="Toggle menu" onClick={() => setMobileOpen(!mobileOpen)}><MenuIcon size={21} /></button>
      <nav className={`public-nav ${mobileOpen ? "public-nav-open" : ""}`}>
        <a href="#home" onClick={() => setMobileOpen(false)}>Home</a>
        <button className="public-nav-menu" onClick={() => { setMobileOpen(false); onMenu(); }}>Our menu</button>
        <a href="#story" onClick={() => setMobileOpen(false)}>Our story</a>
        <a href="#visit" onClick={() => setMobileOpen(false)}>Visit us</a>
        <button className="public-login-link" onClick={onLogin}>{signedIn ? "My orders" : "Log in"}</button>
        <button className="public-signup-button" onClick={onRegister}>{signedIn ? "My account" : "Create account"} <ArrowRight size={15} /></button>
      </nav>
    </header>
    <main>
      <section className="landing-hero" id="home">
        <div className="landing-copy"><div className="landing-eyebrow"><span /> YOUR LITTLE CORNER OF CALM</div><h1>A little pause<br />in a <em>full</em> day.</h1><p>Thoughtful coffee, something lovely to eat, and a moment that belongs just to you. There's always room to pause at Befilled.</p><div className="landing-actions"><button className="landing-primary" onClick={onMenu}>Explore the menu <ArrowRight size={16} /></button><button className="landing-secondary" onClick={onLogin}><LockKeyhole size={15} /> {signedIn ? "My orders" : "Member log in"}</button></div><div className="landing-social-proof"><div className="proof-avatars"><span>M</span><span>L</span><span>A</span></div><p><strong>A neighborhood favorite</strong><br />Made with much care and much love.</p></div></div>
        <div className="landing-art" aria-label="A warm cup of coffee"><div className="landing-sun" /><div className="landing-orbit orbit-one" /><div className="landing-orbit orbit-two" /><div className="landing-cup"><CupIllustration /></div><div className="landing-art-label"><Sparkles size={14} /> SLOW SIPS, SOFT MOMENTS</div><div className="landing-sticker"><span>TAKE IT</span><em>easy</em><i aria-hidden="true">✦</i></div></div>
        <div className="hero-bottom-line"><span>MANILA, PHILIPPINES</span><span>GOOD COFFEE. GENTLE MOMENTS.</span></div>
      </section>
      <section className="landing-menu-section" id="menu"><div className="landing-section-heading"><div><div className="landing-eyebrow">TODAY'S THREE PICKS</div><h2>Made for your <em>moment.</em></h2></div><button onClick={onMenu}>View the full menu <ArrowRight size={15} /></button></div><div className="landing-menu-grid">{highlights.map((item) => <MenuPreviewCard item={item} onZoom={setZoomItem} key={item._id} />)}</div></section>
      <section className="landing-story" id="story"><div className="story-mark">bf.</div><div><div className="landing-eyebrow">A PLACE TO EXHALE</div><h2>As the world rushes on,<br />take a moment to <em>pause.</em></h2><p>As the world rushes on, it’s easy to forget to pause. The day fills with plans, noise, and the next thing to do. Made with much love, Befilled is a little reminder to slow down — to savor a warm cup, share a good bite, and be present for the small moments that make a day feel full. Remember, it is not a small thing to pause.</p><button onClick={onRegister}>{signedIn ? "Back to your account" : "Come be part of it"} <ArrowRight size={15} /></button></div><div className="story-quote">“A softer pace<br />for a fuller life.”<span>— THE BEFILLED WAY</span></div></section>
      <section className="visit-section" id="visit"><div><div className="landing-eyebrow">COME ON IN</div><h2>Your seat is <em>waiting.</em></h2><p>Find a cozy spot, bring a friend, or enjoy a little time to yourself.</p></div><div className="visit-details"><div><MapPin size={18} /><span><b>Find us</b><small>123 Kapehan Street, Barangay Ligaya, Manila, Philippines</small></span></div><div><ClockIcon size={18} /><span><b>We're open</b><small>Every day · 7:30 AM – 9:00 PM</small></span></div></div><a className="visit-button" href="mailto:hello@befilled.cafe">Say hello <ArrowRight size={15} /></a></section>
    </main>
    <footer className="public-footer"><a className="footer-wordmark" href="#home">befilled</a><p>'Tis not a small thing to pause.</p><span>© 2026 BEFILLED CAFE</span><button onClick={onLogin}>{signedIn ? "My orders" : "Log in"}</button></footer>
    {zoomItem && <MenuZoom item={zoomItem} signedIn={signedIn} onOrder={() => onOrderItem(zoomItem)} onClose={() => setZoomItem(null)} />}
  </div>;
}

function PublicMenu({ menuItems, category, setCategory, onHome, onSection, onLogin, onOrderItem, signedIn = false }) {
  const [zoomItem, setZoomItem] = useState(null);
  const categories = ["All", ...new Set(menuItems.map((item) => item.category))];
  const filteredItems = menuItems.filter((item) =>
    category === "All" || item.category === category
  );
  return <div className="public-site">
    <header className="public-header full-menu-header">
      <button className="public-logo public-logo-button" onClick={onHome} aria-label="Befilled Cafe home"><span>befilled</span><small>'Tis not a small thing to pause.</small></button>
      <nav className="public-nav public-menu-nav">
        <button onClick={onHome}>Home</button>
        <button className="public-nav-active">Our menu</button>
        <button onClick={() => onSection("story")}>Our story</button>
        <button onClick={() => onSection("visit")}>Visit us</button>
        <button className="public-login-link" onClick={onLogin}>{signedIn ? "My orders" : "Log in"}</button>
      </nav>
    </header>
    <main className="full-menu-page">
      <div className="menu-page-top"><button className="menu-back" onClick={onHome}>← Back home</button><div className="landing-eyebrow"><span /> MADE FRESH, WITH A LITTLE HEART</div><h1>Something for<br />your <em>moment.</em></h1><p>Well-loved sips and bites, balanced to be just right.</p></div>
      <div className="menu-category-tabs" aria-label="Filter menu by category">{categories.map((itemCategory) => <button key={itemCategory} className={category === itemCategory ? "selected" : ""} onClick={() => setCategory(itemCategory)}>{itemCategory}</button>)}</div>
      <div className="full-menu-grid">{filteredItems.map((item) => <MenuPreviewCard item={item} onZoom={setZoomItem} key={item._id} />)}</div>
      {filteredItems.length === 0 && <div className="menu-empty">Nothing on the menu in this category just yet. Check back soon.</div>}
      <div className="menu-bottom-cta"><span>'Tis not a small thing to pause.</span><button onClick={onLogin}>{signedIn ? "My account & orders" : "Log in to place an order"} <ArrowRight size={15} /></button></div>
    </main>
    <footer className="public-footer"><button className="footer-wordmark footer-home-link" onClick={onHome}>befilled</button><p>'Tis not a small thing to pause.</p><span>© 2026 BEFILLED CAFE</span><button onClick={onLogin}>{signedIn ? "My orders" : "Log in"}</button></footer>
    {zoomItem && <MenuZoom item={zoomItem} signedIn={signedIn} onOrder={() => onOrderItem(zoomItem)} onClose={() => setZoomItem(null)} />}
  </div>;
}

function MenuPreviewCard({ item, onZoom }) {
  return <article className={`landing-menu-card ${item.available ? "" : "preview-sold-out"}`}>
    <button className="landing-menu-art menu-art-zoom" onClick={() => onZoom(item)} aria-label={`Zoom in on ${item.name}`}>
      <MenuPhoto item={item} /><small>{item.category}</small><i>{item.available ? "Click to zoom" : "Sold out · click to view"}</i>
    </button>
    <div className="landing-menu-info"><div><h3>{item.name}</h3><p>{item.description}</p></div><b>{money(item.price)}</b></div>
  </article>;
}

function MenuZoom({ item, onClose, onOrder, signedIn }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return <div className="menu-zoom-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }} onKeyDown={(event) => { if (event.key === "Escape") onClose(); }}>
    <div className="menu-zoom-card" role="dialog" aria-modal="true" aria-label={`${item.name} preview`}>
      <button className="menu-zoom-close" onClick={onClose} aria-label="Close preview"><X size={19} /></button>
      <div className="menu-zoom-art"><MenuPhoto item={item} alt={`${item.name} menu photo`} /></div>
      <div className="landing-eyebrow">{item.category}</div><h2>{item.name}</h2><p>{item.description}</p><strong>{money(item.price)}</strong>
      <button className="menu-order-button" onClick={onOrder} disabled={!item.available}>{item.available ? signedIn ? "Order this" : "Log in or create an account to order" : "Currently unavailable"} <ArrowRight size={15} /></button>
    </div>
  </div>;
}

function AuthPage({ mode, audience, demoMode, setMode, setAudience, error, busy, onSubmit, onHome }) {
  const registering = mode === "register";
  const staffLogin = audience === "staff" && !registering;
  return <div className="auth-page">
    <button className="auth-back" onClick={onHome}>← Back to Befilled</button>
    <div className="auth-brand"><span>befilled</span><small>'Tis not a small thing to pause.</small></div>
    <div className="auth-layout">
      <div className="auth-card"><div className="auth-eyebrow">{registering ? "A SEAT AT OUR TABLE" : staffLogin ? "BEFILLED TEAM ACCESS" : "WELCOME BACK"}</div><h1>{registering ? "Make yourself at home." : staffLogin ? "Staff sign in." : "Good to see you."}</h1><p>{registering ? "Create your account to order your favorites and keep your little moments close." : staffLogin ? "Sign in with your staff account to manage the cafe." : "Sign in to pick up where your little pause left off."}</p>
        {!registering && <div className="auth-audience-switch" aria-label="Choose sign-in type"><button type="button" className={!staffLogin ? "active" : ""} onClick={() => setAudience("customer")}>Customer</button><button type="button" className={staffLogin ? "active" : ""} onClick={() => setAudience("staff")}>Staff / Admin</button></div>}
        {demoMode && <div className="demo-mode-note" role="status">{staffLogin ? <>Browser-only staff demo. Use <strong>admin@befilled.cafe</strong> and <strong>PauseWithCare2026!</strong>. Dashboard changes stay in this browser and are not secure staff credentials.</> : "Browser-only demo: accounts and orders stay on this device. Nothing is sent to a database."}</div>}
        <form onSubmit={onSubmit} className="auth-form">
          {registering && <label><span>Your name</span><div className="auth-input"><Users size={17} /><input name="name" autoComplete="name" placeholder="How should we call you?" minLength="2" maxLength="80" required /></div></label>}
          <label><span>Email address</span><div className="auth-input"><Mail size={17} /><input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></div></label>
          <label><span>Password</span><div className="auth-input"><LockKeyhole size={17} /><input name="password" type="password" autoComplete={registering ? "new-password" : "current-password"} placeholder={registering ? "At least 10 characters" : "Enter your password"} minLength={registering ? 10 : undefined} required /></div></label>
          {error && <div className="auth-error" role="alert">{error}</div>}
          <button className="auth-submit" disabled={busy}>{busy ? "One little moment..." : registering ? "Create my account" : "Log in"} <ArrowRight size={16} /></button>
        </form>
        <div className="auth-switch">{registering ? "Already have an account?" : "New to Befilled?"}<button onClick={() => setMode(registering ? "login" : "register")}>{registering ? "Log in" : "Create an account"}</button></div>
      </div>
      <aside className="auth-aside"><div className="auth-aside-art"><CupIllustration /></div><div className="landing-eyebrow">YOUR LITTLE MOMENT, ONLINE TOO</div><h2>Good things take<br /><em>a little time.</em></h2><p>Order a favorite, find your usual, and let us make your day a little warmer.</p><span>BEFILLED CAFE · MANILA, PHILIPPINES</span></aside>
    </div>
  </div>;
}

function CustomerHome({ user, menuItems, demoMode, orders, cart, setCart, notice, busy, onOrder, onLogout, onUpdateProfile, onDeleteAccount, onHome, onMenu }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const availableItems = menuItems.filter((item) => item.available);
  const cartTotal = availableItems.reduce((sum, item) => sum + Number(item.price) * Number(cart[item._id] || 0), 0);
  const showOrders = () => document.getElementById("customer-orders")?.scrollIntoView({ behavior: "smooth" });
  return <div className="customer-app">
    <header className="customer-header"><a className="public-logo" href="#customer-home"><span>befilled</span><small>'Tis not a small thing to pause.</small></a><button className="customer-profile-trigger" onClick={() => setProfileOpen(true)} aria-label="Open your profile"><span className="top-avatar">{user.name.charAt(0).toUpperCase()}</span><span className="customer-welcome">A little hello, <strong>{user.name.split(" ")[0]}</strong></span></button><button className="customer-logout" onClick={onLogout}>Log out</button></header>
    <main className="customer-main" id="customer-home"><div className="customer-page-layout"><nav className="customer-side-nav" aria-label="Customer page navigation"><span className="customer-side-nav-label">YOUR SPACE</span><button onClick={onHome}>Home</button><button onClick={onMenu}>Our menu</button><button className="customer-account-link" onClick={showOrders}>My orders</button></nav><div className="customer-content">{demoMode && <div className="demo-mode-note customer-demo-note" role="status">Browser-only demo: your account and orders are saved on this device only.</div>}<div className="landing-eyebrow">YOUR LITTLE CORNER OF CALM</div><h1>What sounds <span className="customer-heading-highlight"><em>lovely</em><span className="customer-heading-question">?</span></span></h1><p className="customer-intro">Choose a favorite for takeaway. We'll have it ready for your pause.</p>
      {notice && <div className="customer-notice">{notice}</div>}
      <div className="customer-order-layout"><section className="customer-menu-list"><div className="landing-menu-grid">{availableItems.map((item) => <article className="landing-menu-card" key={item._id}><div className="landing-menu-art"><MenuPhoto item={item} alt={`${item.name} menu photo`} /><small>{item.category}</small></div><div className="landing-menu-info"><div><h3>{item.name}</h3><p>{item.description}</p></div><b>{money(item.price)}</b></div><div className="customer-item-add"><span>Quantity</span><div><button onClick={() => setCart((prev) => ({ ...prev, [item._id]: Math.max(0, Number(prev[item._id] || 0) - 1) }))}>−</button><b>{cart[item._id] || 0}</b><button onClick={() => setCart((prev) => ({ ...prev, [item._id]: Math.min(50, Number(prev[item._id] || 0) + 1) }))}>+</button></div></div></article>)}</div></section>
        <aside className="customer-cart"><div className="landing-eyebrow">YOUR LITTLE ORDER</div><h2>Takeaway bag</h2>{availableItems.filter((item) => cart[item._id] > 0).length === 0 ? <p className="cart-empty">A little something could go here.</p> : availableItems.filter((item) => cart[item._id] > 0).map((item) => <div className="cart-line" key={item._id}><span>{cart[item._id]}× {item.name}</span><b>{money(item.price * cart[item._id])}</b></div>)}<div className="cart-total"><span>Total</span><strong>{money(cartTotal)}</strong></div><button className="auth-submit" onClick={onOrder} disabled={busy || cartTotal === 0}>{busy ? "Placing your order..." : "Place takeaway order"} <ArrowRight size={15} /></button><small>We'll prepare it fresh for you at the cafe.</small></aside></div>
      <section className="customer-history" id="customer-orders"><div className="landing-eyebrow">YOUR PAST PAUSES</div><h2>Order history</h2>{orders.length === 0 ? <p>Your orders will show up here.</p> : orders.map((order) => <article className="customer-order-row" key={order._id}><div><strong>{order.orderNumber}</strong><small>{new Date(order.createdAt).toLocaleString("en-PH", { dateStyle: "medium", timeStyle: "short" })}</small></div><span>{order.items.map((item) => `${item.quantity}× ${item.name}`).join(", ")}</span><b>{money(order.total)}</b><em className={`history-${order.status.toLowerCase()}`}>{order.status}</em></article>)}</section>
    </div></div></main><footer className="public-footer"><a className="footer-wordmark" href="#customer-home">befilled</a><p>'Tis not a small thing to pause.</p><span>© 2026 BEFILLED CAFE</span></footer>
    {profileOpen && <CustomerProfileModal user={user} demoMode={demoMode} onClose={() => setProfileOpen(false)} onSave={onUpdateProfile} onDelete={onDeleteAccount} />}
  </div>;
}

function CustomerProfileModal({ user, demoMode, onClose, onSave, onDelete }) {
  const [mode, setMode] = useState("edit");
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      await onSave({ name, email, currentPassword, newPassword });
      onClose();
    } catch (saveError) {
      setError(saveError.message || "We couldn't update your profile.");
    } finally {
      setBusy(false);
    }
  }

  async function deleteAccount(event) {
    event.preventDefault();
    if (confirmation !== "DELETE") return setError("Type DELETE to confirm account deletion.");
    setError("");
    setBusy(true);
    try {
      await onDelete(currentPassword);
      onClose();
    } catch (deleteError) {
      setError(deleteError.message || "We couldn't delete your account.");
      setBusy(false);
    }
  }

  return <div className="modal-backdrop profile-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget && !busy) onClose(); }}>
    <section className="record-modal profile-modal" role="dialog" aria-modal="true" aria-labelledby="customer-profile-title">
      <div className="modal-heading"><div><div className="eyebrow">YOUR LITTLE CORNER</div><h2 id="customer-profile-title">{mode === "edit" ? "Your profile" : "Delete account"}</h2></div><button type="button" className="modal-close" onClick={onClose} aria-label="Close profile" disabled={busy}><X size={20} /></button></div>
      {!demoMode ? <><div className="admin-profile-identity"><span className="top-avatar">{user.name.charAt(0).toUpperCase()}</span><div><strong>{user.name}</strong><small>{user.email}</small></div></div><div className="owner-approval-note"><LockKeyhole size={17} /><div><strong>Profile management is not connected yet</strong><p>Customer profile editing and account deletion are available in browser-only demo mode. Database-backed profile management will require secure server-side support.</p></div></div><div className="modal-actions"><button type="button" className="cancel-button" onClick={onClose}>Close</button></div></> :
      <div className="profile-tabs"><button type="button" className={mode === "edit" ? "active" : ""} onClick={() => { setMode("edit"); setError(""); }}>Edit details</button><button type="button" className={mode === "delete" ? "active danger-tab" : ""} onClick={() => { setMode("delete"); setError(""); }}>Delete account</button></div>
      }{demoMode && (mode === "edit" ? <form className="profile-form" onSubmit={submit}>
        <label className="form-field"><span>Your name *</span><input autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} minLength="2" maxLength="80" required /></label>
        <label className="form-field"><span>Email address *</span><input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
        <label className="form-field"><span>Current password (required to save) *</span><input type="password" autoComplete="current-password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} required /></label>
        <label className="form-field"><span>New password <small>Leave blank to keep your current password</small></span><input type="password" autoComplete="new-password" minLength="10" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} placeholder="At least 10 characters" /></label>
        {error && <div className="auth-error" role="alert">{error}</div>}
        <div className="modal-actions"><button type="button" className="cancel-button" onClick={onClose} disabled={busy}>Cancel</button><button type="submit" className="primary-button" disabled={busy}><Check size={15} />{busy ? "Saving..." : "Save changes"}</button></div>
      </form> : <form className="profile-form" onSubmit={deleteAccount}>
        <p className="profile-delete-warning">Deleting your account permanently removes its browser-only login and order history from this device. This cannot be undone.</p>
        <label className="form-field"><span>Current password *</span><input type="password" autoComplete="current-password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} required /></label>
        <label className="form-field"><span>Type DELETE to confirm *</span><input value={confirmation} onChange={(event) => setConfirmation(event.target.value)} autoComplete="off" required /></label>
        {error && <div className="auth-error" role="alert">{error}</div>}
        <div className="modal-actions"><button type="button" className="cancel-button" onClick={() => { setMode("edit"); setError(""); }} disabled={busy}>Keep my account</button><button type="submit" className="delete-button" disabled={busy || confirmation !== "DELETE"}><Trash2 size={15} />{busy ? "Deleting..." : "Delete account"}</button></div>
      </form>)}
    </section>
  </div>;
}

function AdminProfileModal({ user, onClose }) {
  return <div className="modal-backdrop profile-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section className="record-modal profile-modal admin-profile-modal" role="dialog" aria-modal="true" aria-labelledby="admin-profile-title">
      <div className="modal-heading"><div><div className="eyebrow">BEFILLED TEAM ACCESS</div><h2 id="admin-profile-title">Admin profile</h2></div><button type="button" className="modal-close" onClick={onClose} aria-label="Close profile"><X size={20} /></button></div>
      <div className="admin-profile-identity"><span className="top-avatar">{user.name.charAt(0).toUpperCase()}</span><div><strong>{user.name}</strong><small>{user.email}</small></div></div>
      <div className="owner-approval-note"><LockKeyhole size={17} /><div><strong>Owner approval required</strong><p>Admin profile changes and account deletion need owner verification. Admins cannot edit customer account details. These actions remain disabled until owner-key verification is handled securely on the server; a browser-only key check would not be secure.</p></div></div>
      <div className="modal-actions"><button type="button" className="cancel-button" onClick={onClose}>Close</button></div>
    </section>
  </div>;
}

function ManagementApp({ user, browserDemoMode, onLogout }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [page, setPage] = useState("Overview");
  const [menuItems, setMenuItems] = useState(() => readLocal("menu"));
  const [inventory, setInventory] = useState(() => readLocal("inventory"));
  const [orders, setOrders] = useState(() => readLocal("orders"));
  const [demoMode, setDemoMode] = useState(browserDemoMode);
  const [modal, setModal] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All items");
  const [notice, setNotice] = useState("");
  const [dateLabel, setDateLabel] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    setDateLabel(new Date().toLocaleDateString("en-PH", { weekday: "long", month: "long", day: "numeric" }));
    if (browserDemoMode) {
      setDemoMode(true);
      setNotice("Browser-only admin demo. Menu, inventory, and order changes are saved on this device only.");
      return;
    }
    Promise.all(["menu", "inventory", "orders"].map((kind) =>
      fetch(`/api/${kind}`).then((res) => {
        if (!res.ok) throw new Error("API unavailable");
        return res.json();
      })
    )).then(([menu, stock, orderList]) => {
      setMenuItems(menu); setInventory(stock); setOrders(orderList); setDemoMode(false);
    }).catch(() => {
      setDemoMode(true);
      setNotice("MongoDB isn't connected. You're viewing demo data saved in this browser.");
    });
  }, [browserDemoMode]);

  useEffect(() => {
    localStorage.setItem("befilled-menu", JSON.stringify(menuItems));
    localStorage.setItem("befilled-inventory", JSON.stringify(inventory));
    localStorage.setItem("befilled-orders", JSON.stringify(orders));
  }, [menuItems, inventory, orders]);

  const todayOrders = orders.filter((order) => new Date(order.createdAt || Date.now()).toDateString() === new Date().toDateString());
  const sales = todayOrders.reduce((total, order) => total + Number(order.total || 0), 0);
  const lowStock = inventory.filter((item) => Number(item.quantity) <= Number(item.reorderAt));
  const preparingOrders = orders.filter((order) => order.status === "Preparing");
  const notificationCount = lowStock.length + preparingOrders.length;
  const filteredMenu = useMemo(() => menuItems.filter((item) =>
    (category === "All items" || item.category === category) &&
    `${item.name} ${item.category}`.toLowerCase().includes(query.toLowerCase())
  ), [menuItems, category, query]);
  const filteredStock = useMemo(() => inventory.filter((item) =>
    `${item.name} ${item.category} ${item.supplier}`.toLowerCase().includes(query.toLowerCase())
  ), [inventory, query]);
  const customerRecords = useMemo(() => {
    if (!demoMode) return [];
    const registeredCustomers = readDemoUsers()
      .filter((account) => account.role === "customer")
      .map((account) => {
        const accountOrders = readDemoOrders(account.id);
        const spend = accountOrders.reduce((sum, order) => sum + Number(order.total || 0), 0);
        const itemCounts = accountOrders.flatMap((order) => order.items || []).reduce((counts, item) => {
          counts[item.name] = (counts[item.name] || 0) + Number(item.quantity || 0);
          return counts;
        }, {});
        const favorite = Object.entries(itemCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "No orders yet";
        return {
          name: account.name,
          email: account.email,
          visits: accountOrders.length,
          favorite,
          spent: spend,
          lastVisit: accountOrders[0]?.createdAt ? new Date(accountOrders[0].createdAt).toLocaleDateString("en-PH", { month: "short", day: "numeric" }) : "New regular"
        };
      });
    const registeredEmails = new Set(registeredCustomers.map((customer) => customer.email.toLowerCase()));
    return [...demoCustomers.filter((customer) => !registeredEmails.has(customer.email.toLowerCase())), ...registeredCustomers];
  }, [demoMode, orders]);
  const filteredCustomers = useMemo(() => customerRecords.filter((customer) =>
    `${customer.name} ${customer.email} ${customer.favorite}`.toLowerCase().includes(query.toLowerCase())
  ), [customerRecords, query]);

  async function saveRecord(kind, record) {
    const list = kind === "menu" ? menuItems : inventory;
    const setter = kind === "menu" ? setMenuItems : setInventory;
    const editing = Boolean(record._id && !record._id.startsWith("new-"));
    if (demoMode) {
      setter(editing ? list.map((item) => item._id === record._id ? record : item) : [{ ...record, _id: `new-${Date.now()}` }, ...list]);
      setNotice("Saved in this browser. Connect MongoDB to use the shared database.");
      setModal(null);
      return;
    }
    try {
      const response = await fetch(`/api/${kind}${editing ? `/${record._id}` : ""}`, {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record)
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Could not save this record.");
      setter(editing ? list.map((item) => item._id === result._id ? result : item) : [result, ...list]);
      setModal(null);
    } catch (error) { setNotice(error.message); }
  }

  async function deleteRecord(kind, item) {
    const list = kind === "menu" ? menuItems : inventory;
    const setter = kind === "menu" ? setMenuItems : setInventory;
    if (demoMode || item._id.startsWith("new-")) {
      setter(list.filter((record) => record._id !== item._id));
      return;
    }
    try {
      const response = await fetch(`/api/${kind}/${item._id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Could not delete this record.");
      setter(list.filter((record) => record._id !== item._id));
    } catch (error) { setNotice(error.message); }
  }

  async function updateOrderStatus(order, status) {
    if (demoMode) {
      setOrders((prev) => prev.map((item) => item._id === order._id ? { ...item, status } : item));
      return;
    }
    try {
      const response = await fetch(`/api/orders/${order._id}`, {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      const updated = await response.json();
      if (!response.ok) throw new Error(updated.message || "Could not update order.");
      setOrders((prev) => prev.map((item) => item._id === order._id ? updated : item));
    } catch (error) { setNotice(error.message); }
  }

  async function createOrder(order) {
    if (demoMode) {
      const items = order.items.map((requested) => {
        const menuItem = menuItems.find((item) => item._id === requested.menuItemId);
        return { name: menuItem.name, quantity: requested.quantity, price: Number(menuItem.price) };
      });
      setOrders((prev) => [{
        ...order,
        items,
        total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
        status: "Preparing",
        _id: `new-${Date.now()}`,
        createdAt: new Date().toISOString()
      }, ...prev]);
      setModal(null);
      setNotice("Order saved in this browser. Connect MongoDB to use the shared database.");
      return;
    }
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order)
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Could not create this order.");
      setOrders((prev) => [result, ...prev]);
      setModal(null);
    } catch (error) { setNotice(error.message); }
  }

  const nav = [
    { name: "Overview", icon: LayoutDashboard }, { name: "Orders", icon: ShoppingBag, count: orders.filter((o) => o.status === "Preparing").length },
    { name: "Menu", icon: Coffee }, { name: "Inventory", icon: Package, count: lowStock.length },
    { name: "Customers", icon: Users }, { name: "Reports", icon: CircleDollarSign }
  ];

  function navigate(name) { setPage(name); setQuery(""); }

  return (
    <div className="app-shell">
      <main className="main-area">
        <header className="brand-header">
          <div className="brand-lockup">
            <div className="brand-word">befilled</div>
            <div className="brand-tagline">'Tis not a small thing to pause.</div>
          </div>
        </header>
        <nav className="workspace-nav" aria-label="Cafe workspace">
          {nav.map(({ name, icon: Icon, count }) => <button key={name} onClick={() => navigate(name)} className={`nav-link ${page === name ? "active" : ""}`}><Icon size={16} strokeWidth={1.8} /><span>{name}</span>{count > 0 && <span className="nav-count">{count}</span>}</button>)}
        </nav>
        <header className="topbar">
          <div className="breadcrumb">Befilled Cafe <span>/</span> <strong>{page}</strong></div>
          <div className="topbar-actions"><div className="today-date"><CalendarDays size={15} />{dateLabel}</div><div className="notification-wrap"><button className="icon-button notification-button" aria-label={`Notifications${notificationCount ? `, ${notificationCount} updates` : ""}`} aria-expanded={notificationsOpen} aria-controls="notification-panel" onClick={() => setNotificationsOpen((open) => !open)}><Bell size={18} />{notificationCount > 0 && <span className="notification-count">{notificationCount > 9 ? "9+" : notificationCount}</span>}</button>{notificationsOpen && <div className="notification-panel" id="notification-panel" role="dialog" aria-label="Cafe notifications"><div className="notification-panel-heading"><div><div className="eyebrow">A LITTLE HEADS-UP</div><h2>Notifications</h2></div><button onClick={() => setNotificationsOpen(false)} aria-label="Close notifications"><X size={16} /></button></div>{lowStock.length === 0 && preparingOrders.length === 0 ? <p className="notification-empty">All caught up. Take a little pause.</p> : <div className="notification-list">{lowStock.map((item) => <button key={`stock-${item._id}`} className="notification-item" onClick={() => { navigate("Inventory"); setNotificationsOpen(false); }}><span className="notification-item-icon stock"><Package size={16} /></span><span><strong>{item.name} needs a restock</strong><small>{item.quantity} {item.unit} on hand · reorder at {item.reorderAt} {item.unit}</small></span><ArrowRight size={14} /></button>)}{preparingOrders.map((order) => <button key={`order-${order._id}`} className="notification-item" onClick={() => { navigate("Orders"); setNotificationsOpen(false); }}><span className="notification-item-icon order"><ShoppingBag size={16} /></span><span><strong>{order.orderNumber} is being prepared</strong><small>{order.customer || "Cafe guest"} · {money(order.total)}</small></span><ArrowRight size={14} /></button>)}</div>}</div>}</div><button className="top-avatar profile-avatar-button" onClick={() => setProfileOpen(true)} aria-label="Open admin profile">{user.name.charAt(0).toUpperCase()}</button><button className="manager-logout" onClick={onLogout}>Log out</button></div>
        </header>
        {demoMode && <div className="demo-banner"><AlertTriangle size={15} /> Demo mode — browser-only data. Connect MongoDB to sync your cafe records.</div>}
        {notice && <div className="notice-banner"><span>{notice}</span><button aria-label="Dismiss notice" onClick={() => setNotice("")}><X size={15} /></button></div>}

        <div className="page-content">
          {page === "Overview" && <Overview sales={sales} todayOrders={todayOrders} menuItems={menuItems} inventory={inventory} lowStock={lowStock} orders={orders} onNavigate={navigate} onStatus={updateOrderStatus} dateLabel={dateLabel} user={user} />}
          {page === "Menu" && <section>
            <div className="page-heading"><div><div className="eyebrow">YOUR LITTLE MENU</div><h1>Menu <span>management</span></h1><p>Good things, made with a little extra love.</p></div><button className="primary-button" onClick={() => setModal({ kind: "menu", record: { name: "", category: "Coffee", price: "", description: "", available: true, image: "☕" } })}><Plus size={17} /> Add menu item</button></div>
            <div className="toolbar"><div className="search-box"><Search size={17} /><input placeholder="Search your menu..." value={query} onChange={(e) => setQuery(e.target.value)} /></div><div className="filter-box"><SlidersHorizontal size={16} /><select value={category} onChange={(e) => setCategory(e.target.value)}><option>All items</option>{[...new Set(menuItems.map((item) => item.category))].map((c) => <option key={c}>{c}</option>)}</select></div><span className="result-count">{filteredMenu.length} items</span></div>
            <div className="menu-grid">{filteredMenu.map((item) => <article className={`menu-card ${!item.available ? "unavailable" : ""}`} key={item._id}><div className="menu-card-art"><MenuPhoto item={item} alt={`${item.name} menu photo`} /><button className="dots-button" onClick={() => setModal({ kind: "menu", record: item })} aria-label={`Edit ${item.name}`}><MoreHorizontal size={19} /></button>{!item.available && <span className="unavailable-label">SOLD OUT</span>}</div><div className="menu-card-info"><div className="menu-category">{item.category}</div><div className="menu-title-row"><h3>{item.name}</h3><span>{money(item.price)}</span></div><p>{item.description || "A little something to brighten your day."}</p><div className="menu-card-actions"><span className={`availability ${item.available ? "is-available" : ""}`}><i />{item.available ? "Available" : "Unavailable"}</span><div><button onClick={() => setModal({ kind: "menu", record: item })} aria-label={`Edit ${item.name}`}><Pencil size={15} /></button><button onClick={() => setConfirmDelete({ kind: "menu", item })} aria-label={`Delete ${item.name}`}><Trash2 size={15} /></button></div></div></div></article>)}
              {filteredMenu.length === 0 && <EmptyState title="Nothing on the menu yet" text="Add a menu item to get things brewing." />}</div>
          </section>}
          {page === "Inventory" && <section>
            <div className="page-heading"><div><div className="eyebrow">KEEP THE GOOD THINGS COMING</div><h1>Stock <span>room</span></h1><p>A little check-in on the things that keep us going.</p></div><button className="primary-button" onClick={() => setModal({ kind: "inventory", record: { name: "", category: "Coffee", quantity: "", unit: "kg", reorderAt: "", supplier: "" } })}><Plus size={17} /> Add stock item</button></div>
            {lowStock.length > 0 && <div className="stock-alert"><AlertTriangle size={18} /><div><strong>{lowStock.length} item{lowStock.length > 1 ? "s" : ""} need a little restock</strong><span>{lowStock.map((i) => i.name).join(" · ")}</span></div></div>}
            <div className="toolbar"><div className="search-box"><Search size={17} /><input placeholder="Search inventory..." value={query} onChange={(e) => setQuery(e.target.value)} /></div><span className="result-count">{filteredStock.length} items in stock</span></div>
            <div className="table-card inventory-table"><table><thead><tr><th>ITEM</th><th>CATEGORY</th><th>ON HAND</th><th>REORDER AT</th><th>SUPPLIER</th><th /></tr></thead><tbody>{filteredStock.map((item) => { const low = Number(item.quantity) <= Number(item.reorderAt); return <tr key={item._id}><td><strong>{item.name}</strong></td><td>{item.category}</td><td><span className={`stock-pill ${low ? "stock-low" : ""}`}><i />{item.quantity} {item.unit}</span></td><td>{item.reorderAt} {item.unit}</td><td>{item.supplier || "—"}</td><td><div className="row-actions"><button onClick={() => setModal({ kind: "inventory", record: item })} aria-label={`Edit ${item.name}`}><Pencil size={15} /></button><button onClick={() => setConfirmDelete({ kind: "inventory", item })} aria-label={`Delete ${item.name}`}><Trash2 size={15} /></button></div></td></tr>; })}</tbody></table>{filteredStock.length === 0 && <EmptyState title="Your stock room is waiting" text="Add your ingredients and supplies here." />}</div>
          </section>}
          {page === "Orders" && <OrdersPage orders={orders} onStatus={updateOrderStatus} onNew={() => setModal({ kind: "order" })} />}
          {page === "Customers" && demoMode ? <CustomersPage customers={filteredCustomers} totalCustomers={customerRecords.length} query={query} onQueryChange={setQuery} /> : page === "Customers" && <PlaceholderPage title="Your people" eyebrow="THE HEART OF OUR CAFE" text="Your regulars, their favorite orders, and the little things that make every visit feel personal." icon={Users} />}
          {page === "Reports" && <ReportsPage orders={orders} menuItems={menuItems} />}
        </div>
        <footer className="footer-note"><span>Made for little pauses.</span><span>BEFILLED CAFE &nbsp;·&nbsp; MANILA</span></footer>
      </main>
      {modal?.kind === "order" ? <NewOrderModal menuItems={menuItems} onClose={() => setModal(null)} onSave={createOrder} /> : modal && <RecordModal modal={modal} onClose={() => setModal(null)} onSave={saveRecord} />}
      {confirmDelete && <DeleteConfirm item={confirmDelete.item} onCancel={() => setConfirmDelete(null)} onConfirm={async () => { await deleteRecord(confirmDelete.kind, confirmDelete.item); setConfirmDelete(null); }} />}
      {profileOpen && <AdminProfileModal user={user} onClose={() => setProfileOpen(false)} />}
    </div>
  );
}

function CustomersPage({ customers, totalCustomers, query, onQueryChange }) {
  const regulars = customers.filter((customer) => customer.visits >= 5).length;
  const totalSpent = customers.reduce((sum, customer) => sum + customer.spent, 0);
  return <section className="customers-page">
    <div className="page-heading"><div><div className="eyebrow">THE HEART OF OUR CAFE</div><h1>Your <span>people</span></h1><p>Your regulars, their favorite orders, and the little things that make every visit feel personal.</p></div></div>
    <div className="customer-stats">
      <article className="stat-card"><div className="stat-top">People in our little community <span className="stat-icon"><Users size={15} /></span></div><div className="stat-value">{totalCustomers}</div><div className="stat-foot"><small>Sample and browser demo customers</small></div></article>
      <article className="stat-card"><div className="stat-top">Lovely regulars <span className="stat-icon"><Coffee size={15} /></span></div><div className="stat-value">{regulars}</div><div className="stat-foot"><small>Visited five times or more</small></div></article>
      <article className="stat-card"><div className="stat-top">Demo lifetime spend <span className="stat-icon"><CircleDollarSign size={15} /></span></div><div className="stat-value">{money(totalSpent)}</div><div className="stat-foot"><small>For sample profiles only</small></div></article>
    </div>
    <div className="customer-directory">
      <div className="card-heading"><div><div className="eyebrow">A FAMILIAR FACE</div><h3>Our cafe community</h3></div><span className="result-count">{customers.length} people</span></div>
      <div className="toolbar"><div className="search-box"><Search size={17} /><input placeholder="Search people..." value={query} onChange={(event) => onQueryChange(event.target.value)} /></div></div>
      <div className="customer-table-wrap"><table className="customer-table"><thead><tr><th>PERSON</th><th>VISITS</th><th>FAVORITE ORDER</th><th>LIFETIME SPEND</th><th>LAST VISIT</th></tr></thead><tbody>{customers.map((customer) => <tr key={customer.email}><td><div className="customer-person"><span>{customer.name.charAt(0).toUpperCase()}</span><div><strong>{customer.name}</strong><small>{customer.email}</small></div></div></td><td>{customer.visits}</td><td>{customer.favorite}</td><td><strong>{money(customer.spent)}</strong></td><td>{customer.lastVisit}</td></tr>)}</tbody></table>
        {customers.length === 0 && <EmptyState title="No familiar faces found" text="Try another name, email, or favorite order." />}
      </div>
      <p className="customer-demo-caption">Demo profiles are fictional. New browser-only customer accounts will appear here; this list is not shared or stored in a database.</p>
    </div>
  </section>;
}

function ReportsPage({ orders, menuItems }) {
  const dateKey = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  const todayKey = dateKey(new Date());
  const defaultStart = new Date();
  defaultStart.setDate(defaultStart.getDate() - 6);
  const [startDate, setStartDate] = useState(() => dateKey(defaultStart));
  const [endDate, setEndDate] = useState(todayKey);
  const rangeStart = new Date(`${startDate}T00:00:00`);
  const rangeEnd = new Date(`${endDate}T23:59:59.999`);
  const rangeOrders = orders.filter((order) => {
    const createdAt = new Date(order.createdAt || Date.now());
    return createdAt >= rangeStart && createdAt <= rangeEnd;
  });
  const completedOrders = rangeOrders.filter((order) => order.status !== "Cancelled");
  const totalSales = completedOrders.reduce((sum, order) => sum + Number(order.total || 0), 0);
  const averageOrder = completedOrders.length ? totalSales / completedOrders.length : 0;
  const dayCount = Math.round((new Date(`${endDate}T00:00:00`) - new Date(`${startDate}T00:00:00`)) / 86400000) + 1;
  const bucketDays = Math.ceil(dayCount / 31);
  const salesByDay = Array.from({ length: Math.ceil(dayCount / bucketDays) }, (_, index) => {
    const date = new Date(`${startDate}T00:00:00`);
    date.setDate(date.getDate() + index * bucketDays);
    const key = dateKey(date);
    const bucketEnd = new Date(date);
    bucketEnd.setDate(bucketEnd.getDate() + bucketDays);
    const dayOrders = completedOrders.filter((order) => {
      const orderDate = new Date(order.createdAt || Date.now());
      return orderDate >= date && orderDate < bucketEnd && dateKey(orderDate) >= startDate && dateKey(orderDate) <= endDate;
    });
    const bucketLastDay = new Date(bucketEnd);
    bucketLastDay.setDate(bucketLastDay.getDate() - 1);
    const label = bucketDays === 1
      ? date.toLocaleDateString("en-PH", { weekday: "short", day: "numeric" })
      : `${date.toLocaleDateString("en-PH", { month: "short", day: "numeric" })}–${bucketLastDay.toLocaleDateString("en-PH", { month: "short", day: "numeric" })}`;
    return {
      key: `${key}-${index}`,
      label,
      sales: dayOrders.reduce((sum, order) => sum + Number(order.total || 0), 0),
      orders: dayOrders.length
    };
  });
  const peakSales = Math.max(...salesByDay.map((day) => day.sales), 1);
  const statusCounts = ["Preparing", "Ready", "Completed", "Cancelled"].map((status) => ({
    status,
    count: rangeOrders.filter((order) => order.status === status).length
  }));
  const highestStatusCount = Math.max(...statusCounts.map((status) => status.count), 1);
  const itemCounts = completedOrders.flatMap((order) => order.items || []).reduce((counts, item) => {
    const name = item.name || menuItems.find((menuItem) => menuItem._id === item.menuItemId)?.name || "Cafe item";
    counts[name] = (counts[name] || 0) + Number(item.quantity || 0);
    return counts;
  }, {});
  const bestSellers = Object.entries(itemCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const orderCount = rangeOrders.length;
  const formatRangeDate = (date) => date.toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" });
  return <section className="reports-page">
    <div className="page-heading"><div><div className="eyebrow">A LITTLE LOOK BACK</div><h1>The bigger <span>picture</span></h1><p>A clear view of your cafe's sales and orders.</p></div><div className="report-date-range"><CalendarDays size={16} /><label><span>From</span><input aria-label="Report start date" type="date" value={startDate} max={endDate} onChange={(event) => { const next = event.target.value; if (next) { setStartDate(next); if (next > endDate) setEndDate(next); } }} /></label><span className="report-date-separator">to</span><label><span>To</span><input aria-label="Report end date" type="date" value={endDate} min={startDate} max={todayKey} onChange={(event) => { const next = event.target.value; if (next) { setEndDate(next); if (next < startDate) setStartDate(next); } }} /></label></div></div>
    <div className="report-stats">
      <article className="stat-card"><div className="stat-top">Total sales <span className="stat-icon"><CircleDollarSign size={15} /></span></div><div className="stat-value">{money(totalSales)}</div><div className="stat-foot"><small>Excludes cancelled orders</small></div></article>
      <article className="stat-card"><div className="stat-top">Orders <span className="stat-icon"><ShoppingBag size={15} /></span></div><div className="stat-value">{orderCount}</div><div className="stat-foot"><small>{rangeOrders.filter((order) => order.status === "Completed").length} completed</small></div></article>
      <article className="stat-card"><div className="stat-top">Average order <span className="stat-icon"><Coffee size={15} /></span></div><div className="stat-value">{money(averageOrder)}</div><div className="stat-foot"><small>Per non-cancelled order</small></div></article>
    </div>
    <div className="reports-grid">
      <article className="report-panel sales-report">
        <div className="card-heading"><div><div className="eyebrow">THE DAILY POUR</div><h3>Sales by day</h3><p className="report-range-label">{formatRangeDate(rangeStart)} – {formatRangeDate(rangeEnd)}</p></div><strong>{money(totalSales)}</strong></div>
        <div className="sales-chart-scroll"><div className="sales-chart" role="img" aria-label={`Daily sales chart from ${formatRangeDate(rangeStart)} to ${formatRangeDate(rangeEnd)}`} style={{ gridTemplateColumns: `repeat(${salesByDay.length}, minmax(48px, 1fr))` }}>
          {salesByDay.map((day) => <div className="sales-chart-column" key={day.key} title={`${day.label}: ${money(day.sales)} across ${day.orders} orders`}><span className="sales-chart-value">{day.sales ? money(day.sales) : ""}</span><div className="sales-chart-track"><i style={{ height: `${day.sales ? Math.max(8, day.sales / peakSales * 100) : 0}%` }} /></div><small>{day.label}</small></div>)}
        </div></div>
      </article>
      <article className="report-panel status-report">
        <div className="card-heading"><div><div className="eyebrow">AT A GLANCE</div><h3>Order status</h3></div></div>
        <div className="status-report-list">{statusCounts.map(({ status, count }) => <div className="status-report-row" key={status}><div><span className={`status-report-dot status-dot-${status.toLowerCase()}`} /><span>{status}</span><strong>{count}</strong></div><div className="status-report-track"><i className={`status-bar-${status.toLowerCase()}`} style={{ width: `${count / highestStatusCount * 100}%` }} /></div></div>)}</div>
      </article>
      <article className="report-panel best-sellers-report">
        <div className="card-heading"><div><div className="eyebrow">CUSTOMER FAVORITES</div><h3>Top-selling items</h3></div></div>
        {bestSellers.length ? <div className="best-sellers-list">{bestSellers.map(([name, quantity], index) => <div className="best-seller-row" key={name}><span className="best-seller-rank">{String(index + 1).padStart(2, "0")}</span><strong>{name}</strong><span>{quantity} sold</span></div>)}</div> : <p className="report-empty">Item sales will appear here when orders include menu items.</p>}
      </article>
      <article className="report-panel recent-sales-report">
        <div className="card-heading"><div><div className="eyebrow">FRESH FROM THE COUNTER</div><h3>Recent orders</h3></div><span className="result-count">{rangeOrders.length} total</span></div>
        {rangeOrders.length ? <div className="report-table-wrap"><table className="report-table"><thead><tr><th>ORDER</th><th>CUSTOMER</th><th>DATE</th><th>STATUS</th><th>TOTAL</th></tr></thead><tbody>{rangeOrders.slice(0, 8).map((order) => <tr key={order._id}><td className="order-id">{order.orderNumber || "Cafe order"}</td><td>{order.customer || "Cafe guest"}</td><td>{new Date(order.createdAt || Date.now()).toLocaleDateString("en-PH", { month: "short", day: "numeric" })}</td><td><span className={`report-status-badge report-status-${String(order.status || "").toLowerCase()}`}>{order.status || "Preparing"}</span></td><td><strong>{money(order.total)}</strong></td></tr>)}</tbody></table></div> : <EmptyState title="No orders in this date range" text="Choose a different date range to view cafe activity." />}
      </article>
    </div>
    <p className="report-demo-caption">Reports use the orders within your selected dates. Demo data and report activity stay in this browser.</p>
  </section>;
}

function Overview({ sales, todayOrders, menuItems, inventory, lowStock, orders, onNavigate, onStatus, dateLabel, user }) {
  const best = menuItems.slice(0, 3);
  return <section>
    <div className="welcome-row"><div><div className="eyebrow">{dateLabel.toUpperCase()}, AT A GLANCE</div><h1>Good morning, {user.name.split(" ")[0]} <span>☀</span></h1><p>Here's what's brewing at Befilled today.</p></div><div className="open-badge"><span />We're open <b>·</b> until 9:00 PM</div></div>
    <div className="hero-card"><div className="hero-copy"><div className="hero-kicker"><span /> TODAY'S LITTLE REMINDER</div><h2><em>'Tis</em> not a small thing<br />to <em>pause.</em></h2><p>Take a breath, make a coffee, and make<br className="desktop-break" /> someone's day a little warmer.</p><button onClick={() => onNavigate("Menu")}>Explore today's menu <span>↗</span></button></div><div className="hero-image"><div className="hero-circle"><CupIllustration /></div><span className="hero-sticker">take it<br /><em>slow</em> today</span></div><div className="hero-caption">A MOMENT, JUST FOR YOU &nbsp; · &nbsp; 01 / 04</div></div>
    <div className="section-title-row"><div><div className="eyebrow">THE DAILY POUR</div><h2>Today's overview</h2></div><span className="muted-today"><Clock3 size={15} /> Updates in real time</span></div>
    <div className="stats-grid">
      <StatCard label="Today's sales" value={money(sales)} change="+12.8%" icon={CircleDollarSign} trend="vs. yesterday" />
      <StatCard label="Orders today" value={todayOrders.length} change="+8.2%" icon={ShoppingBag} trend="vs. yesterday" />
      <StatCard label="Menu favorites" value={menuItems.length} change={`${menuItems.filter((m) => m.available).length} available`} icon={Coffee} trend="little things to love" />
      <StatCard label="Stock to check" value={lowStock.length} change={lowStock.length ? "Needs a top-up" : "All stocked up"} icon={Package} trend={`${inventory.length} items tracked`} warn={lowStock.length > 0} />
    </div>
    <div className="overview-lower">
      <div className="table-card recent-orders"><div className="card-heading"><div><div className="eyebrow">FRESH FROM THE COUNTER</div><h3>Recent orders</h3></div><button className="text-button" onClick={() => onNavigate("Orders")}>View all <span>→</span></button></div><table><thead><tr><th>ORDER</th><th>CUSTOMER</th><th>ITEMS</th><th>TOTAL</th><th>STATUS</th></tr></thead><tbody>{orders.slice(0, 4).map((order) => <tr key={order._id}><td className="order-id">{order.orderNumber}</td><td>{order.customer}</td><td>{order.items?.reduce((sum, item) => sum + Number(item.quantity || 1), 0) || 1} items</td><td><strong>{money(order.total)}</strong></td><td><OrderStatus order={order} onStatus={onStatus} /></td></tr>)}</tbody></table></div>
      <div className="side-stack"><div className="top-picks card-panel"><div className="card-heading"><div><div className="eyebrow">A LITTLE SOMETHING</div><h3>Menu favorites</h3></div><Coffee size={18} /></div>{best.map((item, index) => <div className="pick-row" key={item._id}><MenuPhoto item={item} alt={`${item.name} menu photo`} className="pick-photo" /><div><strong>{item.name}</strong><small>{index === 0 ? "A customer favorite" : item.category}</small></div><b>{money(item.price)}</b></div>)}</div><div className={`stock-note card-panel ${lowStock.length ? "needs-restock" : ""}`}><div className="stock-note-icon">{lowStock.length ? <AlertTriangle size={18} /> : <Leaf size={19} />}</div><div><strong>{lowStock.length ? "A little restock needed" : "Your stock is looking good"}</strong><p>{lowStock.length ? `${lowStock[0].name} is running low.` : "All the essentials are ready to go."}</p></div><button onClick={() => onNavigate("Inventory")} aria-label="View inventory">→</button></div></div>
    </div>
    <div className="bottom-note"><span>✳</span> A small pause can make a big difference. Make someone's day today.</div>
  </section>;
}

function StatCard({ label, value, change, icon: Icon, trend, warn }) {
  return <div className="stat-card"><div className="stat-top"><span>{label}</span><div className={`stat-icon ${warn ? "stat-warn" : ""}`}><Icon size={17} /></div></div><div className="stat-value">{value}</div><div className="stat-foot"><span className={warn ? "warn-text" : ""}>{warn ? <AlertTriangle size={13} /> : <ArrowUpRight size={14} />}{change}</span><small>{trend}</small></div></div>;
}

function OrderStatus({ order, onStatus }) {
  return <label className={`status-select status-${order.status?.toLowerCase()}`}><i /><span>{order.status}</span><select value={order.status} onChange={(e) => onStatus(order, e.target.value)} aria-label={`Status for order ${order.orderNumber}`}><option>Preparing</option><option>Ready</option><option>Completed</option><option>Cancelled</option></select><ChevronDown size={12} /></label>;
}

function OrdersPage({ orders, onStatus, onNew }) {
  return <section><div className="page-heading"><div><div className="eyebrow">FRESH FROM THE COUNTER</div><h1>Order <span>board</span></h1><p>Every little order, right where it should be.</p></div><button className="primary-button" onClick={onNew}><Plus size={17} /> New order</button></div><div className="orders-board">{["Preparing", "Ready", "Completed"].map((status) => <div className="order-column" key={status}><div className="column-heading"><span className={`column-dot dot-${status.toLowerCase()}`} /><h3>{status}</h3><span className="column-count">{orders.filter((o) => o.status === status).length}</span></div>{orders.filter((o) => o.status === status).map((order) => <article className="order-card" key={order._id}><div className="order-card-top"><strong>{order.orderNumber}</strong><span>{new Date(order.createdAt || Date.now()).toLocaleTimeString("en-PH", { hour: "numeric", minute: "2-digit" })}</span></div><h4>{order.customer}</h4><small>{order.orderType || "Dine in"} · {order.items?.reduce((sum, item) => sum + Number(item.quantity || 1), 0) || 1} items</small><div className="order-items">{order.items?.map((item, i) => <span key={i}>{item.quantity || 1}× {item.name}</span>)}</div><div className="order-card-bottom"><b>{money(order.total)}</b>{status !== "Completed" && <button onClick={() => onStatus(order, status === "Preparing" ? "Ready" : "Completed")}>{status === "Preparing" ? "Mark ready" : "Complete"} <Check size={14} /></button>}</div></article>)}</div>)}</div></section>;
}

function PlaceholderPage({ title, eyebrow, text, icon: Icon }) {
  return <section className="placeholder-page"><div className="placeholder-card"><div className="placeholder-icon"><Icon size={25} /></div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{text}</p><span className="coming-soon"><Sparkles size={14} /> A little more is brewing here.</span></div></section>;
}

function EmptyState({ title, text }) {
  return <div className="empty-state"><div><Coffee size={22} /></div><h3>{title}</h3><p>{text}</p></div>;
}

function DeleteConfirm({ item, onCancel, onConfirm }) {
  return <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onCancel(); }}><div className="record-modal confirm-modal" role="alertdialog" aria-modal="true" aria-labelledby="delete-title"><div className="placeholder-icon delete-icon"><Trash2 size={22} /></div><div className="eyebrow">JUST MAKING SURE</div><h2 id="delete-title">Remove this from your list?</h2><p><strong>{item.name}</strong> will be permanently deleted.</p><div className="modal-actions"><button className="cancel-button" onClick={onCancel}>Keep it</button><button className="delete-button" onClick={onConfirm}><Trash2 size={15} /> Delete item</button></div></div></div>;
}

function NewOrderModal({ menuItems, onClose, onSave }) {
  const [customer, setCustomer] = useState("");
  const [menuId, setMenuId] = useState(menuItems.find((item) => item.available)?._id || "");
  const [quantity, setQuantity] = useState(1);
  const [orderType, setOrderType] = useState("Dine in");
  const [error, setError] = useState("");
  const selectedItem = menuItems.find((item) => item._id === menuId);
  const total = Number(selectedItem?.price || 0) * Number(quantity || 0);

  function submit(e) {
    e.preventDefault();
    if (!customer.trim()) return setError("Enter a customer name.");
    if (!selectedItem || !selectedItem.available) return setError("Choose an available menu item.");
    if (!Number.isInteger(Number(quantity)) || Number(quantity) < 1) return setError("Quantity must be at least one.");
    onSave({
      orderNumber: `BF-${String(Date.now()).slice(-5)}`,
      customer: customer.trim(),
      items: [{ menuItemId: selectedItem._id, quantity: Number(quantity) }],
      orderType,
    });
  }

  return <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}><form className="record-modal" onSubmit={submit}><div className="modal-heading"><div><div className="eyebrow">SOMETHING GOOD IS BREWING</div><h2>Start a new order</h2></div><button type="button" className="modal-close" onClick={onClose} aria-label="Close"><X size={20} /></button></div>
    <label className="form-field"><span>Customer name *</span><input autoFocus value={customer} onChange={(e) => setCustomer(e.target.value)} placeholder="Who's joining us?" /></label>
    <label className="form-field"><span>Menu item *</span><select value={menuId} onChange={(e) => setMenuId(e.target.value)}><option value="">Choose something lovely</option>{menuItems.filter((item) => item.available).map((item) => <option value={item._id} key={item._id}>{item.name} — {money(item.price)}</option>)}</select></label>
    <div className="form-row"><label className="form-field"><span>Quantity</span><input type="number" min="1" step="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} /></label><label className="form-field"><span>Order type</span><select value={orderType} onChange={(e) => setOrderType(e.target.value)}><option>Dine in</option><option>Takeaway</option></select></label></div>
    <div className="order-total"><span>Order total</span><strong>{money(total)}</strong></div>
    {error && <div className="form-error">{error}</div>}<div className="modal-actions"><button type="button" className="cancel-button" onClick={onClose}>Cancel</button><button type="submit" className="primary-button"><Check size={16} /> Create order</button></div>
  </form></div>;
}

function RecordModal({ modal, onClose, onSave }) {
  const isMenu = modal.kind === "menu";
  const [record, setRecord] = useState(modal.record);
  const [error, setError] = useState("");
  function update(key, value) { setRecord((prev) => ({ ...prev, [key]: value })); }
  function submit(e) {
    e.preventDefault();
    if (!record.name.trim() || !record.category.trim()) return setError("Please complete the required fields.");
    if (isMenu && (record.price === "" || Number(record.price) < 0)) return setError("Enter a valid price.");
    if (!isMenu && (record.quantity === "" || record.reorderAt === "" || Number(record.quantity) < 0)) return setError("Enter a valid stock quantity and reorder level.");
    onSave(modal.kind, { ...record, ...(isMenu ? { price: Number(record.price) } : { quantity: Number(record.quantity), reorderAt: Number(record.reorderAt) }) });
  }
  return <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}><form className="record-modal" onSubmit={submit}><div className="modal-heading"><div><div className="eyebrow">{record._id ? "A LITTLE UPDATE" : "ADD SOMETHING LOVELY"}</div><h2>{record._id ? "Edit" : "Add"} {isMenu ? "menu item" : "stock item"}</h2></div><button type="button" className="modal-close" onClick={onClose} aria-label="Close"><X size={20} /></button></div>
    <label className="form-field"><span>Item name *</span><input autoFocus value={record.name} onChange={(e) => update("name", e.target.value)} placeholder={isMenu ? "e.g. Sunrise Sourdough Toast" : "e.g. House Espresso Blend"} /></label>
    <div className="form-row"><label className="form-field"><span>Category *</span>{isMenu ? <select value={record.category} onChange={(e) => update("category", e.target.value)}><option>Coffee</option><option>Tea & Matcha</option><option>Milk Drinks</option><option>Pastries</option><option>Bread & Savory</option><option>Food</option><option>Other</option></select> : <select value={record.category} onChange={(e) => update("category", e.target.value)}><option>Coffee</option><option>Dairy & milk</option><option>Tea</option><option>Pastries</option><option>Packaging</option><option>Other</option></select>}</label>{isMenu ? <label className="form-field"><span>Price (₱) *</span><input type="number" min="0" step="0.01" value={record.price} onChange={(e) => update("price", e.target.value)} placeholder="0.00" /></label> : <label className="form-field"><span>Unit *</span><input value={record.unit} onChange={(e) => update("unit", e.target.value)} placeholder="kg, liters, pieces..." /></label>}</div>
    {!isMenu && <div className="form-row"><label className="form-field"><span>Quantity on hand *</span><input type="number" min="0" step="0.1" value={record.quantity} onChange={(e) => update("quantity", e.target.value)} /></label><label className="form-field"><span>Reorder at *</span><input type="number" min="0" step="0.1" value={record.reorderAt} onChange={(e) => update("reorderAt", e.target.value)} /></label></div>}
    {isMenu ? <><label className="form-field"><span>Description</span><textarea rows="3" value={record.description} onChange={(e) => update("description", e.target.value)} placeholder="A little something about this favorite..." /></label><label className="form-field"><span>Emoji</span><input value={record.image || ""} onChange={(e) => update("image", e.target.value)} placeholder="☕" /></label><label className="check-field"><input type="checkbox" checked={record.available} onChange={(e) => update("available", e.target.checked)} /> Available to order</label></> : <label className="form-field"><span>Supplier</span><input value={record.supplier || ""} onChange={(e) => update("supplier", e.target.value)} placeholder="Supplier name" /></label>}
    {error && <div className="form-error">{error}</div>}<div className="modal-actions"><button type="button" className="cancel-button" onClick={onClose}>Cancel</button><button type="submit" className="primary-button"><Check size={16} /> Save {isMenu ? "menu item" : "stock item"}</button></div>
  </form></div>;
}

export default App;
