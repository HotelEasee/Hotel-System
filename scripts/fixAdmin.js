/**
 * Script to verify and fix admin user credentials
 * This script will check if admin exists and create/update it with correct password
 * Run with: node scripts/fixAdmin.js
 */

const bcrypt = require('bcryptjs');
const { query } = require('../src/config/database');
require('dotenv').config();

const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_PASSWORD = '1234admin';
const ADMIN_FIRST_NAME = 'Admin';
const ADMIN_LAST_NAME = 'User';

async function fixAdmin() {
  try {
    console.log('🔍 Checking admin user...');
    console.log(`   Email: ${ADMIN_EMAIL}`);
    
    // Check if admin user exists
    const existingUser = await query(
      'SELECT id, email, role, password_hash FROM users WHERE email = $1', 
      [ADMIN_EMAIL]
    );

    if (existingUser.rowCount > 0) {
      const user = existingUser.rows[0];
      console.log(`\n✅ Admin user found with ID: ${user.id}`);
      console.log(`   Current role: ${user.role || 'not set'}`);
      
      // Verify password hash
      const testPassword = await bcrypt.compare(ADMIN_PASSWORD, user.password_hash || '');
      
      if (!testPassword || user.role !== 'admin') {
        console.log('\n🔧 Updating admin user...');
        
        // Generate new password hash
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, salt);

        await query(
          `UPDATE users 
           SET password_hash = $1, 
               role = 'admin',
               first_name = $2,
               last_name = $3,
               updated_at = NOW()
           WHERE id = $4`,
          [hashedPassword, ADMIN_FIRST_NAME, ADMIN_LAST_NAME, user.id]
        );

        console.log('✅ Admin user updated successfully!');
        console.log('   - Password has been reset to: 1234admin');
        console.log('   - Role set to: admin');
      } else {
        console.log('\n✅ Admin user is already correctly configured!');
      }
    } else {
      console.log('\n🔧 Admin user not found. Creating new admin user...');
      
      // Create new admin user
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, salt);

      const result = await query(
        `INSERT INTO users (email, password_hash, first_name, last_name, role, created_at, updated_at)
         VALUES ($1, $2, $3, $4, 'admin', NOW(), NOW())
         RETURNING id, email, role`,
        [ADMIN_EMAIL, hashedPassword, ADMIN_FIRST_NAME, ADMIN_LAST_NAME]
      );

      console.log('\n✅ Admin user created successfully!');
      console.log(`   User ID: ${result.rows[0].id}`);
      console.log(`   Email: ${result.rows[0].email}`);
      console.log(`   Role: ${result.rows[0].role}`);
    }

    console.log('\n📝 Login Credentials:');
    console.log(`   Email: ${ADMIN_EMAIL}`);
    console.log(`   Password: ${ADMIN_PASSWORD}`);
    console.log('\n✅ You can now login with these credentials!');
    console.log('   Make sure to logout and login again if you were already logged in.');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error fixing admin user:', error.message);
    console.error('\nError details:', {
      message: error.message,
      code: error.code,
      detail: error.detail
    });
    
    if (error.message.includes('password must be a string')) {
      console.error('\n💡 Tip: Make sure your database password is set in .env file:');
      console.error('   DB_PASSWORD=your-password');
      console.error('   Or use DATABASE_URL=postgresql://user:password@host:5432/database');
    }
    
    if (error.code === '42P01') {
      console.error('\n💡 Tip: The users table does not exist. Please run the database schema first.');
    }
    
    process.exit(1);
  }
}

// Run the script
fixAdmin();

