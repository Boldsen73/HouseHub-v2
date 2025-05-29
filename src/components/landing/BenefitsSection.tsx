
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Clock, DollarSign } from 'lucide-react';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: CheckCircle,
      title: "Få gennemsigtige tilbud",
      description: "Se alle tilbud side om side og sammenlign priser, kommission og markedsføringsmetoder.",
      iconBgColor: "bg-green-100",
      iconTextColor: "text-green-600",
    },
    {
      icon: Clock,
      title: "Spar tid – ét sted, alle mæglere",
      description: "I stedet for at kontakte mange mæglere enkeltvis, får du alle tilbud samlet ét sted.",
      iconBgColor: "bg-blue-100",
      iconTextColor: "text-blue-600",
    },
    {
      icon: DollarSign,
      title: "Fast pris: 500 kr (inkl. moms)",
      description: "Ingen skjulte gebyrer. Beløbet refunderes fuldt ud ved formidlingsaftale.",
      iconBgColor: "bg-purple-100",
      iconTextColor: "text-purple-600",
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-900 mb-12 md:mb-16">
          Fordele ved HouseHub
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center bg-white border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
              <CardContent className="p-6 md:p-8">
                <div className={`w-16 h-16 ${benefit.iconBgColor} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <benefit.icon className={`h-8 w-8 ${benefit.iconTextColor}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
