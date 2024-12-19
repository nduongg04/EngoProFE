interface Option {
	option: string;
	text: string;
}

interface BaseQuestion {
	questionNumber: number;
	options: Option[];
	correctAnswer: string;
	questionText?: string;
	imageUrl?: string;
	audioUrl?: string;
}

interface Cluster {
	clusterId: string;
	imageUrl: string;
	questions: BaseQuestion[];
}

interface Part {
	partNumber: number;
	instructions: string;
	questions: BaseQuestion[] | Cluster[];
}

export interface TestData {
	testId: string;
	testTitle: string;
	audioUrl: string;
	parts: Part[];
}
