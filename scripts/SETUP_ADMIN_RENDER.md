# 🚀 Setup Admin User on Render Database

## Option 1: Run Script Locally with Render Database (Recommended)

### Step 1: Get Your Render Database URL

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click on your **PostgreSQL database** service
3. Go to the **"Connections"** tab
4. Copy the **Internal Database URL** (looks like: `postgresql://user:password@dpg-xxxxx-a/database`)

### Step 2: Create Local .env File

1. In `backend/newbackend/` directory, create a `.env` file
2. Add your Render DATABASE_URL:
   ```
   DATABASE_URL=postgresql://user:password@dpg-xxxxx-a/database
   JWT_SECRET=your-jwt-secret-here
   ```

### Step 3: Run the Fix Script

```powershell
cd backend/newbackend
node scripts/fixAdmin.js
```

---

## Option 2: Run Script on Render (One-off Command)

### Step 1: Get Your Render Database URL

Same as Option 1, Step 1

### Step 2: Run One-off Command on Render

1. Go to your **Web Service** on Render
2. Go to **"Shell"** tab (or use **"One-off Commands"**)
3. Run:
   ```bash
   cd /opt/render/project/src
   node scripts/fixAdmin.js
   ```

**Note:** Make sure `DATABASE_URL` is already set in your Render service's environment variables.

---

## Option 3: Manual SQL (If you have database access)

If you have direct database access (via Render Shell or external tool):

```sql
-- Check if admin exists
SELECT id, email, role FROM users WHERE email = 'admin@gmail.com';

-- If exists, you can update password hash manually
-- But it's easier to use the script which generates the bcrypt hash correctly
```

---

## After Running the Script

✅ **Admin Credentials:**
- **Email:** `admin@gmail.com`
- **Password:** `1234admin`

1. **Logout** from your application (if logged in)
2. **Login** with the admin credentials
3. You should be redirected to `/admin/dashboard`

---

## Troubleshooting

### Error: "password must be a string"
- Make sure your `.env` file has `DATABASE_URL` set correctly
- No quotes around the DATABASE_URL value
- No extra spaces

### Error: "Table does not exist"
- You need to run the database schema first
- Check `backend/db_script/hotelease_database.sql`

### Error: "Connection refused"
- Make sure the database is running on Render
- Free tier databases may take 30-60 seconds to wake up
- Verify DATABASE_URL is correct

