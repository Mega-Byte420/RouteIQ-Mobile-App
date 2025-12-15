import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {authAPI} from '../../utils/api';

interface RecoveryState {
  requestStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  verifyStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  resetStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  email: string | null;
  username: string | null;
  userId: number | null;
}

const initialState: RecoveryState = {
  requestStatus: 'idle',
  verifyStatus: 'idle',
  resetStatus: 'idle',
  error: null,
  email: null,
  username: null,
  userId: null,
};

export const requestPasswordResetThunk = createAsyncThunk(
  'authRecovery/requestReset',
  async (email: string, {rejectWithValue}) => {
    try {
      const resp = await authAPI.requestPasswordReset(email);
      return resp;
    } catch (err: any) {
      const apiMessage = err?.response?.data?.message;
      return rejectWithValue(
        Array.isArray(apiMessage)
          ? apiMessage.join('\n')
          : apiMessage || err?.message || 'Could not send reset code.',
      );
    }
  },
);

export const verifyOtpThunk = createAsyncThunk(
  'authRecovery/verifyOtp',
  async (payload: {email: string; otp: string}, {rejectWithValue}) => {
    try {
      const resp = await authAPI.verifyOtp(payload);
      return resp;
    } catch (err: any) {
      const apiMessage = err?.response?.data?.message;
      return rejectWithValue(
        Array.isArray(apiMessage)
          ? apiMessage.join('\n')
          : apiMessage || err?.message || 'OTP verification failed.',
      );
    }
  },
);

export const resetPasswordThunk = createAsyncThunk(
  'authRecovery/resetPassword',
  async (
    payload: {userId: number | string; newPassword: string},
    {rejectWithValue},
  ) => {
    try {
      const resp = await authAPI.resetPassword(payload);
      return resp;
    } catch (err: any) {
      const apiMessage = err?.response?.data?.message;
      return rejectWithValue(
        Array.isArray(apiMessage)
          ? apiMessage.join('\n')
          : apiMessage || err?.message || 'Could not reset password.',
      );
    }
  },
);

const authRecoverySlice = createSlice({
  name: 'authRecovery',
  initialState,
  reducers: {
    clearRecoveryState: state => {
      state.requestStatus = 'idle';
      state.verifyStatus = 'idle';
      state.resetStatus = 'idle';
      state.error = null;
      state.email = null;
      state.username = null;
      state.userId = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(requestPasswordResetThunk.pending, state => {
        state.requestStatus = 'loading';
        state.error = null;
      })
      .addCase(requestPasswordResetThunk.fulfilled, (state, {payload}) => {
        state.requestStatus = 'succeeded';
        state.error = null;
        state.email = payload?.email || null;
        state.username = payload?.username || null;
        state.userId = payload?.userid ?? null;
      })
      .addCase(requestPasswordResetThunk.rejected, (state, action) => {
        state.requestStatus = 'failed';
        state.error =
          (action.payload as string) ||
          action.error.message ||
          'Could not send reset code.';
      })
      .addCase(verifyOtpThunk.pending, state => {
        state.verifyStatus = 'loading';
        state.error = null;
      })
      .addCase(verifyOtpThunk.fulfilled, state => {
        state.verifyStatus = 'succeeded';
      })
      .addCase(verifyOtpThunk.rejected, (state, action) => {
        state.verifyStatus = 'failed';
        state.error =
          (action.payload as string) ||
          action.error.message ||
          'OTP verification failed.';
      })
      .addCase(resetPasswordThunk.pending, state => {
        state.resetStatus = 'loading';
        state.error = null;
      })
      .addCase(resetPasswordThunk.fulfilled, state => {
        state.resetStatus = 'succeeded';
      })
      .addCase(resetPasswordThunk.rejected, (state, action) => {
        state.resetStatus = 'failed';
        state.error =
          (action.payload as string) ||
          action.error.message ||
          'Could not reset password.';
      });
  },
});

export const {clearRecoveryState} = authRecoverySlice.actions;

export default authRecoverySlice.reducer;

