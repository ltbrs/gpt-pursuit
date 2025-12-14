import pandas as pd
import os

def get_questions_df()->pd.DataFrame:
        
    SHEET_NAMES = [
        "Trivia",
        "Smarther Than a 5th Grader",
        "Question Needs Category Removed",
        # "Millionaire - Easy Q", 
        # "Millionaire - Hard Q"
        ]

    datasets = {}
    for sheet_name in SHEET_NAMES:
        datasets[sheet_name] = pd.read_excel(os.path.join(os.path.dirname(os.path.dirname(__file__)), "data", "Trivia-Printable.xlsx"), sheet_name=sheet_name)
    concatenated_df = pd.DataFrame()
    for sheet_name in SHEET_NAMES:
        if sheet_name == "Question Needs Category Removed":
            new_df= datasets[sheet_name]
            new_df["Sheet Name"] = sheet_name
            concatenated_df = pd.concat([concatenated_df, datasets[sheet_name]], axis=0, ignore_index=True)
            continue
        for suffix in ["", ".1", ".2"]:
            new_df = datasets[sheet_name][["Question" + suffix, "Answer" + suffix]]
            new_df.columns = ["Question", "Answer"]
            if "Category"+suffix in datasets[sheet_name].columns:
                new_df["Category"] = datasets[sheet_name]["Category"+suffix]
            new_df = new_df.copy()
            new_df.loc[:, 'Sheet Name'] = sheet_name
            concatenated_df = pd.concat([concatenated_df, new_df], axis=0, ignore_index=True)

    concatenated_df['Category'] = concatenated_df['Category'].apply(lambda x: x.strip() if isinstance(x, str) else x)
    concatenated_df['Category'] = concatenated_df['Category'].replace(
        {"Mathematics": "Mathematics & Geometry", 
        "Science": "Science", "History": "History", "Geography": "Geography", "Art": "Art", "Music": "Music", "Literature": "Literature", "Other": "Other"}
    )
    concatenated_df['id'] = range(1, len(concatenated_df) + 1)
    return concatenated_df