import Image from "next/image";

type Props = {
  icon: string;
  color: string;
  title: string;
  detail: string;
};

const AdvertiseCard = ({ icon, color, title, detail }: Props) => {
  return (
    <div className="relative flex h-[300px] w-[300px] flex-col items-center gap-5 rounded-[20px] bg-white p-5 shadow-cus">
      <div
        className={`absolute top-[-30px] flex h-[25%] w-[25%] items-center justify-center rounded-full bg-[${color}] shadow-cus`}
      >
        <Image src={icon} alt="" width={38} height={38} />
      </div>
      <p className="mt-[25%] text-[22px] font-semibold text-[#2F327D]">
        {title}
      </p>
      <p className="text-center text-[#696984]">{detail}</p>
    </div>
  );
};

export default AdvertiseCard;
