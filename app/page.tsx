import { Header } from "@/components/layout/header"
import { HeroSection } from "@/components/landing/hero-section"
import { WhyChooseUs } from "@/components/landing/why-choose-us"
import { ProductSection } from "@/components/landing/product-section"
import { SubscriptionSection } from "@/components/landing/subscription-section"
import { Testimonials } from "@/components/landing/testimonials"
import { OurStorySection } from "@/components/landing/our-story-section"
import { ContactSection } from "@/components/landing/contact-section"
import { Footer } from "@/components/layout/footer"

export default function LandingPage() {
  return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <HeroSection />
        <WhyChooseUs />
        <ProductSection />
        <SubscriptionSection />
        <Testimonials />
        <OurStorySection />
        <ContactSection />
      </main>
  )
}
