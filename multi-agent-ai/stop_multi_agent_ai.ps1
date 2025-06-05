Write-Host "Stopping Multi-Agent AI System..." -ForegroundColor Yellow
Get-Process python, ollama -ErrorAction SilentlyContinue | Stop-Process -Force
Write-Host "✓ System stopped" -ForegroundColor Green
