export const AIFirstSection = () => {
    return (
        <section className="relative flex h-screen items-center justify-center bg-lightGreen px-8">
            <div className="flex flex-col items-start">
                <p className="text-[40px] font-bold text-white">
                    EngoPro<span className="text-darkGreen">AI</span>
                </p>
                <p className="text-[20px] font-bold text-white">
                    Câu hỏi được tạo bởi EngoProAI giúp bạn cải thiện tiếng Anh
                </p>
                <p className="mt-3 font-light italic text-white">
                    Powered by EngoPro Group
                </p>
                <button className="mt-5 flex gap-2 rounded-2xl bg-white/30 px-5 py-2">
                    <p className="z-10 text-white">Bắt đầu học</p>
                    <svg
                        width="22"
                        height="20"
                        viewBox="0 0 52 50"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M34.6802 27.0833L8.57805 27.0833V22.9167L34.6802 22.9167L23.1774 11.7417L26.2097 8.79584L42.8892 25L26.2097 41.2042L23.1774 38.2583L34.6802 27.0833Z"
                            fill="white"
                        />
                    </svg>
                </button>
            </div>
            <img
                src="assets\images\ImageGenAI.png"
                alt=""
                width={"35%"}
                className="hidden md:block"
            />
            <svg
                width="50"
                height="25"
                viewBox="0 0 75 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute bottom-[10px] cursor-pointer"
            >
                <path
                    d="M49.625 19.3542L37.5 27.4375L25.375 19.3542C25.0856 19.1613 24.7422 19.0083 24.3642 18.9039C23.9862 18.7995 23.581 18.7458 23.1718 18.7458C22.7627 18.7458 22.3575 18.7995 21.9795 18.9039C21.6015 19.0083 21.258 19.1613 20.9687 19.3542C20.6794 19.547 20.4499 19.776 20.2933 20.028C20.1367 20.28 20.0562 20.5501 20.0562 20.8229C20.0562 21.0957 20.1367 21.3658 20.2933 21.6178C20.4499 21.8698 20.6794 22.0988 20.9687 22.2917L35.3125 31.8542C36.5312 32.6667 38.5 32.6667 39.7187 31.8542L54.0625 22.2917C54.3522 22.0989 54.582 21.87 54.7388 21.618C54.8956 21.3659 54.9764 21.0958 54.9764 20.8229C54.9764 20.5501 54.8956 20.2799 54.7388 20.0279C54.582 19.7758 54.3522 19.5469 54.0625 19.3542C52.8437 18.5625 50.8437 18.5417 49.625 19.3542Z"
                    fill="white"
                />
            </svg>
        </section>
    );
};
