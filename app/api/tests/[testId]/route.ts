import { NextResponse } from "next/server";

// Helper function to generate questions
function generateQuestions(startNum: number, count: number, template: any) {
	return Array.from({ length: count }, (_, index) => ({
		questionNumber: startNum + index,
		...template,
		imageUrl:
			"https://s4-media1.study4.com/media/e24/images_fixed2/image174.png",
		audioUrl: "/assets/audio/sample-15s.mp3",
	}));
}

// Helper function to generate clusters
function generateClusters(
	startNum: number,
	totalQuestions: number,
	questionsPerCluster: number,
	template: any
) {
	const clusters = [];
	let currentNum = startNum;

	while (currentNum < startNum + totalQuestions) {
		clusters.push({
			clusterId: `cluster${
				Math.floor((currentNum - startNum) / questionsPerCluster) + 1
			}`,
			imageUrl: `/placeholder.svg?height=400&width=600&text=Cluster ${
				Math.floor((currentNum - startNum) / questionsPerCluster) + 1
			}`,
			questions: generateQuestions(
				currentNum,
				Math.min(
					questionsPerCluster,
					startNum + totalQuestions - currentNum
				),
				template
			),
		});
		currentNum += questionsPerCluster;
	}

	return clusters;
}

export async function GET(
	request: Request,
	{ params }: { params: { testId: string } }
) {
	const testData = {
		testId: params.testId,
		testTitle: "TOEIC Practice Test 1",
		audioUrl: "/assets/audio/sample-15s.mp3",
		parts: [
			{
				partNumber: 1,
				instructions:
					"Mô Tả Hình Ảnh: Nhìn vào hình ảnh và nghe các câu. Chọn câu mô tả chính xác nhất về hình ảnh.",
				questions: generateQuestions(1, 6, {
					options: [
						{
							option: "A",
							text: "Người đàn ông đang ngồi tại bàn làm việc.",
						},
						{
							option: "B",
							text: "Người phụ nữ đang dắt chó đi dạo.",
						},
						{ option: "C", text: "Chiếc xe đang đậu gần cây." },
						{
							option: "D",
							text: "Đứa trẻ đang chơi trong công viên.",
						},
					],
					correctAnswer: "A",
				}),
			},
			{
				partNumber: 2,
				instructions:
					"Hỏi – Đáp: Nghe câu hỏi và ba câu trả lời. Chọn câu trả lời phù hợp nhất.",
				questions: generateQuestions(7, 25, {
					options: [
						{ option: "A", text: "Lúc 3 giờ chiều." },
						{ option: "B", text: "Trong phòng họp." },
						{ option: "C", text: "Hôm qua." },
					],
					correctAnswer: "A",
				}),
			},
			{
				partNumber: 3,
				instructions:
					"Đoạn Hội Thoại: Nghe đoạn hội thoại. Sau đó đọc từng câu hỏi và chọn câu trả lời tốt nhất.",
				questions: generateClusters(32, 39, 3, {
					questionText: "Chủ đề chính của cuộc hội thoại là gì?",
					options: [
						{ option: "A", text: "Lên kế hoạch cho kỳ nghỉ." },
						{ option: "B", text: "Thảo luận về dự án công việc." },
						{ option: "C", text: "Đặt đồ ăn." },
						{ option: "D", text: "Thực hiện cuộc gọi điện thoại." },
					],
					correctAnswer: "B",
				}),
			},
			{
				partNumber: 4,
				instructions:
					"Đoạn Nói Ngắn: Nghe một bài nói. Sau đó đọc từng câu hỏi và chọn câu trả lời tốt nhất.",
				questions: generateClusters(71, 30, 3, {
					questionText: "Chủ đề chính của bài nói là gì?",
					options: [
						{ option: "A", text: "Lịch sử của công ty." },
						{ option: "B", text: "Lợi ích của sản phẩm mới." },
						{
							option: "C",
							text: "Tầm quan trọng của dịch vụ khách hàng.",
						},
						{
							option: "D",
							text: "Thành công của chiến dịch marketing.",
						},
					],
					correctAnswer: "C",
				}),
			},
			{
				partNumber: 5,
				instructions:
					"Câu Không Hoàn Chỉnh: Đọc câu và chọn từ hoặc cụm từ phù hợp nhất để hoàn thành câu.",
				questions: generateQuestions(101, 30, {
					questionText:
						"Công ty _____ chính sách mới vào tháng trước.",
					options: [
						{ option: "A", text: "thông báo" },
						{ option: "B", text: "thông báo về" },
						{ option: "C", text: "đã thông báo" },
						{ option: "D", text: "đang thông báo" },
					],
					correctAnswer: "C",
				}),
			},
			{
				partNumber: 6,
				instructions:
					"Hoàn Thành Đoạn Văn: Đọc các đoạn văn và điền vào chỗ trống với từ hoặc cụm từ thích hợp.",
				questions: generateClusters(131, 16, 4, {
					questionText:
						"Sự thành công của công ty _____ vào khả năng đổi mới.",
					options: [
						{ option: "A", text: "phụ thuộc" },
						{ option: "B", text: "dựa dẫm" },
						{ option: "C", text: "dựa trên" },
						{ option: "D", text: "theo" },
					],
					correctAnswer: "A",
				}),
			},
			{
				partNumber: 7,
				instructions: "Đọc Hiểu: Đọc các đoạn văn và trả lời câu hỏi.",
				questions: [
					...generateClusters(147, 29, 3, {
						passageType: "single",
						questionText: "Ý chính của đoạn văn là gì?",
						options: [
							{
								option: "A",
								text: "Tầm quan trọng của quản lý thời gian",
							},
							{
								option: "B",
								text: "Lịch sử của thực tiễn kinh doanh",
							},
							{
								option: "C",
								text: "Tác động của công nghệ đối với công việc",
							},
							{ option: "D", text: "Lợi ích của làm việc nhóm" },
						],
						correctAnswer: "C",
					}),
					...generateClusters(176, 25, 5, {
						passageType: "multi",
						paragraphs: 2,
						questionText:
							"Theo đoạn văn, lợi ích chính của hệ thống mới là gì?",
						options: [
							{ option: "A", text: "Tăng hiệu quả" },
							{ option: "B", text: "Giảm chi phí" },
							{
								option: "C",
								text: "Cải thiện sự hài lòng của khách hàng",
							},
							{
								option: "D",
								text: "Nâng cao tinh thần nhân viên",
							},
						],
						correctAnswer: "A",
					}),
				],
			},
		],
	};

	return NextResponse.json(testData);
}
