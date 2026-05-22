import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OnboardingState, OnboardingStep } from "../../types";
import { loadOnboardingState, saveOnboardingState, clearOnboardingState } from "../../utils/localStorage";


const persisted = loadOnboardingState();

const initialState: OnboardingState = persisted || {
    currentStep: 1,
    isComplete: false,
    personalProfile: null,
    songs: [],
    paymentInfo: null,
};

const onboardingSlice = createSlice({
    name: "onboarding",
    initialState,
    reducers: {
        savePersonalProfile: (state, action: PayloadAction<OnboardingState["personalProfile"]>) => {
            state.personalProfile = action.payload;
            state.currentStep = 2;
            saveOnboardingState(state);
        },
        saveSongs: (state, action: PayloadAction<OnboardingState["songs"]>) => {
            state.songs = action.payload;
            state.currentStep = 3;
            saveOnboardingState(state);
        },
        savePaymentInfo: (state, action: PayloadAction<OnboardingState["paymentInfo"]>) => {
            state.paymentInfo = action.payload;
            state.currentStep = 4;
            saveOnboardingState(state);
        },
        completeOnboarding: (state) => {
            state.isComplete = true;
            saveOnboardingState(state);
        },
        goToStep : (state, action: PayloadAction<OnboardingStep>) => {
            state.currentStep = action.payload;
            saveOnboardingState(state);
        },
        resetOnboarding: (state) => {
            state.currentStep = 1;
            state.isComplete = false;
            state.personalProfile = null;
            state.songs = [];
            state.paymentInfo = null;
            clearOnboardingState();
        }
    },
});

export const { savePersonalProfile, saveSongs, savePaymentInfo, completeOnboarding, goToStep, resetOnboarding } = onboardingSlice.actions;
export default onboardingSlice.reducer;