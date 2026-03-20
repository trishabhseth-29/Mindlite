import { UserPlus, Gamepad2, BarChart3, BellRing } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create Your Account",
    description: "Sign up in minutes. Add family members or connect with your healthcare provider for comprehensive care.",
  },
  {
    number: "02",
    icon: Gamepad2,
    title: "Play Daily Games",
    description: "Spend just 5 minutes a day on fun cognitive exercises. Games adapt to your level for optimal assessment.",
  },
  {
    number: "03",
    icon: BarChart3,
    title: "Track Progress",
    description: "View detailed insights about your cognitive performance. Our AI analyzes patterns over time.",
  },
  {
    number: "04",
    icon: BellRing,
    title: "Stay Informed",
    description: "Receive personalized recommendations and alerts. Share reports with your care team easily.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            How MindLite Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            A simple, supportive process designed for ease of use at any age.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-14 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent -translate-x-4" />
              )}
              <div className="text-center">
                <div className="relative inline-flex">
                  <div className="w-28 h-28 rounded-2xl bg-secondary flex items-center justify-center mb-6">
                    <step.icon className="w-12 h-12 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
