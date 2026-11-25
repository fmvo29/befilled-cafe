import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight, ArrowRight, Bell, Coffee, LayoutDashboard,
  MoreHorizontal, Package, Plus, Search, MapPin, Clock3 as ClockIcon,
  ShoppingBag, Users, X, Leaf, Clock3, CircleDollarSign, SlidersHorizontal,
  Pencil, Trash2, Check, ChevronDown, AlertTriangle, Sparkles, CalendarDays,
  LockKeyhole, Mail, Menu as MenuIcon
} from "lucide-react";

const money = (value) => `₱${Number(value || 0).toLocaleString("en-PH", { minimumFractionDigits: 2 })}`;
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
  { _id: "i5", name: "Brown Butter Cookies", category: "Pastries", quantity: 6, unit: "pieces", reorderAt: 10, supplier: "In-house kitchen" }
];
const demoOrders = [
  { _id: "o1", orderNumber: "BF-1048", customer: "Mia Santos", items: [{ name: "Golden Latte", quantity: 2 }, { name: "Sea Salt Cookie", quantity: 1 }], total: 465, status: "Preparing", orderType: "Dine in", createdAt: new Date().toISOString() },
  { _id: "o2", orderNumber: "BF-1047", customer: "Ethan Cruz", items: [{ name: "Berry Matcha", quantity: 1 }, { name: "Almond Croissant", quantity: 1 }], total: 340, status: "Ready", orderType: "Takeaway", createdAt: new Date(Date.now() - 8 * 60000).toISOString() },
  { _id: "o3", orderNumber: "BF-1046", customer: "Lia Reyes", items: [{ name: "Honey Oat Flat White", quantity: 2 }], total: 350, status: "Completed", orderType: "Dine in", createdAt: new Date(Date.now() - 18 * 60000).toISOString() },
  { _id: "o4", orderNumber: "BF-1045", customer: "Noah Garcia", items: [{ name: "Ube Latte", quantity: 1 }, { name: "Sea Salt Cookie", quantity: 2 }], total: 380, status: "Completed", orderType: "Takeaway", createdAt: new Date(Date.now() - 31 * 60000).toISOString() }
];
const seed = { menu: demoMenu, inventory: demoInventory, orders: demoOrders };

function readLocal(key) {
  try {
    const stored = localStorage.getItem(`befilled-${key}`);
    if (!stored) return seed[key];
    const records = JSON.parse(stored);
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
  const [authError, setAuthError] = useState("");
  const [authBusy, setAuthBusy] = useState(false);
  const [authReady, setAuthReady] = useState(false);
  const [publicMenu, setPublicMenu] = useState(demoMenu);
  const [customerOrders, setCustomerOrders] = useState([]);
  const [customerNotice, setCustomerNotice] = useState("");
  const [cart, setCart] = useState({});
  const [customerBusy, setCustomerBusy] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/auth/me").then(async (res) => res.ok ? (await res.json()).user : null).catch(() => null),
      fetch("/api/menu").then((res) => res.ok ? res.json() : demoMenu).catch(() => demoMenu)
    ]).then(([currentUser, items]) => {
      setUser(currentUser);
      setView(currentUser ? (currentUser.role === "staff" ? "dashboard" : "customer") : "home");
      setPublicMenu(items.length ? items : demoMenu);
    }).finally(() => setAuthReady(true));
  }, []);

  useEffect(() => {
    if (user?.role !== "customer") return;
    fetch("/api/orders").then(async (res) => {
      if (!res.ok) throw new Error("We couldn't load your orders.");
      setCustomerOrders(await res.json());
    }).catch((error) => setCustomerNotice(error.message));
  }, [user]);

  async function submitAuth(event) {
    event.preventDefault();
    setAuthError("");
    setAuthBusy(true);
    const formData = new FormData(event.currentTarget);
    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
      ...(authMode === "register" ? { name: formData.get("name") } : {})
    };
    try {
      const response = await fetch(`/api/auth/${authMode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "We couldn't sign you in.");
      setUser(result.user);
      setView(result.user.role === "staff" ? "dashboard" : "customer");
    } catch (error) {
      setAuthError(error.message === "Failed to fetch"
        ? "The cafe server isn't connected yet. Start MongoDB and the API, then try again."
        : error.message);
    } finally { setAuthBusy(false); }
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
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
  if (user?.role === "staff" && view === "dashboard") return <ManagementApp user={user} onLogout={logout} />;
  if (user?.role === "customer" && view === "customer") {
    return <CustomerHome
      user={user}
      menuItems={publicMenu}
      orders={customerOrders}
      cart={cart}
      setCart={setCart}
      notice={customerNotice}
      busy={customerBusy}
      onOrder={placeCustomerOrder}
      onLogout={logout}
    />;
  }
  if (view === "auth") return <AuthPage
    mode={authMode}
    setMode={(mode) => { setAuthMode(mode); setAuthError(""); }}
    error={authError}
    busy={authBusy}
    onSubmit={submitAuth}
    onHome={() => { setView("home"); setAuthError(""); }}
  />;
  if (view === "menu") return <PublicMenu
    menuItems={publicMenu}
    category={menuCategory}
    setCategory={setMenuCategory}
    onHome={() => { setView("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
    onLogin={() => { setAuthMode("login"); setAuthError(""); setView("auth"); }}
  />;
  return <PublicHome
    menuItems={publicMenu}
    onMenu={() => { setMenuCategory("All"); setView("menu"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
    onLogin={() => { setAuthMode("login"); setAuthError(""); setView("auth"); }}
    onRegister={() => { setAuthMode("register"); setAuthError(""); setView("auth"); }}
  />;
}

function PublicHome({ menuItems, onMenu, onLogin, onRegister }) {
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
        <button className="public-login-link" onClick={onLogin}>Log in</button>
        <button className="public-signup-button" onClick={onRegister}>Create account <ArrowRight size={15} /></button>
      </nav>
    </header>
    <main>
      <section className="landing-hero" id="home">
        <div className="landing-copy"><div className="landing-eyebrow"><span /> YOUR LITTLE CORNER OF CALM</div><h1>A little pause<br />in a <em>full</em> day.</h1><p>Thoughtful coffee, something lovely to eat, and a moment that belongs just to you. There's always room to pause at Befilled.</p><div className="landing-actions"><button className="landing-primary" onClick={onMenu}>Explore the menu <ArrowRight size={16} /></button><button className="landing-secondary" onClick={onLogin}><LockKeyhole size={15} /> Member log in</button></div><div className="landing-social-proof"><div className="proof-avatars"><span>M</span><span>L</span><span>A</span></div><p><strong>A neighborhood favorite</strong><br />Made with much care and much love.</p></div></div>
        <div className="landing-art" aria-label="A warm cup of coffee"><div className="landing-sun" /><div className="landing-orbit orbit-one" /><div className="landing-orbit orbit-two" /><div className="landing-cup">☕</div><div className="landing-art-label"><Sparkles size={14} /> SLOW SIPS, SOFT MOMENTS</div><div className="landing-sticker"><span>TAKE IT</span><em>easy</em><i aria-hidden="true">✦</i></div></div>
        <div className="hero-bottom-line"><span>MANILA, PHILIPPINES</span><span>GOOD COFFEE. GENTLE MOMENTS.</span></div>
      </section>
      <section className="landing-menu-section" id="menu"><div className="landing-section-heading"><div><div className="landing-eyebrow">TODAY'S THREE PICKS</div><h2>Made for your <em>moment.</em></h2></div><button onClick={onMenu}>View the full menu <ArrowRight size={15} /></button></div><div className="landing-menu-grid">{highlights.map((item) => <MenuPreviewCard item={item} onZoom={setZoomItem} key={item._id} />)}</div></section>
      <section className="landing-story" id="story"><div className="story-mark">bf.</div><div><div className="landing-eyebrow">A PLACE TO EXHALE</div><h2>As the world rushes on,<br />take a moment to <em>pause.</em></h2><p>As the world rushes on, it’s easy to forget to pause. The day fills with plans, noise, and the next thing to do. Made with much love, Befilled is a little reminder to slow down — to savor a warm cup, share a good bite, and be present for the small moments that make a day feel full. Remember, it is not a small thing to pause.</p><button onClick={onRegister}>Come be part of it <ArrowRight size={15} /></button></div><div className="story-quote">“A softer pace<br />for a fuller life.”<span>— THE BEFILLED WAY</span></div></section>
      <section className="visit-section" id="visit"><div><div className="landing-eyebrow">COME ON IN</div><h2>Your seat is <em>waiting.</em></h2><p>Find a cozy spot, bring a friend, or enjoy a little time to yourself.</p></div><div className="visit-details"><div><MapPin size={18} /><span><b>Find us</b><small>123 Kapehan Street, Barangay Ligaya, Manila, Philippines</small></span></div><div><ClockIcon size={18} /><span><b>We're open</b><small>Every day · 7:30 AM – 9:00 PM</small></span></div></div><a className="visit-button" href="mailto:hello@befilled.cafe">Say hello <ArrowRight size={15} /></a></section>
    </main>
    <footer className="public-footer"><a className="footer-wordmark" href="#home">befilled</a><p>'Tis not a small thing to pause.</p><span>© 2026 BEFILLED CAFE</span><button onClick={onLogin}>Log in</button></footer>
    {zoomItem && <MenuZoom item={zoomItem} onClose={() => setZoomItem(null)} />}
  </div>;
}

function PublicMenu({ menuItems, category, setCategory, onHome, onLogin }) {
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
        <button onClick={onHome}>Our story</button>
        <button onClick={onHome}>Visit us</button>
        <button className="public-login-link" onClick={onLogin}>Log in</button>
      </nav>
    </header>
    <main className="full-menu-page">
      <div className="menu-page-top"><button className="menu-back" onClick={onHome}>← Back home</button><div className="landing-eyebrow"><span /> MADE FRESH, WITH A LITTLE HEART</div><h1>Something for<br />your <em>moment.</em></h1><p>Well-loved sips and bites, balanced to be just right.</p></div>
      <div className="menu-category-tabs" aria-label="Filter menu by category">{categories.map((itemCategory) => <button key={itemCategory} className={category === itemCategory ? "selected" : ""} onClick={() => setCategory(itemCategory)}>{itemCategory}</button>)}</div>
      <div className="full-menu-grid">{filteredItems.map((item) => <MenuPreviewCard item={item} onZoom={setZoomItem} key={item._id} />)}</div>
      {filteredItems.length === 0 && <div className="menu-empty">Nothing on the menu in this category just yet. Check back soon.</div>}
      <div className="menu-bottom-cta"><span>'Tis not a small thing to pause.</span><button onClick={onLogin}>Log in to place an order <ArrowRight size={15} /></button></div>
    </main>
    <footer className="public-footer"><button className="footer-wordmark footer-home-link" onClick={onHome}>befilled</button><p>'Tis not a small thing to pause.</p><span>© 2026 BEFILLED CAFE</span><button onClick={onLogin}>Log in</button></footer>
    {zoomItem && <MenuZoom item={zoomItem} onClose={() => setZoomItem(null)} />}
  </div>;
}

function MenuPreviewCard({ item, onZoom }) {
  return <article className={`landing-menu-card ${item.available ? "" : "preview-sold-out"}`}>
    <button className="landing-menu-art menu-art-zoom" onClick={() => onZoom(item)} aria-label={`Zoom in on ${item.name}`}>
      <span>{item.image || "☕"}</span><small>{item.category}</small><i>{item.available ? "Click to zoom" : "Sold out · click to view"}</i>
    </button>
    <div className="landing-menu-info"><div><h3>{item.name}</h3><p>{item.description}</p></div><b>{money(item.price)}</b></div>
  </article>;
}

function MenuZoom({ item, onClose }) {
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
      <div className="menu-zoom-art"><span>{item.image || "☕"}</span></div>
      <div className="landing-eyebrow">{item.category}</div><h2>{item.name}</h2><p>{item.description}</p><strong>{money(item.price)}</strong>
    </div>
  </div>;
}

function AuthPage({ mode, setMode, error, busy, onSubmit, onHome }) {
  const registering = mode === "register";
  return <div className="auth-page">
    <button className="auth-back" onClick={onHome}>← Back to Befilled</button>
    <div className="auth-brand"><span>befilled</span><small>'Tis not a small thing to pause.</small></div>
    <div className="auth-layout">
      <div className="auth-card"><div className="auth-eyebrow">{registering ? "A SEAT AT OUR TABLE" : "WELCOME BACK"}</div><h1>{registering ? "Make yourself at home." : "Good to see you."}</h1><p>{registering ? "Create your account to order your favorites and keep your little moments close." : "Sign in to pick up where your little pause left off."}</p>
        <form onSubmit={onSubmit} className="auth-form">
          {registering && <label><span>Your name</span><div className="auth-input"><Users size={17} /><input name="name" autoComplete="name" placeholder="How should we call you?" minLength="2" maxLength="80" required /></div></label>}
          <label><span>Email address</span><div className="auth-input"><Mail size={17} /><input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></div></label>
          <label><span>Password</span><div className="auth-input"><LockKeyhole size={17} /><input name="password" type="password" autoComplete={registering ? "new-password" : "current-password"} placeholder={registering ? "At least 10 characters" : "Enter your password"} minLength={registering ? 10 : undefined} required /></div></label>
          {error && <div className="auth-error" role="alert">{error}</div>}
          <button className="auth-submit" disabled={busy}>{busy ? "One little moment..." : registering ? "Create my account" : "Log in"} <ArrowRight size={16} /></button>
        </form>
        <div className="auth-switch">{registering ? "Already have an account?" : "New to Befilled?"}<button onClick={() => setMode(registering ? "login" : "register")}>{registering ? "Log in" : "Create an account"}</button></div>
      </div>
      <aside className="auth-aside"><div className="auth-aside-art">☕</div><div className="landing-eyebrow">YOUR LITTLE MOMENT, ONLINE TOO</div><h2>Good things take<br /><em>a little time.</em></h2><p>Order a favorite, find your usual, and let us make your day a little warmer.</p><span>BEFILLED CAFE · MANILA, PHILIPPINES</span></aside>
    </div>
  </div>;
}

function CustomerHome({ user, menuItems, orders, cart, setCart, notice, busy, onOrder, onLogout }) {
  const availableItems = menuItems.filter((item) => item.available);
  const cartTotal = availableItems.reduce((sum, item) => sum + Number(item.price) * Number(cart[item._id] || 0), 0);
  return <div className="customer-app">
    <header className="customer-header"><a className="public-logo" href="#customer-home"><span>befilled</span><small>'Tis not a small thing to pause.</small></a><div className="customer-welcome">A little hello, <strong>{user.name.split(" ")[0]}</strong></div><button className="customer-logout" onClick={onLogout}>Log out</button></header>
    <main className="customer-main" id="customer-home"><div className="landing-eyebrow">YOUR LITTLE CORNER OF CALM</div><h1>What sounds <em>lovely?</em></h1><p className="customer-intro">Choose a favorite for takeaway. We'll have it ready for your pause.</p>
      {notice && <div className="customer-notice">{notice}</div>}
      <div className="customer-order-layout"><section className="customer-menu-list"><div className="landing-menu-grid">{availableItems.map((item) => <article className="landing-menu-card" key={item._id}><div className="landing-menu-art"><span>{item.image || "☕"}</span><small>{item.category}</small></div><div className="landing-menu-info"><div><h3>{item.name}</h3><p>{item.description}</p></div><b>{money(item.price)}</b></div><div className="customer-item-add"><span>Quantity</span><div><button onClick={() => setCart((prev) => ({ ...prev, [item._id]: Math.max(0, Number(prev[item._id] || 0) - 1) }))}>−</button><b>{cart[item._id] || 0}</b><button onClick={() => setCart((prev) => ({ ...prev, [item._id]: Math.min(50, Number(prev[item._id] || 0) + 1) }))}>+</button></div></div></article>)}</div></section>
        <aside className="customer-cart"><div className="landing-eyebrow">YOUR LITTLE ORDER</div><h2>Takeaway bag</h2>{availableItems.filter((item) => cart[item._id] > 0).length === 0 ? <p className="cart-empty">A little something could go here.</p> : availableItems.filter((item) => cart[item._id] > 0).map((item) => <div className="cart-line" key={item._id}><span>{cart[item._id]}× {item.name}</span><b>{money(item.price * cart[item._id])}</b></div>)}<div className="cart-total"><span>Total</span><strong>{money(cartTotal)}</strong></div><button className="auth-submit" onClick={onOrder} disabled={busy || cartTotal === 0}>{busy ? "Placing your order..." : "Place takeaway order"} <ArrowRight size={15} /></button><small>We'll prepare it fresh for you at the cafe.</small></aside></div>
      <section className="customer-history"><div className="landing-eyebrow">YOUR PAST PAUSES</div><h2>Order history</h2>{orders.length === 0 ? <p>Your orders will show up here.</p> : orders.map((order) => <article className="customer-order-row" key={order._id}><div><strong>{order.orderNumber}</strong><small>{new Date(order.createdAt).toLocaleString("en-PH", { dateStyle: "medium", timeStyle: "short" })}</small></div><span>{order.items.map((item) => `${item.quantity}× ${item.name}`).join(", ")}</span><b>{money(order.total)}</b><em className={`history-${order.status.toLowerCase()}`}>{order.status}</em></article>)}</section>
    </main><footer className="public-footer"><a className="footer-wordmark" href="#customer-home">befilled</a><p>'Tis not a small thing to pause.</p><span>© 2026 BEFILLED CAFE</span></footer>
  </div>;
}

function ManagementApp({ user, onLogout }) {
  const [page, setPage] = useState("Overview");
  const [menuItems, setMenuItems] = useState(() => readLocal("menu"));
  const [inventory, setInventory] = useState(() => readLocal("inventory"));
  const [orders, setOrders] = useState(() => readLocal("orders"));
  const [demoMode, setDemoMode] = useState(false);
  const [modal, setModal] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All items");
  const [notice, setNotice] = useState("");
  const [dateLabel, setDateLabel] = useState("");

  useEffect(() => {
    setDateLabel(new Date().toLocaleDateString("en-PH", { weekday: "long", month: "long", day: "numeric" }));
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
  }, []);

  useEffect(() => {
    localStorage.setItem("befilled-menu", JSON.stringify(menuItems));
    localStorage.setItem("befilled-inventory", JSON.stringify(inventory));
    localStorage.setItem("befilled-orders", JSON.stringify(orders));
  }, [menuItems, inventory, orders]);

  const todayOrders = orders.filter((order) => new Date(order.createdAt || Date.now()).toDateString() === new Date().toDateString());
  const sales = todayOrders.reduce((total, order) => total + Number(order.total || 0), 0);
  const lowStock = inventory.filter((item) => Number(item.quantity) <= Number(item.reorderAt));
  const filteredMenu = useMemo(() => menuItems.filter((item) =>
    (category === "All items" || item.category === category) &&
    `${item.name} ${item.category}`.toLowerCase().includes(query.toLowerCase())
  ), [menuItems, category, query]);
  const filteredStock = useMemo(() => inventory.filter((item) =>
    `${item.name} ${item.category} ${item.supplier}`.toLowerCase().includes(query.toLowerCase())
  ), [inventory, query]);

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
          <div className="topbar-actions"><div className="today-date"><CalendarDays size={15} />{dateLabel}</div><button className="icon-button notification-button" aria-label="Notifications"><Bell size={18} /><i /></button><div className="top-avatar">{user.name.charAt(0).toUpperCase()}</div><button className="manager-logout" onClick={onLogout}>Log out</button></div>
        </header>
        {demoMode && <div className="demo-banner"><AlertTriangle size={15} /> Demo mode — browser-only data. Connect MongoDB to sync your cafe records.</div>}
        {notice && <div className="notice-banner"><span>{notice}</span><button aria-label="Dismiss notice" onClick={() => setNotice("")}><X size={15} /></button></div>}

        <div className="page-content">
          {page === "Overview" && <Overview sales={sales} todayOrders={todayOrders} menuItems={menuItems} inventory={inventory} lowStock={lowStock} orders={orders} onNavigate={navigate} onStatus={updateOrderStatus} dateLabel={dateLabel} user={user} />}
          {page === "Menu" && <section>
            <div className="page-heading"><div><div className="eyebrow">YOUR LITTLE MENU</div><h1>Menu <span>management</span></h1><p>Good things, made with a little extra love.</p></div><button className="primary-button" onClick={() => setModal({ kind: "menu", record: { name: "", category: "Coffee", price: "", description: "", available: true, image: "☕" } })}><Plus size={17} /> Add menu item</button></div>
            <div className="toolbar"><div className="search-box"><Search size={17} /><input placeholder="Search your menu..." value={query} onChange={(e) => setQuery(e.target.value)} /></div><div className="filter-box"><SlidersHorizontal size={16} /><select value={category} onChange={(e) => setCategory(e.target.value)}><option>All items</option>{[...new Set(menuItems.map((item) => item.category))].map((c) => <option key={c}>{c}</option>)}</select></div><span className="result-count">{filteredMenu.length} items</span></div>
            <div className="menu-grid">{filteredMenu.map((item) => <article className={`menu-card ${!item.available ? "unavailable" : ""}`} key={item._id}><div className="menu-card-art"><span>{item.image || "☕"}</span><button className="dots-button" onClick={() => setModal({ kind: "menu", record: item })} aria-label={`Edit ${item.name}`}><MoreHorizontal size={19} /></button>{!item.available && <span className="unavailable-label">SOLD OUT</span>}</div><div className="menu-card-info"><div className="menu-category">{item.category}</div><div className="menu-title-row"><h3>{item.name}</h3><span>{money(item.price)}</span></div><p>{item.description || "A little something to brighten your day."}</p><div className="menu-card-actions"><span className={`availability ${item.available ? "is-available" : ""}`}><i />{item.available ? "Available" : "Unavailable"}</span><div><button onClick={() => setModal({ kind: "menu", record: item })} aria-label={`Edit ${item.name}`}><Pencil size={15} /></button><button onClick={() => setConfirmDelete({ kind: "menu", item })} aria-label={`Delete ${item.name}`}><Trash2 size={15} /></button></div></div></div></article>)}
              {filteredMenu.length === 0 && <EmptyState title="Nothing on the menu yet" text="Add a menu item to get things brewing." />}</div>
          </section>}
          {page === "Inventory" && <section>
            <div className="page-heading"><div><div className="eyebrow">KEEP THE GOOD THINGS COMING</div><h1>Stock <span>room</span></h1><p>A little check-in on the things that keep us going.</p></div><button className="primary-button" onClick={() => setModal({ kind: "inventory", record: { name: "", category: "Coffee", quantity: "", unit: "kg", reorderAt: "", supplier: "" } })}><Plus size={17} /> Add stock item</button></div>
            {lowStock.length > 0 && <div className="stock-alert"><AlertTriangle size={18} /><div><strong>{lowStock.length} item{lowStock.length > 1 ? "s" : ""} need a little restock</strong><span>{lowStock.map((i) => i.name).join(" · ")}</span></div></div>}
            <div className="toolbar"><div className="search-box"><Search size={17} /><input placeholder="Search inventory..." value={query} onChange={(e) => setQuery(e.target.value)} /></div><span className="result-count">{filteredStock.length} items in stock</span></div>
            <div className="table-card inventory-table"><table><thead><tr><th>ITEM</th><th>CATEGORY</th><th>ON HAND</th><th>REORDER AT</th><th>SUPPLIER</th><th /></tr></thead><tbody>{filteredStock.map((item) => { const low = Number(item.quantity) <= Number(item.reorderAt); return <tr key={item._id}><td><strong>{item.name}</strong></td><td>{item.category}</td><td><span className={`stock-pill ${low ? "stock-low" : ""}`}><i />{item.quantity} {item.unit}</span></td><td>{item.reorderAt} {item.unit}</td><td>{item.supplier || "—"}</td><td><div className="row-actions"><button onClick={() => setModal({ kind: "inventory", record: item })} aria-label={`Edit ${item.name}`}><Pencil size={15} /></button><button onClick={() => setConfirmDelete({ kind: "inventory", item })} aria-label={`Delete ${item.name}`}><Trash2 size={15} /></button></div></td></tr>; })}</tbody></table>{filteredStock.length === 0 && <EmptyState title="Your stock room is waiting" text="Add your ingredients and supplies here." />}</div>
          </section>}
          {page === "Orders" && <OrdersPage orders={orders} onStatus={updateOrderStatus} onNew={() => setModal({ kind: "order" })} />}
          {page === "Customers" && <PlaceholderPage title="Your people" eyebrow="THE HEART OF OUR CAFE" text="Your regulars, their favorite orders, and the little things that make every visit feel personal." icon={Users} />}
          {page === "Reports" && <PlaceholderPage title="The bigger picture" eyebrow="A LITTLE LOOK BACK" text="Your sales and cafe insights will appear here as your days fill up." icon={CircleDollarSign} />}
        </div>
        <footer className="footer-note"><span>Made for little pauses.</span><span>BEFILLED CAFE &nbsp;·&nbsp; MANILA</span></footer>
      </main>
      {modal?.kind === "order" ? <NewOrderModal menuItems={menuItems} onClose={() => setModal(null)} onSave={createOrder} /> : modal && <RecordModal modal={modal} onClose={() => setModal(null)} onSave={saveRecord} />}
      {confirmDelete && <DeleteConfirm item={confirmDelete.item} onCancel={() => setConfirmDelete(null)} onConfirm={async () => { await deleteRecord(confirmDelete.kind, confirmDelete.item); setConfirmDelete(null); }} />}
    </div>
  );
}

function Overview({ sales, todayOrders, menuItems, inventory, lowStock, orders, onNavigate, onStatus, dateLabel, user }) {
  const best = menuItems.slice(0, 3);
  return <section>
    <div className="welcome-row"><div><div className="eyebrow">{dateLabel.toUpperCase()}, AT A GLANCE</div><h1>Good morning, {user.name.split(" ")[0]} <span>☀</span></h1><p>Here's what's brewing at Befilled today.</p></div><div className="open-badge"><span />We're open <b>·</b> until 9:00 PM</div></div>
    <div className="hero-card"><div className="hero-copy"><div className="hero-kicker"><span /> TODAY'S LITTLE REMINDER</div><h2><em>'Tis</em> not a small thing<br />to <em>pause.</em></h2><p>Take a breath, make a coffee, and make<br className="desktop-break" /> someone's day a little warmer.</p><button onClick={() => onNavigate("Menu")}>Explore today's menu <span>↗</span></button></div><div className="hero-image"><div className="hero-circle"><div className="cup">☕</div><span className="steam">〰</span></div><span className="hero-sticker">take it<br /><em>slow</em> today</span></div><div className="hero-caption">A MOMENT, JUST FOR YOU &nbsp; · &nbsp; 01 / 04</div></div>
    <div className="section-title-row"><div><div className="eyebrow">THE DAILY POUR</div><h2>Today's overview</h2></div><span className="muted-today"><Clock3 size={15} /> Updates in real time</span></div>
    <div className="stats-grid">
      <StatCard label="Today's sales" value={money(sales)} change="+12.8%" icon={CircleDollarSign} trend="vs. yesterday" />
      <StatCard label="Orders today" value={todayOrders.length} change="+8.2%" icon={ShoppingBag} trend="vs. yesterday" />
      <StatCard label="Menu favorites" value={menuItems.length} change={`${menuItems.filter((m) => m.available).length} available`} icon={Coffee} trend="little things to love" />
      <StatCard label="Stock to check" value={lowStock.length} change={lowStock.length ? "Needs a top-up" : "All stocked up"} icon={Package} trend={`${inventory.length} items tracked`} warn={lowStock.length > 0} />
    </div>
    <div className="overview-lower">
      <div className="table-card recent-orders"><div className="card-heading"><div><div className="eyebrow">FRESH FROM THE COUNTER</div><h3>Recent orders</h3></div><button className="text-button" onClick={() => onNavigate("Orders")}>View all <span>→</span></button></div><table><thead><tr><th>ORDER</th><th>CUSTOMER</th><th>ITEMS</th><th>TOTAL</th><th>STATUS</th></tr></thead><tbody>{orders.slice(0, 4).map((order) => <tr key={order._id}><td className="order-id">{order.orderNumber}</td><td>{order.customer}</td><td>{order.items?.reduce((sum, item) => sum + Number(item.quantity || 1), 0) || 1} items</td><td><strong>{money(order.total)}</strong></td><td><OrderStatus order={order} onStatus={onStatus} /></td></tr>)}</tbody></table></div>
      <div className="side-stack"><div className="top-picks card-panel"><div className="card-heading"><div><div className="eyebrow">A LITTLE SOMETHING</div><h3>Menu favorites</h3></div><Coffee size={18} /></div>{best.map((item, index) => <div className="pick-row" key={item._id}><span className="pick-emoji">{item.image || "☕"}</span><div><strong>{item.name}</strong><small>{index === 0 ? "A customer favorite" : item.category}</small></div><b>{money(item.price)}</b></div>)}</div><div className={`stock-note card-panel ${lowStock.length ? "needs-restock" : ""}`}><div className="stock-note-icon">{lowStock.length ? <AlertTriangle size={18} /> : <Leaf size={19} />}</div><div><strong>{lowStock.length ? "A little restock needed" : "Your stock is looking good"}</strong><p>{lowStock.length ? `${lowStock[0].name} is running low.` : "All the essentials are ready to go."}</p></div><button onClick={() => onNavigate("Inventory")} aria-label="View inventory">→</button></div></div>
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
