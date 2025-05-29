
export interface EmailData {
  to: string;
  subject: string;
  content: string;
  type: 'agent_new_case' | 'agent_case_closed' | 'seller_offers_received' | 'seller_case_withdrawn';
}

export const mockEmailService = {
  sendEmail: async (emailData: EmailData): Promise<boolean> => {
    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('📧 EMAIL SENT (SIMULATED):', {
      from: 'system@househub.dk',
      to: emailData.to,
      subject: emailData.subject,
      type: emailData.type,
      timestamp: new Date().toISOString()
    });
    
    // Store in localStorage for admin tracking
    const sentEmails = JSON.parse(localStorage.getItem('househub_sent_emails') || '[]');
    sentEmails.push({
      ...emailData,
      from: 'system@househub.dk',
      sentAt: new Date().toISOString(),
      id: Date.now()
    });
    localStorage.setItem('househub_sent_emails', JSON.stringify(sentEmails));
    
    return true;
  },

  getSentEmails: () => {
    return JSON.parse(localStorage.getItem('househub_sent_emails') || '[]');
  }
};

export const emailTemplates = {
  agentNewCase: (caseData: any) => ({
    subject: `Ny sag tilgængelig på HouseHub – ${caseData.municipality} / ${caseData.type}`,
    content: `
      <h2>Ny sag tilgængelig</h2>
      <p>Hej,</p>
      <p>Der er oprettet en ny sag på HouseHub, som matcher dine kriterier:</p>
      
      <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; margin: 16px 0;">
        <strong>Sag #${caseData.id}</strong><br>
        <strong>Adresse:</strong> ${caseData.address}<br>
        <strong>Type:</strong> ${caseData.type}<br>
        <strong>Forventet pris:</strong> ${caseData.price}
      </div>
      
      <p>Du kan afgive dit tilbud ved at logge ind på HouseHub.</p>
      <p>Deadline for tilbud: 7 dage fra nu</p>
      
      <p>Venlig hilsen,<br>HouseHub Team</p>
    `
  }),

  agentCaseClosed: (caseData: any) => ({
    subject: `Sagen #${caseData.id} er nu lukket`,
    content: `
      <h2>Sag lukket</h2>
      <p>Hej,</p>
      <p>Sagen #${caseData.id} (${caseData.address}) er nu lukket af administratoren.</p>
      <p>Der kan ikke længere afgives tilbud til denne sag.</p>
      <p>Tak for din interesse.</p>
      
      <p>Venlig hilsen,<br>HouseHub Team</p>
    `
  }),

  sellerOffersReceived: (offerCount: number) => ({
    subject: `Du har modtaget ${offerCount} nye tilbud fra ejendomsmæglere`,
    content: `
      <h2>Nye tilbud modtaget!</h2>
      <p>Hej,</p>
      <p>Du har modtaget <strong>${offerCount} tilbud</strong> fra kvalificerede ejendomsmæglere.</p>
      
      <p>Log ind på HouseHub for at sammenligne tilbuddene og vælge den mægler, der passer bedst til dig.</p>
      
      <p>Venlig hilsen,<br>HouseHub Team</p>
    `
  }),

  sellerCaseWithdrawn: () => ({
    subject: `Du har annulleret din boligvurdering`,
    content: `
      <h2>Sag annulleret</h2>
      <p>Hej,</p>
      <p>Du har nu annulleret din boligvurdering på HouseHub.</p>
      
      <div style="background: #fef3c7; padding: 16px; border-radius: 8px; margin: 16px 0;">
        <strong>Bemærk:</strong> Din betaling på 500 kr refunderes ikke, som beskrevet i vores vilkår.
      </div>
      
      <p>Kontakt os på support@househub.dk hvis dette er sket ved en fejl.</p>
      
      <p>Venlig hilsen,<br>HouseHub Team</p>
    `
  })
};
