"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { HumanMessage } from "./ui/human-message";
import { AIIcon } from "./ui/ai-icon";
import { AIMessage } from "./ui/ai-message";
import { io, Socket } from "socket.io-client";
import { AILoading } from "./ui/ai-loading";
import { useSession } from "next-auth/react";

type AiChatMessage = {
  role: string;
  message: string;
};

const AiMsgList: AiChatMessage[] = [
  {
    role: "human",
    message: "Hello",
  },
  {
    role: "AI",
    message:
      "Hello, I’m EngoProAI. I’m a chatbot - a helpful AI chatbot which can answer your any questions about English. How can I help you today?",
  },
];

export const AiChat = () => {
  const { data: session } = useSession();
  const [isHover, setIsHover] = useState(false);
  const [isShowChat, setIsShowChat] = useState(false);
  const [isIconDisapear, setIsIconDisappear] = useState(false);
  const [message, setMessage] = useState("");
  const [msgList, setMessageList] = useState(AiMsgList);
  const ref = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const msgRender = useRef<HTMLDivElement>(null);
  const baseUrl = process.env.BASE_URL;
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  let timeout: NodeJS.Timeout;
  //--------------------------------Function----------------------//
  function onClick() {
    setIsShowChat(true);
  }

  function onClose() {
    setIsShowChat(false);
  }

  function onSend() {
    if (!isLoading) {
      if (socket != null) {
        setMessageList([...msgList, { role: "human", message: message }]);
        const data = {
          message: message,
        };
        socket.emit("chat_request", data);
        setIsLoading(true);
        setMessage("");
      }
    }
  }
  //--------------------------------Function----------------------//

  //--------------------------------Animation---------------------//
  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        const width = ref.current.offsetWidth;
        if (width > 140) {
          setIsHover(true);
        } else {
          setIsHover(false);
        }
      }
    };

    const handleResizeChatBox = () => {
      if (ref2.current) {
        const width = ref2.current?.offsetWidth;
        if (width > 1) {
          setIsIconDisappear(true);
        } else {
          setIsIconDisappear(false);
          setMessage("");
        }
      }
    };
    if (ref.current && ref2.current) {
      const observer = new ResizeObserver(handleResize);
      const observer2 = new ResizeObserver(handleResizeChatBox);
      observer2.observe(ref2.current);
      observer.observe(ref.current);
      return () => {
        observer.disconnect();
      };
    }
  }, []);

  useEffect(() => {
    msgRender.current?.lastElementChild?.scrollIntoView({
      behavior: "smooth",
    });
  }, [msgList, isShowChat]);
  //--------------------------------Animation---------------------//

  //--------------------------------Socket-----------------------//
  useEffect(() => {
    const newSocket = io(baseUrl);
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
      socket?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket != null) {
      socket.on("chat_response", (msg) => {
        const data: AiChatMessage = {
          role: "AI",
          message: msg,
        };
        console.log(data.message);
        clearTimeout(timeout);
        setIsLoading(false);
        setMessageList((prev) => [...prev, data]);
      });
    }

    return () => {
      socket?.off("chat_response");
    };
  }, [socket, msgList, setMessageList]);
  //--------------------------------Socket-----------------------//

  useEffect(() => {
    if (isLoading) {
      timeout = setTimeout(() => {
        console.log(isLoading);
        if (isLoading) {
          setIsLoading(false);
          const data: AiChatMessage = {
            role: "AI",
            message:
              "Xin lỗi, đã có lỗi xảy ra, vui lòng check internet của bạn!!",
          };

          setMessageList((prev) => [...prev, data]);
        }
      }, 10000);
    }
  }, [isLoading]);
  return (
    <div className="fixed bottom-[10px] right-[10px]">
      <div
        ref={ref}
        className={cn(
          "h-fit w-[60px] cursor-pointer justify-end rounded-[40px] bg-white p-2 shadow-3xl transition-all duration-500 ease-in-out hover:w-[150px]",
          isIconDisapear ? "hidden" : "flex",
        )}
        onClick={onClick}
      >
        <div
          className={cn(
            "m-2 self-center font-bold text-lightGreen transition-all duration-300",
            isHover ? "flex" : "hidden",
          )}
        >
          Chat now
        </div>
        <svg
          width="45"
          height="45"
          viewBox="0 0 45 45"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.625 20.2457C14.625 19.7484 14.8225 19.2715 15.1742 18.9199C15.5258 18.5683 16.0027 18.3707 16.5 18.3707H27.75C28.2473 18.3707 28.7242 18.5683 29.0758 18.9199C29.4275 19.2715 29.625 19.7484 29.625 20.2457C29.625 20.743 29.4275 21.2199 29.0758 21.5715C28.7242 21.9232 28.2473 22.1207 27.75 22.1207H16.5C16.0027 22.1207 15.5258 21.9232 15.1742 21.5715C14.8225 21.2199 14.625 20.743 14.625 20.2457ZM16.5 25.8707C16.0027 25.8707 15.5258 26.0683 15.1742 26.4199C14.8225 26.7715 14.625 27.2484 14.625 27.7457C14.625 28.243 14.8225 28.7199 15.1742 29.0715C15.5258 29.4232 16.0027 29.6207 16.5 29.6207H24C24.4973 29.6207 24.9742 29.4232 25.3258 29.0715C25.6775 28.7199 25.875 28.243 25.875 27.7457C25.875 27.2484 25.6775 26.7715 25.3258 26.4199C24.9742 26.0683 24.4973 25.8707 24 25.8707H16.5ZM3.375 22.1207C3.37594 18.01 4.72778 14.0134 7.22247 10.7462C9.71716 7.47897 13.2164 5.12212 17.1818 4.03836C21.1471 2.9546 25.3587 3.20401 29.1684 4.74819C32.9781 6.29238 36.1747 9.04576 38.2663 12.5846C40.358 16.1234 41.2287 20.2516 40.7445 24.3337C40.2602 28.4158 38.4479 32.2257 35.5864 35.177C32.7249 38.1283 28.9728 40.0574 24.9075 40.6674C20.8423 41.2774 16.6892 40.5346 13.0875 38.5532L5.7975 40.7732C5.47234 40.8723 5.12637 40.8811 4.7966 40.7987C4.46683 40.7163 4.16566 40.5458 3.92531 40.3054C3.68495 40.0651 3.51446 39.7639 3.43206 39.4341C3.34966 39.1043 3.35845 38.7584 3.4575 38.4332L5.6775 31.132C4.16537 28.3693 3.37351 25.2702 3.375 22.1207ZM22.125 7.12072C19.4623 7.12049 16.8475 7.82907 14.5492 9.17368C12.2509 10.5183 10.3519 12.4504 9.04736 14.7717C7.74279 17.093 7.07964 19.7196 7.12602 22.382C7.1724 25.0443 7.92663 27.6463 9.31125 29.9207C9.4487 30.1467 9.53679 30.3991 9.56976 30.6615C9.60272 30.9239 9.5798 31.1903 9.5025 31.4432L8.06625 36.1645L12.78 34.7282C13.0337 34.6509 13.301 34.6283 13.564 34.662C13.8271 34.6956 14.0801 34.7846 14.3063 34.9232C16.2832 36.1302 18.5128 36.863 20.8203 37.0641C23.1278 37.2652 25.4505 36.9292 27.6064 36.0824C29.7623 35.2356 31.6929 33.901 33.2467 32.1833C34.8005 30.4656 35.9354 28.4113 36.5625 26.1816C37.1896 23.9518 37.2917 21.6071 36.861 19.3313C36.4303 17.0554 35.4783 14.9102 34.0798 13.0639C32.6813 11.2175 30.8741 9.72005 28.8 8.68895C26.726 7.65785 24.4413 7.12108 22.125 7.12072Z"
            fill="#49BBBD"
          />
        </svg>
      </div>

      <div
        ref={ref2}
        className={cn(
          "rounded-[32px] bg-white shadow-3xl transition-all duration-500 ease-in-out",
          isShowChat ? "h-[429px] w-[320px]" : "h-0 w-0",
        )}
      >
        <div className={isShowChat ? "flex h-full flex-col" : "hidden"}>
          <div className="relative flex h-[70px] w-full items-center rounded-tl-[32px] rounded-tr-[32px] bg-darkGreen p-3">
            <AIIcon />
            <div className="m-2 flex flex-col gap-1">
              <p className="font-bold text-white">
                Engo<span className="text-lightGreen">AI</span>
              </p>
              <div className="flex items-center gap-1">
                <svg
                  width="5"
                  height="5"
                  viewBox="0 0 5 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.488281 2.32422C0.488281 1.80859 0.660156 1.37891 1.00391 1.03516C1.34766 0.683594 1.8125 0.507812 2.39844 0.507812C2.98438 0.507812 3.44922 0.683594 3.79297 1.03516C4.13672 1.37891 4.30859 1.80859 4.30859 2.32422C4.30859 2.83984 4.13672 3.26953 3.79297 3.61328C3.44922 3.95703 2.98438 4.12891 2.39844 4.12891C1.8125 4.12891 1.34766 3.95703 1.00391 3.61328C0.660156 3.26953 0.488281 2.83984 0.488281 2.32422Z"
                    fill="#2BE45F"
                  />
                </svg>
                <p className="text-[12px] text-white"> online</p>
              </div>
            </div>

            <div
              className="absolute right-[20px] cursor-pointer"
              onClick={onClose}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.2161 11.2213C12.3482 11.3534 12.4224 11.5325 12.4224 11.7193C12.4224 11.9062 12.3482 12.0853 12.2161 12.2174C12.084 12.3495 11.9048 12.4237 11.718 12.4237C11.5312 12.4237 11.3521 12.3495 11.22 12.2174L7.49985 8.49611L3.77856 12.2162C3.64647 12.3483 3.46732 12.4225 3.28052 12.4225C3.09371 12.4225 2.91456 12.3483 2.78247 12.2162C2.65038 12.0841 2.57617 11.905 2.57617 11.7182C2.57617 11.5314 2.65038 11.3522 2.78247 11.2201L6.50376 7.50001L2.78364 3.77872C2.65155 3.64663 2.57734 3.46748 2.57734 3.28068C2.57734 3.09387 2.65155 2.91472 2.78364 2.78263C2.91573 2.65054 3.09488 2.57633 3.28169 2.57633C3.46849 2.57633 3.64765 2.65054 3.77974 2.78263L7.49985 6.50392L11.2211 2.78204C11.3532 2.64995 11.5324 2.57574 11.7192 2.57574C11.906 2.57574 12.0851 2.64995 12.2172 2.78204C12.3493 2.91413 12.4235 3.09329 12.4235 3.28009C12.4235 3.46689 12.3493 3.64605 12.2172 3.77814L8.49595 7.50001L12.2161 11.2213Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>

          {/* Chat box */}

          <div
            ref={msgRender}
            className="flex h-[200px] flex-1 flex-col gap-2 overflow-auto text-wrap p-2"
          >
            {msgList.map((obj, index) =>
              obj.role == "human" ? (
                <HumanMessage message={obj.message} key={index} />
              ) : (
                <AIMessage message={obj.message} key={index} />
              ),
            )}
            {isLoading ? <AILoading /> : <></>}
          </div>

          {/* Input message */}
          <div className="m-2 flex h-[43px] items-center gap-2 rounded-[22px] border border-[#9F9797] px-4">
            <input
              placeholder="Start to chat..."
              className="flex flex-1 focus:outline-none"
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
              onKeyDown={(event) => {
                if (event.key == "Enter") {
                  if (message != "") {
                    onSend();
                  }
                }
              }}
            ></input>
            <svg
              width="20"
              height="20"
              viewBox="0 0 14 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={onSend}
            >
              <path
                d="M1.00729 9.94998L13.5625 5.5416C13.6923 5.49631 13.8029 5.42076 13.8807 5.32436C13.9585 5.22796 14 5.11495 14 4.99939C14 4.88383 13.9585 4.77082 13.8807 4.67442C13.8029 4.57802 13.6923 4.50247 13.5625 4.45718L1.00729 0.0488064C0.898579 0.00996472 0.779769 -0.00609619 0.661582 0.00207244C0.543396 0.0102411 0.429551 0.0423822 0.330319 0.0955965C0.231087 0.148811 0.149589 0.221424 0.093178 0.306885C0.0367669 0.392346 0.00721726 0.487967 0.00719495 0.58512L0 3.30205C0 3.59673 0.266213 3.85015 0.625961 3.88551L10.7924 4.99939L0.625961 6.10738C0.266213 6.14863 0 6.40206 0 6.69673L0.00719495 9.41366C0.00719495 9.8321 0.532427 10.1209 1.00729 9.94998Z"
                fill={isLoading ? "gray" : "#49BBBD"}
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
