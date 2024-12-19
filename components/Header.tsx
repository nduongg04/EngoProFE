import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-[#49BBBD] text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          EngoPro
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/tests">Bài kiểm tra</Link></li>
            <li><Link href="/flashcards">Thẻ ghi nhớ</Link></li>
            <li><Link href="/vocabulary">Từ vựng</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

