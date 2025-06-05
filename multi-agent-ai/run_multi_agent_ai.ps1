# run_multi_agent_ai.ps1 - Simplified Multi-Agent AI System (Refactored)

# Function: Start Ollama
function Start-Ollama {
    Write-Host "Starting Ollama..." -ForegroundColor Yellow
    Get-Process ollama -ErrorAction SilentlyContinue | Stop-Process -Force
    Start-Sleep -Seconds 2
    Start-Process ollama -ArgumentList "serve" -WindowStyle Hidden
    Start-Sleep -Seconds 5
}

# Function: Test Ollama
function Test-Ollama {
    Write-Host "Testing Ollama..." -ForegroundColor Yellow
    try {
        Invoke-RestMethod -Uri "http://localhost:11434/api/tags" -Method Get | Out-Null
        Write-Host "[OK] Ollama is running" -ForegroundColor Green
    } catch {
        Write-Host "[ERROR] Ollama failed to start" -ForegroundColor Red
        exit 1
    }
}

# Function: Create API Server Python File
function Create-APIServer {
    Write-Host "Creating API server file..." -ForegroundColor Yellow
    $pythonCode = 'from fastapi import FastAPI
import ollama
import uvicorn

app = FastAPI()

@app.get("/")
async def root():
    return {"status": "running"}

@app.post("/task")
async def process_task(task: dict):
    response = ollama.chat(
        model="llama3.2:3b",
        messages=[{"role": "user", "content": task.get("description", "Hello")}]
    )
    return {"result": response["message"]["content"]}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)'
    $pythonCode | Out-File -FilePath "api_server.py" -Encoding UTF8
}

# Function: Install Required Packages
function Install-Packages {
    Write-Host "Installing packages..." -ForegroundColor Yellow
    pip install fastapi uvicorn ollama
}

# Function: Load Model
function Load-Model {
    Write-Host "Loading model..." -ForegroundColor Yellow
    # Optionally: Check if model is already pulled to avoid unnecessary download.
    ollama pull llama3.2:3b
}

# Function: Start the Python API Server
function Start-API {
    Write-Host "Starting API server..." -ForegroundColor Yellow
    # Start the API server process and capture it, if needed for later termination.
    $global:apiProcess = Start-Process python -ArgumentList "api_server.py" -WindowStyle Hidden -PassThru
}

# Function: Wait for API to be ready using a loop instead of fixed sleep
function Wait-ForAPI {
    Write-Host "Waiting for API to become available..." -ForegroundColor Yellow
    $maxAttempts = 10
    $attempt = 0
    while ($attempt -lt $maxAttempts) {
        try {
            $response = Invoke-RestMethod -Uri "http://localhost:8000/" -Method Get -TimeoutSec 3
            # Check if the API returns a valid status
            if ($response -and $response.status -eq "running") {
                Write-Host "[OK] API is running" -ForegroundColor Green
                return
            }
        } catch {
            # Do nothing; the API is not ready yet.
        }
        Start-Sleep -Seconds 3
        $attempt++
    }
    Write-Host "[ERROR] API failed to start after $maxAttempts attempts" -ForegroundColor Red
    exit 1
}

# Main Execution

Write-Host "Starting Multi-Agent AI System (Simplified Version)..." -ForegroundColor Cyan

# 1. Start and Test Ollama
Start-Ollama
Test-Ollama

# 2. Create API Server File
Create-APIServer

# 3. Install Python Packages
Install-Packages

# 4. Load the Model
Load-Model

# 5. Start the API Server
Start-API

# 6. Wait for API to be available
Wait-ForAPI

# 7. Final Status Output
Write-Host "`nSystem is ready! Press Ctrl+C to stop." -ForegroundColor Green
Write-Host "API Docs: http://localhost:8000/docs" -ForegroundColor Cyan

# Keep running; pressing Ctrl+C will exit the script.
while ($true) { Start-Sleep -Seconds 60 }
