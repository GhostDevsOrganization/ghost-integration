# stop_multi_agent_ai.ps1
Write-Host "Stopping Multi-Agent AI System..." -ForegroundColor Yellow

# Stop processes
Get-Process python, ollama -ErrorAction SilentlyContinue | Stop-Process -Force

# Stop Docker services
docker-compose down

# Clean up jobs
Get-Job | Stop-Job
Get-Job | Remove-Job

Write-Host "✓ Multi-Agent AI System stopped" -ForegroundColor Green