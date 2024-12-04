"use client";

import Image from "next/image";
import AdvertiseCard from "./AvertiseCard";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useEffect, useRef } from "react";
import { onpenLink } from "@/lib/utils";

const DetailSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Lấy tất cả các phần tử cần animation
    const elements = gsap.utils.toArray(".animationbox");

    elements.forEach((element) => {
      gsap.fromTo(
        element as gsap.TweenTarget,
        { y: -100, opacity: 0 }, // Trạng thái bắt đầu
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          scrollTrigger: {
            trigger: element as Element, // Kích hoạt khi phần tử này xuất hiện
            start: "top center", // Vị trí bắt đầu kích hoạt
            end: "bottom 50%", // Vị trí kết thúc
            scrub: true, // Hoạt động mượt mà
          },
        },
      );
    });
  }, []);

  function writeyourAssesment() {
    onpenLink("https://forms.gle/YwPWHgNK22mdf3717");
  }

  return (
    <section className="flex w-full flex-col items-center" ref={sectionRef}>
      <div className="mt-[300px] flex gap-16">
        <AdvertiseCard
          icon="/assets/icons/tracking-progress-icon.svg"
          color="#5B72EE"
          title="Tracking Progress"
          detail="Monitor your learning journey with our app’s progress tracking feature, allowing you to see your improvement over time."
        />
        <AdvertiseCard
          icon="/assets/icons/review-mistake-icon.svg"
          color="#00CBB8"
          title="Reviewing mistakes"
          detail="Easily review and learn from your mistakes with a dedicated feature that helps you understand errors and avoid them in the future."
        />
        <AdvertiseCard
          icon="/assets/icons/AI-icon.svg"
          color="#29B9E7"
          title="AI Agency"
          detail="AI Agency tailors lessons just for you, making learning faster, easier, and more engaging. Expand your skills with personalized support and interactive tools!"
        />
      </div>
      <div className="animationbox mt-16 text-[40px] font-semibold text-[#2F327D]">
        What is <span className="text-[#00CBB8]">EngoPro</span>?
      </div>
      <p className="animationbox mt-5 w-[50%] text-center text-[20px] text-[#696984]">
        Our app offers interactive English learning with key features like
        vocabulary flashcards and games, exam practice with detailed
        explanations, and a helpful AI chatbot for personalized language
        support.
      </p>
      <p className="animationbox mt-20 text-[35px] font-semibold text-[#2F327D]">
        Our <span className="text-[#00CBB8]">features</span>
      </p>
      <p className="animationbox mt-5 w-[50%] text-center text-[20px] text-[#696984]">
        This very extraordinary feature, can make learning English activities
        more efficient
      </p>
      <div className="animationbox flex w-[70%] items-center gap-20">
        <Image
          src={"/assets/images/AI_Bot_Image.svg"}
          alt=""
          width={500}
          height={500}
        />
        <div className="flex flex-col gap-4">
          <p className="text-[35px] font-semibold text-[#2F327D]">
            EngoPro <span className="text-[#00CBB8]">AI</span>
          </p>
          <p className="w-[70%] text-[#696984]">
            AI Agency makes mastering English simple with tailored lessons and
            real-time support. Learn faster, practice smarter!
          </p>
        </div>
      </div>
      <div className="animationbox flex w-[70%] items-center gap-20">
        <div className="flex flex-col gap-4">
          <p className="text-[35px] font-semibold text-[#2F327D]">
            <span className="text-[#00CBB8]">Tools</span> For Teachers
            <br /> And Learners
          </p>
          <p className="w-[70%] text-[#696984]">
            Class has a dynamic set of teaching tools built to be deployed and
            used during class. Teachers can handout assignments in real-time for
            students to complete and submit.
          </p>
        </div>
        <Image
          src={"/assets/images/tool_teacher_image.svg"}
          alt=""
          width={500}
          height={500}
        />
      </div>
      <div className="animationbox flex w-[70%] items-center gap-20">
        <Image
          src={"/assets/images/quizzes_image.svg"}
          alt=""
          width={500}
          height={500}
        />
        <div className="flex flex-col gap-4">
          <p className="text-[35px] font-semibold text-[#2F327D]">
            Assessments,
            <br /> <span className="text-[#00CBB8]">Quizzes</span>, Tests
          </p>
          <p className="w-[70%] text-[#696984]">
            Easily launch live assignments, quizzes, and tests. Student results
            are automatically entered in the online gradebook.
          </p>
        </div>
      </div>
      <div className="animationbox flex w-[70%] items-center gap-20">
        <div className="flex flex-col gap-4">
          <p className="text-[35px] font-semibold text-[#2F327D]">
            <span className="text-[#00CBB8]">Master English Vocabulary</span>{" "}
            <br />
            the Fun Way
          </p>
          <p className="w-[70%] text-[#696984]">
            Learning new words has never been this exciting! Our interactive
            game helps you expand your English vocabulary while having fun.
          </p>
        </div>
        <Image
          src={"/assets/images/game_vocab_image.svg"}
          alt=""
          width={500}
          height={500}
        />
      </div>
      <div className="animationbox mb-40 mt-[500px] flex w-[70%] items-center gap-20">
        <div className="flex flex-col gap-4">
          <div className="flex w-[30%] items-center gap-2">
            <hr className="w-[80%] text-[#696984]" />
            <p className="text-[#696984]">TESTIMONIAL</p>
          </div>
          <p className="text-[35px] font-semibold text-[#2F327D]">
            What They Say?
          </p>
          <p className="w-[80%] text-[#696984]">
            EngoPro has got more than 100k positive ratings from our users
            around the world.
          </p>
          <p className="w-[80%] text-[#696984]">
            Some of the students and teachers were greatly helped by the
            Skilline.
          </p>
          <p className="w-[80%] text-[#696984]">
            Are you too? Please give your assessment
          </p>
          <button
            onClick={writeyourAssesment}
            className="border-1 mt-7 flex w-fit items-center gap-6 rounded-[80px] border border-[#49BBBD] px-[38px] py-[13px] text-[#49BBBD]"
          >
            <div>Write your assessment</div>
            <Image
              src={"/assets/icons/next-arrow-assesment.svg"}
              alt=""
              width={20}
              height={20}
            />
          </button>
        </div>
        <Image
          src={"/assets/images/feedback_image.svg"}
          alt=""
          width={500}
          height={500}
        />
      </div>
    </section>
  );
};

export default DetailSection;
