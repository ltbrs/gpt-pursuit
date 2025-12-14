from datetime import datetime
from src.types import Question
import os 
import json

ANSWER_FOLDER = os.path.join(
    os.path.dirname(
    os.path.dirname(__file__)) , "data","answers")

BATCH_SIZE = 5

def save_answers(questions:list[Question])->None:
    json.dump(
        questions,
        open(os.path.join(ANSWER_FOLDER, f"{datetime.now().strftime('%Y-%m-%d_%H-%M-%S')}.json"), "w"),
        indent=4)
    

def load_answered_questions()->list[Question]:
    questions:list[Question] = []
    for dirpath, dirname, filenames in os.walk(ANSWER_FOLDER):
        for filename in filenames:
            if filename.endswith(".json"):
                with open(os.path.join(dirpath, filename), "r") as f:
                    questions.extend(json.load(f))
    return questions

def get_missing_question_ids(
    answered_questions:list[Question],
    question_ids:list[int])->list[int]:
    answered_ids = [question['id'] for question in answered_questions]
    return [question_id for question_id in question_ids if question_id not in answered_ids]


