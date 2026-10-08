# Simple Shopping Microservices

A small shopping website for learning application architecture.

## Services
- frontend: Shopping UI
- product-service: Products/catalog
- user-service: Users
- cart-service: Shopping cart
- order-service: Orders
- payment-service: Payments
- database: SQLite database setup and shared database access

## Run

Install dependencies in each backend service:

```bash
cd backend/product-service && npm install && npm start
cd backend/user-service && npm install && npm start
cd backend/cart-service && npm install && npm start
cd backend/order-service && npm install && npm start
cd backend/payment-service && npm install && npm start
```

Open `frontend/index.html` in a browser.

For a simple demo, services use localhost ports 4001-4005 and the SQLite DB is shared locally.
