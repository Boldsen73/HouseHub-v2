
import { Card, CardContent } from '@/components/ui/card';
import { FilePenLine, Search, Scale, Handshake, Eye } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: FilePenLine,
      title: "Indtast oplysninger",
      description: "Tilføj info om din bolig på få minutter.",
      iconBgColor: "bg-blue-100",
      iconTextColor: "text-blue-600",
    },
    {
      icon: Eye,
      title: "Fremvis én gang",
      description: "Én fremvisning – alle mæglere. Vi henter data automatisk.",
      iconBgColor: "bg-teal-100",
      iconTextColor: "text-teal-600",
    },
    {
      icon: Search,
      title: "Modtag tilbud",
      description: "Få skræddersyede tilbud fra lokale mæglere.",
      iconBgColor: "bg-green-100",
      iconTextColor: "text-green-600",
    },
    {
      icon: Scale,
      title: "Sammenlign og vælg",
      description: "Sammenlign betingelser og vælg det bedste match.",
      iconBgColor: "bg-purple-100",
      iconTextColor: "text-purple-600",
    },
    {
      icon: Handshake,
      title: "Start samarbejdet",
      description: "Sæt gang i salget og kontakt den valgte mægler.",
      iconBgColor: "bg-orange-100",
      iconTextColor: "text-orange-600",
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-heading-foreground mb-12 md:mb-16">
          Sådan virker HouseHub
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="text-center bg-card border-border shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out rounded-xl relative group hover:scale-105 hover:-translate-y-2 cursor-pointer">
              <CardContent className="p-6 md:p-8">
                {/* Step number */}
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold group-hover:bg-blue-700 transition-colors duration-300">
                  {index + 1}
                </div>
                <div className={`w-16 h-16 ${step.iconBgColor} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className={`h-8 w-8 ${step.iconTextColor} group-hover:scale-110 transition-transform duration-300`} />
                </div>
                <h3 className="text-xl font-semibold text-heading-foreground mb-2 group-hover:text-blue-600 transition-colors duration-300">{step.title}</h3>
                <p className="text-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
