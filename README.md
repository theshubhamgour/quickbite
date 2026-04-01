# 🍔 QuickBite (FoodieHub) - Food Delivery App

A complete, beginner-friendly food ordering web application inspired by Zomato. Built with a clean, modern UI and a simple Express & MongoDB backend.

---

## 📊 Architecture Diagram & Application Flow

This visual diagram explains the flow of the application. It maps out how the user interacts with the Frontend, which communicates with the Node.js API to perform actions against the MongoDB database.

---

## 🛠 Prerequisites

Before running the application, ensure you have the following installed on your machine depending on your preferred execution method:
- **Node.js** (Version 16.x or higher) for running the local backend instance.
- **MongoDB** Local installation or a remote Cloud URI (if not using Docker).
- **Docker & Docker Compose** for containerized execution.

## 🔐 Environment Variables

The backend relies on the following environment variables. If running locally, you can create a `.env` file in the `backend/` directory or export them in your terminal. Docker Compose handles these automatically based on the `docker-compose.yml` config.

| Variable Name   | Default Value                           | Description                                     |
|-----------------|-----------------------------------------|-------------------------------------------------|
| `PORT`          | `5001`                                  | The port on which the Node.js API will run.     |
| `MONGO_URI`     | `mongodb://localhost:27017/foodiehub`   | Connection string path to MongoDB database.     |

---

## 🏃‍♂️ How to Run on a Local Machine (Without Docker)

You can run the Frontend and Backend separately directly on your machine.

### 1. Running the Backend Setup
The Backend is an Express server running on Node.js.
1. Open your terminal and navigate to the backend directory:
   ```bash
   cd food-app/backend
   ```
2. Install the necessary NPM dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
   > **Note:** The server will start on `http://localhost:5001`. By default, it will attempt to connect to your local MongoDB instance (`mongodb://localhost:27017`) and automatically seed dummy users for your testing.

### 2. Running the Frontend Setup
The Frontend is pure HTML, CSS, and Vanilla JavaScript.
1. Navigate directly to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. **Execute:** Since there is no heavy framework like React/Angular, you can simply double-click and open the `index.html` file directly in your browser. 
   Alternatively, for standard environment simulation, serve it using a lightweight local development server. For instance, using Python:
   ```bash
   python3 -m http.server 8000
   ```
3. Open `http://localhost:8000/index.html` in your browser. The frontend logic (`script.js`) is configured to auto-detect a local environment and seamlessly send API traffic to your `http://localhost:5001/api` Node.js server loop.

---

## 🐳 How to Run via Docker Compose (Recommended)

Docker automates the unified configuration and boot up of the Frontend, Backend, and MongoDB Database in isolated containers.

1. Ensure the Docker daemon is fully loaded and running on your machine.
2. From the root of the project (where your `docker-compose.yml` is located), execute:
   ```bash
   docker-compose up --build -d
   ```
3. **Access the Application Stack:**
   - **Frontend UI:** Open your browser to `http://localhost:80` (or just `http://localhost`) to interact with the Zomato UI.
   - **Backend API:** Available at `http://localhost:5001`.
   - **MongoDB Database:** Securely exposed to port `27017` on your host.
4. **Teardown gracefully:** Whenever you want to stop the containers, run:
   ```bash
   docker-compose down
   ```

---

## 🛠️ How to Run via Docker (Standalone Commands)

If you prefer **not** to use `docker-compose` and want to build/run the individual images manually from their respective Dockerfiles, use these commands:

### Building the Images
Run these from the root directory containing the Dockerfiles:
```bash
# Build the Frontend Image
docker build -t quickbite-frontend -f Dockerfile.frontend .

# Build the Backend Image
docker build -t quickbite-backend -f Dockerfile.backend .
```

### Running the Containers
Once the images are built successfully, you need to spin them up. To allow the Backend to smoothly talk to MongoDB outside of compose, we use a quick Docker Network:

```bash
# 1. Create a shared Local Network
docker network create quickbite-network

# 2. Run the MongoDB Database (Exposed on Port 27017)
docker run -d --name mongodb --network quickbite-network -p 27017:27017 mongo:latest

# 3. Run the Backend API (Exposed on Port 5001)
# Note: We pass the MONGO_URI explicitly so it routes to the Mongo container we just created!
docker run -d --name quickbite_backend --network quickbite-network -e MONGO_URI=mongodb://mongodb:27017/foodiehub -p 5001:5001 quickbite-backend

# 4. Run the Nginx Frontend (Exposed on Port 80)
docker run -d -p 80:80 --name quickbite_frontend quickbite-frontend
```

---

## 📸 Demo Screenshots Reference

<!-- Replace these placeholders with actual screenshots when finalizing your documentation/video -->
- **Landing / Home Page** - Split-Screen Device Mockup and Menu UI.
- **Shopping Cart Modal** - Dynamic overlay listing active cart states.
- **Orders Page** - Users fetching historical records saved from their backend.
