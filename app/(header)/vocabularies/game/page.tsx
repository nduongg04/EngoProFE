import VocabMatchGame from "@/components/vocabularies/game/VocabMatchGame";
import { getVocabularies } from "@/lib/actions/vocabulary.action";
import { VocabularySet } from "@/types/vocabulary";

// This is example data - replace with your actual data fetching logic
// const mockVocabList = [
//   {
//     _id: '1',
//     englishWord: 'regulate',
//     definition: 'điều tiết, điều khiển',
//     wordType: 'v',
//     example: ['The department is responsible for regulating the insurance industry.'],
//     subject: 'business'
//   },
//   {
//     _id: '2', 
//     englishWord: 'seemingly',
//     definition: 'có vẻ như',
//     wordType: 'adv',
//     example: ['It was a seemingly simple question.'],
//     subject: 'general'
//   },
//   {
//     _id: '3',
//     englishWord: 'nourish',
//     definition: 'nuôi dưỡng',
//     wordType: 'v',
//     example: ['All the children were well nourished and in good physical condition.'],
//     subject: 'health'
//   },
//   {
//     _id: '4',
//     englishWord: 'moisture',
//     definition: 'độ ẩm',
//     wordType: 'n',
//     example: ['The skin\'s natural moisture'],
//     subject: 'science'
//   },
//   {
//     _id: '5',
//     englishWord: 'spinal cord',
//     definition: 'tủy sống',
//     wordType: 'n',
//     example: ['The spinal cord is a part of the central nervous system.'],
//     subject: 'biology'
//   },
//   {
//     _id: '6',
//     englishWord: 'bowel movement',
//     definition: 'sự đi tiêu',
//     wordType: 'n',
//     example: ['Regular bowel movements are important for health.'],
//     subject: 'health'
//   },
//   {
//     _id: '7',
//     englishWord: 'defecate',
//     definition: 'đại tiện',
//     wordType: 'v',
//     example: ['It\'s important to defecate regularly for good health.'],
//     subject: 'health'
//   },
//   {
//     _id: '8',
//     englishWord: 'in a way that appears to be',
//     definition: 'một cách có vẻ như',
//     wordType: 'phrase',
//     example: ['He spoke in a way that appears to be confident.'],
//     subject: 'general'
//   },
//   {
//     _id: '9',
//     englishWord: 'longevity',
//     definition: 'tuổi thọ',
//     wordType: 'n',
//     example: ['The longevity of the population has increased over the years.'],
//     subject: 'health'
//   },
//   {
//     _id: '10',
//     englishWord: 'sustainable',
//     definition: 'bền vững',
//     wordType: 'adj',
//     example: ['We need to find sustainable solutions to environmental problems.'],
//     subject: 'environment'
//   },
//   {
//     _id: '11',
//     englishWord: 'resilience',
//     definition: 'khả năng phục hồi',
//     wordType: 'n',
//     example: ['The resilience of the community was evident after the natural disaster.'],
//     subject: 'psychology'
//   },
//   {
//     _id: '12',
//     englishWord: 'innovative',
//     definition: 'đổi mới, sáng tạo',
//     wordType: 'adj',
//     example: ['The company is known for its innovative approach to problem-solving.'],
//     subject: 'business'
//   }
// ]

export default async function VocabGamePage() {
  const vocabularies = await getVocabularies();

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <VocabMatchGame vocabList={vocabularies as VocabularySet[]} />
    </div>
  )
}

