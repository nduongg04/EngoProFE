import Image from "next/image"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export default function Footer() {
  return (
    <footer className="bg-[#2A2B3F] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center gap-4">
            <Image 
              src="/logo-white.svg" 
              alt="EngoPro Logo" 
              width={120} 
              height={40}
              className="w-auto h-8"
            />
            <Separator orientation="vertical" className="h-8 bg-white/20" />
            <div className="text-lg">
              <p>Online learning</p>
              <p>English tools</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-300">
            <Link href="/careers" className="hover:text-white transition-colors">
              Careers
            </Link>
            <Separator orientation="vertical" className="h-4 bg-white/20" />
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Separator orientation="vertical" className="h-4 bg-white/20" />
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
          </div>2

          <div className="text-sm text-gray-300">
            © 2024 Class Technologies Inc.
          </div>
        </div>
      </div>
    </footer>
  )
}

