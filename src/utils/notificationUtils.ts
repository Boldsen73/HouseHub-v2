
export const notifyRealtorLoss = (caseNumber: string, caseId: string) => {
  // Store notification for realtor
  const notification = {
    id: Date.now(),
    type: 'loss',
    message: `Desværre! Du har tabt sag ${caseNumber}`,
    caseId,
    timestamp: new Date().toISOString(),
    read: false
  };

  const notifications = JSON.parse(localStorage.getItem('agent_notifications') || '[]');
  notifications.push(notification);
  localStorage.setItem('agent_notifications', JSON.stringify(notifications));

  // Send email notification (simulated)
  console.log(`Email sent to losing realtor for case ${caseNumber}`);
};

export const notifyRealtorWin = (caseNumber: string, caseId: string, sellerInfo?: { name: string; email: string; phone: string }) => {
  // Store notification for realtor
  const notification = {
    id: Date.now(),
    type: 'win',
    message: `Tillykke! Du har vundet sag ${caseNumber}`,
    caseId,
    timestamp: new Date().toISOString(),
    read: false
  };
  
  const notifications = JSON.parse(localStorage.getItem('agent_notifications') || '[]');
  notifications.push(notification);
  localStorage.setItem('agent_notifications', JSON.stringify(notifications));
  
  // Send email notification (simulated)
  console.log(`Email sent to winning realtor for case ${caseNumber}`);
  
  // Update case status
  const cases = JSON.parse(localStorage.getItem('agent_cases') || '[]');
  const updatedCases = cases.map((case_: any) => 
    case_.id === caseId ? { ...case_, status: 'won' } : case_
  );
  localStorage.setItem('agent_cases', JSON.stringify(updatedCases));
};

export const notifyCaseWithdrawn = (caseNumber: string, caseId: string) => {
  // Store notification for all realtors that the case is withdrawn
  const notification = {
    id: Date.now(),
    type: 'case_withdrawn',
    message: `Sag ${caseNumber} er blevet trukket tilbage`,
    caseId,
    timestamp: new Date().toISOString(),
    read: false
  };

  const notifications = JSON.parse(localStorage.getItem('agent_notifications') || '[]');
  notifications.push(notification);
  localStorage.setItem('agent_notifications', JSON.stringify(notifications));

  // Send email notification (simulated)
  console.log(`Email sent to all realtors for withdrawn case ${caseNumber}`);
};
