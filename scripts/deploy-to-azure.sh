#!/bin/bash

# Simple Azure Deployment Script for Fullstack Academy
# This script helps deploy the backend to Azure App Service

echo "Fullstack Academy - Azure Deployment Script"
echo "=========================================="

# Check if Azure CLI is installed
if ! command -v az &> /dev/null
then
    echo "Azure CLI is not installed. Please install it from https://docs.microsoft.com/en-us/cli/azure/install-azure-cli"
    exit 1
fi

# Check if user is logged in
echo "Checking Azure authentication..."
if az account show &> /dev/null
then
    echo "You are authenticated with Azure."
else
    echo "You are not authenticated with Azure. Please run 'az login' first."
    exit 1
fi

echo ""
echo "Deployment Instructions:"
echo "======================="
echo "1. Create the following resources in Azure Portal manually:"
echo "   - Resource Group: fullstack-academy-rg (location: Central US)"
echo "   - App Service Plan: fullstack-academy-plan (Free tier F1, Linux)"
echo "   - Web App: fullstack-academy-app (.NET 9 or .NET 8 runtime)"
echo ""
echo "2. After creating the resources, deploy using one of these methods:"
echo ""
echo "   Method A - ZIP Deployment via Portal:"
echo "   - Go to your Web App in Azure Portal"
echo "   - Navigate to Deployment Center > ZIP Deploy"
echo "   - Upload the file: dot-net-quiz/backend/publish.zip"
echo ""
echo "   Method B - Direct ZIP Deployment (if you have the web app URL):"
echo "   - Use the Azure Portal's ZIP deployment feature"
echo ""
echo "Note: For free tier accounts, make sure to:"
echo "- Use Linux App Service (not Windows)"
echo "- Select Free F1 pricing tier"
echo "- Use .NET 8 or .NET 9 runtime (not .NET Framework)"
echo ""

echo "Would you like to try a different deployment approach?"
echo "Consider using Render.com or Railway.app for simpler free-tier deployments."