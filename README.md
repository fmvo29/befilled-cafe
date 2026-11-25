# Befilled Cafe

A cafe website and management system built with React, Express, and MongoDB. Visitors can explore the cafe, customers can create accounts and place takeaway orders, and staff can manage the menu, orders, and inventory.

The public homepage uses the fictional sample address 123 Kapehan Street, Barangay Ligaya, Manila, Philippines, along with sample cafe copy, contact details, and daily hours of 7:30 AM–9:00 PM. Replace these with your cafe's verified details in `client/src/App.jsx` before presenting or publishing.

## Requirements

- Node.js 18 or newer
- MongoDB Community Server running locally, or a MongoDB Atlas connection string

## Run locally

1. Install dependencies from the project root:

   ```sh
   npm install
   ```

2. Copy `.env.example` to `.env`. Configure `MONGODB_URI`, then set a random `JWT_SECRET` of at least 32 characters. For example, generate one with:

   ```sh
   node -e "console.log(require('node:crypto').randomBytes(48).toString('hex'))"
   ```

3. Set `STAFF_ADMIN_EMAIL` and `STAFF_ADMIN_PASSWORD` in `.env` to provision the initial staff login. Use a unique email and a password of at least 10 characters. The password is stored as a bcrypt hash. Staff accounts cannot be created through public registration.

4. Populate the MongoDB menu with the cafe starter items and rename the original sample drinks/pastries to their new menu names:

   ```sh
   npm run seed:menu --workspace server
   ```

   This is safe to rerun: matching starter items are refreshed and missing items are added without deleting other menu entries.

5. Start the API and frontend:

   ```sh
   npm run dev
   ```

6. Open the Vite URL shown in the terminal (usually `http://localhost:5173`). Visitors start on the public cafe home page. Customers can register; staff sign in using the configured staff account.

The API starts on port `5000`. Vite forwards `/api` requests to it. MongoDB must be running before the API can start.

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
- Public menu highlights use sample content if the API is unavailable. Account creation, login, and order placement require MongoDB and the API to be running.

## API

- `POST /api/auth/register` (customer only), `POST /api/auth/login`, `GET /api/auth/me`, `POST /api/auth/logout`
- `GET /api/menu` (public); menu writes require staff
- Inventory CRUD requires staff
- `GET /api/orders` (staff see all; customers see only their own), `POST /api/orders` (customer or staff), order status changes require staff
- `GET /api/dashboard` (staff only)
- `GET /api/health`
