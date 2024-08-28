import { FiBook, FiClock, FiTrendingUp, FiUsers, FiCheckCircle } from "react-icons/fi"
import Link from "next/link"

export default function Component() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex justify-between items-center">
            <div className="text-2xl font-bold text-black">
              LearnTrack
            </div>
            <div className="space-x-4">
              <Link href="#features" className="text-gray-600 hover:text-black transition duration-300">
                Features
              </Link>
              <Link href="#testimonials" className="text-gray-600 hover:text-black transition duration-300">
                Testimonials
              </Link>
              <Link href="#pricing" className="text-gray-600 hover:text-black transition duration-300">
                Pricing
              </Link>
              <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition duration-300">
                Get Started
              </button>
            </div>
          </nav>
        </div>
      </header>

      <main>
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-black">
                  Empower Your Learning Journey
                </h1>
                <p className="text-xl mb-8 text-gray-600">
                  Track progress, manage resources, and achieve your learning goals with ease.
                </p>
                <button className="bg-black text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-800 transition duration-300">
                  Start Free Trial
                </button>
              </div>
              <div className="md:w-1/2">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Learning Path Dashboard"
                  className="rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-black">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <FiBook className="w-8 h-8 text-black" />,
                  title: "Comprehensive Learning Paths",
                  description: "Create and manage detailed learning paths with various resource types.",
                },
                {
                  icon: <FiClock className="w-8 h-8 text-black" />,
                  title: "Reading Statistics",
                  description: "Track time spent on topics and overall skill completion time.",
                },
                {
                  icon: <FiTrendingUp className="w-8 h-8 text-black" />,
                  title: "Real-time Progress Tracking",
                  description: "Monitor learner progress with continuous updates and insights.",
                },
                {
                  icon: <FiUsers className="w-8 h-8 text-black" />,
                  title: "User-Friendly Interface",
                  description: "Intuitive dashboard design following UX best practices.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-md"
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-black">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-black">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Alex Johnson",
                  role: "Software Developer",
                  content: "LearnTrack has revolutionized my learning process. I can easily track my progress and manage my time effectively.",
                },
                {
                  name: "Sarah Lee",
                  role: "UX Designer",
                  content: "The user-friendly interface and comprehensive learning paths have significantly improved my skill development.",
                },
                {
                  name: "Michael Brown",
                  role: "Data Scientist",
                  content: "Real-time progress tracking keeps me motivated and helps me stay on top of my learning goals.",
                },
              ].map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                  <div className="font-semibold text-black">{testimonial.name}</div>
                  <div className="text-gray-500">{testimonial.role}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-black">Simple, Transparent Pricing</h2>
            <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch gap-8">
              {[
                {
                  name: "Basic",
                  price: "$9.99",
                  features: ["5 Learning Paths", "Basic Progress Tracking", "Email Support"],
                },
                {
                  name: "Pro",
                  price: "$19.99",
                  features: ["Unlimited Learning Paths", "Advanced Analytics", "Priority Support", "Custom Integrations"],
                },
              ].map((plan, index) => (
                <div key={index} className="w-full md:w-1/3 bg-white p-8 rounded-lg shadow-md border border-gray-200">
                  <h3 className="text-2xl font-bold mb-4 text-black">{plan.name}</h3>
                  <div className="text-4xl font-bold mb-6 text-black">{plan.price}<span className="text-lg font-normal text-gray-500">/month</span></div>
                  <ul className="mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center mb-2 text-gray-600">
                        <FiCheckCircle className="mr-2 text-black" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-300">
                    Choose Plan
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8 text-black">Ready to Transform Your Learning Experience?</h2>
            <p className="text-xl mb-8 text-gray-600">
              Join LearnTrack today and take control of your educational journey.
            </p>
            <button className="bg-black text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-800 transition duration-300">
              Start Your Free Trial
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-600 mb-4 md:mb-0">
              &copy; 2023 LearnTrack. All rights reserved.
            </div>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-600 hover:text-black transition duration-300">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-600 hover:text-black transition duration-300">
                Terms of Service
              </Link>
              <Link href="#" className="text-gray-600 hover:text-black transition duration-300">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

