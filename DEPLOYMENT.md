# 🚀 Deployment Guide

This guide will help you deploy your Next.js application to **Vercel**, the creators of Next.js and the easiest platform for deployment.

## Prerequisites

1.  **GitHub Account**: You need a GitHub account to host your code.
2.  **Vercel Account**: Sign up at [vercel.com](https://vercel.com) using your GitHub account.

## Step 1: Push Code to GitHub

If you haven't already pushed your code to GitHub, follow these steps in your terminal:

1.  **Initialize Git** (if not done):
    ```bash
    git init
    ```

2.  **Add Files**:
    ```bash
    git add .
    ```

3.  **Commit Changes**:
    ```bash
    git commit -m "Ready for deployment"
    ```

4.  **Create a Repository on GitHub**:
    - Go to [github.com/new](https://github.com/new).
    - Name your repository (e.g., `arch-website`).
    - Click **Create repository**.

5.  **Link and Push**:
    - Copy the commands under "...or push an existing repository from the command line".
    - It will look something like this:
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/arch-website.git
    git branch -M main
    git push -u origin main
    ```

## Step 2: Deploy to Vercel

1.  **Go to Vercel Dashboard**: Log in to [vercel.com](https://vercel.com).
2.  **Add New Project**: Click **"Add New..."** -> **"Project"**.
3.  **Import Git Repository**:
    - You should see your `arch-website` repository in the list.
    - Click **Import**.
4.  **Configure Project**:
    - **Framework Preset**: It should auto-detect **Next.js**.
    - **Environment Variables**: You MUST add your environment variables here.
        - Click **Environment Variables**.
        - Add `MONGODB_URI`: Copy the value from your local `.env.local` file.
        - Add `NEXTAUTH_SECRET`: Copy the value from your local `.env.local` file.
        - Add `NEXTAUTH_URL`: Set this to your Vercel URL (e.g., `https://your-project.vercel.app`) once deployed, or just leave it as `http://localhost:3000` for the initial build (NextAuth might warn you, but it often works). *Better yet, generate a random string for `NEXTAUTH_SECRET`.*
5.  **Deploy**: Click **Deploy**.

## Step 3: Finalize

- Vercel will build your project.
- Once finished, you will get a live URL (e.g., `https://arch-website-tau.vercel.app`).
- **Update Google Auth (if used)**: If you use Google Login, add this new Vercel URL to your Google Cloud Console "Authorized redirect URIs".

## Troubleshooting

- **MongoDB Connection**: Ensure your MongoDB Atlas cluster allows connections from anywhere (0.0.0.0/0) or whitelist Vercel's IP addresses (allowing anywhere is easier).
- **Build Errors**: If the build fails, check the logs in Vercel. It usually points to a specific error in your code.
