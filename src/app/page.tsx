"use client"
import { useState } from 'react'
import { ChevronDown, BarChart, BookOpen, Users, Zap, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from '~/components/ui/button'

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="w-full py-4 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-200">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-black" />
            <span className="text-xl font-bold text-black">LearnPath</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#features" className="text-gray-600 hover:text-black transition-colors pt-1">Features</a>
            <a href="#benefits" className="text-gray-600 hover:text-black transition-colors pt-1">Benefits</a>
            <Link
              href="/api/auth/logout"
              className={buttonVariants({ size: "sm", variant: "default" })}>
              Sign In
            </Link>

          </nav>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <ChevronDown className={`h-6 w-6 text-gray-600 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </header>
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <nav className="container mx-auto py-2 px-4 flex flex-col space-y-2">
            <a href="#features" className="text-gray-600 hover:text-black transition-colors">Features</a>
            <a href="#benefits" className="text-gray-600 hover:text-black transition-colors">Benefits</a>


          </nav>
        </div>
      )}
      <main className="flex-grow">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black mb-6">
              Learning Path Dashboard for Enhancing Skills
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Empower your learning journey with our intuitive platform. Create, manage, and track comprehensive learning paths with ease.
            </p>
            <div>
              <a href="#" className="bg-black text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition-colors duration-300 inline-block">
                Get Started for Free
              </a>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-100">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center text-black mb-12">Powerful Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: BarChart, title: "Reading Statistics Tracking", description: "Monitor time spent on topics and track skill completion times." },
                { icon: BookOpen, title: "Learning Path Creation", description: "Easily create and manage comprehensive learning paths with various resources." },
                { icon: Users, title: "Real-Time Progress Tracking", description: "Stay updated with continuous progress monitoring for learners." },
                { icon: Zap, title: "AI-Powered Roadmap Generation", description: "Get personalized learning journeys with automated roadmap creation." }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <feature.icon className="h-12 w-12 text-black mb-4" />
                  <h3 className="text-xl font-semibold text-black mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center text-black mb-12">Benefits for Everyone</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: "For Instructors", benefits: ["Easily create and manage learning paths", "Track learner progress in real-time", "Incorporate various multimedia resources"] },
                { title: "For Learners", benefits: ["Access comprehensive, structured learning paths", "Track personal progress and time spent", "Enjoy personalized AI-generated roadmaps"] }
              ].map((group, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-6 rounded-lg shadow-sm"
                >
                  <h3 className="text-2xl font-semibold text-black mb-4">{group.title}</h3>
                  <ul className="space-y-2">
                    {group.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-black mr-2 flex-shrink-0" />
                        <span className="text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Enhance Your Skills?</h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Join thousands of instructors and learners who are already benefiting from our Learning Path Dashboard.
            </p>
            <a href="#" className="bg-white text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-200 transition-colors duration-300 inline-block">
              Start Your Free Trial
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 text-black py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-8 w-8 text-black" />
              <span className="text-xl font-bold">LearnPath</span>
            </div>
            <p className="text-gray-600">Empowering education through innovative technology.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors">Home</a></li>
              <li><a href="#features" className="text-gray-600 hover:text-black transition-colors">Features</a></li>
              <li><a href="#benefits" className="text-gray-600 hover:text-black transition-colors">Benefits</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-600 mb-2">Email: info@learnpath.com</p>
            <p className="text-gray-600">Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className="container mx-auto mt-8 pt-8 border-t border-gray-300 text-center text-gray-600">
          <p>&copy; 2023 LearnPath. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
