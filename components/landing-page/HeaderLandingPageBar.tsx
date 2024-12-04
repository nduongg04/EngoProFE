"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const HeaderLandingPage = () => {
  const router = useRouter();

  function redirectToLogin() {
    router.push("/login");
  }

  function redirectToSignUp() {
    router.push("/register");
  }
  return (
    <div className="shadow-gray/6 sticky left-0 top-0 z-10 flex items-center justify-between bg-lightGreen px-10 py-3">
      <Image
        src="/assets/icons/logo_white.svg"
        alt="logo"
        width={90}
        height={90}
      />
      <div className="flex gap-5">
        <button
          className="rounded-[80px] bg-white px-[45px] py-[10px] text-[16px] shadow-md"
          onClick={redirectToLogin}
        >
          Login
        </button>
        <button
          style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
          className="rounded-[80px] px-[45px] py-[10px] text-[16px] text-white shadow-md"
          onClick={redirectToSignUp}
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default HeaderLandingPage;
