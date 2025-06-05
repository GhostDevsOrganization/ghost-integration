# GoDaddy FTP Credentials - Quick Access Guide

## Direct Links

### 1. GoDaddy Account Login
**Start here:** https://www.godaddy.com/sign-in

### 2. After Login - Direct Links to Try:

**Option A - My Products Page:**
https://account.godaddy.com/products

**Option B - Direct to Web Hosting:**
https://myh.godaddy.com/

**Option C - cPanel (if you know your domain):**
https://[yourdomain.com]:2083/

## Step-by-Step Navigation

### Method 1: Through GoDaddy Account
1. **Login at:** https://www.godaddy.com/sign-in
2. **Click:** "My Products" (top right menu)
3. **Find:** Your Web Hosting plan
4. **Click:** "Manage" button next to your hosting
5. **Click:** "cPanel Admin" or "Manage cPanel"

### Method 2: Direct cPanel Access
1. **Go to:** https://[yourdomain.com]:2083/
   - Replace [yourdomain.com] with your actual domain
   - Alternative ports: :2082 (non-SSL) or :2087 (WHM)
2. **Login with:** Your cPanel username/password

## Finding FTP Credentials in cPanel

Once in cPanel:

### Option 1: FTP Accounts Section
1. **Look for:** "Files" section
2. **Click:** "FTP Accounts"
3. **You'll see:**
   - Existing FTP accounts
   - FTP server name (usually your domain)
   - Option to create new FTP account

### Option 2: Quick FTP Info
1. **On cPanel home page**
2. **Look for:** "General Information" box (right side)
3. **Shows:**
   - Primary domain
   - Home directory
   - Server name

## Creating New FTP Account

In cPanel → FTP Accounts:

1. **Click:** "FTP Accounts"
2. **Fill in:**
   - **Username:** deploy (or your choice)
   - **Password:** [Strong password]
   - **Directory:** /public_html
   - **Quota:** Unlimited
3. **Click:** "Create FTP Account"

## Your FTP Details Will Be:

- **Server/Host:** 
  - Usually: ftp.yourdomain.com
  - Or: yourdomain.com
  - Or: The IP address shown in cPanel
  
- **Port:** 21 (standard FTP)

- **Username:** 
  - Format: username@yourdomain.com
  - Or just: username (if created in cPanel)

- **Password:** The one you set

- **Directory:** /public_html (for main site)

## Can't Find cPanel?

### Alternative Path:
1. **GoDaddy Account** → **All Products and Services**
2. **Web Hosting** → **Manage All**
3. **Select your domain** → **Settings**
4. **cPanel** or **FTP Users**

### GoDaddy Support:
- **Help Article:** https://www.godaddy.com/help/find-ftp-credentials-3934
- **Live Chat:** Available 24/7 in your account
- **Phone:** 1-480-463-8387

## Quick Test

Once you have credentials, test them:

1. **Using browser:**
   ```
   ftp://username@yourdomain.com
   ```
   (Will prompt for password)

2. **Using FileZilla:**
   - Host: ftp.yourdomain.com
   - Username: your-username
   - Password: your-password
   - Port: 21

## Common Issues

- **Can't find FTP section?** Your hosting plan might use:
  - "SFTP/SSH Access" instead
  - "File Manager" only (create FTP account first)
  
- **Connection refused?** Check if:
  - FTP is enabled for your hosting
  - Using correct port (21 for FTP, 22 for SFTP)
  - Firewall isn't blocking

---

**Need the credentials right now?** The fastest way is usually:
1. Login to GoDaddy
2. Go to "My Products"
3. Click "Manage" on your hosting
4. Access cPanel
5. Look for "FTP Accounts" in the Files section
