import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Problem from "@/components/landing/Problem";
import Features from "@/components/landing/Features";
import Dashboard from "@/components/landing/Dashboard";
import HowItWorks from "@/components/landing/HowItWorks";
import Trust from "@/components/landing/Trust";
import Testimonials from "@/components/landing/Testimonials";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Problem />
      <section id="features"><Features /></section>
      <section id="analytics"><Dashboard /></section>
      <HowItWorks />
      <section id="results"><Trust /></section>
      <Testimonials />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
