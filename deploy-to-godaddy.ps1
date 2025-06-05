# PowerShell script for manual deployment to GoDaddy
# Usage: .\deploy-to-godaddy.ps1

param(
    [string]$FtpServer = $env:GODADDY_FTP_SERVER,
    [string]$Username = $env:GODADDY_FTP_USERNAME,
    [string]$Password = $env:GODADDY_FTP_PASSWORD,
    [string]$RemoteDir = "/public_html"
)

# Check if credentials are provided
if (-not $FtpServer -or -not $Username -or -not $Password) {
    Write-Host "Error: FTP credentials not provided!" -ForegroundColor Red
    Write-Host "Please set environment variables or pass parameters:" -ForegroundColor Yellow
    Write-Host "  $env:GODADDY_FTP_SERVER = 'your-ftp-server.com'" -ForegroundColor Yellow
    Write-Host "  $env:GODADDY_FTP_USERNAME = 'your-username'" -ForegroundColor Yellow
    Write-Host "  $env:GODADDY_FTP_PASSWORD = 'your-password'" -ForegroundColor Yellow
    exit 1
}

Write-Host "🚀 Starting deployment to GoDaddy..." -ForegroundColor Green

# Build the project
Write-Host "📦 Building frontend..." -ForegroundColor Cyan
Set-Location -Path "frontend"

try {
    npm run build
    if ($LASTEXITCODE -ne 0) {
        throw "Build failed!"
    }
}
catch {
    Write-Host "❌ Build failed: $_" -ForegroundColor Red
    exit 1
}

# Check if build folder exists
if (-not (Test-Path "build")) {
    Write-Host "❌ Build folder not found!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build completed successfully!" -ForegroundColor Green

# Deploy using WinSCP
Write-Host "📤 Uploading to GoDaddy..." -ForegroundColor Cyan

# Create FTP upload script
$ftpScript = @"
open ftp://${Username}:${Password}@${FtpServer}
option batch abort
option confirm off
synchronize remote build $RemoteDir -delete -criteria=size
close
exit
"@

# Save script to temp file
$scriptFile = "$env:TEMP\ftp-deploy.txt"
$ftpScript | Out-File -FilePath $scriptFile -Encoding ASCII

try {
    # Check if WinSCP is installed
    $winscpPath = "C:\Program Files (x86)\WinSCP\WinSCP.com"
    if (-not (Test-Path $winscpPath)) {
        Write-Host "⚠️  WinSCP not found. Using Windows FTP instead..." -ForegroundColor Yellow
        
        # Alternative: Use basic Windows FTP (less reliable but works)
        $ftpCommands = @"
open $FtpServer
$Username
$Password
binary
cd $RemoteDir
mput build\*
quit
"@
        
        $ftpCommands | ftp -i -n
    }
    else {
        # Use WinSCP for better sync
        & $winscpPath /script=$scriptFile
    }
    
    Write-Host "✅ Deployment completed successfully!" -ForegroundColor Green
    Write-Host "🌍 Your site should be live at your GoDaddy domain!" -ForegroundColor Cyan
}
catch {
    Write-Host "❌ Deployment failed: $_" -ForegroundColor Red
    exit 1
}
finally {
    # Clean up temp file
    if (Test-Path $scriptFile) {
        Remove-Item $scriptFile -Force
    }
    
    # Return to original directory
    Set-Location -Path ".."
}

Write-Host "`n📝 Deployment Summary:" -ForegroundColor Magenta
Write-Host "  - Build: Success" -ForegroundColor Green
Write-Host "  - Upload: Success" -ForegroundColor Green
Write-Host "  - Server: $FtpServer" -ForegroundColor White
Write-Host "  - Remote: $RemoteDir" -ForegroundColor White
