import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FiEdit } from "react-icons/fi";
import { CgTrash } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import ModalContainer from "./ModalContainer";
import EditClinician from "./EditClinician";
import {
  toggleDeleteClinician,
  toggleEditClinician,
} from "../redux/features/ModalSlice";
import DeleteClinician from "./DeleteClinician";
import { setSelectedClinician } from "../redux/features/AuthSlice";

export default function CliniciansTable({ filtered }) {
  const { editClinicianModal, deleteClinicianModal } = useSelector(
    (store) => store.modals
  );
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const isAdmin = user.isAdmin;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="Orders">
        <TableHead className="bg-input">
          <TableRow>
            <TableCell align="center">
              <span className="text-lg font-bold">#</span>
            </TableCell>
            <TableCell align="center">
              <span className="text-lg font-bold">Name</span>
            </TableCell>
            <TableCell align="center">
              <span className="text-lg font-bold">Mobile</span>
            </TableCell>
            <TableCell align="center">
              <span className="text-lg font-bold">Email</span>
            </TableCell>
            <TableCell align="center">
              <span className="text-lg font-bold">Facility</span>
            </TableCell>
            <TableCell align="center">
              <span className="text-lg font-bold">Verified</span>
            </TableCell>
            <TableCell align="center">
              <span className="text-lg font-bold">Actions</span>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered?.map((clinician, i) => (
            <TableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">
                <img
                  src={clinician.photoUrl}
                  alt=""
                  className="w-10 h-10 rounded-full mx-auto"
                />
              </TableCell>
              <TableCell align="center">
                <span className="">{clinician.full_name}</span>
              </TableCell>
              <TableCell align="center">
                <span className="">{clinician.phone}</span>
              </TableCell>
              <TableCell align="center">
                <span className="">{clinician.email}</span>
              </TableCell>
              <TableCell align="center">
                <span>{clinician.facility}</span>
              </TableCell>
              <TableCell align="center">
                <span
                  className={`font-bold ${
                    clinician.verified ? "text-green" : " text-red"
                  }`}
                >
                  {clinician.verified ? "YES" : "NO"}
                </span>
              </TableCell>
              <TableCell align="center">
                <div className="flex items-center gap-3 justify-center">
                  <button
                    disabled={!isAdmin}
                    onClick={() => {
                      dispatch(setSelectedClinician(clinician));
                      dispatch(toggleEditClinician());
                    }}
                    className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-lblack text-lg text-white cursor-pointer"
                  >
                    <FiEdit />
                  </button>
                  <button
                    disabled={!isAdmin}
                    onClick={() => {
                      dispatch(setSelectedClinician(clinician));
                      dispatch(toggleDeleteClinician());
                    }}
                    className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-red text-lg text-white cursor-pointer"
                  >
                    <CgTrash />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ModalContainer open={editClinicianModal}>
        <EditClinician />
      </ModalContainer>
      <ModalContainer open={deleteClinicianModal}>
        <DeleteClinician />
      </ModalContainer>
    </TableContainer>
  );
}
