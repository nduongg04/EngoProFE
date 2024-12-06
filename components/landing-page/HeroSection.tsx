import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="heroSection relative flex min-h-screen w-full items-center justify-center">
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="flex flex-col gap-5">
          <p className="text-[48px] font-bold text-white">
            <span className="text-[#F48C06]">Learning</span> English is now
            <br></br> much easier
          </p>
          <p className="text-white">
            EngoPro is a platform that helps you learn
            <br /> English more conveniently and easily
          </p>
          <button className="buttonGetStart flex w-fit items-center gap-2 rounded-[80px] px-4 py-3 text-[24px] text-white">
            {" "}
            <p> Get Started</p>
            <Image
              src={"/assets/icons/next-arrow-start.svg"}
              alt=""
              width={30}
              height={30}
            />
          </button>
        </div>
      </div>
      <div className="flex flex-1">
        <Image
          src={"/assets/icons/hero-image.svg"}
          alt=""
          width={700}
          height={691}
        />
      </div>
    </section>
  );
};

export default HeroSection;
