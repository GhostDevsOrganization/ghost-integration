# setup_training_fixed.py
# Fixed version that works with your existing PyTorch installation

import os
import subprocess
import sys
from pathlib import Path

def setup_training_environment():
    """Setup training environment for cline-optimal"""
    
    print("🚀 Setting up Cline-Optimal Training Environment")
    print("=" * 60)
    
    # Configuration
    data_path = Path("C:/AI_Training")
    ghosteam_path = Path("C:/Users/avion/OneDrive/Documents/GitHub/ghosteam")
    
    # Create directories
    print("\n1. Creating directory structure...")
    directories = [
        data_path / "models" / "base",
        data_path / "models" / "fine-tuned",
        data_path / "models" / "checkpoints",
        data_path / "datasets" / "ghosteam",
        data_path / "datasets" / "processed",
        data_path / "training" / "logs",
    ]
    
    for dir_path in directories:
        dir_path.mkdir(parents=True, exist_ok=True)
        print(f"  ✓ Created: {dir_path}")
    
    # Check existing installations
    print("\n2. Checking existing installations...")
    try:
        import torch
        print(f"  ✓ PyTorch {torch.__version__} already installed")
        print(f"  ✓ CUDA available: {torch.cuda.is_available()}")
        if torch.cuda.is_available():
            print(f"  ✓ GPU: {torch.cuda.get_device_name(0)}")
    except ImportError:
        print("  ✗ PyTorch not found, installing...")
        subprocess.check_call([
            sys.executable, "-m", "pip", "install", 
            "torch", "torchvision", "torchaudio", 
            "--index-url", "https://download.pytorch.org/whl/cu121"
        ])
    
    # Install only missing dependencies
    print("\n3. Installing additional dependencies...")
    packages = [
        "transformers",
        "accelerate",
        "peft",
        "bitsandbytes",
        "datasets",
        "wandb",
        "tqdm",
        "pandas",
        "gitpython"
    ]
    
    for package in packages:
        try:
            __import__(package.split('==')[0])
            print(f"  ✓ {package} already installed")
        except ImportError:
            print(f"  Installing {package}...")
            subprocess.check_call([sys.executable, "-m", "pip", "install", package])
    
    # Create simple data collector
    print("\n4. Creating data collection script...")
    data_collector_code = '''
import os
import json
from pathlib import Path
import pandas as pd
from datasets import Dataset, DatasetDict
from tqdm import tqdm

class SimpleDataCollector:
    """Simplified data collector for GhosTeam"""
    
    def __init__(self, ghosteam_path, output_path):
        self.ghosteam_path = Path(ghosteam_path)
        self.output_path = Path(output_path)
        
    def collect_python_files(self):
        """Collect all Python files from GhosTeam"""
        print("Collecting Python files...")
        data = []
        
        # Try the provided path first
        if not self.ghosteam_path.exists():
            # Try alternative path without 'ghosteam' at the end
            alt_path = self.ghosteam_path.parent
            if alt_path.exists():
                print(f"Using alternative path: {alt_path}")
                self.ghosteam_path = alt_path
        
        for py_file in self.ghosteam_path.rglob("*.py"):
            if "__pycache__" in str(py_file) or ".venv" in str(py_file):
                continue
                
            try:
                content = py_file.read_text(encoding='utf-8')
                
                # Simple function extraction
                lines = content.split('\\n')
                current_function = []
                in_function = False
                indent_level = 0
                
                for i, line in enumerate(lines):
                    if line.strip().startswith('def '):
                        if current_function:
                            # Save previous function
                            func_content = '\\n'.join(current_function)
                            func_name = current_function[0].split('(')[0].replace('def ', '').strip()
                            data.append({
                                'instruction': f"Write a function named {func_name}",
                                'input': f"File: {py_file.name}",
                                'output': func_content
                            })
                        current_function = [line]
                        in_function = True
                        indent_level = len(line) - len(line.lstrip())
                    elif in_function:
                        # Check if we're still in the function
                        if line.strip() and not line[0].isspace():
                            # New top-level statement, function ended
                            if current_function:
                                func_content = '\\n'.join(current_function)
                                func_name = current_function[0].split('(')[0].replace('def ', '').strip()
                                data.append({
                                    'instruction': f"Write a function named {func_name}",
                                    'input': f"File: {py_file.name}",
                                    'output': func_content
                                })
                            current_function = []
                            in_function = False
                        else:
                            current_function.append(line)
                
                # Don't forget the last function
                if current_function:
                    func_content = '\\n'.join(current_function)
                    func_name = current_function[0].split('(')[0].replace('def ', '').strip()
                    data.append({
                        'instruction': f"Write a function named {func_name}",
                        'input': f"File: {py_file.name}",
                        'output': func_content
                    })
                        
            except Exception as e:
                print(f"Error processing {py_file}: {e}")
                
        print(f"Collected {len(data)} functions")
        return data
    
    def create_dataset(self):
        """Create training dataset"""
        data = self.collect_python_files()
        
        if not data:
            print("No data collected! Creating sample data...")
            # Create some sample data
            data = [
                {
                    'instruction': 'Write a hello world function',
                    'input': 'Create a simple greeting function',
                    'output': 'def hello_world():\\n    print("Hello, World!")'
                },
                {
                    'instruction': 'Write a function to add two numbers',
                    'input': 'Create a function that adds two numbers',
                    'output': 'def add_numbers(a, b):\\n    return a + b'
                }
            ]
            
        # Convert to DataFrame
        df = pd.DataFrame(data)
        
        # Split into train/validation
        train_size = int(0.9 * len(df))
        train_df = df[:train_size]
        val_df = df[train_size:] if train_size < len(df) else df[:1]  # Ensure we have at least one validation sample
        
        # Create dataset
        dataset_dict = DatasetDict({
            'train': Dataset.from_pandas(train_df),
            'validation': Dataset.from_pandas(val_df)
        })
        
        # Save dataset
        output_dir = self.output_path / "datasets" / "processed" / "ghosteam_training"
        dataset_dict.save_to_disk(str(output_dir))
        print(f"Dataset saved to {output_dir}")
        
        return dataset_dict

if __name__ == "__main__":
    collector = SimpleDataCollector(
        ghosteam_path="C:/Users/avion/OneDrive/Documents/GitHub/ghosteam",
        output_path="C:/AI_Training"
    )
    collector.create_dataset()
'''
    
    collector_path = data_path / "collect_data.py"
    collector_path.write_text(data_collector_code)
    print(f"  ✓ Created: {collector_path}")
    
    # Create simple training script
    print("\n5. Creating training script...")
    training_code = '''
import torch
from transformers import (
    AutoModelForCausalLM,
    AutoTokenizer,
    TrainingArguments,
    Trainer,
    BitsAndBytesConfig
)
from peft import LoraConfig, get_peft_model, prepare_model_for_kbit_training
from datasets import load_from_disk
import os

print("Starting Cline-Optimal QLoRA Training")
print("=" * 50)

# Configuration
model_name = "microsoft/phi-2"  # Smaller, efficient model that works well
data_path = "C:/AI_Training/datasets/processed/ghosteam_training"
output_dir = "C:/AI_Training/models/fine-tuned/cline-optimal-ghosteam"

# Check if CUDA is available
if not torch.cuda.is_available():
    print("WARNING: CUDA not available, using CPU (will be slow!)")
else:
    print(f"Using GPU: {torch.cuda.get_device_name(0)}")

# QLoRA config for RTX 3090
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.float16,
    bnb_4bit_use_double_quant=True,
)

try:
    # Load model
    print("Loading model...")
    model = AutoModelForCausalLM.from_pretrained(
        model_name,
        quantization_config=bnb_config,
        device_map="auto",
        trust_remote_code=True,
        torch_dtype=torch.float16,
    )
    
    # Load tokenizer
    tokenizer = AutoTokenizer.from_pretrained(model_name, trust_remote_code=True)
    if tokenizer.pad_token is None:
        tokenizer.pad_token = tokenizer.eos_token
    
    # Prepare for training
    model = prepare_model_for_kbit_training(model)
    
    # LoRA config - optimized for RTX 3090
    lora_config = LoraConfig(
        r=16,
        lora_alpha=32,
        target_modules=["q_proj", "k_proj", "v_proj", "dense"],
        lora_dropout=0.05,
        bias="none",
        task_type="CAUSAL_LM"
    )
    
    # Add LoRA
    model = get_peft_model(model, lora_config)
    model.print_trainable_parameters()
    
    # Load dataset
    print("Loading dataset...")
    dataset = load_from_disk(data_path)
    
    def tokenize_function(examples):
        texts = []
        for instruction, input_ctx, output in zip(
            examples['instruction'], 
            examples['input'], 
            examples['output']
        ):
            text = f"### Instruction: {instruction}\\n### Input: {input_ctx}\\n### Response: {output}"
            texts.append(text)
        
        model_inputs = tokenizer(texts, max_length=512, truncation=True, padding=True)
        model_inputs["labels"] = model_inputs["input_ids"].copy()
        return model_inputs
    
    # Tokenize dataset
    tokenized_dataset = dataset.map(tokenize_function, batched=True)
    
    # Training arguments - conservative for RTX 3090
    training_args = TrainingArguments(
        output_dir=output_dir,
        num_train_epochs=1,
        per_device_train_batch_size=1,
        gradient_accumulation_steps=4,
        warmup_steps=10,
        logging_steps=10,
        save_steps=50,
        evaluation_strategy="steps",
        eval_steps=50,
        save_total_limit=2,
        load_best_model_at_end=True,
        fp16=True,
        gradient_checkpointing=True,
        optim="adamw_torch",
        learning_rate=2e-4,
    )
    
    # Create trainer
    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=tokenized_dataset["train"],
        eval_dataset=tokenized_dataset["validation"],
        tokenizer=tokenizer,
    )
    
    # Train
    print("Starting training...")
    print("This will take some time. Monitor GPU usage with: nvidia-smi -l 1")
    trainer.train()
    
    # Save model
    print("Saving model...")
    trainer.save_model()
    tokenizer.save_pretrained(output_dir)
    
    print("Training complete!")
    print(f"Model saved to: {output_dir}")
    
except Exception as e:
    print(f"Error during training: {e}")
    print("\\nTroubleshooting tips:")
    print("1. Make sure you have enough GPU memory (monitor with nvidia-smi)")
    print("2. Try reducing batch_size or model size")
    print("3. Ensure all dependencies are installed correctly")
'''
    
    training_path = data_path / "train_model.py"
    training_path.write_text(training_code)
    print(f"  ✓ Created: {training_path}")
    
    # Create test script
    print("\n6. Creating test script...")
    test_code = '''
import torch
print(f"PyTorch version: {torch.__version__}")
print(f"CUDA available: {torch.cuda.is_available()}")
if torch.cuda.is_available():
    print(f"GPU: {torch.cuda.get_device_name(0)}")
    print(f"GPU memory: {torch.cuda.get_device_properties(0).total_memory / 1024**3:.1f} GB")

try:
    import transformers
    print(f"Transformers version: {transformers.__version__}")
except:
    print("Transformers not installed")

try:
    import peft
    print("PEFT: Installed")
except:
    print("PEFT not installed")

try:
    import bitsandbytes as bnb
    print("Bitsandbytes: Installed")
except:
    print("Bitsandbytes not installed")
'''
    
    test_path = data_path / "test_setup.py"
    test_path.write_text(test_code)
    print(f"  ✓ Created: {test_path}")
    
    print("\n✅ Setup complete!")
    print("\n📋 Next Steps:")
    print("1. Test your setup:")
    print(f"   python {test_path}")
    print("\n2. Collect training data:")
    print(f"   python {data_path / 'collect_data.py'}")
    print("\n3. Train the model:")
    print(f"   python {data_path / 'train_model.py'}")
    
    print("\n💡 Tips:")
    print("  • The scripts will work with your existing PyTorch 2.5.1")
    print("  • Training uses microsoft/phi-2 (2.7B params) - perfect for RTX 3090")
    print("  • Monitor GPU: nvidia-smi -l 1")
    print("  • If OOM, reduce batch_size in train_model.py")
    
    # Run test automatically
    print("\n🧪 Running quick test...")
    os.system(f"python {test_path}")

if __name__ == "__main__":
    setup_training_environment()