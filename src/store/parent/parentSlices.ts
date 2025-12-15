import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {parentAPI} from '../../utils/api';
const fallbackImages = [
  require('../../assets/images/child1.jpg'),
  require('../../assets/images/child2.jpg'),
  require('../../assets/images/child3.jpg'),
  require('../../assets/images/child4.jpg'),
];

export interface ParentStudent {
  title: string;
  image?: any;
  raw: any;
}

interface ParentState {
  students: ParentStudent[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ParentState = {
  students: [],
  status: 'idle',
  error: null,
};

export const fetchParentStudents = createAsyncThunk<
  ParentStudent[],
  {parentId?: number | string} | void
>('parent/fetchStudents', async (payload, {rejectWithValue}) => {
  try {
    const response = await parentAPI.getStudentsByParentId(
      payload && payload.parentId ? payload.parentId : undefined,
    );
    const students = response?.data || [];
    const mapped = students.map((s: any, index: number) => ({
      title:
        `${s.FirstName || ''} ${s.LastName || ''}`.trim() || 'Unknown student',
      image:
        typeof s.image === 'string' && s.image.length > 0
          ? {uri: s.image}
          : fallbackImages[index % fallbackImages.length],
      raw: s,
    }));
    return mapped;
  } catch (err: any) {
    return rejectWithValue(
      err?.response?.data?.message ||
        err?.message ||
        'Unable to load students. Please try again.',
    );
  }
});

const parentSlice = createSlice({
  name: 'parent',
  initialState,
  reducers: {
    clearParentData: state => {
      state.students = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchParentStudents.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchParentStudents.fulfilled, (state, {payload}) => {
        state.status = 'succeeded';
        state.students = payload;
      })
      .addCase(fetchParentStudents.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          (action.payload as string) ||
          action.error.message ||
          'Unable to load students.';
      });
  },
});

export const {clearParentData} = parentSlice.actions;

export default parentSlice.reducer;

