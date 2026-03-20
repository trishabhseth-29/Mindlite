import Link from "next/link"
import { Brain } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Brain className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold">MindLite</span>
            </Link>
            <p className="text-background/70 leading-relaxed">
              Empowering families and healthcare providers with early cognitive health detection.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#features" className="text-background/70 hover:text-background transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="text-background/70 hover:text-background transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-background/70 hover:text-background transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-background/70 hover:text-background transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-background/70 hover:text-background transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-background/70 hover:text-background transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-background/70 hover:text-background transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-background/70 hover:text-background transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-background/70 hover:text-background transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-background/70 hover:text-background transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/hipaa" className="text-background/70 hover:text-background transition-colors">
                  HIPAA Compliance
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-background/50 text-sm">
            2024 MindLite. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-background/50 hover:text-background transition-colors text-sm">
              Twitter
            </Link>
            <Link href="#" className="text-background/50 hover:text-background transition-colors text-sm">
              LinkedIn
            </Link>
            <Link href="#" className="text-background/50 hover:text-background transition-colors text-sm">
              Facebook
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
