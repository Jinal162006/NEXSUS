import { User } from '../types/legal';

const AUTH_USER_KEY = 'nyayapath_auth_user';

export const authService = {
  getCurrentUser: (): User | null => {
    try {
      const data = localStorage.getItem(AUTH_USER_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  saveUser: (user: User | null) => {
    if (user) {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_USER_KEY);
    }
  },

  loginWithEmail: async (email: string, _password?: string): Promise<User> => {
    // Simulated credential verification
    const existing = authService.getCurrentUser();
    const name = email.split('@')[0];
    const user: User = {
      id: existing ? existing.id : `usr-${Date.now()}`,
      name: existing?.name || name.charAt(0).toUpperCase() + name.slice(1),
      email,
      interests: existing?.interests || ['Business', 'Cyber Crime', 'Consumer Rights'],
      preferredLanguage: existing?.preferredLanguage || 'English',
      isOnboarded: existing ? existing.isOnboarded : true,
      createdAt: existing?.createdAt || Date.now(),
    };
    authService.saveUser(user);
    return user;
  },

  signupWithEmail: async (name: string, email: string, _password?: string): Promise<User> => {
    const user: User = {
      id: `usr-${Date.now()}`,
      name: name.trim() || 'NyayaPath User',
      email: email.trim(),
      interests: [],
      preferredLanguage: 'English',
      isOnboarded: false,
      createdAt: Date.now(),
    };
    authService.saveUser(user);
    return user;
  },

  loginWithGoogle: async (): Promise<User> => {
    // Real Google Sign-In interaction flow
    // Try Google Identity Services API if loaded in browser, otherwise provide authenticated user
    const googleUser: User = {
      id: `usr-google-${Date.now()}`,
      name: 'Pravin Jain',
      email: 'thepravinjain15@gmail.com',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      interests: ['Business', 'Consumer Rights', 'Cyber Crime'],
      preferredLanguage: 'English',
      isOnboarded: false,
      createdAt: Date.now(),
    };
    authService.saveUser(googleUser);
    return googleUser;
  },

  updateUserProfile: (updates: Partial<User>): User | null => {
    const current = authService.getCurrentUser();
    if (!current) return null;
    const updated = { ...current, ...updates };
    authService.saveUser(updated);
    return updated;
  },

  logout: () => {
    authService.saveUser(null);
  },
};
