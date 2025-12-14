import os
from src.types import LLMConfig
from transformers import pipeline, Pipeline

PROMPT = """You are participating in a trivia contest. Answer the following question: {question}"""

    
def get_name(llm_config:LLMConfig) -> str:
    return llm_config.pipeline_kwargs.get("model", "Unknown")


def load_pipeline(llm_config: LLMConfig) -> Pipeline:
    llm_name = get_name(llm_config)
    model_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "models", llm_name)
    print(model_path)
    try:
        return pipeline(
            **{**llm_config.pipeline_kwargs, **{"model":model_path}}
        )
    except Exception as e:
        print(f"Can't load locally pipeline for {llm_name}: {e}. Downloading it.")
        pipe = pipeline(
            **llm_config.pipeline_kwargs
        )
        pipe.save_pretrained(model_path)
        print(f"Saved pipeline for {llm_name}")
        return pipe
