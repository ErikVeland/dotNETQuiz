#!/bin/bash

# Startup script for Fullstack Academy application

# Set the port from environment variable or default to 8080
PORT=${PORT:-8080}

# Start the .NET backend on the specified port
export ASPNETCORE_URLS=http://*:5022
cd backend
dotnet backend.dll &
BACKEND_PID=$!

# Start the Next.js frontend
export PORT=3000
cd ../frontend
npm start &
FRONTEND_PID=$!

echo "Backend running on port 5022 with PID $BACKEND_PID"
echo "Frontend running on port 3000 with PID $FRONTEND_PID"

# Wait for all background processes
wait $BACKEND_PID $FRONTEND_PID