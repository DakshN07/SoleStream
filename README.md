<div align="center">

# 👟 SoleStream
**AI-Enhanced Interactive Footwear Marketplace**

[![React](https://img.shields.io/badge/React-18-blue.svg?style=flat&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg?style=flat&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-47A248.svg?style=flat&logo=mongodb)](https://www.mongodb.com/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black.svg?style=flat&logo=three.js)](https://threejs.org/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-Real%20Time-black.svg?style=flat&logo=socket.io)](https://socket.io/)

A modern, immersive MERN-stack e-commerce project leveraging real-time WebSockets, Artificial Intelligence, and spatial 3D WebGL rendering to redefine the digital sneaker marketplace.

</div>

---

## ✨ Features

- **Immersive 3D Showroom:** Ditch flat images. Users can orbit, scale, and inspect physical HD sneaker meshes embedded directly onto the browser canvas via `@react-three/fiber`.
- **SoleStudio AI Gen:** An integrated Generative AI text-to-image concept studio. Type an impossible sneaker idea, and the neural engine flawlessly hallucinates a photorealistic design directly into the DOM natively.
- **AI Size Recommendations:** Backend algorithmic heuristics matching brand manufacturing standards against user metrics to calculate optimal fit approximations, reducing cart abandonment and return logistics.
- **Real-Time Stock Depletion:** Powered by `Socket.IO`, stock levels are broadcast globally across all active browser windows. If a sneaker drops below 5 units, all viewers instantly receive a pulsating UI stock alert to drive urgency and prevent double-spending.
- **Flawless E-Commerce Loop:** Secure multi-step Zod-validated checkouts, persistent shopping carts (via `Zustand`), and fully algorithmic Product Reviews that securely recalculate average rating metrics dynamically.
- **Admin Analytical Dashboard:** Restricted gateway utilizing native MongoDB aggregations to grant authorized super-users full CRUD capabilities and financial metric tracking.

<br>

## ⚙️ Tech Stack

**Frontend Framework:** React.js (Vite), Tailwind CSS v4, Framer Motion  
**3D Engine Space:** Three.js, React-Three-Fiber, Drei  
**Backend Infrastructure:** Node.js, Express.js  
**Database Architecture:** MongoDB Atlas & Mongoose NoSQL Schemas  
**State Management:** Zustand, Socket.IO Client  

<br>

## 🚀 Getting Started

Follow these instructions to spin up the entire application stack locally on your machine.

### 1. Prerequisites
Ensure you have the following installed globally:
- Node.js (v18+)
- MongoDB Community Server (running locally on port `27017`) or a free Atlas URI.

### 2. Environment Variables
Create a root `.env` file inside the `backend/` directory referencing the following exact keys to bridge the encrypted paths:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/solestream
JWT_SECRET=your_super_secure_cryptographic_secret
FRONTEND_URL=http://localhost:5173
```

### 3. Backend Boot Sequence
Populate the database with the core official footwear models, then spin up the Express router:
```bash
cd backend
npm install
node seed.js    # Reseeds fresh Mongoose schemas
npm run dev
```

### 4. Frontend Compilation
Execute the Vite deployment engine:
```bash
cd frontend
npm install
npm run dev
```

Navigate your browser space to `http://localhost:5173` to enter SoleStream.

<br>

## 📖 Complete Documentation
This platform comes bundled heavily with an extremely technical **40-Page B.Com CA Project Thesis Documentation**. You can view the raw text file directly in the repository root at `Project_Report_SoleStream.md`. 

<br>

---
<div align="center">
<i>Formulated and Developed by <b>Daksh</b>.</i>
</div>
