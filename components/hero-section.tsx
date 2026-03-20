import Link from "next/link"
import { ArrowRight, Shield, Heart, Activity } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            Trusted by healthcare professionals
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
            Track Cognitive Health with{" "}
            <span className="text-primary">Simple Games</span>
          </h1>
          
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            MindLite helps detect early signs of cognitive decline through engaging, 
            scientifically-validated games based on the Montreal Cognitive Assessment.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
            >
              Start Free Assessment
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="#how-it-works"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-card text-foreground px-8 py-4 rounded-xl text-lg font-medium border border-border hover:bg-muted transition-colors"
            >
              Learn More
            </Link>
          </div>
          
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-card border border-border">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Activity className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-foreground">5 min</p>
                <p className="text-sm text-muted-foreground">Daily exercises</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-card border border-border">
              <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-success" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-foreground">HIPAA</p>
                <p className="text-sm text-muted-foreground">Compliant & secure</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-card border border-border">
              <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center">
                <Heart className="w-6 h-6 text-warning" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-foreground">10K+</p>
                <p className="text-sm text-muted-foreground">Families helped</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
