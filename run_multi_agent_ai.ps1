# run_multi_agent_ai.ps1
# Complete Multi-Agent AI Development System with GhosTeam Integration

param(
    [string]$Mode = "full",  # full, dev, minimal
    [switch]$SkipModelLoad = $false,
    [switch]$MonitoringOnly = $false,
    [string]$DartApiToken = $env:DART_API_TOKEN
)

# ==================== CONFIGURATION ====================
$Script:Config = @{
    OllamaHost = "http://localhost:11434"
    MultiAgentAPI = "http://localhost:8000"
    QdrantHost = "http://localhost:6333"
    RedisHost = "localhost:6379"
    GrafanaHost = "http://localhost:3000"
    
    Models = @{
        Frontend = "cline-optimal:latest"
        Backend = "codellama:7b-instruct-q4_K_M"
        Architect = "phind-codellama:34b-v2-q2_K"
        Security = "llama3.2:3b"
        Autocomplete = "starcoder2:3b"
    }
    
    OptimizationSettings = @{
        CUDA_VISIBLE_DEVICES = "0"
        OLLAMA_NUM_GPU = "999"
        OLLAMA_GPU_OVERHEAD = "0"
        OLLAMA_MAX_LOADED_MODELS = "4"
        OLLAMA_KEEP_ALIVE = "5m"
        OLLAMA_NUM_PARALLEL = "4"
        OLLAMA_MAX_QUEUE = "512"
        OLLAMA_FLASH_ATTENTION = "true"
        OLLAMA_HOST = "0.0.0.0:11434"
    }
}

# ==================== HELPER FUNCTIONS ====================
function Write-Step {
    param([string]$Message, [string]$Color = "Cyan")
    Write-Host "`n[$([DateTime]::Now.ToString('HH:mm:ss'))] $Message" -ForegroundColor $Color
}

function Test-ServiceHealth {
    param([string]$Url, [string]$ServiceName)
    try {
        $response = Invoke-RestMethod -Uri $Url -Method Get -TimeoutSec 5
        Write-Host "  ✓ $ServiceName is healthy" -ForegroundColor Green
        return $true
    } catch {
        Write-Host "  ✗ $ServiceName is not responding" -ForegroundColor Red
        return $false
    }
}

function Show-Banner {
    Clear-Host
    Write-Host @"
╔═══════════════════════════════════════════════════════════════════════════════╗
║                     MULTI-AGENT AI DEVELOPMENT SYSTEM                         ║
║                          Powered by Local LLMs                                ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║  Agents:  Frontend Expert | Backend Architect | Security Auditor              ║
║  Models:  Cline Optimal | CodeLlama | StarCoder2                            ║
║  Status:  Initializing...                                                     ║
╚═══════════════════════════════════════════════════════════════════════════════╝
"@ -ForegroundColor Cyan
}

# ==================== SETUP FUNCTIONS ====================
function Set-OptimizedEnvironment {
    Write-Step "Setting optimized environment variables"
    
    foreach ($key in $Config.OptimizationSettings.Keys) {
        [Environment]::SetEnvironmentVariable($key, $Config.OptimizationSettings[$key], [EnvironmentVariableTarget]::Process)
        Write-Host "  → Set $key = $($Config.OptimizationSettings[$key])" -ForegroundColor Gray
    }
}

function Start-CoreServices {
    Write-Step "Starting core services"
    
    # Check if Docker is running
    if (-not (docker info 2>$null)) {
        Write-Host "  ! Docker is not running. Starting Docker Desktop..." -ForegroundColor Yellow
        Start-Process "C:\Program Files\Docker\Docker\Docker Desktop.exe"
        Start-Sleep -Seconds 20
    }
    
    # Start services based on mode
    switch ($Mode) {
        "full" {
            Write-Host "  → Starting all services (full mode)" -ForegroundColor Gray
            docker-compose up -d
        }
        "dev" {
            Write-Host "  → Starting essential services (dev mode)" -ForegroundColor Gray
            docker-compose up -d ollama qdrant redis
        }
        "minimal" {
            Write-Host "  → Starting minimal services" -ForegroundColor Gray
            docker-compose up -d ollama redis
        }
    }
    
    # Wait for services to be ready
    Write-Host "  → Waiting for services to initialize..." -ForegroundColor Gray
    Start-Sleep -Seconds 15
}

function Start-Ollama {
    Write-Step "Starting Ollama with multi-agent optimizations"
    
    # Kill existing Ollama instances
    Get-Process ollama -ErrorAction SilentlyContinue | Stop-Process -Force
    Start-Sleep -Seconds 2
    
    # Start Ollama with optimizations
    $ollamaProcess = Start-Process ollama -ArgumentList "serve" -PassThru -WindowStyle Hidden
    
    # Wait for Ollama to be ready
    $attempts = 0
    while ($attempts -lt 30) {
        if (Test-ServiceHealth -Url "$($Config.OllamaHost)/api/tags" -ServiceName "Ollama") {
            break
        }
        Start-Sleep -Seconds 2
        $attempts++
    }
}

function Initialize-Models {
    if ($SkipModelLoad) {
        Write-Step "Skipping model loading (--SkipModelLoad flag set)" -Color "Yellow"
        return
    }
    
    Write-Step "Loading AI models for multi-agent system"
    
    $modelJobs = @()
    foreach ($role in $Config.Models.Keys) {
        $model = $Config.Models[$role]
        Write-Host "  → Loading $role model: $model" -ForegroundColor Gray
        
        $job = Start-Job -ScriptBlock {
            param($model)
            & ollama pull $model
        } -ArgumentList $model
        
        $modelJobs += @{
            Job = $job
            Role = $role
            Model = $model
        }
    }
    
    # Monitor loading progress
    while ($modelJobs.Job | Where-Object { $_.State -eq 'Running' }) {
        Clear-Host
        Show-Banner
        Write-Step "Model Loading Progress:" -Color "Yellow"
        
        foreach ($modelJob in $modelJobs) {
            $status = if ($modelJob.Job.State -eq 'Completed') { "✓ Loaded" } else { "⏳ Loading..." }
            $color = if ($modelJob.Job.State -eq 'Completed') { "Green" } else { "Yellow" }
            Write-Host "  $($modelJob.Role): $status" -ForegroundColor $color
        }
        
        Start-Sleep -Seconds 5
    }
    
    Write-Step "All models loaded successfully!" -Color "Green"
}

function Start-MultiAgentSystem {
    Write-Step "Starting Multi-Agent AI System"
    
    # Check if the system is already running
    try {
        $health = Invoke-RestMethod -Uri "$($Config.MultiAgentAPI)/agents" -Method Get -ErrorAction Stop
        Write-Host "  ✓ Multi-Agent system is already running" -ForegroundColor Green
        return
    } catch {
        Write-Host "  → Starting Multi-Agent system..." -ForegroundColor Gray
    }
    
    # Start the multi-agent system
    $scriptPath = Join-Path $PSScriptRoot "multi_agent_system.py"
    
    if (Test-Path $scriptPath) {
        $pythonProcess = Start-Process python -ArgumentList $scriptPath -PassThru -WindowStyle Hidden
        
        # Wait for API to be ready
        $attempts = 0
        while ($attempts -lt 30) {
            Start-Sleep -Seconds 2
            if (Test-ServiceHealth -Url "$($Config.MultiAgentAPI)/docs" -ServiceName "Multi-Agent API") {
                break
            }
            $attempts++
        }
    } else {
        Write-Host "  ! multi_agent_system.py not found. Using Docker container instead." -ForegroundColor Yellow
    }
}

function Start-GhosTeamIntegration {
    if (-not $DartApiToken) {
        Write-Step "Skipping Dart integration (no API token provided)" -Color "Yellow"
        return
    }
    
    Write-Step "Starting GhosTeam Dart Integration"
    
    $integrationScript = @"
import asyncio
import aiohttp
import os

async def integrate_dart():
    dart_token = '$DartApiToken'
    multi_agent_api = '$($Config.MultiAgentAPI)'
    
    headers = {'Authorization': f'Bearer {dart_token}'}
    processed = set()
    
    while True:
        try:
            # Poll Dart API
            async with aiohttp.ClientSession() as session:
                async with session.get('https://api.dart.dev/tasks', headers=headers) as resp:
                    tasks = await resp.json()
                    
                    for task in tasks:
                        if task['id'] not in processed:
                            # Send to multi-agent system
                            async with session.post(f'{multi_agent_api}/task', json=task) as result:
                                print(f"Processed Dart task {task['id']}")
                                processed.add(task['id'])
        except Exception as e:
            print(f"Error: {e}")
        
        await asyncio.sleep(30)

asyncio.run(integrate_dart())
"@
    
    $integrationScript | Out-File -FilePath "dart_integration.py" -Encoding UTF8
    Start-Process python -ArgumentList "dart_integration.py" -WindowStyle Hidden
    
    Write-Host "  ✓ Dart integration started" -ForegroundColor Green
}

function Start-Monitoring {
    Write-Step "Starting monitoring services"
    
    if ($Mode -eq "full") {
        # Open Grafana dashboard
        Write-Host "  → Opening Grafana dashboard..." -ForegroundColor Gray
        Start-Process "http://localhost:3000"
        
        # Start resource monitor
        Start-Job -ScriptBlock {
            while ($true) {
                $gpu = (nvidia-smi --query-gpu=utilization.gpu,memory.used,memory.total --format=csv,noheader,nounits)
                $gpuInfo = $gpu -split ','
                
                $stats = @{
                    Timestamp = Get-Date -Format "HH:mm:ss"
                    GPU_Usage = "$($gpuInfo[0])%"
                    GPU_Memory = "$($gpuInfo[1])MB / $($gpuInfo[2])MB"
                    CPU_Usage = "$((Get-Counter '\Processor(_Total)\% Processor Time').CounterSamples.CookedValue)%"
                    RAM_Usage = "$([math]::Round((Get-Process | Measure-Object -Property WorkingSet -Sum).Sum / 1GB, 2))GB"
                }
                
                # Send to monitoring endpoint
                Invoke-RestMethod -Uri "http://localhost:8000/metrics/update" -Method Post -Body ($stats | ConvertTo-Json) -ContentType "application/json" -ErrorAction SilentlyContinue
                
                Start-Sleep -Seconds 5
            }
        } | Out-Null
    }
    
    # Start terminal monitoring display
    Start-MonitoringDisplay
}

function Start-MonitoringDisplay {
    if ($MonitoringOnly) {
        while ($true) {
            Show-SystemStatus
            Start-Sleep -Seconds 2
        }
    } else {
        # Start monitoring in a separate job
        Start-Job -ScriptBlock {
            param($Config)
            while ($true) {
                try {
                    $agents = Invoke-RestMethod -Uri "$($Config.MultiAgentAPI)/agents" -Method Get
                    $metrics = Invoke-RestMethod -Uri "$($Config.MultiAgentAPI)/metrics" -Method Get
                    
                    # Log to file
                    $logEntry = @{
                        Timestamp = Get-Date
                        Agents = $agents
                        Metrics = $metrics
                    }
                    $logEntry | ConvertTo-Json | Out-File -Append "ai_system.log"
                } catch {}
                Start-Sleep -Seconds 10
            }
        } -ArgumentList $Config | Out-Null
    }
}

function Show-SystemStatus {
    Clear-Host
    Write-Host @"
╔═══════════════════════════════════════════════════════════════════════════════╗
║                     MULTI-AGENT AI SYSTEM - LIVE STATUS                       ║
╚═══════════════════════════════════════════════════════════════════════════════╝
"@ -ForegroundColor Cyan
    
    try {
        # Get agent status
        $agents = Invoke-RestMethod -Uri "$($Config.MultiAgentAPI)/agents" -Method Get -ErrorAction Stop
        
        Write-Host "`n🤖 ACTIVE AGENTS:" -ForegroundColor Yellow
        foreach ($agent in $agents.PSObject.Properties) {
            $stats = $agent.Value.stats
            Write-Host "  ├─ $($agent.Name): " -NoNewline
            Write-Host "Active" -ForegroundColor Green -NoNewline
            Write-Host " | Tasks: $($stats.tasks) | Avg Time: $([math]::Round($stats.avg_time, 2))s"
        }
        
        # Get system metrics
        $metrics = Invoke-RestMethod -Uri "$($Config.MultiAgentAPI)/metrics" -Method Get -ErrorAction Stop
        
        Write-Host "`n📊 SYSTEM METRICS:" -ForegroundColor Yellow
        Write-Host "  ├─ GPU Usage: $($metrics.gpu.usage)%" -ForegroundColor $(if ($metrics.gpu.usage -gt 80) { "Red" } else { "Green" })
        Write-Host "  ├─ CPU Usage: $($metrics.cpu.usage)%"
        Write-Host "  ├─ Memory: $($metrics.memory)%"
        Write-Host "  └─ Tasks: Queued($($metrics.tasks.queued)) | Active($($metrics.tasks.active)) | Completed($($metrics.tasks.completed))"
        
        # Get recent tech radar alerts
        $radar = Invoke-RestMethod -Uri "$($Config.MultiAgentAPI)/tech-radar" -Method Get -ErrorAction Stop
        if ($radar.Count -gt 0) {
            Write-Host "`n📡 TECH RADAR ALERTS:" -ForegroundColor Yellow
            $radar | Select-Object -First 3 | ForEach-Object {
                Write-Host "  ├─ $($_.name): $($_.stars) stars" -ForegroundColor Cyan
            }
        }
        
    } catch {
        Write-Host "`n⚠️  Unable to connect to Multi-Agent API" -ForegroundColor Red
    }
    
    Write-Host "`n📋 QUICK COMMANDS:" -ForegroundColor Gray
    Write-Host "  • Submit Task:  Invoke-RestMethod -Uri http://localhost:8000/task -Method Post -Body '{`"description`":`"Your task`"}' -ContentType 'application/json'"
    Write-Host "  • View Docs:    Start-Process http://localhost:8000/docs"
    Write-Host "  • Grafana:      Start-Process http://localhost:3000"
    Write-Host "  • Stop System:  .\stop_multi_agent_ai.ps1"
}

function Test-SystemHealth {
    Write-Step "Running system health checks"
    
    $services = @(
        @{Name="Ollama"; Url="$($Config.OllamaHost)/api/tags"}
        @{Name="Multi-Agent API"; Url="$($Config.MultiAgentAPI)/agents"}
        @{Name="Qdrant"; Url="$($Config.QdrantHost)/health"}
        @{Name="Redis"; Check={Test-NetConnection -ComputerName localhost -Port 6379 -InformationLevel Quiet}}
    )
    
    $healthy = $true
    foreach ($service in $services) {
        if ($service.Url) {
            if (-not (Test-ServiceHealth -Url $service.Url -ServiceName $service.Name)) {
                $healthy = $false
            }
        } elseif ($service.Check) {
            if (& $service.Check) {
                Write-Host "  ✓ $($service.Name) is healthy" -ForegroundColor Green
            } else {
                Write-Host "  ✗ $($service.Name) is not responding" -ForegroundColor Red
                $healthy = $false
            }
        }
    }
    
    return $healthy
}

function Show-QuickStart {
    Write-Host "`n" + "="*80 -ForegroundColor DarkGray
    Write-Host "🎉 MULTI-AGENT AI SYSTEM IS READY!" -ForegroundColor Green
    Write-Host "="*80 -ForegroundColor DarkGray
    
    Write-Host "`n📝 QUICK START EXAMPLES:" -ForegroundColor Cyan
    
    Write-Host "`n1. Create a React component:" -ForegroundColor Yellow
    Write-Host '   $task = @{description="Create a React button component with hover effects"} | ConvertTo-Json' -ForegroundColor Gray
    Write-Host '   Invoke-RestMethod -Uri http://localhost:8000/task -Method Post -Body $task -ContentType "application/json"' -ForegroundColor Gray
    
    Write-Host "`n2. Build an API endpoint:" -ForegroundColor Yellow
    Write-Host '   $task = @{description="Create a REST API endpoint for user authentication"} | ConvertTo-Json' -ForegroundColor Gray
    Write-Host '   Invoke-RestMethod -Uri http://localhost:8000/task -Method Post -Body $task -ContentType "application/json"' -ForegroundColor Gray
    
    Write-Host "`n3. Full-stack feature:" -ForegroundColor Yellow
    Write-Host '   $task = @{description="Create a complete user registration feature with React form and API"} | ConvertTo-Json' -ForegroundColor Gray
    Write-Host '   Invoke-RestMethod -Uri http://localhost:8000/task -Method Post -Body $task -ContentType "application/json"' -ForegroundColor Gray
    
    Write-Host "`n🔗 ACCESS POINTS:" -ForegroundColor Cyan
    Write-Host "   • API Documentation:  http://localhost:8000/docs" -ForegroundColor White
    Write-Host "   • WebSocket Updates:  ws://localhost:8000/ws" -ForegroundColor White
    Write-Host "   • Grafana Dashboard:  http://localhost:3000 (admin/admin)" -ForegroundColor White
    Write-Host "   • System Metrics:     http://localhost:8000/metrics" -ForegroundColor White
    
    Write-Host "`n💡 TIPS:" -ForegroundColor Cyan
    Write-Host "   • Complex tasks are automatically distributed to multiple agents" -ForegroundColor Gray
    Write-Host "   • The system learns from your patterns to improve suggestions" -ForegroundColor Gray
    Write-Host "   • Tech radar monitors for relevant new technologies" -ForegroundColor Gray
    Write-Host "   • VSCode extension provides real-time AI assistance" -ForegroundColor Gray
    
    Write-Host "`n🛑 TO STOP: Run .\stop_multi_agent_ai.ps1" -ForegroundColor Yellow
    Write-Host ""
}

# ==================== MAIN EXECUTION ====================
try {
    Show-Banner
    Set-OptimizedEnvironment
    
    if (-not $MonitoringOnly) {
        Start-CoreServices
        Start-Ollama
        Initialize-Models
        Start-MultiAgentSystem
        Start-GhosTeamIntegration
    }
    
    Start-Monitoring
    
    if (Test-SystemHealth) {
        Show-QuickStart
        
        # Keep the script running
        Write-Host "Press Ctrl+C to stop the system..." -ForegroundColor Gray
        while ($true) {
            Start-Sleep -Seconds 60
            # Periodic health check
            Test-SystemHealth | Out-Null
        }
    } else {
        Write-Host "`n❌ System health check failed. Please check the logs." -ForegroundColor Red
        exit 1
    }
    
} catch {
    Write-Host "`n❌ Error: $_" -ForegroundColor Red
    Write-Host $_.ScriptStackTrace -ForegroundColor DarkRed
    exit 1
} finally {
    # Cleanup on exit
    if (-not $MonitoringOnly) {
        Write-Host "`nShutting down services..." -ForegroundColor Yellow
        Get-Job | Stop-Job
        Get-Job | Remove-Job
    }
}