export type Subject = {
	id: string;
	subjectName: string;
}

export type Vocabulary = {
	subject: Subject;
	englishWord: string;
	vietnameseWord: string;
}