from typing import Callable, Any, NotRequired
from dataclasses import dataclass, Field


@dataclass
class LLMConfig:
    model_size: int
    pipeline_kwargs: dict[str, Any] = Field(default_factory=dict)
    answer_question:Callable[[str], str] = Field(default_factory=lambda: lambda x: x)
    
    @property
    def name(self) -> str:
        return self.pipeline_kwargs.get("model", "Unknown")


SELECTED_LLMS = [
    LLMConfig(
        pipeline_kwargs=dict(
            task="text-generation",
            model="HuggingFaceTB/SmolLM2-360M-Instruct", 
        ),
        model_size=360_000_000),
    LLMConfig(
        pipeline_kwargs=dict(
            task="text-generation",
            model="HuggingFaceTB/SmolLM2-135M-Instruct", 
        ),
        model_size=135_000_000),
    LLMConfig(
        pipeline_kwargs=dict(
            task="text2text-generation",
            model="google/flan-t5-small",
            tokenizer="google/flan-t5-small",
        ),
        model_size=77_000_000),
    LLMConfig(
        pipeline_kwargs=dict(
            task="text2text-generation",
            model="google/flan-t5-base",
            tokenizer="google/flan-t5-base",
        ),
        model_size=783_000_000),
    # LLMConfig(
    #     model="google/gemma-1.1-2b-it",
    #     n_parameters=2_000_000_000
    # ),
    LLMConfig(
        pipeline_kwargs=dict(
            task="text-generation",
            model="google/gemma-2-2b-it",
            tokenizer="google/gemma-2-2b-it",
        ),
        model_size=2_000_000_000
    ),
    LLMConfig(
        pipeline_kwargs=dict(
            task="text-generation",
            model="Qwen/Qwen2.5-1.5B-Instruct",
            tokenizer="Qwen/Qwen2.5-1.5B-Instruct",
        ),
        model_size=1_540_000_000
    ),
    # LLMConfig(
    #     pipeline_kwargs=dict(
    #         task="text-generation",
    #         model="microsoft/Phi-3.5-Mini-4k-instruct",
    #         tokenizer="microsoft/Phi-3.5-Mini-4k-instruct",
    #     ),
    #     model_size=3_820_000_000
    # )

# Non selected LLMs:
# - "kyutai/helium-1-preview-2b", 
# - "mistralai/Mistral-7B-Instruct-v0.3", # Memory overload
# - "meta-llama/Llama-3.2-1B", "torch_dtype":torch.float16, "device_map":"auto"
# - "gpt2"
# - "gpt2-large"
# - "TinyLlama/TinyLlama-1.1B-Chat-v1.0", # forever running
]






