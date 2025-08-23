# # qwen_model.py
# import os
# from pathlib import Path
# from transformers import AutoTokenizer
# from modelscope import snapshot_download, AutoModelForCausalLM

# # Define local path for model
# MODEL_DIR = Path(r"C:\Users\VRAJ\OneDrive\Desktop\Khushi\expense_tracker\ex_backend\qwen_model\qwen\Qwen-VL-Chat")
# MODEL_NAME = "qwen/Qwen-VL-Chat"

# model = AutoModelForCausalLM.from_pretrained(
#     str(MODEL_DIR),
#     # device_map="auto",
#     trust_remote_code=True,
#     offload_folder="./model_offload"  # or any folder path you want
# ).eval()

# # Load model and tokenizer
# print("Checking model directory:", MODEL_DIR)
# print("Files inside:", os.listdir(MODEL_DIR))

# print("Loading Qwen-VL-Chat model from local directory...")
# tokenizer = AutoTokenizer.from_pretrained(
#     str(MODEL_DIR), trust_remote_code=True
# )

# model = AutoModelForCausalLM.from_pretrained(
#     str(MODEL_DIR), device_map="auto", trust_remote_code=True
# ).eval()

# import os
# from pathlib import Path
# from transformers import AutoTokenizer
# from modelscope import AutoModelForCausalLM

# # Define local path
# MODEL_DIR = Path(r"C:\Users\VRAJ\OneDrive\Desktop\Khushi\expense_tracker\ex_backend\qwen_model\qwen\Qwen-VL-Chat")

# # Debug info
# print("Checking model directory:", MODEL_DIR)
# print("Files inside:", os.listdir(MODEL_DIR))

# # Load tokenizer
# tokenizer = AutoTokenizer.from_pretrained(
#     str(MODEL_DIR), trust_remote_code=True
# )

# # Load model
# model = AutoModelForCausalLM.from_pretrained(
#     str(MODEL_DIR),
#     device_map="auto",
#     trust_remote_code=True,
#     offload_folder="./model_offload",  # optional if low on memory
#     offload_state_dict=True,
# ).eval()

# import os
# from pathlib import Path
# from transformers import AutoTokenizer
# from modelscope import AutoModelForCausalLM
# from accelerate import load_checkpoint_and_dispatch

# # Define model path
# MODEL_DIR = Path(r"C:\Users\VRAJ\OneDrive\Desktop\Khushi\expense_tracker\ex_backend\qwen_model\qwen\Qwen-VL-Chat")

# # Debug output
# print("Checking model directory:", MODEL_DIR)
# print("Files inside:", os.listdir(MODEL_DIR))

# # Load tokenizer
# tokenizer = AutoTokenizer.from_pretrained(
#     str(MODEL_DIR),
#     trust_remote_code=True
# )

# # Load model with full disk offloading (safe for low RAM/VRAM)
# print("Loading Qwen-VL-Chat model with full disk offload...")

# # Load config first
# model = AutoModelForCausalLM.from_config(
#     pretrained_model_name_or_path=str(MODEL_DIR),
#     trust_remote_code=True
# )

# # Dispatch model with offloading
# model = load_checkpoint_and_dispatch(
#     model,
#     checkpoint=str(MODEL_DIR),
#     device_map="auto",
#     offload_folder="./model_offload",  # you can change path
#     offload_state_dict=True
# ).eval()

# import os
# from pathlib import Path
# from transformers import AutoTokenizer, AutoConfig
# from modelscope import AutoModelForCausalLM
# from accelerate import load_checkpoint_and_dispatch

# # Model path
# MODEL_DIR = Path(r"C:\Users\VRAJ\OneDrive\Desktop\Khushi\expense_tracker\ex_backend\qwen_model\qwen\Qwen-VL-Chat")

# # Debug: Show files
# print("Checking model directory:", MODEL_DIR)
# print("Files inside:", os.listdir(MODEL_DIR))

# # Load tokenizer
# tokenizer = AutoTokenizer.from_pretrained(str(MODEL_DIR), trust_remote_code=True)

# # Load model config first
# config = AutoConfig.from_pretrained(str(MODEL_DIR), trust_remote_code=True)

# # Create empty model from config
# model = AutoModelForCausalLM.from_config(config, trust_remote_code=True)

# # Dispatch model with disk offload
# model = load_checkpoint_and_dispatch(
#     model,
#     checkpoint=str(MODEL_DIR),
#     device_map="auto",
#     offload_folder="./model_offload",
#     offload_state_dict=True
# ).eval()

# from transformers import AutoTokenizer, AutoModelForCausalLM
# from accelerate import load_checkpoint_and_dispatch
# from pathlib import Path
# import os

# # Define model path
# MODEL_DIR = Path(r"C:\Users\VRAJ\OneDrive\Desktop\Khushi\expense_tracker\ex_backend\qwen_model\qwen\Qwen-VL-Chat")

# # Debug output
# print("Checking model directory:", MODEL_DIR)
# print("Files inside:", os.listdir(MODEL_DIR))

# # Load tokenizer
# tokenizer = AutoTokenizer.from_pretrained(
#     str(MODEL_DIR),
#     trust_remote_code=True
# )

# # Load model with full disk offload
# print("Loading Qwen-VL-Chat model with full disk offload...")

# model = AutoModelForCausalLM.from_pretrained(
#     str(MODEL_DIR),
#     trust_remote_code=True
# )

# # Apply offloading
# model = load_checkpoint_and_dispatch(
#     model,
#     checkpoint=str(MODEL_DIR),
#     device_map="auto",
#     offload_folder="./model_offload",
#     offload_state_dict=True
# ).eval()

# from transformers import AutoTokenizer
# from modelscope import AutoModelForCausalLM
# from accelerate import load_checkpoint_and_dispatch
# from pathlib import Path

# MODEL_DIR = Path(r"C:\Users\VRAJ\OneDrive\Desktop\Khushi\expense_tracker\ex_backend\qwen_model\qwen\Qwen-VL-Chat")

# model = None
# tokenizer = None

# def load_model():
#     global model, tokenizer
#     if model is None or tokenizer is None:
#         print("⏳ Loading Qwen-VL-Chat model...")
#         tokenizer = AutoTokenizer.from_pretrained(str(MODEL_DIR), trust_remote_code=True)
#         base_model = AutoModelForCausalLM.from_pretrained(str(MODEL_DIR), trust_remote_code=True)
#         model = load_checkpoint_and_dispatch(
#             base_model,
#             checkpoint=str(MODEL_DIR),
#             device_map="auto",
#             offload_folder="./model_offload",
#             offload_state_dict=True
#         ).eval()
#         print("✅ Qwen model loaded!")

# from pathlib import Path
# from transformers import AutoTokenizer
# from modelscope import AutoModelForCausalLM
# from accelerate import load_checkpoint_and_dispatch

# MODEL_DIR = Path(r"C:\Users\VRAJ\OneDrive\Desktop\Khushi\expense_tracker\ex_backend\qwen_model\qwen\Qwen-VL-Chat")

# model = None
# tokenizer = None

# def load_model():
#     global model, tokenizer

#     if model is None or tokenizer is None:
#         print("⏳ Loading Qwen-VL-Chat model...")
        
#         tokenizer = AutoTokenizer.from_pretrained(
#             str(MODEL_DIR),
#             trust_remote_code=True
#         )

#         base_model = AutoModelForCausalLM.from_pretrained(
#             str(MODEL_DIR),
#             trust_remote_code=True
#         )

#         model_with_offload = load_checkpoint_and_dispatch(
#             base_model,
#             checkpoint=str(MODEL_DIR),
#             device_map="auto",
#             offload_folder="./model_offload",
#             offload_state_dict=True
#         ).eval()

#         model = model_with_offload

#         print("✅ Qwen-VL-Chat model loaded successfully!")


# from pathlib import Path
# from transformers import AutoProcessor, Qwen2_5_VLForConditionalGeneration
# import torch

# MODEL_DIR = Path(r"C:\Users\VRAJ\OneDrive\Desktop\Khushi\expense_tracker\ex_backend\qwen_model\qwen\Qwen-VL-Chat")

# model = None
# processor = None

# def load_model():
#     global model, processor

#     if model is None or processor is None:
#         print("⏳ Loading Qwen-VL-Chat model...")

#         model = Qwen2_5_VLForConditionalGeneration.from_pretrained(
#             str(MODEL_DIR),
#             torch_dtype=torch.float16,
#             device_map="cuda:0",
#             trust_remote_code=True
#         )

#         processor = AutoProcessor.from_pretrained(
#             str(MODEL_DIR),
#             trust_remote_code=True
#         )

#         print("✅ Qwen-VL-Chat model and processor loaded successfully!")

# from pathlib import Path
# from modelscope import AutoModelForCausalLM
# from transformers import AutoTokenizer, AutoProcessor
# import torch

# MODEL_DIR = Path(r"C:\Users\VRAJ\OneDrive\Desktop\Khushi\expense_tracker\ex_backend\qwen_model\qwen\Qwen-VL-Chat")

# model = None
# processor = None

# def load_model():
#     global model, processor

#     if model is None or processor is None:
#         print("⏳ Loading Qwen-VL-Chat model...")

#         processor = AutoProcessor.from_pretrained(str(MODEL_DIR), trust_remote_code=True)

#         base_model = AutoModelForCausalLM.from_pretrained(
#             str(MODEL_DIR),
#             trust_remote_code=True,
#             torch_dtype=torch.float16,
#             device_map="auto"
#         )

#         model = base_model.eval()

#         print("✅ Qwen-VL-Chat model and processor loaded successfully!")

# from pathlib import Path
# from modelscope import AutoModelForCausalLM
# from transformers import AutoTokenizer, AutoProcessor
# import torch

# MODEL_DIR = Path(r"C:\Users\VRAJ\OneDrive\Desktop\Khushi\expense_tracker\ex_backend\qwen_model\qwen\Qwen-VL-Chat")

# model = None
# processor = None

# def load_model():
#     global model, processor

#     if model is None or processor is None:
#         print("⏳ Loading Qwen-VL-Chat model...")

#         processor = AutoProcessor.from_pretrained(str(MODEL_DIR), trust_remote_code=True)


#         base_model = AutoModelForCausalLM.from_pretrained(
#             str(MODEL_DIR),
#             trust_remote_code=True,
#             torch_dtype=torch.float16,
#             device_map="auto",
#             offload_folder="./model_offload",  # ✅ REQUIRED!
#             offload_state_dict=True            # ✅ To support state dict offloading
#         )

#         model = base_model.eval()

#         print("✅ Qwen-VL-Chat model and processor loaded successfully!")

# from pathlib import Path
# from modelscope import AutoModelForCausalLM
# from transformers import AutoProcessor
# from accelerate import disk_offload
# import torch
# import os

# MODEL_DIR = Path(r"C:\Users\VRAJ\OneDrive\Desktop\Khushi\expense_tracker\ex_backend\qwen_model\qwen\Qwen-VL-Chat")

# model = None
# processor = None

# def load_model():
#     global model, processor

#     if model is None or processor is None:
#         print("⏳ Loading Qwen-VL-Chat model...")

#         processor = AutoProcessor.from_pretrained(str(MODEL_DIR), trust_remote_code=True)

#         offload_path = "./model_offload"
#         os.makedirs(offload_path, exist_ok=True)

#         base_model = AutoModelForCausalLM.from_pretrained(
#             str(MODEL_DIR),
#             trust_remote_code=True,
#             torch_dtype=torch.float16
#         )

#         model = disk_offload(
#             base_model,
#             offload_dir=offload_path,
#             device="cpu"  # or "cuda" if you want to keep some layers on GPU
#         ).eval()

#         print("✅ Qwen-VL-Chat model loaded with full disk offloading!")

# def load_model():
#     global model, processor

#     if model is None or processor is None:
#         print("⏳ Loading Qwen-VL-Chat model...")
#         try:
#             processor = AutoProcessor.from_pretrained(str(MODEL_DIR), trust_remote_code=True)
#             # base_model = AutoModelForCausalLM.from_pretrained(
#             #     str(MODEL_DIR),
#             #     trust_remote_code=True,
#             #     torch_dtype=torch.float16,
#             #     device_map="auto"
#             # )
#             base_model = AutoModelForCausalLM.from_pretrained(
#                         str(MODEL_DIR),
#                         trust_remote_code=True,
#                         torch_dtype=torch.float16,
#                         device_map="auto",
#                         offload_folder="./model_offload"  # ✅ ADD THIS
#             )

#             model = base_model.eval()
#             print("✅ Qwen-VL-Chat model loaded successfully!")
#         except Exception as e:
#             print("❌ Error loading Qwen model:", str(e))

# def load_model():
#     global model, processor

#     if model is None or processor is None:
#         print("⏳ Loading Qwen-VL-Chat model...")
#         try:
#             processor = AutoProcessor.from_pretrained(str(MODEL_DIR), trust_remote_code=True)

#             base_model = AutoModelForCausalLM.from_pretrained(
#                 str(MODEL_DIR),
#                 trust_remote_code=True,
#                 torch_dtype=torch.float16,
#                 device_map="auto",
#                 offload_folder="./model_offload"  # ✅ required
#             )

#             model = base_model.eval()
#             print("✅ Qwen-VL-Chat model loaded successfully!")

#         except Exception as e:
#             print("❌ Error loading Qwen model:", str(e))
#             processor = None
#             model = None

# from accelerate import disk_offload
# from modelscope import AutoModelForCausalLM
# from transformers import AutoProcessor
# import torch
# from pathlib import Path

# MODEL_DIR = Path(r"C:\Users\VRAJ\OneDrive\Desktop\Khushi\expense_tracker\ex_backend\qwen_model\qwen\Qwen-VL-Chat")

# model = None
# processor = None

# def load_model():
#     global model, processor

#     if model is None or processor is None:
#         print("⏳ Loading Qwen-VL-Chat model...")
#         try:
#             processor = AutoProcessor.from_pretrained(str(MODEL_DIR), trust_remote_code=True)

#             base_model = AutoModelForCausalLM.from_pretrained(
#                 str(MODEL_DIR),
#                 trust_remote_code=True,
#                 torch_dtype=torch.float16,
#                 device_map="auto"
#             )

#             # ✅ Offload to disk properly
#             model = disk_offload(base_model, offload_dir="./model_offload", offload_state_dict=True)
#             model.eval()

#             print("✅ Qwen-VL-Chat model loaded successfully!")

#         except Exception as e:
#             print("❌ Error loading Qwen model:", str(e))
#             processor = None
#             model = None

from accelerate import init_empty_weights, load_checkpoint_and_dispatch
from modelscope import AutoModelForCausalLM
from transformers import AutoProcessor
from pathlib import Path
import torch
import os

MODEL_DIR = Path(r"C:\Users\VRAJ\OneDrive\Desktop\Khushi\expense_tracker\ex_backend\qwen_model\qwen\Qwen-VL-Chat")

model = None
processor = None
from pathlib import Path
from transformers import AutoProcessor
from modelscope import AutoModelForCausalLM
from accelerate import init_empty_weights, load_checkpoint_and_dispatch
import torch
import os

MODEL_DIR = Path(r"C:\Users\VRAJ\OneDrive\Desktop\Khushi\expense_tracker\ex_backend\qwen_model\qwen\Qwen-VL-Chat")

model = None
processor = None

def load_qwen_model():
    global model, processor

    if model is not None and processor is not None:
        return

    print("⏳ Loading Qwen-VL-Chat (CPU + disk offload) ...")

    try:
        processor = AutoProcessor.from_pretrained(
            str(MODEL_DIR),
            trust_remote_code=True
        )
        print('Processor part is done')
        
        # Offload model weights to disk using accelerate
        from transformers import AutoConfig

        with init_empty_weights():
            config = AutoConfig.from_pretrained(str(MODEL_DIR), trust_remote_code=True)
            model_init = AutoModelForCausalLM.from_config(config, trust_remote_code=True)

        model = load_checkpoint_and_dispatch(
            model_init,
            checkpoint=str(MODEL_DIR),
            device_map={"": "cpu"},
            offload_folder="./model_offload",  # ✅ Save here
            offload_state_dict=True
        )
        
        model.eval()
        print('MOdel is :',model)
        print('Processor is :',processor)
        print("✅ Qwen-VL-Chat loaded with CPU+Disk!")

    except Exception as e:
        print("❌ Error loading Qwen-VL-Chat:", str(e))
        model = None
        processor = None

# def load_model():
#     global model, processor

#     if model is not None and processor is not None:
#         return

#     print("⏳ Loading Qwen-VL-Chat model...")

#     try:
#         processor = AutoProcessor.from_pretrained(str(MODEL_DIR), trust_remote_code=True)

#         import torch

#         if torch.cuda.is_available():
#             print("✅ GPU available")
#             print("VRAM:", torch.cuda.get_device_properties(0).total_memory / (1024**3), "GB")
#         else:
#             print("❌ No GPU detected")

#         model = AutoModelForCausalLM.from_pretrained(
#             str(MODEL_DIR),
#             trust_remote_code=True,
#             # device_map="cpu",
#             device_map={"": "cpu"}  ,
#             offload_folder="./model_offload",  # ✅ This is mandatory
#             torch_dtype=torch.float16
#         )

#         model.eval()
#         print("✅ Qwen-VL-Chat model loaded successfully!")

#     except Exception as e:
#         print("❌ Error loading Qwen model:", str(e))
#         model = None
#         processor = None
