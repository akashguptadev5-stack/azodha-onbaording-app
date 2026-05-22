import { AuthState, OnboardingState } from "../types";

// Key names used in localStorage
const KEYS = {
  AUTH: 'azodha_auth',
  ONBOARDING: 'azodha_onboarding',
};

// Save any data to localStorage
function saveToLocalStorage<T>(key: string, data: T): void {
    try {
        const serializedData = JSON.stringify(data);
        localStorage.setItem(key, serializedData);
    } catch (error) { 
        console.error(`Error saving ${key} to localStorage:`, error);
    }
}   

// Load any data from localStorage
function loadFromLocalStorage<T>(key: string): T | null {
    try {
        const serializedData = localStorage.getItem(key);
        if (serializedData === null) return null;
        return JSON.parse(serializedData) as T;
    } catch (error) {
        console.error(`Error loading ${key} from localStorage:`, error);
        return null;
    }   
}

// Remove any data from localStorage
function removeFromLocalStorage(key: string): void {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error(`Error removing ${key} from localStorage:`, error);
    }
}

// Auth specific functions
export const saveAuthState = (authState: AuthState): void => {
    saveToLocalStorage(KEYS.AUTH, authState);
};

export const loadAuthState = (): AuthState | null => {
    return loadFromLocalStorage<AuthState>(KEYS.AUTH);
};

export const clearAuthState = (): void => {
    removeFromLocalStorage(KEYS.AUTH);
}



// Onboarding specific functions
export const saveOnboardingState = (onboardingState: OnboardingState): void => {
    saveToLocalStorage(KEYS.ONBOARDING, onboardingState);
}

export const loadOnboardingState = (): OnboardingState | null => {
    return loadFromLocalStorage<OnboardingState>(KEYS.ONBOARDING);
}

export const clearOnboardingState = (): void => {
    removeFromLocalStorage(KEYS.ONBOARDING);
}

// Logout function that clears all relevant localStorage data
export const clearAllState  = (): void => {
    clearAuthState();
    clearOnboardingState();
}