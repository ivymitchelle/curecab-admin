import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  clinicians: [],
  patients: [],
  selectedPatient: null,
  selectedClinician: null,
  counts: {},
};
const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.clear();
      state.user = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setClinicians: (state, action) => {
      state.clinicians = action.payload;
    },
    setPatients: (state, action) => {
      state.patients = action.payload;
    },
    addClinician: (state, action) => {
      state.clinicians = [...state.clinicians, action.payload.clinician];
    },
    deleteClinician: (state, action) => {
      state.clinicians = state.clinicians.filter(
        (c) => c._id !== action.payload.userId
      );
    },
    updateClinician: (state, action) => {
      const index = state.clinicians.findIndex(
        (c) => c._id === action.payload.user._id
      );
      state.clinicians[index] = action.payload.user;
    },
    updatePatient: (state, action) => {
      const index = state.patients.findIndex(
        (p) => p._id === action.payload.user._id
      );
      console.log(action.payload.user._id);
      state.patients[index] = action.payload.user;
    },
    setSelectedClinician: (state, action) => {
      state.selectedClinician = action.payload;
    },
    setSelectedPatient: (state, action) => {
      state.selectedPatient = action.payload;
    },
    setCounts: (state, action) => {
      state.counts = action.payload;
    },
  },
});

export default AuthSlice.reducer;
export const {
  logout,
  setUser,
  setSelectedPatient,
  setSelectedClinician,
  setClinicians,
  updateClinician,
  deleteClinician,
  addClinician,
  setPatients,
  updatePatient,
  setCounts,
} = AuthSlice.actions;
