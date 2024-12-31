# gpt-pursuit
Compete against LLM at Trival Pursuit.

# Battle Plan

1. Gather data:
   - https://opentdb.com/
   - https://drive.google.com/file/d/0Bzs-xvR-5hQ3SGdxNXpWVHFNWG8/view?resourcekey=0-5QvXBiHQPm_KmkhXP9RO8g
   - https://drive.google.com/file/d/0Bzs-xvR-5hQ3WktpWVA2RmROY1U/view?resourcekey=0-u03CutV7Ye9rxiuUE8c_UQ
2. Make challenger LLM respond to each questions
3. LLM evaluator:
   - For each pair of question plus answer (plus real answer since available in dB) check if the challenger LLM has correctly answered
      - We could alternatively use a levenstein distance or other solution less computationally intensive. But might not work if LLM answer is long
   - Store succeed / failed results
4. User responses:
   - Select sample of questions
   - Answer to it
   - Evaluation of user answers by LLM evaluator. Should not be expensive, can't do API call
   - Compare user answers to LLM challenger answers. Provide ranking
5. Front end application basics:
   - Propose N (10 questions), text box to answer
   - At the end, provide score, LLM answers, and ranking.
   - (Next it could be great to challenge them on specific topics)
