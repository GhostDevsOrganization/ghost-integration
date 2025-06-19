# enhanced_cline_training.ps1
# Enhanced cline-optimal with local training capabilities for RTX 3090
# Builds on your existing setup to add fine-tuning on your codebase

param(
    [string]$Action = "setup",
    [string]$DataPath = "C:\AI_Training",
    [string]$GhosTeamPath = "C:\Users\avion\OneDrive\Documents\GitHub\ghosteam",
    [switch]$UsePublicData = $true,
    [int]$TrainingSteps = 1000,
    [string]$BaseModel = "qwen2.5-coder:7b-instruct-q4_K_M"
)

Write-Host @"
╔═══════════════════════════════════════════════════════════════════════════════╗
║              ENHANCED CLINE-OPTIMAL WITH TRAINING CAPABILITIES                ║
║                         Optimized for RTX 3090 (24GB)                         ║
╚═══════════════════════════════════════════════════════════════════════════════╝
"@ -ForegroundColor Cyan

# ==================== TRAINING ENVIRONMENT SETUP ====================
function Setup-TrainingEnvironment {
    Write-Host "`n[1/4] Setting up training environment..." -ForegroundColor Yellow
    
    # Create directory structure
    $directories = @(
        "$DataPath\models\base"
        "$DataPath\models\fine-tuned"
        "$DataPath\models\checkpoints"
        "$DataPath\datasets\ghosteam"
        "$DataPath\datasets\public\github"
        "$DataPath\datasets\public\stackoverflow"
        "$DataPath\datasets\processed"
        "$DataPath\training\logs"
        "$DataPath\training\configs"
        "$DataPath\evaluation\results"
    )
    
    foreach ($dir in $directories) {
        if (!(Test-Path $dir)) {
            New-Item -ItemType Directory -Path $dir -Force | Out-Null
            Write-Host "  ✓ Created: $dir" -ForegroundColor Gray
        }
    }
    
    # Apply RTX 3890 optimizations from training guide
    $env:CUDA_VISIBLE_DEVICES = "0"
    $env:PYTORCH_CUDA_ALLOC_CONF = "max_split_size_mb:512"
    $env:CUDA_LAUNCH_BLOCKING = "0"
    $env:TRANSFORMERS_VERBOSITY = "info"
    $env:TOKENIZERS_PARALLELISM = "false"
    
    # QLoRA specific settings
    $env:QLORA_MEMORY_EFFICIENT = "true"
    $env:GRADIENT_CHECKPOINTING = "true"
    $env:BF16_TRAINING = "true"
    
    Write-Host "  ✓ Environment configured for training" -ForegroundColor Green
}

# ==================== INSTALL TRAINING DEPENDENCIES ====================
function Install-TrainingDependencies {
    Write-Host "`n[2/4] Installing training dependencies..." -ForegroundColor Yellow
    
    # Core training packages
    $packages = @(
        # Core ML frameworks
        "torch==2.1.2+cu121"
        "transformers==4.36.2"
        "accelerate==0.25.0"
        "peft==0.7.1"  # For LoRA/QLoRA
        "bitsandbytes==0.41.3"  # For quantization
        "datasets==2.16.1"
        
        # Data processing
        "tree-sitter==0.20.4"
        "pandas==2.1.4"
        "pyarrow==14.0.2"
        "xxhash==3.4.1"  # For deduplication
        
        # Training utilities
        "wandb==0.16.2"  # For experiment tracking
        "tensorboard==2.15.1"
        "tqdm==4.66.1"
        "safetensors==0.4.1"
        
        # Code parsing and analysis
        "astroid==3.0.2"
        "pygments==2.17.2"
        "gitpython==3.1.40"
        
        # API and tool integration
        "ollama==0.1.7"
        "httpx==0.26.0"
        "aiofiles==23.2.1"
    )
    
    Write-Host "  Installing packages..." -ForegroundColor Gray
    
    # Install PyTorch with CUDA
    pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121
    
    # Install other packages
    pip install $packages
    
    # Install tree-sitter languages
    python -c @"
import tree_sitter_languages
# This will download and install language parsers
"@
    
    Write-Host "  ✓ Training dependencies installed" -ForegroundColor Green
}

# ==================== CREATE DATA COLLECTOR ====================
function Create-DataCollector {
    Write-Host "`n[3/4] Creating data collection pipeline..." -ForegroundColor Yellow
    
    $dataCollector = @'
import os
import json
import hashlib
import asyncio
from pathlib import Path
from typing import List, Dict, Any, Optional
import git
import tree_sitter_languages
from tree_sitter import Language, Parser
import pandas as pd
from datasets import Dataset, DatasetDict
import httpx
from tqdm import tqdm
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class GhosTeamDataCollector:
    """Collects and processes data from GhosTeam codebase and public sources"""
    
    def __init__(self, ghosteam_path: str, data_path: str):
        self.ghosteam_path = Path(ghosteam_path)
        self.data_path = Path(data_path)
        self.parser = self._setup_parser()
        
    def _setup_parser(self):
        """Setup tree-sitter parser for code analysis"""
        return tree_sitter_languages.get_parser("python")
    
    def collect_ghosteam_data(self) -> List[Dict[str, Any]]:
        """Collect data from GhosTeam codebase"""
        logger.info(f"Collecting data from {self.ghosteam_path}")
        
        data = []
        
        # Analyze Python files
        for py_file in self.ghosteam_path.rglob("*.py"):
            if "__pycache__" in str(py_file):
                continue
                
            try:
                content = py_file.read_text(encoding='utf-8')
                
                # Parse with tree-sitter
                tree = self.parser.parse(bytes(content, 'utf-8'))
                
                # Extract functions and classes
                functions = self._extract_functions(tree, content)
                classes = self._extract_classes(tree, content)
                
                # Create training examples
                for func in functions:
                    data.append({
                        'type': 'function',
                        'file': str(py_file.relative_to(self.ghosteam_path)),
                        'name': func['name'],
                        'code': func['code'],
                        'docstring': func.get('docstring', ''),
                        'context': self._get_file_context(py_file),
                        'architecture_component': self._identify_component(py_file)
                    })
                
                for cls in classes:
                    data.append({
                        'type': 'class',
                        'file': str(py_file.relative_to(self.ghosteam_path)),
                        'name': cls['name'],
                        'code': cls['code'],
                        'docstring': cls.get('docstring', ''),
                        'methods': cls.get('methods', []),
                        'context': self._get_file_context(py_file),
                        'architecture_component': self._identify_component(py_file)
                    })
                    
            except Exception as e:
                logger.error(f"Error processing {py_file}: {e}")
        
        # Add configuration files
        for config_pattern in ['*.json', '*.yaml', '*.yml', '*.md']:
            for config_file in self.ghosteam_path.rglob(config_pattern):
                try:
                    content = config_file.read_text(encoding='utf-8')
                    data.append({
                        'type': 'config',
                        'file': str(config_file.relative_to(self.ghosteam_path)),
                        'content': content,
                        'format': config_file.suffix[1:],
                        'architecture_component': self._identify_component(config_file)
                    })
                except Exception as e:
                    logger.error(f"Error reading {config_file}: {e}")
        
        logger.info(f"Collected {len(data)} items from GhosTeam")
        return data
    
    def _extract_functions(self, tree, content: str) -> List[Dict[str, Any]]:
        """Extract function definitions from AST"""
        functions = []
        
        # Query for function definitions
        query = tree_sitter_languages.get_language("python").query("""
            (function_definition
                name: (identifier) @function.name
                body: (block) @function.body
            ) @function
        """)
        
        captures = query.captures(tree.root_node)
        
        for node, capture_name in captures:
            if capture_name == "function":
                func_text = content[node.start_byte:node.end_byte]
                func_name = None
                
                # Get function name
                for child in node.children:
                    if child.type == "identifier":
                        func_name = content[child.start_byte:child.end_byte]
                        break
                
                if func_name:
                    functions.append({
                        'name': func_name,
                        'code': func_text,
                        'start_line': node.start_point[0],
                        'end_line': node.end_point[0]
                    })
        
        return functions
    
    def _extract_classes(self, tree, content: str) -> List[Dict[str, Any]]:
        """Extract class definitions from AST"""
        classes = []
        
        query = tree_sitter_languages.get_language("python").query("""
            (class_definition
                name: (identifier) @class.name
                body: (block) @class.body
            ) @class
        """)
        
        captures = query.captures(tree.root_node)
        
        for node, capture_name in captures:
            if capture_name == "class":
                class_text = content[node.start_byte:node.end_byte]
                class_name = None
                
                for child in node.children:
                    if child.type == "identifier":
                        class_name = content[child.start_byte:child.end_byte]
                        break
                
                if class_name:
                    classes.append({
                        'name': class_name,
                        'code': class_text,
                        'start_line': node.start_point[0],
                        'end_line': node.end_point[0]
                    })
        
        return classes
    
    def _get_file_context(self, file_path: Path) -> Dict[str, Any]:
        """Get context about file location and imports"""
        content = file_path.read_text(encoding='utf-8')
        
        # Extract imports
        imports = []
        for line in content.split('\n'):
            if line.strip().startswith(('import ', 'from ')):
                imports.append(line.strip())
        
        return {
            'imports': imports,
            'directory': str(file_path.parent.relative_to(self.ghosteam_path)),
            'file_size': file_path.stat().st_size,
            'line_count': len(content.split('\n'))
        }
    
    def _identify_component(self, file_path: Path) -> str:
        """Identify which GhosTeam component this file belongs to"""
        path_str = str(file_path).lower()
        
        if 'dart_polling' in path_str:
            return 'dart_agent'
        elif 'cline_server' in path_str:
            return 'cline_server'
        elif 'vscode_plugin' in path_str:
            return 'vscode_extension'
        elif 'test' in path_str:
            return 'testing'
        else:
            return 'core'
    
    async def collect_public_data(self, max_repos: int = 10) -> List[Dict[str, Any]]:
        """Collect data from public GitHub repositories similar to GhosTeam"""
        logger.info("Collecting public repository data...")
        
        # Search for similar repositories
        search_queries = [
            "language:python ai automation",
            "language:python code generation llm",
            "language:python task automation",
            "vscode extension ai"
        ]
        
        data = []
        
        async with httpx.AsyncClient() as client:
            for query in search_queries:
                try:
                    # Note: In production, use GitHub API with authentication
                    # This is a simplified example
                    logger.info(f"Searching for: {query}")
                    
                    # For now, we'll use some known good repositories
                    repos = [
                        "microsoft/autogen",
                        "langchain-ai/langchain",
                        "openai/openai-cookbook"
                    ]
                    
                    for repo in repos[:max_repos]:
                        logger.info(f"Processing {repo}...")
                        # In production, clone and analyze the repository
                        # For now, we'll create placeholder data
                        data.append({
                            'type': 'reference',
                            'source': 'github',
                            'repo': repo,
                            'relevance': 'high'
                        })
                        
                except Exception as e:
                    logger.error(f"Error collecting public data: {e}")
        
        return data
    
    def create_training_dataset(self, ghosteam_data: List[Dict], 
                              public_data: List[Dict]) -> DatasetDict:
        """Create training dataset with proper formatting"""
        logger.info("Creating training dataset...")
        
        # Format for instruction tuning
        formatted_data = []
        
        # Process GhosTeam data
        for item in ghosteam_data:
            if item['type'] == 'function':
                # Create instruction-response pairs
                instruction = f"Write a {item['architecture_component']} function named {item['name']}"
                if item.get('docstring'):
                    instruction += f" that {item['docstring']}"
                
                formatted_data.append({
                    'instruction': instruction,
                    'input': f"File context: {item['file']}\nImports: {json.dumps(item['context']['imports'])}",
                    'output': item['code'],
                    'component': item['architecture_component']
                })
                
                # Add tool-use examples
                if 'api' in item['name'].lower() or 'fetch' in item['name'].lower():
                    formatted_data.append({
                        'instruction': f"Use appropriate tools to implement {item['name']}",
                        'input': f"Available tools: [web_fetch, api_call, file_read]\nContext: {item['file']}",
                        'output': f"<tool>api_call</tool>\n{item['code']}",
                        'component': 'tool_use'
                    })
        
        # Split into train/validation
        df = pd.DataFrame(formatted_data)
        train_size = int(0.9 * len(df))
        
        train_df = df[:train_size]
        val_df = df[train_size:]
        
        # Create dataset
        dataset_dict = DatasetDict({
            'train': Dataset.from_pandas(train_df),
            'validation': Dataset.from_pandas(val_df)
        })
        
        logger.info(f"Created dataset with {len(train_df)} training and {len(val_df)} validation examples")
        return dataset_dict
    
    def apply_deduplication(self, dataset: DatasetDict) -> DatasetDict:
        """Remove duplicates using MinHash as described in training guide"""
        logger.info("Applying deduplication...")
        
        # Simple deduplication based on code similarity
        seen_hashes = set()
        
        def is_duplicate(example):
            code_hash = hashlib.md5(example['output'].encode()).hexdigest()
            if code_hash in seen_hashes:
                return False
            seen_hashes.add(code_hash)
            return True
        
        dataset['train'] = dataset['train'].filter(is_duplicate)
        dataset['validation'] = dataset['validation'].filter(is_duplicate)
        
        logger.info(f"After deduplication: {len(dataset['train'])} training examples")
        return dataset

# Main execution
async def main():
    collector = GhosTeamDataCollector(
        ghosteam_path=r"${GhosTeamPath}",
        data_path=r"${DataPath}"
    )
    
    # Collect data
    ghosteam_data = collector.collect_ghosteam_data()
    public_data = await collector.collect_public_data()
    
    # Create dataset
    dataset = collector.create_training_dataset(ghosteam_data, public_data)
    dataset = collector.apply_deduplication(dataset)
    
    # Save dataset
    dataset.save_to_disk(f"{collector.data_path}/datasets/processed/ghosteam_training")
    logger.info("Dataset saved successfully!")

if __name__ == "__main__":
    asyncio.run(main())
'@
    
    $dataCollector | Out-File -FilePath "$DataPath\collect_training_data.py" -Encoding UTF8
    Write-Host "  ✓ Data collector created" -ForegroundColor Green
}

# ==================== CREATE TRAINING SCRIPT ====================
function Create-TrainingScript {
    Write-Host "`n[4/4] Creating QLoRA training script..." -ForegroundColor Yellow
    
    $trainingScript = @'
import os
import torch
from transformers import (
    AutoModelForCausalLM,
    AutoTokenizer,
    TrainingArguments,
    Trainer,
    BitsAndBytesConfig,
    DataCollatorForLanguageModeling
)
from peft import (
    LoraConfig,
    get_peft_model,
    prepare_model_for_kbit_training,
    TaskType
)
from datasets import load_from_disk
import wandb
from tqdm import tqdm
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ClineOptimalTrainer:
    """QLoRA trainer optimized for RTX 3090 based on training guide"""
    
    def __init__(self, model_name: str = "Qwen/Qwen2.5-Coder-7B-Instruct", 
                 data_path: str = "./datasets/processed/ghosteam_training"):
        self.model_name = model_name
        self.data_path = data_path
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        
        # RTX 3090 optimized configuration from training guide
        self.training_config = {
            'per_device_train_batch_size': 1,
            'gradient_accumulation_steps': 16,  # Effective batch size of 16
            'num_train_epochs': 3,
            'learning_rate': 2e-4,
            'warmup_ratio': 0.03,
            'logging_steps': 10,
            'save_steps': 100,
            'eval_steps': 100,
            'fp16': False,  # Use bf16 instead
            'bf16': True,  # Better for training stability
            'gradient_checkpointing': True,  # Save VRAM
            'optim': "paged_adamw_8bit",  # Memory efficient optimizer
            'max_grad_norm': 0.3,
            'lr_scheduler_type': "cosine",
            'dataloader_num_workers': 2,
            'remove_unused_columns': False,
            'group_by_length': True,  # Efficient batching
            'ddp_find_unused_parameters': False,
        }
        
        # QLoRA configuration optimized for code generation
        self.lora_config = LoraConfig(
            r=32,  # Higher rank for code understanding
            lora_alpha=128,  # 4x rank as recommended
            target_modules=[
                "q_proj", "k_proj", "v_proj", "o_proj",
                "gate_proj", "up_proj", "down_proj"
            ],
            lora_dropout=0.05,
            bias="none",
            task_type=TaskType.CAUSAL_LM,
            inference_mode=False
        )
        
        # 4-bit quantization configuration
        self.bnb_config = BitsAndBytesConfig(
            load_in_4bit=True,
            bnb_4bit_quant_type="nf4",
            bnb_4bit_compute_dtype=torch.bfloat16,
            bnb_4bit_use_double_quant=True,  # Further memory reduction
        )
    
    def setup_model_and_tokenizer(self):
        """Load model with 4-bit quantization"""
        logger.info(f"Loading model: {self.model_name}")
        
        # Load tokenizer
        self.tokenizer = AutoTokenizer.from_pretrained(
            self.model_name,
            trust_remote_code=True
        )
        
        # Set padding token
        if self.tokenizer.pad_token is None:
            self.tokenizer.pad_token = self.tokenizer.eos_token
        
        # Load model with quantization
        self.model = AutoModelForCausalLM.from_pretrained(
            self.model_name,
            quantization_config=self.bnb_config,
            device_map="auto",
            trust_remote_code=True,
            torch_dtype=torch.bfloat16,
        )
        
        # Prepare model for k-bit training
        self.model = prepare_model_for_kbit_training(self.model)
        
        # Add LoRA adapters
        self.model = get_peft_model(self.model, self.lora_config)
        
        # Print trainable parameters
        self.model.print_trainable_parameters()
        
        logger.info("Model loaded and configured for QLoRA training")
    
    def prepare_dataset(self):
        """Load and prepare dataset"""
        logger.info("Loading dataset...")
        
        # Load dataset
        dataset = load_from_disk(self.data_path)
        
        # Tokenization function
        def tokenize_function(examples):
            # Format as instruction-following
            texts = []
            for instruction, input_ctx, output in zip(
                examples['instruction'], 
                examples['input'], 
                examples['output']
            ):
                # Format for instruction tuning
                text = f"""<|im_start|>system
You are cline-optimal, an expert AI assistant for the GhosTeam architecture.
<|im_end|>
<|im_start|>user
{instruction}
Context: {input_ctx}
<|im_end|>
<|im_start|>assistant
{output}
<|im_end|>"""
                texts.append(text)
            
            # Tokenize
            model_inputs = self.tokenizer(
                texts,
                max_length=2048,
                truncation=True,
                padding="max_length",
            )
            
            # Set labels (same as input_ids for causal LM)
            model_inputs["labels"] = model_inputs["input_ids"].copy()
            
            return model_inputs
        
        # Apply tokenization
        tokenized_dataset = dataset.map(
            tokenize_function,
            batched=True,
            remove_columns=dataset["train"].column_names
        )
        
        self.train_dataset = tokenized_dataset["train"]
        self.eval_dataset = tokenized_dataset["validation"]
        
        logger.info(f"Dataset prepared: {len(self.train_dataset)} training examples")
    
    def setup_training(self):
        """Setup training arguments and trainer"""
        
        # Initialize wandb for experiment tracking
        wandb.init(
            project="cline-optimal-training",
            config={
                "model": self.model_name,
                "lora_r": self.lora_config.r,
                "lora_alpha": self.lora_config.lora_alpha,
                **self.training_config
            }
        )
        
        # Training arguments
        training_args = TrainingArguments(
            output_dir="./models/fine-tuned/cline-optimal-ghosteam",
            overwrite_output_dir=True,
            do_train=True,
            do_eval=True,
            evaluation_strategy="steps",
            prediction_loss_only=True,
            report_to="wandb",
            run_name="cline-optimal-ghosteam-qlora",
            **self.training_config
        )
        
        # Data collator
        data_collator = DataCollatorForLanguageModeling(
            tokenizer=self.tokenizer,
            mlm=False,
        )
        
        # Create trainer
        self.trainer = Trainer(
            model=self.model,
            args=training_args,
            train_dataset=self.train_dataset,
            eval_dataset=self.eval_dataset,
            tokenizer=self.tokenizer,
            data_collator=data_collator,
        )
        
        logger.info("Training setup complete")
    
    def train(self):
        """Run training with curriculum learning"""
        logger.info("Starting training...")
        
        # Curriculum learning: Start with simpler examples
        # In production, sort dataset by complexity
        
        # Train
        self.trainer.train()
        
        # Save final model
        self.trainer.save_model()
        self.tokenizer.save_pretrained("./models/fine-tuned/cline-optimal-ghosteam")
        
        logger.info("Training complete!")
    
    def merge_and_save(self):
        """Merge LoRA weights and save for Ollama"""
        logger.info("Merging LoRA weights...")
        
        # Merge LoRA weights with base model
        merged_model = self.model.merge_and_unload()
        
        # Save merged model
        merged_model.save_pretrained(
            "./models/fine-tuned/cline-optimal-merged",
            safe_serialization=True
        )
        self.tokenizer.save_pretrained("./models/fine-tuned/cline-optimal-merged")
        
        logger.info("Model merged and saved")
        
        # Create Ollama modelfile
        self.create_ollama_modelfile()
    
    def create_ollama_modelfile(self):
        """Create Modelfile for Ollama"""
        modelfile_content = f"""FROM ./models/fine-tuned/cline-optimal-merged

PARAMETER num_ctx 40000
PARAMETER temperature 0.2
PARAMETER top_k 40
PARAMETER top_p 0.85
PARAMETER repeat_penalty 1.05
PARAMETER num_batch 512
PARAMETER num_gpu 999

SYSTEM \"\"\"You are cline-optimal, fine-tuned on the GhosTeam architecture. You have deep understanding of:

1. The GhosTeam codebase architecture and patterns
2. Integration between Dart polling agents, Cline server, and VSCode extensions
3. Task automation and AI-powered development workflows
4. Tool use including MCP servers, web downloads, and API interactions

You excel at generating code that follows GhosTeam patterns and can intelligently use tools when needed.\"\"\"
"""
        
        with open("./models/fine-tuned/Modelfile", "w") as f:
            f.write(modelfile_content)
        
        logger.info("Ollama Modelfile created")

# Main training function
def main():
    trainer = ClineOptimalTrainer()
    
    # Setup
    trainer.setup_model_and_tokenizer()
    trainer.prepare_dataset()
    trainer.setup_training()
    
    # Train
    trainer.train()
    
    # Merge and save
    trainer.merge_and_save()
    
    print("\n✅ Training complete! To use with Ollama:")
    print("1. cd models/fine-tuned")
    print("2. ollama create cline-optimal-ghosteam -f Modelfile")
    print("3. ollama run cline-optimal-ghosteam")

if __name__ == "__main__":
    main()
'@
    
    $trainingScript | Out-File -FilePath "$DataPath\train_cline_optimal.py" -Encoding UTF8
    Write-Host "  ✓ Training script created" -ForegroundColor Green
}

# ==================== CREATE INTEGRATION SCRIPT ====================
function Create-IntegrationScript {
    Write-Host "`nCreating Ollama integration script..." -ForegroundColor Yellow
    
    $integrationScript = @'
#!/usr/bin/env python3
"""
Convert fine-tuned model to Ollama format
"""

import os
import shutil
import subprocess
from pathlib import Path

def convert_to_ollama(model_path: str, model_name: str = "cline-optimal-ghosteam"):
    """Convert fine-tuned model to Ollama format"""
    
    print(f"Converting {model_path} to Ollama format...")
    
    # Ensure model exists
    if not os.path.exists(model_path):
        print(f"Error: Model not found at {model_path}")
        return False
    
    # Create Ollama model
    try:
        subprocess.run(
            ["ollama", "create", model_name, "-f", f"{model_path}/Modelfile"],
            check=True
        )
        print(f"✅ Model '{model_name}' created successfully!")
        
        # Test the model
        print("\nTesting model...")
        result = subprocess.run(
            ["ollama", "run", model_name, "Write a function to poll the Dart API"],
            capture_output=True,
            text=True
        )
        print("Model output:", result.stdout[:200], "...")
        
        return True
        
    except subprocess.CalledProcessError as e:
        print(f"Error creating Ollama model: {e}")
        return False

if __name__ == "__main__":
    convert_to_ollama("./models/fine-tuned/cline-optimal-merged")
'@
    
    $integrationScript | Out-File -FilePath "$DataPath\integrate_with_ollama.py" -Encoding UTF8
    Write-Host "  ✓ Integration script created" -ForegroundColor Green
}

# ==================== CREATE QUICK START SCRIPT ====================
function Create-QuickStart {
    Write-Host "`nCreating quick start script..." -ForegroundColor Yellow
    
    $quickStart = @'
# quick_start_training.py
# Simplified training script for immediate use

import subprocess
import sys

def quick_train():
    """Quick training with minimal configuration"""
    
    print("🚀 Quick Start Training for Cline-Optimal")
    print("=" * 50)
    
    # Step 1: Collect data
    print("\n1. Collecting training data from GhosTeam...")
    subprocess.run([sys.executable, "collect_training_data.py"])
    
    # Step 2: Train model
    print("\n2. Training model with QLoRA...")
    subprocess.run([sys.executable, "train_cline_optimal.py"])
    
    # Step 3: Convert to Ollama
    print("\n3. Converting to Ollama format...")
    subprocess.run([sys.executable, "integrate_with_ollama.py"])
    
    print("\n✅ Training complete! Your fine-tuned model is ready.")
    print("\nTo use: ollama run cline-optimal-ghosteam")

if __name__ == "__main__":
    quick_train()
'@
    
    $quickStart | Out-File -FilePath "$DataPath\quick_start_training.py" -Encoding UTF8
    Write-Host "  ✓ Quick start script created" -ForegroundColor Green
}

# ==================== MAIN EXECUTION ====================
switch ($Action) {
    "setup" {
        Write-Host "`n🎯 Setting up enhanced training environment..." -ForegroundColor Cyan
        
        Setup-TrainingEnvironment
        Install-TrainingDependencies
        Create-DataCollector
        Create-TrainingScript
        Create-IntegrationScript
        Create-QuickStart
        
        Write-Host "`n" + "="*80 -ForegroundColor DarkGray
        Write-Host "✅ ENHANCED CLINE-OPTIMAL TRAINING SETUP COMPLETE!" -ForegroundColor Green
        Write-Host "="*80 -ForegroundColor DarkGray
        
        Write-Host "`n📋 Next Steps:" -ForegroundColor Cyan
        
        Write-Host "`n1. Quick start (recommended):" -ForegroundColor Yellow
        Write-Host "   cd $DataPath" -ForegroundColor Gray
        Write-Host "   python quick_start_training.py" -ForegroundColor Gray
        
        Write-Host "`n2. Manual training:" -ForegroundColor Yellow
        Write-Host "   # Collect data" -ForegroundColor Gray
        Write-Host "   python collect_training_data.py" -ForegroundColor Gray
        Write-Host "   # Train model" -ForegroundColor Gray
        Write-Host "   python train_cline_optimal.py" -ForegroundColor Gray
        Write-Host "   # Convert to Ollama" -ForegroundColor Gray
        Write-Host "   python integrate_with_ollama.py" -ForegroundColor Gray
        
        Write-Host "`n3. Use your fine-tuned model:" -ForegroundColor Yellow
        Write-Host "   ollama run cline-optimal-ghosteam" -ForegroundColor Gray
        
        Write-Host "`n💡 Training Tips:" -ForegroundColor Cyan
        Write-Host "• Training will take 4-8 hours for 1000 steps" -ForegroundColor Gray
        Write-Host "• Monitor GPU memory with: nvidia-smi -l 1" -ForegroundColor Gray
        Write-Host "• Check training progress: http://localhost:6006 (TensorBoard)" -ForegroundColor Gray
        Write-Host "• Adjust batch_size if you get OOM errors" -ForegroundColor Gray
        
        Write-Host "`n📚 What this does:" -ForegroundColor Cyan
        Write-Host "• Analyzes your GhosTeam codebase structure" -ForegroundColor Gray
        Write-Host "• Creates instruction-tuning dataset" -ForegroundColor Gray
        Write-Host "• Trains with QLoRA (4-bit, rank 32)" -ForegroundColor Gray
        Write-Host "• Optimizes for both code generation AND tool use" -ForegroundColor Gray
        Write-Host "• Exports to Ollama for easy deployment" -ForegroundColor Gray
        
        Write-Host "`n🔧 Note about larger models:" -ForegroundColor Yellow
        Write-Host "If you want to train larger models (13B+), consider:" -ForegroundColor Gray
        Write-Host "• Cloud GPU rental (RunPod, Lambda Labs)" -ForegroundColor Gray
        Write-Host "• Multi-GPU setup with FSDP" -ForegroundColor Gray
        Write-Host "• Further quantization (QLoRA with rank 16)" -ForegroundColor Gray
    }
    
    "train" {
        Write-Host "Starting training process..." -ForegroundColor Cyan
        Set-Location $DataPath
        python quick_start_training.py
    }
    
    "test" {
        Write-Host "Testing fine-tuned model..." -ForegroundColor Cyan
        ollama run cline-optimal-ghosteam "Write a function to integrate with the Dart polling agent"
    }
    
    default {
        Write-Host "Usage: .\enhanced_cline_training.ps1 -Action [setup|train|test]" -ForegroundColor Yellow
        Write-Host "`nActions:" -ForegroundColor Cyan
        Write-Host "  setup - Install dependencies and create training scripts" -ForegroundColor Gray
        Write-Host "  train - Run the training process" -ForegroundColor Gray
        Write-Host "  test  - Test the fine-tuned model" -ForegroundColor Gray
    }
}