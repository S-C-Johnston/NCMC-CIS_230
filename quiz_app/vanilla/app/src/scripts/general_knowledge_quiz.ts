import { Quiz } from "./quiz/quiz_data";

export const general_knowledge: Quiz = {
	"name": "Example Quiz",
	"topic": "General Knowledge",
	"questions": [
		{
			"question": "What is the capital of France?",
			"answers": [
				"Paris",
				"London",
				"Berlin",
				"Madrid"
			],
			"correct_answer_index": 0
		},
		{
			"question": "Who was the first president of the United States?",
			"answers": [
				"Thomas Jefferson",
				"George Washington",
				"Abraham Lincoln",
				"John F. Kennedy"
			],
			"correct_answer_index": 1
		},
		{
			"question": "What is the largest country in the world?",
			"answers": [
				"Russia",
				"China",
				"United States",
				"Brazil"
			],
			"correct_answer_index": 0
		}
	]
}
