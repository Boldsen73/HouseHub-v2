
export const generateCaseNumber = (): string => {
  const year = new Date().getFullYear();
  const timestamp = Date.now().toString().slice(-4);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `HH-${year}-${timestamp}${random}`;
};

export const formatCaseNumber = (caseNumber: string): string => {
  return caseNumber || 'HH-2025-0001';
};
