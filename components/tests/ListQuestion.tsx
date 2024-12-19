const TestsListQuestion = () => {
    const items = Array.from({ length: 10 });
    return (
        <div className="flex flex-wrap gap-1">
            {items.map((_, index) => (
                <div className="rounded-md border p-2 text-[9px]" key={index}>
                    {index + 1 > 9 ? index + 1 : `0${index + 1}`}
                </div>
            ))}
        </div>
    );
};

export default TestsListQuestion;
