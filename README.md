# CoffeeVerse — Full Stack 3D Coffee E-commerce

A premium coffee ecommerce project built with separate frontend and backend folders.

## What is included

- Next.js 14 App Router frontend
- Tailwind CSS dark luxury coffee UI
- ReactBits-inspired 3D/animated landing page components
- Real local image assets extracted from the uploaded Stitch reference ZIP
- Product listing and product detail pages
- Shopping cart with Zustand/localStorage
- Checkout flow with Cash on Delivery for local testing
- Login/signup with JWT backend auth
- User profile and order history
- Separate admin panel
- Admin product add/edit/delete
- Admin local image upload through Express/Multer
- Admin order status management
- MongoDB + Mongoose backend
- Seed data with CoffeeVerse products



## Folder structure

```txt
coffee-ecommerce-next-express/
├── backend/
│   ├── server.js
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── data/
│   │   ├── middleware/
│   │   ├── models/
│   │   └── routes/
│   └── uploads/
└── frontend/
    ├── app/
    ├── components/
    ├── lib/
    ├── public/coffee/
    └── store/
```

## Setup steps

### 1. Extract ZIP and open in VS Code

Right click the ZIP, extract it, then open the extracted folder in VS Code.

### 2. Backend setup

Open VS Code terminal:

```bash
cd backend
npm install
cp .env.example .env
```

Open `backend/.env` and add your MongoDB connection string:

```env
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/coffeeverse
JWT_SECRET=super_secret_change_this
CLIENT_URL=
PORT=
```

Then seed demo data:

```bash
npm run seed
```

Start backend:

```bash
npm run dev
```

Backend runs on:

```txt
http://localhost:5000
```

### 3. Frontend setup

Open another VS Code terminal:

```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

Frontend runs on:

```txt
http://localhost:3000
```



Admin panel:

```txt
http://localhost:3000/admin
```

## Main routes

```txt
/              Landing page
/products      Shop page
/products/:id  Product detail page
/cart          Cart page
/checkout      Checkout page
/login         Login page
/signup        Signup page
/profile       User profile/orders
/admin         Admin dashboard
/admin/products Product CRUD
/admin/orders   Order management
/roastery      Extra brand page
/brew-guides   Extra content page
/story         Extra brand/story page
```

## Notes

- Stripe is not wired because real Stripe keys are required. This project uses Cash on Delivery so it can run immediately.
- Cloudinary is not wired because real Cloudinary keys are required. This project uses local Multer uploads for admin product images.
- The landing page includes ReactBits-inspired local components instead of copied external code, so it runs without extra component CLI setup.
