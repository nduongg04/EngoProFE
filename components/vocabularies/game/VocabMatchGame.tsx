"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MatchCard, VocabularySet } from "@/types/vocabulary";
import { RefreshCw } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface VocabMatchGameProps {
  vocabList: VocabularySet[];
}

const CLUSTER_SIZE = 8;

export default function VocabMatchGame({ vocabList }: VocabMatchGameProps) {
  const [cards, setCards] = useState<MatchCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<MatchCard[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const usedWordIdsRef = useRef<Set<string>>(new Set());

  const getRandomCluster = useCallback(() => {
    const availableWords = vocabList.filter(
      (word) => !usedWordIdsRef.current.has(word._id),
    );

    if (availableWords.length < CLUSTER_SIZE) {
      usedWordIdsRef.current = new Set();
      return vocabList
        .slice()
        .sort(() => Math.random() - 0.5)
        .slice(0, CLUSTER_SIZE);
    }

    const selectedWords = availableWords
      .slice()
      .sort(() => Math.random() - 0.5)
      .slice(0, CLUSTER_SIZE);

    selectedWords.forEach((word) => usedWordIdsRef.current.add(word._id));
    return selectedWords;
  }, [vocabList]);

  const initializeGame = useCallback(() => {
    const clusterWords = getRandomCluster();
    const gameCards: MatchCard[] = clusterWords
      .flatMap((vocab) => [
        {
          id: `en-${vocab._id}`,
          content: {
            englishWord: vocab.englishWord,
            wordType: vocab.wordType,
            example: vocab.example,
          },
          type: "english" as const,
          isMatched: false,
          isIncorrect: false,
          isSelected: false,
          originalId: vocab._id,
        },
        {
          id: `vi-${vocab._id}`,
          content: {
            definition: vocab.definition,
          },
          type: "vietnamese" as const,
          isMatched: false,
          isIncorrect: false,
          isSelected: false,
          originalId: vocab._id,
        },
      ])
      .sort(() => Math.random() - 0.5);

    setCards(gameCards);
    setSelectedCards([]);
    setMatchedPairs(0);
  }, [getRandomCluster]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handleCardClick = (clickedCard: MatchCard) => {
    if (selectedCards.length === 2 || clickedCard.isMatched) {
      return;
    }

    const newSelectedCards = [...selectedCards, clickedCard];
    setSelectedCards(newSelectedCards);

    setCards(
      cards.map((card) =>
        card.id === clickedCard.id ? { ...card, isSelected: true } : card,
      ),
    );

    if (newSelectedCards.length === 2) {
      const [firstCard, secondCard] = newSelectedCards;

      if (
        firstCard.originalId === secondCard.originalId &&
        firstCard.type !== secondCard.type
      ) {
        // Match found
        setTimeout(() => {
          setCards(
            cards.map((card) =>
              card.originalId === firstCard.originalId
                ? {
                    ...card,
                    isMatched: true,
                    isIncorrect: false,
                    isSelected: false,
                  }
                : card,
            ),
          );
          setMatchedPairs((prev) => prev + 1);
          setSelectedCards([]);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setCards(
            cards.map((card) =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, isIncorrect: true }
                : card,
            ),
          );
        }, 0);

        setTimeout(() => {
          setCards(
            cards.map((card) => ({
              ...card,
              isIncorrect: false,
              isSelected: false,
            })),
          );
          setSelectedCards([]);
        }, 1000);
      }
    }
  };

  const renderCardContent = (card: MatchCard) => {
    if (card.type === "english") {
      return (
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-center gap-1">
            <span className="text-center font-medium text-lg">
              {card.content.englishWord}
            </span>
            <span className="text-gray-500 text-sm">
              ({card.content.wordType})
            </span>
          </div>
          {card.content.example && card.content.example[0] && (
            <p className="text-gray-600 line-clamp-2 mx-auto text-sm italic">
              • {card.content.example[0]}
            </p>
          )}
        </div>
      );
    } else {
      return (
        <p className="text-center text-lg font-medium">
          {card.content.definition}
        </p>
      );
    }
  };

  return (
    <div className="w-full p-4">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-gray-800 text-2xl font-bold">
          Trò chơi ghép từ vựng
        </h2>
        <div className="flex items-center gap-4">
          <p className="text-lg">
            Số cặp đã ghép: {matchedPairs}/{CLUSTER_SIZE}
          </p>
          <Button
            onClick={initializeGame}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Chơi lại
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
        {cards.map((card) => (
          <Card
            key={card.id}
            onClick={() => handleCardClick(card)}
            className={`flex min-h-[100px] transform cursor-pointer items-center justify-center p-2 text-sm transition-all duration-300 hover:scale-105 ${
              card.isMatched ? "bg-[#49BBBD] text-white" : "bg-white"
            } ${card.isIncorrect ? "animate-shake bg-red-100" : ""} ${
              card.isSelected && !card.isMatched
                ? "border-4 border-[#49BBBD]"
                : ""
            } ${!card.isMatched && !card.isIncorrect ? "hover:shadow-lg" : ""} `}
          >
            <div
              className={` ${card.isMatched ? "text-white" : "text-gray-800"} `}
            >
              {renderCardContent(card)}
            </div>
          </Card>
        ))}
      </div>

      {matchedPairs === CLUSTER_SIZE && (
        <div className="mt-8 text-center">
          <h3 className="mb-4 text-2xl font-bold text-[#49BBBD]">
            Chúc mừng! Bạn đã hoàn thành bộ từ này!
          </h3>
          <Button onClick={initializeGame} className="bg-[#49BBBD]">
            Tiếp tục với bộ từ mới
          </Button>
        </div>
      )}
    </div>
  );
}
