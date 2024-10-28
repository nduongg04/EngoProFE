export const StartDotheTestCompo = () => {
    return (
        <div className="shadow-cus mt-10 flex flex-col items-center rounded-[36px] bg-white px-[90px] py-8">
            <p className="text-[20px] font-bold">Bài thi tiếng Anh</p>
            <p className="mt-3 text-[15px] font-semibold">
                Chủ đề: Software Engineer
            </p>
            <p className="mt-3 text-[20px] font-semibold">Thời gian: 30 phút</p>
            <p className="text-[15px]">Số câu hỏi: 16</p>
            <p className="text-[13px] italic">Được tạo bởi EngoProAI</p>
            <div className="mt-5 flex gap-8">
                <button className="shadow-cus rounded-sm bg-lightGreen px-7 py-1 font-bold text-white">
                    Bắt đầu
                </button>
                <button className="shadow-cus rounded-sm bg-[#B5C3C3] px-7 py-1 font-bold text-[#706868]">
                    Quay lại
                </button>
            </div>
        </div>
    );
};
