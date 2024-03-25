import { useSelector } from "react-redux";
import { toggleEditPatient } from "../redux/features/ModalSlice";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import moment from "moment";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import { updatePatient } from "../redux/features/AuthSlice";

function EditPatient({ dispatch }) {
  const { selectedPatient } = useSelector((store) => store.auth);
  const [loading, setLoading] = useState(false);
  const [next_order, setNext_order] = useState(selectedPatient.next_order);
  const [can_order, setCan_order] = useState(selectedPatient.can_order);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const { data } = await axios.patch(
        "/patients/update/" + selectedPatient._id,
        {
          next_order,
          can_order,
        }
      );
      dispatch(updatePatient({ user: data.patient }));
      dispatch(toggleEditPatient());
      setLoading(false);
      return toast.success(data.msg);
    } catch (error) {
      setLoading(false);
      return toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="bg-white rounded-md p-5 w-full max-w-[500px] mx-5">
      <h1 className="text-center text-xl font-bold border-b-[1px] border-bcolor pb-2">
        Edit patients
      </h1>
      <div className="flex flex-col mt-5">
        <label htmlFor="" className="text-lg">
          CCC no.
        </label>
        <input
          type="text"
          className="bg-input h-[45px] px-5 rounded-sm text-lblack"
          value={selectedPatient?.ccc_no}
          disabled
        />
      </div>

      <div className="flex flex-col mt-5">
        <label htmlFor="" className="text-lg">
          Last Order
        </label>
        <input
          type="text"
          className="bg-input h-[45px] px-5 rounded-sm text-green"
          disabled
          value={moment(selectedPatient.last_order).format("L")}
        />
      </div>

      <div className="flex flex-col mt-5">
        <label htmlFor="" className="text-lg">
          Next Order
        </label>
        <div className="flex items-center gap-2 h-[45px] bg-input px-5">
          <span className="text-red">{moment(next_order).format("L")}</span>
          <input
            disabled={loading}
            type="date"
            className="bg-input rounded-sm text-lblack ml-auto"
            placeholder="fe"
            value={moment(next_order).format("L")}
            onChange={(e) => setNext_order(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col mt-5">
        <label htmlFor="" className="text-lg">
          Can Order
        </label>
        <select
          disabled={loading}
          onChange={(e) =>
            setCan_order(e.target.value === "yes" ? true : false)
          }
          className="bg-input h-[45px] px-5 rounded-sm text-lblack"
        >
          <option selected={can_order === true} value="yes">
            YES
          </option>
          <option selected={can_order === false} value="no">
            NO
          </option>
        </select>
      </div>

      <section className="flex gap-5 mt-5">
        <button
          disabled={loading}
          onClick={() => dispatch(toggleEditPatient())}
          className="w-full rounded-md h-[45px] text-white text-lg font-bold bg-blue"
        >
          Cancel
        </button>
        <button
          disabled={loading}
          onClick={handleUpdate}
          className="w-full rounded-md h-[45px] text-white text-lg font-bold bg-red"
        >
          {loading ? (
            <CgSpinnerTwoAlt className="animate-spin mx-auto duration-30 text-3xl" />
          ) : (
            "Submit"
          )}
        </button>
      </section>
    </div>
  );
}

export default EditPatient;
