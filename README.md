# Befilled Cafe

A cafe website and management system built with React, Express, and MongoDB. Visitors can explore the cafe, customers can create accounts and place takeaway orders, and staff can manage the menu, orders, and inventory.

The public homepage uses the fictional sample address 123 Kapehan Street, Barangay Ligaya, Manila, Philippines, along with sample cafe copy, contact details, and daily hours of 7:30 AM–9:00 PM. Replace these with your cafe's verified details in `client/src/App.jsx` before presenting or publishing.

## Requirements

- Node.js 18 or newer
- MongoDB Community Server running locally, or a MongoDB Atlas connection string

## Run a browser-only demo

1. Install dependencies from the project root:

   ```sh
   npm install
   ```

2. Start the frontend:

   ```sh
   npm run dev
   ```

3. Open the Vite URL shown in the terminal (usually `http://localhost:5173`). Create an account and try the customer ordering flow.

During development, the site uses browser-only demo mode automatically. Customer demo accounts and orders stay in that browser's local storage; passwords are stored as salted PBKDF2 hashes. Customers can open their profile to update their name, email, or password, or delete their account and its local order history. Nothing is sent to MongoDB.

To try the staff dashboard, choose **Staff / Admin** on the login page and use `admin@befilled.cafe` with password `PauseWithCare2026!`. This is a public demo login, not a secure real admin account. Dashboard menu, inventory, and order changes are saved only in the current browser.

Admins cannot edit customer profiles. Admin profile changes and deletion are owner-only operations and stay disabled until secure server-side owner-key verification is configured; a key checked only in browser code would not provide real protection.

## Connect MongoDB later

1. Copy `.env.example` to `.env` and configure `MONGODB_URI`, `JWT_SECRET` (at least 32 random characters), and the initial staff account credentials. Staff accounts are provisioned by the cafe administrator and cannot be publicly registered.
2. Create `client/.env.local` with `VITE_USE_DATABASE=true`.
3. Populate the MongoDB menu:

   ```sh
   npm run seed:menu --workspace server
   ```

4. Start both the API and frontend:

   ```sh
   npm run dev:full
   ```

The API starts on port `5000`; Vite forwards `/api` requests to it. Local per-browser demo accounts and orders are separate from MongoDB. To start fresh in demo mode, clear the `befilled-demo-users`, `befilled-demo-session`, and `befilled-demo-orders` entries in browser local storage.

## Features

- Public cafe home page with cafe story, opening hours, location, and menu highlights
- A dedicated, category-filterable full menu; the homepage shows three picks and one full-menu link, and clicking an item opens a zoomed preview
- Cafe starter menu featuring balanced coffee and matcha, fresh and lightly flavored milk drinks, lightly sweet pastries, toasted sourdough, savory croissants, focaccia, and toasties
- Customer registration and login; customers can place takeaway orders and view their own order history
- Staff login provisions the management dashboard; staff accounts are not publicly registerable
- HttpOnly, SameSite session cookies, password hashing with bcrypt, signed sessions, and login rate limits
- Cafe dashboard with today's sales, order count, menu availability, and low-stock summary
- Order board with Preparing, Ready, and Completed columns; update an order's status from the board or overview
- Menu CRUD: add, search, filter, edit, and remove items
- Inventory CRUD: add, search, edit, and remove stock; items at or below their reorder quantity are flagged
- Responsive layout for desktop and mobile
- Browser-only demo authentication and ordering for development without MongoDB; database-backed accounts, orders, and management require the API and MongoDB to be configured

## API

- `POST /api/auth/register` (customer only), `POST /api/auth/login`, `GET /api/auth/me`, `POST /api/auth/logout`
- `GET /api/menu` (public); menu writes require staff
- Inventory CRUD requires staff
- `GET /api/orders` (staff see all; customers see only their own), `POST /api/orders` (customer or staff), order status changes require staff
- `GET /api/dashboard` (staff only)
- `GET /api/health`
