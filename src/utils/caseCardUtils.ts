
export const formatPrice = (price: string) => {
  return price.replace(/(\d)\.(\d{3})\.(\d{3})/, '$1.$2.$3');
};

export const getViewingText = (caseId: number) => {
  // Different viewing times based on case ID for variety
  const viewingTimes: Record<number, string> = {
    1: "Fremvisning: Mandag d. 10. juni kl. 16:30",
    2: "Fremvisning: Tirsdag d. 11. juni kl. 17:00", 
    3: "Fremvisning: Onsdag d. 12. juni kl. 15:45"
  };
  return viewingTimes[caseId] || "Fremvisning: Mandag d. 10. juni kl. 16:30";
};

export const checkForNewMessages = (agentStatus: string) => {
  // Mock: Check if there are new messages (in real app this would come from case data)
  return agentStatus === 'offer_submitted' && Math.random() > 0.5;
};
