import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Part2Props {
	partData: {
		partNumber: number;
		instructions: string;
		questions: {
			questionNumber: number;
			options: { option: string; text: string }[];
		}[];
	};
	answeredQuestions: { questionNumber: number; selectedOption: string }[];
	onAnswerChange: (questionNumber: number, selectedOption: string) => void;
}

export default function Part2({
	partData,
	answeredQuestions,
	onAnswerChange,
}: Part2Props) {
	const handleAnswer = (questionNumber: number, option: string) => {
		onAnswerChange(questionNumber, option);
	};

	if (
		!partData ||
		!partData.questions ||
		!Array.isArray(partData.questions)
	) {
		return (
			<Card className="p-6">
				<p className="text-center text-gray-500">
					Không có dữ liệu cho phần này
				</p>
			</Card>
		);
	}

	return (
		<div className="space-y-6">
			<div className="h-fit">
			<Card className="p-6">
        <h2 className="text-md font-semibold">
          Phần {partData.partNumber}: {partData.instructions}
        </h2>
      </Card>
				<div className="space-y-6 p-4">
					{partData.questions.map((question) => (
						<Card key={question.questionNumber} className="p-6">
							<div className="space-y-4">
								<div className="flex justify-between items-center">
									<h3 className="text-lg font-medium">
										Câu {question.questionNumber}
									</h3>
									{answeredQuestions.some((q) => q.questionNumber === question.questionNumber) && (
                    <span className="text-sm text-[#49BBBD]">Đã trả lời</span>
                  )}
								</div>
								<RadioGroup
									value={answeredQuestions.find((q) => q.questionNumber === question.questionNumber)?.selectedOption || ""}
									onValueChange={(value) => handleAnswer(question.questionNumber, value)}
								>
									<div className="space-y-2">
										{question.options.map((option) => (
											<div
												key={option.option}
												className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100"
											>
												<RadioGroupItem
													value={option.option}
													id={`question-${question.questionNumber}-${option.option}`}
													className="data-[state=checked]:bg-[#49BBBD] data-[state=checked]:text-white data-[state=checked]:border-[#49BBBD]"
												/>
												<Label
													htmlFor={`question-${question.questionNumber}-${option.option}`}
													className="flex-grow cursor-pointer"
												>
													{option.option}.{" "}
													{option.text}
												</Label>
											</div>
										))}
									</div>
								</RadioGroup>
							</div>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
