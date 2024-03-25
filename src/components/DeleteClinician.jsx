import { useDispatch, useSelector } from "react-redux";
import { toggleDeleteClinician } from "../redux/features/ModalSlice";

function DeleteClinician() {
  const dispatch = useDispatch();
  const { selectedClinician } = useSelector((store) => store.auth);

  return (
    <div className="bg-white p-5 py-8 rounded-md w-full max-w-[450px] mx-5">
      <p className="text-center text-lg px-5">
        Are you sure you want to remove {selectedClinician?.email} -{" "}
        {selectedClinician?.name}?
      </p>
      <section className="flex gap-5 mt-5">
        <button
          onClick={() => dispatch(toggleDeleteClinician())}
          className="w-full rounded-md h-[45px] text-white text-lg font-bold bg-blue"
        >
          Cancel
        </button>
        <button
          onClick={() => dispatch(toggleDeleteClinician())}
          className="w-full rounded-md h-[45px] text-white text-lg font-bold bg-red"
        >
          Delete
        </button>
      </section>
    </div>
  );
}

export default DeleteClinician;
