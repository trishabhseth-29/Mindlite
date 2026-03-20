import Link from "next/link"
import { ArrowRight, Phone } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary p-8 sm:p-12 lg:p-16">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80" />
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
              Start Tracking Cognitive Health Today
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Join thousands of families who use MindLite to stay proactive about brain health. 
              Free to start, no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 bg-card text-foreground px-8 py-4 rounded-xl text-lg font-semibold hover:bg-card/90 transition-colors"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-primary-foreground/10 text-primary-foreground px-8 py-4 rounded-xl text-lg font-medium border border-primary-foreground/20 hover:bg-primary-foreground/20 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Talk to Us
              </Link>
            </div>
          </div>
          <div className="absolute right-0 bottom-0 w-64 h-64 bg-primary-foreground/5 rounded-full blur-3xl" />
          <div className="absolute right-20 top-0 w-40 h-40 bg-primary-foreground/5 rounded-full blur-2xl" />
        </div>
      </div>
    </section>
  )
}
