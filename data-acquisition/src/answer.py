import os
from .llm import LLMConfig
from transformers import pipeline, Pipeline

PROMPT = """You are participating in a trivia contest. Answer the following question: {question}"""

def load_pipeline(llm_config: LLMConfig) -> Pipeline:
    model_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "models", llm_config.name)
    print(model_path)
    try:
        return pipeline(
            **{**llm_config.pipeline_kwargs, **{"model":model_path}}
        )
    except Exception as e:
        print(f"Can't load locally pipeline for {llm_config.name}: {e}. Downloading it.")
        pipe = pipeline(
            **llm_config.pipeline_kwargs
        )
        pipe.save_pretrained(model_path)
        print(f"Saved pipeline for {llm_config.name}")
        return pipe


def answer_questions(questions: list[str], llm_config: LLMConfig) -> list[str]:
    pipe = load_pipeline(llm_config)
    return [pipe(
        [{"role": "user", "content": PROMPT.format(question=question)}]
    ) for question in questions]

def llms_answer_questions(questions: list[str], llms: list[LLMConfig]) -> list[list[str]]:
    return [answer_questions(questions, llm) for llm in llms]
