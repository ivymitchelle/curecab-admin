import { useDispatch, useSelector } from "react-redux";
import { toggleOrder } from "../redux/features/ModalSlice";
import { updateOrder } from "../redux/features/OrderSlice";
import { MdCancel } from "react-icons/md";
import moment from "moment";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { CgSpinnerTwoAlt } from "react-icons/cg";

function EditOrder() {
  const dispatch = useDispatch();
  const { selectedOrder } = useSelector((store) => store.orders);
  const [price, setPrice] = useState(selectedOrder.delivery_fee);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(selectedOrder.status);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (
      price !== selectedOrder.delivery_fee ||
      status !== selectedOrder.status
    ) {
      setLoading(true);
      try {
        const { data } = await axios.patch(
          "/orders/update/" + selectedOrder._id,
          {
            delivery_fee: price,
            status,
            initialFee: selectedOrder.delivery_fee,
          }
        );
        setLoading(false);
        dispatch(updateOrder(data.order));
        dispatch(toggleOrder());
        return toast.success("Order details updated.");
      } catch (error) {
        setLoading(false);
        return toast.error(error.response.data.msg);
      }
    } else {
      return dispatch(toggleOrder());
    }
  };

  return (
    <form className="bg-white rounded-md p-5 w-full max-w-[500px] flex flex-col mx-5 relative">
      <p className="text-xl border-b-[1px] border-bcolor py-2">
        Update order -
        <span className="text-red font-bold text-lg ml-3">
          {selectedOrder.orderId}
        </span>
        <button
          disabled={loading}
          onClick={() => dispatch(toggleOrder())}
          className="ml-auto text-3xl absolute right-5 top-5 cursor-pointer text-lblack"
        >
          <MdCancel />
        </button>
      </p>
      <p className="text-lg mt-5 font-bold">
        Order ID :
        <span className="text-[15px] text-lblack font-[400] ml-5">
          {selectedOrder?.orderId}
        </span>
      </p>
      <p className="text-lg mt-5 font-bold">
        Order Date :
        <span className="text-[15px] text-lblack font-[400] ml-5">
          {moment(selectedOrder.orderDate).format("DD/MM/YYYY") +
            " - " +
            moment(selectedOrder.orderDate).format("LT")}
        </span>
      </p>
      <p className="text-lg mt-5 font-bold">
        Deliver By :
        <span className="text-[15px] text-lblack font-[400] ml-5">
          {moment(selectedOrder.deliverBy).format("L") +
            " - " +
            moment(selectedOrder.deliverBy).format("LT")}
        </span>
      </p>
      <p className="text-lg mt-5 font-bold">
        Delivery fee :<span className="text-lblack ml-5 font-[450]">Ksh</span>
        <input
          disabled={loading}
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value.trim())}
          className="text-[16px] text-green ml-2 font-bold bg-input px-5 w-[100px] h-[40px] min-w-[150px]"
        />
      </p>
      <p className="text-lg mt-5 font-bold">
        Status :
        <select
          className="px-5 ml-5 font-[400] h-[40px] text-lblack bg-input"
          disabled={loading}
          defaultValue={selectedOrder.status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="on-transit">On transit</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </p>
      <button
        disabled={loading}
        onClick={handleUpdate}
        className="bg-red self-end h-[45px] rounded-md w-[60%] text-md font-bold text-white mt-10"
      >
        {loading ? (
          <CgSpinnerTwoAlt className="animate-spin mx-auto duration-30 text-3xl" />
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
}

export default EditOrder;
