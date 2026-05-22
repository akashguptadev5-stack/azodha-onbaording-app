import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../../types';         
import { saveAuthState, loadAuthState, clearAuthState } from '../../utils/localStorage';


export const VALID_CREDENTIALS = {
  username: 'user123',
  password: 'password123',
};

const persisted = loadAuthState();

const initialState: AuthState = persisted ?? {
  isAuthenticated: false,
  username: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.isAuthenticated = true;
      state.username = action.payload;
      saveAuthState({ isAuthenticated: true, username: action.payload });
    },
    logout(state) {                               
      state.isAuthenticated = false;
      state.username = null;
      clearAuthState();
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;