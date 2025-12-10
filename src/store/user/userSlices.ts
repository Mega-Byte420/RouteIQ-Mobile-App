import {createSlice} from '@reduxjs/toolkit';
import {childDropDown} from '../../utils/DummyData';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    token: null,
    logout: false,
    role: '',
    username: '',
    userId: null,
    isVendor: false,
    instituteId: null,
    terminals: [],
    modules: [],
    driverHomeStatus: false,
    retailHomeStatus: false,
    selectedUserChatData: {},
    showStartMileAgeSheet: false,
    mapViewRouteBackOn: 'DriverHomeScreen',
    studentAbsentModal: false,
    selectedChild: {},
    forgotType: '',
  },
  reducers: {
    saveToken: (state, {payload}) => {
      state.token = payload;
    },
    setUserInfo: (state, {payload}) => {
      state.username = payload.username || '';
      state.userId = payload.sub || payload.userId || null;
      state.role = payload.role || '';
      state.isVendor = payload.isVendor || false;
      state.instituteId = payload.instituteId || null;
      state.terminals = payload.terminals || [];
      state.modules = payload.modules || [];
    },
    clearUserInfo: (state) => {
      state.token = null;
      state.username = '';
      state.userId = null;
      state.role = '';
      state.isVendor = false;
      state.instituteId = null;
      state.terminals = [];
      state.modules = [];
    },
    setLogout: (state, {payload}) => {
      state.logout = payload;
    },
    setRole: (state, {payload}) => {
      state.role = payload;
    },
    setDriverHomeStatus: (state, {payload}) => {
      state.driverHomeStatus = payload;
    },

    setRetailHomeStatus: (state, {payload}) => {
      state.retailHomeStatus = payload;
    },

    setSelectedUserChatData: (state, {payload}) => {
      state.selectedUserChatData = payload;
    },
    setShowStartMileAgeSheet: (state, {payload}) => {
      state.showStartMileAgeSheet = payload;
    },
    setMapViewRouteBackOn: (state, {payload}) => {
      state.mapViewRouteBackOn = payload;
    },
    setStudentAbsentModal: (state, {payload}) => {
      state.studentAbsentModal = payload;
    },
    setSelectedChild: (state, {payload}) => {
      state.selectedChild = payload;
    },
    setForgotType: (state, {payload}) => {
      state.forgotType = payload;
    },
  },
});

export const {
  saveToken,
  setUserInfo,
  clearUserInfo,
  setLogout,
  setRole,
  setDriverHomeStatus,
  setRetailHomeStatus,
  setSelectedUserChatData,
  setShowStartMileAgeSheet,
  setMapViewRouteBackOn,
  setStudentAbsentModal,
  setSelectedChild,
  setForgotType,
} = userSlice.actions;

export default userSlice.reducer;
