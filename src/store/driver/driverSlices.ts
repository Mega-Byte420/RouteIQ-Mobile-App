import {createSlice} from '@reduxjs/toolkit';

const driverSlice = createSlice({
  name: 'driver',
  initialState: {
    maintenanceDetail: null,
    chatTabIndex: 0,
    showCreateGroup: false,
    showGroup: false,
    studentDetail: {
      name: 'Jonney Barbo',
      image: require('../../assets/images/child1.jpg'),
      age: 5,
      emergency_contact: '8978675634',
      school_name: 'Oakwood Elementary School',
      transportation_preference: 'Van',
      medical_details: 'Oakwood Elementary School',
      guardians: [
        {
          name: 'Jacob Jones',
          relation: 'Uncle',
          phone_number: 'Phone Number',
        },
        {
          name: 'Sarah Jones',
          relation: 'Aunt',
          phone_number: '8978675634',
        },
      ],
    },
  },
  reducers: {
    setMaintenanceDetail: (state, {payload}) => {
      state.maintenanceDetail = payload;
    },
    setStudentDetail: (state, {payload}) => {
      state.studentDetail = payload;
    },
    setChatTabIndex: (state, {payload}) => {
      state.chatTabIndex = payload;
    },
    setShowCreateGroup: (state, {payload}) => {
      state.chatTabIndex = payload;
    },
    setShowGroup: (state, {payload}) => {
      state.chatTabIndex = payload;
    },
  },
});

export const {
  setMaintenanceDetail,
  setStudentDetail,
  setChatTabIndex,
  setShowGroup,
  setShowCreateGroup,
} = driverSlice.actions;

export default driverSlice.reducer;
