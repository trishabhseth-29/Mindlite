import { Quote } from "lucide-react"

const testimonials = [
  {
    quote: "MindLite gave us peace of mind. We caught early signs in my father that we would have missed otherwise. The games feel natural and he actually enjoys them.",
    name: "Sarah Mitchell",
    role: "Family Caregiver",
    initials: "SM",
  },
  {
    quote: "As a neurologist, I recommend MindLite to patients for home monitoring. The data integration with our systems is seamless, and the early detection capabilities are impressive.",
    name: "Dr. James Chen",
    role: "Neurologist, Mayo Clinic",
    initials: "JC",
  },
  {
    quote: "My mother was resistant to cognitive tests, but she loves the games in MindLite. It feels like playing, not testing. We can finally track her progress without stress.",
    name: "Maria Rodriguez",
    role: "Family Member",
    initials: "MR",
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Stories from Our Community
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from families and healthcare providers who use MindLite every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative p-8 bg-card rounded-2xl border border-border"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/20" />
              <blockquote className="text-foreground leading-relaxed mb-6 relative z-10">
                {'"'}{testimonial.quote}{'"'}
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-semibold">
                    {testimonial.initials}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
