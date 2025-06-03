# GoDaddy Deployment Setup Guide

This project is configured to deploy directly to GoDaddy hosting, bypassing the need for Vercel or other intermediary services.

## 🚀 Automated Deployment (GitHub Actions)

### Prerequisites
1. GoDaddy hosting account with FTP access
2. GitHub repository (already set up)

### Step 1: Get Your GoDaddy FTP Credentials

1. **Login to GoDaddy Account**
2. **Go to:** My Products → Web Hosting → Manage
3. **Access cPanel** 
4. **Go to:** Files → FTP Accounts
5. **Create FTP Account** (if you don't have one):
   - Username: `deploy` (or your choice)
   - Password: Strong password
   - Directory: `/public_html`
   - Quota: Unlimited

Your FTP details will be:
- **Server**: Your domain name or the server shown in cPanel
- **Username**: The FTP username you created
- **Password**: The FTP password you set

### Step 2: Configure GitHub Secrets

1. **Go to your GitHub repository**
2. **Navigate to:** Settings → Secrets and variables → Actions
3. **Click:** "New repository secret"
4. **Add these secrets:**

   | Secret Name | Value |
   |------------|-------|
   | `FTP_SERVER` | Your GoDaddy FTP server (e.g., `yourdomain.com` or IP) |
   | `FTP_USERNAME` | Your FTP username |
   | `FTP_PASSWORD` | Your FTP password |
   | `REACT_APP_API_URL` | `https://ghost-integration-api.netlify.app/api` |
   | `REACT_APP_SUPABASE_URL` | `https://nzaklomxrecnrjasjdfu.supabase.co` |
   | `REACT_APP_SUPABASE_ANON_KEY` | Your Supabase anon key |

### Step 3: Deploy

Once configured, deployments happen automatically:
- **Push to main branch** → Automatic deployment
- **Manual deployment** → Go to Actions tab → Select "Deploy to GoDaddy" → Run workflow

## 🖥️ Manual Deployment (PowerShell Script)

### First-Time Setup

1. **Set environment variables** (run in PowerShell as Administrator):
   ```powershell
   [Environment]::SetEnvironmentVariable("GODADDY_FTP_SERVER", "your-server.com", "User")
   [Environment]::SetEnvironmentVariable("GODADDY_FTP_USERNAME", "your-username", "User")
   [Environment]::SetEnvironmentVariable("GODADDY_FTP_PASSWORD", "your-password", "User")
   ```

2. **Optional: Install WinSCP** for better FTP sync:
   - Download from: https://winscp.net/eng/download.php
   - Install to default location

### Deploy Command

```powershell
.\deploy-to-godaddy.ps1
```

Or with parameters:
```powershell
.\deploy-to-godaddy.ps1 -FtpServer "server.com" -Username "user" -Password "pass"
```

## 📁 File Structure

```
your-godaddy-hosting/
└── public_html/           # Your website files go here
    ├── index.html
    ├── static/
    │   ├── css/
    │   └── js/
    └── ... (all build files)
```

## 🔧 Troubleshooting

### GitHub Action Fails
- **Check secrets**: Ensure all GitHub secrets are set correctly
- **FTP access**: Verify FTP credentials work in FileZilla or similar
- **Build errors**: Check the Actions log for npm build errors

### Manual Script Fails
- **PowerShell execution policy**: Run `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
- **FTP connection**: Test credentials with FileZilla first
- **WinSCP not found**: Script will fall back to Windows FTP

### Files Not Showing on Website
- **Clear cache**: Hard refresh browser (Ctrl+Shift+R)
- **Check directory**: Ensure files are in `/public_html`
- **File permissions**: May need to set via cPanel File Manager

## 🎯 Benefits Over Vercel

1. **Direct deployment** - No export/import process
2. **Faster updates** - Push to GitHub, site updates automatically
3. **No build limits** - GitHub Actions has generous free tier
4. **Full control** - Your files, your server
5. **Cost effective** - Already paying for GoDaddy hosting

## 📝 Notes

- The GitHub Action runs on every push to `main` branch
- Build output goes to `frontend/build/` folder
- All environment variables are handled securely
- FTP sync only uploads changed files

## 🚫 Cleanup

Since we're no longer using Vercel or Netlify, you can:
1. Delete `vercel.json`
2. Delete `.vercelignore`
3. Delete `netlify.toml`
4. Remove Vercel/Netlify integrations from GitHub

---

For questions or issues, check the GitHub Actions logs first, then verify FTP credentials.
