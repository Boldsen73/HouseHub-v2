
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import HowItWorksIntro from '@/components/howitworks/HowItWorksIntro';
import HowItWorksSellers from '@/components/howitworks/HowItWorksSellers';
import HowItWorksAgents from '@/components/howitworks/HowItWorksAgents';
import HowItWorksBenefits from '@/components/howitworks/HowItWorksBenefits';

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="container mx-auto px-6 py-20">
        <HowItWorksIntro />
        <HowItWorksSellers />
        <HowItWorksAgents />
        <HowItWorksBenefits />
      </div>
      
      <Footer />
    </div>
  );
};

export default HowItWorks;
