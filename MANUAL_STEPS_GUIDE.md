# Instant Mechanic - Live Dashboard: Manual Steps Guide

This guide contains the step-by-step instructions for manual tasks you need to perform for each stage of the project.

---

## 🚀 STAGE 1 MANUAL STEPS (Current Stage)

### Step 1.1: Create GitHub Repository on GitHub
1. Open your web browser and go to [https://github.com/new](https://github.com/new).
2. Set **Repository Name**: `instant-mechanic-live-dashboard` (or any preferred name).
3. Select **Public**.
4. Leave "Add a README file", "Add .gitignore", and "Choose a license" UNCHECKED (we have created custom project files).
5. Click **Create repository**.
6. Copy your repository's HTTPS or SSH URL (e.g., `https://github.com/YOUR_USERNAME/instant-mechanic-live-dashboard.git`).

### Step 1.2: Useful Terminal Commands to Generate Security Keys (Optional / Reference)
If you ever need to generate a random 32-byte JWT secret or session key manually in your terminal, you can run any of the following commands in PowerShell or Command Prompt:

- **PowerShell command to generate a random 64-character hex secret:**
  ```powershell
  [node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"]
  ```
  *(Or execute via node command directly):*
  ```powershell
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```

---

## 🗄️ STAGE 2 MANUAL STEPS (Coming Up in Stage 2)

### Step 2.1: Set Up Free MongoDB Atlas Online Database
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign in or create a free account.
2. Create a new Cluster (select **M0 Free Tier**).
3. Under **Database Access**, create a database user (e.g., username `mechanic_admin` and set a password).
4. Under **Network Access**, click **Add IP Address** and select **Allow Access from Anywhere (`0.0.0.0/0`)** so your local backend and cloud host can connect.
5. Click **Connect** → **Drivers** → Copy the Connection String URI (e.g., `mongodb+srv://mechanic_admin:<password>@cluster0.xxx.mongodb.net/instant_mechanic?retryWrites=true&w=majority`).
6. You will paste this connection URI into your backend `.env` file when we begin Stage 2.

---

## ⚡ STAGE 3 MANUAL STEPS (Coming Up in Stage 3)
- Verify local API response endpoints using Postman or browser (`http://localhost:5000/api/dashboard`).

---

## 🖥️ STAGE 4 - 7 MANUAL STEPS (Coming Up in Stages 4-7)
- Test UI components locally at `http://localhost:3000`.

---

## ☁️ STAGE 8 MANUAL STEPS (Coming Up in Stage 8)
- Deploy frontend to Vercel.
- Deploy backend to Cloud / AWS / Render / Railway.
- Submit public URLs.
