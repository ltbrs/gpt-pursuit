import os
import gc
import torch
from src.types import LLMConfig
from transformers import pipeline, Pipeline

def get_name(llm_config:LLMConfig) -> str:
    return llm_config['pipeline_kwargs'].get("model", "Unknown")


def clear_gpu_memory():
    """Clear GPU memory between model loads."""
    gc.collect()
    if torch.cuda.is_available():
        torch.cuda.empty_cache()
        torch.cuda.synchronize()


def get_device() -> str:
    """Get the best available device."""
    if torch.cuda.is_available():
        return "cuda"
    return "cpu"


def load_pipeline(llm_config: LLMConfig) -> Pipeline:
    llm_name = get_name(llm_config)
    model_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "models", llm_name)
    print(model_path)
    
    device = get_device()
    print(f"Device set to use {device}")
    
    try:
        pipe = pipeline(
            **{**llm_config["pipeline_kwargs"], **{"model": model_path}},
            device=device
        )
        return pipe
    except Exception as e:
        print(f"Can't load locally pipeline for {llm_name}: {e}. Downloading it.")
        pipe = pipeline(
            **llm_config["pipeline_kwargs"],
            device=device
        )
        pipe.save_pretrained(model_path)
        print(f"Saved pipeline for {llm_name}")
        return pipe


def unload_pipeline(pipe: Pipeline):
    """Explicitly unload a pipeline and free memory."""
    del pipe
    clear_gpu_memory()
