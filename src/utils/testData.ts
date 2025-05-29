
// Test environment setup and data management
export interface TestUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'seller' | 'agent' | 'admin';
  phone?: string;
  company?: string;
  authorizationNumber?: string;
  primaryRegion?: string;
  specialties?: string[];
  address?: string;
  isActive?: boolean;
}

export interface TestCase {
  id: string;
  sagsnummer: string;
  sellerId: string;
  address: string;
  postnummer: string;
  municipality: string;
  type: string;
  size: number;
  buildYear: number;
  price: string;
  priceValue: number;
  showingDate?: Date;
  showingTime?: string;
  showingNotes?: string;
  status: 'draft' | 'active' | 'showing_booked' | 'showing_completed' | 'offers_received' | 'realtor_selected' | 'withdrawn' | 'archived';
  createdAt: string;
  offers: TestOffer[];
  showingRegistrations: TestShowingRegistration[];
  messages: TestMessage[];
}

export interface TestOffer {
  id: string;
  caseId: string;
  agentId: string;
  agentName: string;
  agencyName: string;
  expectedPrice: string;
  priceValue: number;
  commission: string;
  commissionValue: number;
  bindingPeriod: string;
  marketingPackage: string;
  salesStrategy: string;
  marketingMethods: Array<{
    id: string;
    name: string;
    cost: number;
    included: boolean;
  }>;
  submittedAt: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface TestShowingRegistration {
  id: string;
  caseId: string;
  agentId: string;
  agentName: string;
  agencyName: string;
  registeredAt: string;
}

export interface TestMessage {
  id: string;
  caseId: string;
  fromUserId: string;
  toUserId: string;
  fromName: string;
  toName: string;
  message: string;
  timestamp: string;
  read: boolean;
  archived: boolean;
}

// Only admin user for completely clean environment
export const TEST_USERS: TestUser[] = [
  {
    id: 'admin-test-1',
    email: 'admin@hh.dk',
    password: '12345678',
    name: 'Administrator',
    role: 'admin',
    isActive: true
  }
];

// Initialize completely clean test environment
export const initializeTestEnvironment = () => {
  // Clear all existing data completely
  localStorage.removeItem('test_users');
  localStorage.removeItem('test_cases');
  localStorage.removeItem('agent_notifications');
  localStorage.removeItem('case_messages');
  localStorage.removeItem('agentCaseStates');
  localStorage.removeItem('seller_has_active_case');
  localStorage.removeItem('showing_registrations');
  localStorage.removeItem('househub_withdrawn_cases');
  localStorage.removeItem('current_case_number');
  localStorage.removeItem('currentUser');
  localStorage.removeItem('agent_session_backup');
  localStorage.removeItem('admin_session_backup');
  localStorage.removeItem('agent_has_seen_benefits');
  localStorage.removeItem('system_audit_log');
  localStorage.removeItem('seller_address_cache');

  // Set up only admin user
  localStorage.setItem('test_users', JSON.stringify(TEST_USERS));
  
  // Initialize completely empty arrays for all data
  localStorage.setItem('test_cases', JSON.stringify([]));
  localStorage.setItem('agent_notifications', JSON.stringify([]));
  localStorage.setItem('case_messages', JSON.stringify([]));
  localStorage.setItem('agentCaseStates', JSON.stringify({}));
  localStorage.setItem('system_audit_log', JSON.stringify([]));
};

// Helper functions for test data management
export const getTestUsers = (): TestUser[] => {
  const users = localStorage.getItem('test_users');
  return users ? JSON.parse(users) : TEST_USERS;
};

export const addTestUser = (user: TestUser) => {
  const users = getTestUsers();
  users.push(user);
  localStorage.setItem('test_users', JSON.stringify(users));
  
  // Cache seller address for auto-fill functionality
  if (user.role === 'seller' && user.address) {
    localStorage.setItem('seller_address_cache', user.address);
  }
};

export const getTestCases = (): TestCase[] => {
  const cases = localStorage.getItem('test_cases');
  return cases ? JSON.parse(cases) : [];
};

export const saveTestCase = (testCase: TestCase) => {
  const cases = getTestCases();
  const existingIndex = cases.findIndex(c => c.id === testCase.id);
  
  if (existingIndex >= 0) {
    cases[existingIndex] = testCase;
  } else {
    cases.push(testCase);
  }
  
  localStorage.setItem('test_cases', JSON.stringify(cases));
};

export const updateCaseStatus = (caseId: string, newStatus: TestCase['status']) => {
  const cases = getTestCases();
  const updatedCases = cases.map(c => 
    c.id === caseId ? { ...c, status: newStatus } : c
  );
  localStorage.setItem('test_cases', JSON.stringify(updatedCases));
};

export const getTestCaseById = (id: string): TestCase | null => {
  const cases = getTestCases();
  return cases.find(c => c.id === id) || null;
};

export const getTestCaseBySagsnummer = (sagsnummer: string): TestCase | null => {
  const cases = getTestCases();
  return cases.find(c => c.sagsnummer === sagsnummer) || null;
};

export const generateSagsnummer = (): string => {
  const year = new Date().getFullYear();
  const timestamp = Date.now().toString().slice(-4);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `HH-${year}-${timestamp}${random}`;
};

// User management functions
export const updateTestUser = (userId: string, updatedData: Partial<TestUser>) => {
  const users = getTestUsers();
  const updatedUsers = users.map(user => 
    user.id === userId ? { ...user, ...updatedData } : user
  );
  localStorage.setItem('test_users', JSON.stringify(updatedUsers));
  return updatedUsers;
};

export const deactivateTestUser = (userId: string) => {
  return updateTestUser(userId, { isActive: false });
};

export const deleteTestUser = (userId: string) => {
  const users = getTestUsers();
  const updatedUsers = users.filter(user => user.id !== userId);
  localStorage.setItem('test_users', JSON.stringify(updatedUsers));
  
  // Also delete related cases if it's a seller
  const cases = getTestCases();
  const updatedCases = cases.filter(case_ => case_.sellerId !== userId);
  localStorage.setItem('test_cases', JSON.stringify(updatedCases));
  
  // Log deletion for audit purposes (internal system log)
  const auditLog = JSON.parse(localStorage.getItem('system_audit_log') || '[]');
  auditLog.push({
    action: 'USER_DELETED',
    userId,
    timestamp: new Date().toISOString(),
    adminId: JSON.parse(localStorage.getItem('currentUser') || '{}').id
  });
  localStorage.setItem('system_audit_log', JSON.stringify(auditLog));
  
  return updatedUsers;
};

// Authentication helper
export const authenticateTestUser = (email: string, password: string): TestUser | null => {
  const users = getTestUsers();
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    // Check if user is deactivated
    if (user.isActive === false) {
      return null; // Prevent login for deactivated users
    }
    
    // Set as current user
    localStorage.setItem('currentUser', JSON.stringify({
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
      agencyName: user.company,
      primaryRegion: user.primaryRegion,
      specialties: user.specialties,
      address: user.address
    }));
    return user;
  }
  
  return null;
};

// Get cached seller address for auto-fill
export const getCachedSellerAddress = (): string | null => {
  return localStorage.getItem('seller_address_cache');
};

// Archive messages when case is closed
export const archiveCaseMessages = (caseId: string) => {
  const messages = JSON.parse(localStorage.getItem('case_messages') || '[]');
  const updatedMessages = messages.map((msg: TestMessage) => 
    msg.caseId === caseId ? { ...msg, archived: true } : msg
  );
  localStorage.setItem('case_messages', JSON.stringify(updatedMessages));
};

// Get messages for a specific case
export const getCaseMessages = (caseId: string, includeArchived: boolean = false): TestMessage[] => {
  const messages = JSON.parse(localStorage.getItem('case_messages') || '[]');
  return messages.filter((msg: TestMessage) => 
    msg.caseId === caseId && (includeArchived || !msg.archived)
  );
};

// Send message
export const sendMessage = (message: Omit<TestMessage, 'id' | 'timestamp'>) => {
  const messages = JSON.parse(localStorage.getItem('case_messages') || '[]');
  const newMessage: TestMessage = {
    ...message,
    id: Date.now().toString(),
    timestamp: new Date().toISOString()
  };
  messages.push(newMessage);
  localStorage.setItem('case_messages', JSON.stringify(messages));
  return newMessage;
};

// Reset test environment completely
export const resetTestEnvironment = () => {
  initializeTestEnvironment();
};
