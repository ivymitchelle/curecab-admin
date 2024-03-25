import CliniciansTable from "../components/CliniciansTable";
import { FiSearch, FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import ModalContainer from "../components/ModalContainer";
import AddClinician from "../components/AddClinician";
import { toggleAddClinician } from "../redux/features/ModalSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { setClinicians } from "../redux/features/AuthSlice";

function Clinicians() {
  const dispatch = useDispatch();
  const { addClinicianModal } = useSelector((store) => store.modals);
  const { user, clinicians } = useSelector((store) => store.auth);

  const [filtered, setFiltered] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        "/clinicians"
      );
      console.log(data)
      dispatch(setClinicians(data.clinicians));
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    const getClinicians = () => {
      if (name) {
        setFiltered(
          clinicians?.filter((p) => p.full_name.toLowerCase().includes(name))
        );
      } else {
        setFiltered(clinicians);
      }
    };
    getClinicians();
  }, [name, clinicians]);

  return (
    <div className="p-3">
      <section className="bg-white p-3">
        <header className="flex items-center justify-between my-3 mb-5">
          <p className="text-3xl font-bold">Clinicians</p>

          <section className="flex items-center gap-3">
            <button
              disabled={!user.isAdmin}
              onClick={() => dispatch(toggleAddClinician())}
              className="bg-red text-white px-4 pr-6 rounded-md py-1.5 font-bold text-xl flex items-center gap-2"
            >
              <FiPlus />
              <span className="text-lg">Add</span>
            </button>
            <div className="flex items-center gap-3 bg-input px-3 p-2 rounded-md text-lblack">
              <FiSearch className="text-xl" />
              <input
                type="search"
                placeholder="Search with name"
                className="bg-input"
                value={name}
                onChange={(e) => setName(e.target.value.toLowerCase().trim())}
              />
            </div>
          </section>
        </header>
        {loading ? <Loader /> : <CliniciansTable filtered={filtered} />}
      </section>
      <ModalContainer open={addClinicianModal}>
        <AddClinician dispatch={dispatch} />
      </ModalContainer>
    </div>
  );
}

export default Clinicians;
