import { useState, useEffect } from "react";
import PatientsTable from "../components/PatientsTable";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setPatients } from "../redux/features/AuthSlice";
import Loader from "../components/Loader";

function Patients() {
  const [filtered, setFiltered] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const { patients } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          "/patients"
        );
        setLoading(false);
        dispatch(setPatients(data.patients));
      } catch (error) {
        setLoading(true);
        return toast.error(error.response.data.msg);
      }
    })();
  }, []);

  useEffect(() => {
    const getPatients = () => {
      if (name) {
        setFiltered(
          patients?.filter((p) => p.ccc_no.toLowerCase().includes(name))
        );
      } else {
        setFiltered(patients);
      }
    };
    getPatients();
  }, [name, dispatch, patients]);

  return (
    <div className="p-3">
      <section className="bg-white p-3">
        <header className="flex items-center justify-between my-3 mb-5">
          <div className="flex items-center gap-3">
            <p className="text-3xl font-bold">Patients</p>
          </div>
          <div className="flex items-center gap-3 bg-input px-3 p-2 rounded-md text-lblack">
            <FiSearch className="text-xl" />
            <input
              type="search"
              placeholder="Search with CCC number"
              className="bg-input"
              value={name}
              onChange={(e) => setName(e.target.value.toLowerCase().trim())}
            />
          </div>
        </header>
        {loading ? <Loader /> : <PatientsTable filtered={filtered} />}
      </section>
    </div>
  );
}

export default Patients;
