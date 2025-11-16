# PowerShell script to setup admin user on Render database
# This script will help you create the .env file and run the fix script

Write-Host "🚀 Setting up Admin User on Render Database" -ForegroundColor Cyan
Write-Host ""

# Check if .env file exists
$envPath = Join-Path $PSScriptRoot "..\.env"
$envPath = Resolve-Path $envPath -ErrorAction SilentlyContinue

if (-not $envPath) {
    Write-Host "📝 Creating .env file..." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Please provide your Render DATABASE_URL:" -ForegroundColor Yellow
    Write-Host "  1. Go to Render Dashboard → Your PostgreSQL Database" -ForegroundColor Gray
    Write-Host "  2. Go to 'Connections' tab" -ForegroundColor Gray
    Write-Host "  3. Copy the 'Internal Database URL'" -ForegroundColor Gray
    Write-Host ""
    
    $databaseUrl = Read-Host "Enter DATABASE_URL (or press Enter to skip and create .env manually)"
    
    if ($databaseUrl) {
        $envContent = @"
DATABASE_URL=$databaseUrl
JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
"@
        
        $envFile = Join-Path $PSScriptRoot "..\.env"
        $envContent | Out-File -FilePath $envFile -Encoding utf8
        Write-Host "✅ .env file created!" -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host "⚠️  Please create .env file manually in backend/newbackend/ directory:" -ForegroundColor Yellow
        Write-Host "   DATABASE_URL=postgresql://user:password@host:5432/database" -ForegroundColor Gray
        Write-Host "   JWT_SECRET=your-secret-key" -ForegroundColor Gray
        Write-Host ""
        Write-Host "Press any key to continue after creating .env file..."
        $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    }
}

Write-Host ""
Write-Host "🔧 Running fixAdmin.js script..." -ForegroundColor Cyan
Write-Host ""

# Change to the backend/newbackend directory
Set-Location (Join-Path $PSScriptRoot "..")

# Run the fix script
node scripts/fixAdmin.js

Write-Host ""
Write-Host "✅ Done! You can now login with:" -ForegroundColor Green
Write-Host "   Email: admin@gmail.com" -ForegroundColor White
Write-Host "   Password: 1234admin" -ForegroundColor White

