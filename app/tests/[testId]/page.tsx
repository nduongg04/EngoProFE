'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import TimerSubmit from '@/components/TimerSubmit'
import QuestionNavigation from '@/components/QuestionNavigation'
import TestContent from '@/components/TestContent'
import Footer from '@/components/Footer'
import SubmitModal from '@/components/SubmitModal'
import type { TestData } from '@/types/test'

export default function TestPage() {
  const { testId } = useParams()
  const [currentPart, setCurrentPart] = useState(1)
  const [answeredQuestions, setAnsweredQuestions] = useState<{
    [key: number]: { questionNumber: number; selectedOption: string }[]
  }>({})
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(7200) // 2 hours in seconds
  const [testData, setTestData] = useState<TestData | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		console.log(answeredQuestions)
	}, [answeredQuestions])

  const fetchTestData = useCallback(async () => {
    try {
      const response = await fetch(`/api/tests/${testId}`)
      if (!response.ok) {
        throw new Error('Không thể tải dữ liệu bài thi')
      }
      const data = await response.json()
      setTestData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi')
    } finally {
      setIsLoading(false)
    }
  }, [testId])

  useEffect(() => {
    fetchTestData()
  }, [fetchTestData])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleSubmit = useCallback(() => {
    const allQuestions = Object.values(answeredQuestions).flat()
    const totalQuestions = testData ? testData.parts.reduce((acc, part) => acc + part.questions.length, 0) : 0

    if (allQuestions.length < totalQuestions) {
      setIsSubmitModalOpen(true)
    } else {
      // Submit the test
      console.log('Bài thi đã được nộp', {
        answeredQuestions,
        testId
      })
    }
  }, [answeredQuestions, testData, testId])

  const memoizedTestContent = useMemo(() => (
    <TestContent
      currentPart={currentPart}
      setCurrentPart={setCurrentPart}
      answeredQuestions={answeredQuestions}
      setAnsweredQuestions={setAnsweredQuestions}
      testData={testData}
      isLoading={isLoading}
    />
  ), [currentPart, answeredQuestions, testData, isLoading])

  const memoizedQuestionNavigation = useMemo(() => (
    testData && (
      <QuestionNavigation
        answeredQuestions={answeredQuestions}
        testData={testData}
      />
    )
  ), [currentPart, answeredQuestions, testData])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Lỗi</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      <main className="flex flex-1 flex-col md:flex-row">
        <section className="flex-1 p-4 order-2 md:order-1">
          {memoizedTestContent}
        </section>
        <aside className="w-full h-fit md:w-64 bg-white p-4 border-r border-gray-200 order-1 md:order-2">
          <TimerSubmit
            timeRemaining={timeRemaining} 
            onSubmit={handleSubmit} 
          />
          {memoizedQuestionNavigation}
        </aside>
      </main>
      <Footer />
      <SubmitModal 
        isOpen={isSubmitModalOpen} 
        onClose={() => setIsSubmitModalOpen(false)}
        onConfirm={() => {
          console.log('Bài thi đã được nộp', {
            answeredQuestions,
            testId
          })
          setIsSubmitModalOpen(false)
        }}
      />
    </div>
  )
}

