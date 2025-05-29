
// src/services/publicValuationService.ts

/**
 * Simulerer et API-kald for at hente den offentlige ejendomsvurdering.
 * @param address - Boligens adresse.
 * @param postalCode - Boligens postnummer.
 * @returns En Promise der resolver til den offentlige vurdering som et tal, eller null hvis den ikke kunne findes.
 */
export const fetchPublicValuation = async (address: string, postalCode: string): Promise<number | null> => {
  console.log(`Simulerer hentning af offentlig vurdering for ${address}, ${postalCode}...`);
  
  // Simulerer netværksforsinkelse
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

  if (address && postalCode && postalCode.match(/^\d{4}$/)) {
    // Simpel mock-logik: postnummeret bidrager mest, adresselængde giver lidt variation.
    // Dette er KUN til demonstration og har ingen reel datakilde.
    try {
      const postalCodeNum = parseInt(postalCode, 10);
      let baseValuation = 0;

      if (postalCodeNum >= 1000 && postalCodeNum <= 2999) baseValuation = 3000000; // København og omegn
      else if (postalCodeNum >= 3000 && postalCodeNum <= 4999) baseValuation = 2000000; // Nordsjælland / Sjælland
      else if (postalCodeNum >= 5000 && postalCodeNum <= 5999) baseValuation = 1500000; // Fyn
      else if (postalCodeNum >= 6000 && postalCodeNum <= 9999) baseValuation = 1200000; // Jylland
      else baseValuation = 1000000; // Default

      const variation = (address.length % 10) * 50000 - 250000; // Tilføj lidt variation
      const finalValuation = Math.max(500000, baseValuation + variation + Math.floor(Math.random() * 500000));
      
      console.log(`Mocked public valuation: ${finalValuation} DKK`);
      return finalValuation;
    } catch (error) {
      console.error("Fejl i mock public valuation generation:", error);
      return null;
    }
  }
  
  console.log("Ugyldig adresse eller postnummer for mock valuation.");
  return null;
};

