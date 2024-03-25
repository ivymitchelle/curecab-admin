import { useDispatch, useSelector } from "react-redux";
import { toggleEditClinician } from "../redux/features/ModalSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { updateClinician } from "../redux/features/AuthSlice";

function EditClinician() {
  const dispatch = useDispatch();
  const { selectedClinician } = useSelector((store) => store.auth);

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(selectedClinician.full_name);
  const [email, setEmail] = useState(selectedClinician.email);
  const [phone, setPhone] = useState(selectedClinician.phone);
  const [facility, setFacility] = useState(selectedClinician.facility);
  const [facilities, setFacilities] = useState([]);

  const canUpdate =
    name !== selectedClinician.full_name ||
    email !== selectedClinician.email ||
    phone !== selectedClinician.phone ||
    facility !== selectedClinician.facility;

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        "/facilities"
      );
      setFacilities(data.facilities);
    })();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (canUpdate) {
      setLoading(true);
      try {
        const { data } = await axios.patch(
          "/clinicians/update",
          {
            userId: selectedClinician._id,
            phone,
            facility,
            full_name: name,
            email,
          }
        );
        setLoading(false);
        dispatch(updateClinician({ user: data.clinician }));
        dispatch(toggleEditClinician());
        return toast.success(data.msg);
      } catch (error) {
        console.log(error);
        setLoading(false);
        return toast.error(error.response.data.msg);
      }
    } else {
      dispatch(toggleEditClinician());
    }
  };

  return (
    <form className="bg-white rounded-md p-5 w-full max-w-[500px] mx-5">
      <div className="flex flex-col mt-5">
        <label htmlFor="" className="text-lg mb-1">
          Full name
        </label>
        <input
          disabled={loading}
          type="text"
          className="bg-input h-[45px] px-5 rounded-sm text-lblack"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="flex flex-col mt-5">
        <label htmlFor="" className="text-lg mb-1">
          Phone number
        </label>
        <input
          disabled={loading}
          type="text"
          className="bg-input h-[45px] px-5 rounded-sm text-lblack"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="flex flex-col mt-5">
        <label htmlFor="" className="text-lg mb-1">
          Email address
        </label>
        <input
          disabled={loading}
          type="text"
          className="bg-input h-[45px] px-5 rounded-sm text-lblack"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="flex flex-col mt-5">
        <label htmlFor="" className="text-lg mb-1">
          Facility
        </label>
        <select
          className="bg-input h-[45px] px-5 rounded-sm text-lblack"
          onChange={(e) => setFacility(e.target.value)}
          disabled={loading}
        >
          {facilities?.map((f, i) => (
            <option selected={f.name === facility} key={i} value={f.name}>
              {f.name}
            </option>
          ))}
        </select>
      </div>

      <section className="flex gap-5 mt-5">
        <button
          disabled={loading}
          onClick={() => dispatch(toggleEditClinician())}
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
            "Update"
          )}
        </button>
      </section>
    </form>
  );
}

export default EditClinician;
