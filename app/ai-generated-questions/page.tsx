import { AIFirstSection } from "@/components/ai-generated-question/FirstSection";
import { AISecondSection } from "@/components/ai-generated-question/SecondSection";
import HeaderHomeWhite from "@/components/HeaderHomeWhite";

const AIQuestions = () => {
    return (
        <main className="relative flex min-h-screen w-full flex-col">
            <HeaderHomeWhite />
            <div className="absolute w-full">
                <AIFirstSection />
                <AISecondSection />
            </div>
        </main>
    );
};
export default AIQuestions;
