import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for available tests
const availableTests = [
  { id: 1, title: "TOEIC Practice Test 1", questions: 200, duration: 120 },
  { id: 2, title: "TOEIC Practice Test 2", questions: 200, duration: 120 },
  { id: 3, title: "TOEIC Practice Test 3", questions: 200, duration: 120 },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">EngoPro TOEIC Practice</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Available Tests</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {availableTests.map((test) => (
                <Card key={test.id}>
                  <CardHeader>
                    <CardTitle>{test.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Questions: {test.questions}</p>
                    <p className="text-gray-600">Duration: {test.duration} minutes</p>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/test/${test.id}`}>
                      <Button className="w-full bg-[#49BBBD] hover:bg-[#49BBBD]/90">Start Test</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

