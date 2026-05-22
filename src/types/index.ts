// ─── Auth ────────────────────────────────────────────────────────────────────
export interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
}

// ─── Onboarding Steps ─────────────────────────────────────────────────────────
export interface PersonalProfile {
  name: string;
  age: string;
  email: string;
  profilePicture: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
}

export interface PaymentInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardHolderName: string;
}

export type OnboardingStep = 1 | 2 | 3 | 4;

export interface OnboardingState {
  currentStep: OnboardingStep;
  isComplete: boolean;
  personalProfile: PersonalProfile | null;
  songs: Song[];
  paymentInfo: PaymentInfo | null;
}