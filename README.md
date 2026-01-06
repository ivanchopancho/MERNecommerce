# E-commerce Platform (MERN)

A full-stack e-commerce application built with the MERN stack.  
This project focuses on backend architecture, data modeling, and API design, with a simple frontend for interaction.

## Features

- User management (create users)
- Product catalog
- Shopping cart functionality
- Orders and order items
- RESTful API design
- MongoDB data relationships using Mongoose
- Modular backend structure (routes, models, controllers)

> Authentication and authorization can be added or extended in future iterations.

## Tech Stack

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- dotenv
- CORS

### Frontend
- React (basic UI)

## Project Structure

backend/
├─ server.js # Server entry point
├─ app.js # Express app & middleware
├─ models/ # Mongoose schemas
├─ routes/ # API routes
├─ middleware/ # Custom middleware
└─ services/ # Business logic (if applicable)

frontend/
└─ src/



## Getting Started

### Prerequisites
- Node.js
- MongoDB (local or MongoDB Atlas)

### Installation

```bash
git clone https://github.com/your-username/ecommerce.git
cd ecommerce
npm install
