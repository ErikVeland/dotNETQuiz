#!/bin/bash

# Startup script for Fullstack Academy application

# Start the .NET backend
cd backend
dotnet backend.dll &

# Start the Next.js frontend
cd ../frontend
npm start &

# Wait for all background processes
wait