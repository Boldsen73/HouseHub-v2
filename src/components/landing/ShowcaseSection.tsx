
const ShowcaseSection = () => {
  const showcaseItems = [
    {
      title: "Villaer",
      description: "Klassiske og moderne familiehjem",
      imageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      altText: "Moderne dansk villa med have",
    },
    {
      title: "Lejligheder",
      description: "Centralt beliggende byboliger",
      imageUrl: "https://images.unsplash.com/photo-1494203484021-3c454daf695d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      altText: "Københavnsk etageejendom med altaner",
    },
    {
      title: "Rækkehuse",
      description: "Hyggelige boliger i tætte fællesskaber",
      imageUrl: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      altText: "Række af danske rækkehuse med små forhaver",
    },
    {
      title: "Sommerhuse",
      description: "Idylliske fristeder nær kyst og natur",
      imageUrl: "https://images.unsplash.com/photo-1524230572899-a752b3835840?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      altText: "Moderne hvidt sommerhus",
    },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-4 font-lato">
            Boliger i hele Danmark
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-light">
            Fra charmerende rækkehuse til moderne villaer – vi hjælper med salg af alle boligtyper
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {showcaseItems.map((item) => (
            <div key={item.title} className="relative rounded-2xl overflow-hidden shadow-lg group bg-white border border-slate-200 hover:shadow-xl transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.altText} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-slate-900 font-medium text-lg mb-2 font-lato">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed font-light">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
