# Admin Setup Instructions

1.  **Register Admin**: Go to `http://localhost:3000/register-admin` to create your first admin account.
2.  **Login**: Go to `http://localhost:3000/admin/login` to log in.
3.  **Dashboard**: Once logged in, you can manage Team Members and Projects from the dashboard.
4.  **Cleanup**: After creating the admin, delete the `src/app/register-admin` folder for security.

## Features Added
- **MongoDB Integration**: Data is now stored in MongoDB.
- **Authentication**: Secure admin login using NextAuth.js.
- **Team Management**: Add team members with name, role, image, and description.
- **Project Management**: Add projects with title, category, location, image, and description.
- **Dynamic Frontend**: The "About Us" and "Projects" pages now fetch data from the database.
