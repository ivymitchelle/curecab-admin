import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modals",
  initialState: {
    editOrder: false,
    editClinicianModal: false,
    deleteClinicianModal: false,
    addClinicianModal: false,
    editPatient: false,
  },
  reducers: {
    toggleOrder: (state) => {
      state.editOrder = !state.editOrder;
    },
    toggleEditClinician: (state) => {
      state.editClinicianModal = !state.editClinicianModal;
    },
    toggleDeleteClinician: (state) => {
      state.deleteClinicianModal = !state.deleteClinicianModal;
    },
    toggleAddClinician: (state) => {
      state.addClinicianModal = !state.addClinicianModal;
    },
    toggleEditPatient: (state) => {
      state.editPatient = !state.editPatient;
    },
  },
});

export const {
  toggleOrder,
  toggleDeleteClinician,
  toggleEditClinician,
  toggleAddClinician,
  toggleEditPatient,
} = modalSlice.actions;
export default modalSlice.reducer;
