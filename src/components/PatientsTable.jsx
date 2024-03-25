import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FiEdit } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import ModalContainer from "./ModalContainer";
import EditPatient from "./EditPatient";
import { toggleEditPatient } from "../redux/features/ModalSlice";
import moment from "moment";
import { setSelectedPatient } from "../redux/features/AuthSlice";

export default function PatientsTable({ filtered }) {
  const dispatch = useDispatch();
  const { editPatient } = useSelector((store) => store.modals);
  const { user } = useSelector((store) => store.auth);
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
              <span className="text-lg font-bold">Phone</span>
            </TableCell>
            <TableCell align="center">
              <span className="text-lg font-bold">Full name</span>
            </TableCell>
            <TableCell align="center">
              <span className="text-lg font-bold">CCC No.</span>
            </TableCell>
            <TableCell align="center">
              <span className="text-lg font-bold">Next order</span>
            </TableCell>
            <TableCell align="center">
              <span className="text-lg font-bold">Action</span>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered?.map((patient, i) => (
            <TableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">
                <img
                  src={patient.photoUrl}
                  alt=""
                  className="w-10 h-10 rounded-full mx-auto"
                />
              </TableCell>
              <TableCell align="center">
                <span className="">{patient.phone}</span>
              </TableCell>
              <TableCell align="center">
                <span className="">{patient.full_name}</span>
              </TableCell>
              <TableCell align="center">
                <span className="">{patient.ccc_no}</span>
              </TableCell>
              <TableCell align="center">
                <span className="">
                  {moment(patient.next_order).format("L")}
                </span>
              </TableCell>
              <TableCell align="center">
                <button
                  disabled={!isAdmin}
                  onClick={() => {
                    dispatch(setSelectedPatient(patient));
                    dispatch(toggleEditPatient());
                  }}
                  className="w-[30px] h-[30px] rounded-full mx-auto flex justify-center items-center bg-lblack text-lg text-white cursor-pointer"
                >
                  <FiEdit />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ModalContainer open={editPatient}>
        <EditPatient dispatch={dispatch} />
      </ModalContainer>
    </TableContainer>
  );
}
