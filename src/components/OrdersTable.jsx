import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import EditOrder from "./EditOrder";
import { FiEdit } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { toggleOrder } from "../redux/features/ModalSlice";
import ModalContainer from "./ModalContainer";
import { selectOrder } from "../redux/features/OrderSlice";

const getStyles = (status) => {
  if (status === "pending") return "bg-[#FCF4C7] text-[#854E23]";
  if (status === "cancelled") return "bg-[#F8EAE9] text-[#752E32]";
  if (status === "on-transit") return "bg-[#1593EE] text-white";
  return "bg-[#C8F7DF] text-[#559982]";
};

export default function OrdersTable({ filtered }) {
  const { editOrder } = useSelector((store) => store.modals);
  const { user } = useSelector((store) => store.auth);
  const isAdmin = user.isAdmin;
  const dispatch = useDispatch();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="Orders">
        <TableHead className="bg-input">
          <TableRow>
            <TableCell align="center">
              <span className="text-lg font-bold">Date</span>
            </TableCell>
            <TableCell align="center">
              <span className="text-lg font-bold">Order ID</span>
            </TableCell>
            <TableCell align="center">
              <span className="text-lg font-bold">Delivery fee</span>
            </TableCell>
            <TableCell align="center">
              <span className="text-lg font-bold">Deliver By</span>
            </TableCell>
            <TableCell align="center">
              <span className="text-lg font-bold">Courier</span>
            </TableCell>
            <TableCell align="center">
              <span className="text-lg font-bold">Status</span>
            </TableCell>
            <TableCell align="center">
              <span className="text-lg font-bold">Actions</span>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered?.map((order, i) => {
            const handleToggle = () => {
              dispatch(toggleOrder());
              dispatch(selectOrder(order));
            };
            return (
              <TableRow
                key={order.orderId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">
                  <span className="">
                    {moment(order.orderDate).format("DD/MM/YYYY") +
                      " - " +
                      moment(order.orderDate).format("LT")}
                  </span>
                </TableCell>
                <TableCell align="center">
                  <span className="text-blue tracking-wider font-bold">
                    {order.orderId}
                  </span>
                </TableCell>
                <TableCell align="center">
                  <span className="">
                    Ksh <b>{order.delivery_fee}</b>
                  </span>
                </TableCell>
                <TableCell align="center">
                  <span>{moment(order.deliverBy).format("DD/MM/YYYY")}</span>
                </TableCell>
                <TableCell align="center">
                  <span className="">{order.courier}</span>
                </TableCell>
                <TableCell align="center">
                  <span
                    className={`px-4 py-2 rounded-md ${getStyles(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </TableCell>
                <TableCell align="center">
                  <button
                    disabled={!isAdmin}
                    onClick={() => handleToggle()}
                    className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-lblack text-lg text-white cursor-pointer mx-auto"
                  >
                    <FiEdit />
                  </button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <ModalContainer open={editOrder}>
        <EditOrder />
      </ModalContainer>
    </TableContainer>
  );
}
