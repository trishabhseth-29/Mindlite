import { Gamepad2, LineChart, Users, Bell, Brain, Lock } from "lucide-react"

const features = [
  {
    icon: Gamepad2,
    title: "Engaging Cognitive Games",
    description: "Fun, scientifically-designed games that assess memory, attention, and executive function without feeling like a test.",
  },
  {
    icon: LineChart,
    title: "Progress Tracking",
    description: "Visual dashboards show performance trends over time, helping identify subtle changes in cognitive health.",
  },
  {
    icon: Users,
    title: "Family Recognition",
    description: "Upload photos of loved ones to create personalized memory exercises that strengthen connections.",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description: "Automatic notifications to caregivers and healthcare providers when significant changes are detected.",
  },
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Advanced machine learning algorithms analyze patterns to provide early detection insights.",
  },
  {
    icon: Lock,
    title: "Private & Secure",
    description: "Your health data is encrypted and protected. You control who has access to your information.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 sm:py-28 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Everything You Need for Cognitive Care
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools designed to support patients, families, and healthcare providers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 bg-card rounded-2xl border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
