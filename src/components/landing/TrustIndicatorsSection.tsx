
import { MapPin, TrendingUp, Shield } from 'lucide-react';

const TrustIndicatorsSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-4 font-lato">
            Hvorfor vælge HouseHub?
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center group">
            <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-100 transition-colors duration-300">
              <Shield className="h-10 w-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-medium mb-3 text-slate-900 font-lato">Sikker platform</h3>
            <p className="text-slate-600 leading-relaxed font-light">Alle mæglere er verificerede og autoriserede</p>
          </div>
          
          <div className="text-center group">
            <div className="w-20 h-20 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-100 transition-colors duration-300">
              <TrendingUp className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-xl font-medium mb-3 text-slate-900 font-lato">Bedste priser</h3>
            <p className="text-slate-600 leading-relaxed font-light">Konkurrer mæglere om dit salg</p>
          </div>
          
          <div className="text-center group">
            <div className="w-20 h-20 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-100 transition-colors duration-300">
              <MapPin className="h-10 w-10 text-purple-600" />
            </div>
            <h3 className="text-xl font-medium mb-3 text-slate-900 font-lato">Lokalt kendskab</h3>
            <p className="text-slate-600 leading-relaxed font-light">Mæglere med erfaring i dit område</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicatorsSection;
