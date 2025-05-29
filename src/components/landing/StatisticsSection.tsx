
const StatisticsSection = () => {
  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center text-white">
          <div className="space-y-3">
            <div className="text-4xl md:text-5xl font-light mb-3 text-white font-lato">2,500+</div>
            <div className="text-slate-300 font-light tracking-wide">Solgte boliger</div>
          </div>
          <div className="space-y-3">
            <div className="text-4xl md:text-5xl font-light mb-3 text-white font-lato">450+</div>
            <div className="text-slate-300 font-light tracking-wide">Aktive mæglere</div>
          </div>
          <div className="space-y-3">
            <div className="text-4xl md:text-5xl font-light mb-3 text-white font-lato">98%</div>
            <div className="text-slate-300 font-light tracking-wide">Tilfredse kunder</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
