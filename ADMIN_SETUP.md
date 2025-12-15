# Admin Setup & Database Instructions

## 1. Configure MongoDB Atlas
I have updated your configuration to use the MongoDB Atlas connection string you provided.

**IMPORTANT:** You must now open the `.env.local` file and replace `<db_password>` with your actual MongoDB password.

The file currently looks like this:
```
MONGODB_URI=mongodb+srv://suriya003:<db_password>@cluster0.r6bfjux.mongodb.net/arch-website?appName=Cluster0
...
```

## 2. Seed the Database (Create Admin & Team)
Once you have updated the password in `.env.local`, you can populate the database with the initial admin user and team members by running:
```bash
node seed.mjs
```
This will create:
- Admin User: `admin@gmail.com` / `123123`
- Default Team Members

## 3. Login
Go to `http://localhost:3000/admin/login` and log in.

## Troubleshooting
- If the app crashes or shows connection errors, double-check that your password in `.env.local` is correct and that your IP address is whitelisted in MongoDB Atlas.
