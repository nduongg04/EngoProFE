type Props = {
    trans: string;
};

const BackComponent = ({ trans }: Props) => {
    return (
        <div className="flex h-full items-center justify-center text-[30px] font-semibold">
            {trans}
        </div>
    );
};

export default BackComponent;
