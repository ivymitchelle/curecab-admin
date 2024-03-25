import { AiFillMedicineBox } from "react-icons/ai";
import { TbStethoscope } from "react-icons/tb";
import { HiUsers } from "react-icons/hi";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setClinicians,
  setCounts,
  setPatients,
} from "../redux/features/AuthSlice";
import Loader from "../components/Loader";
import { setOrders } from "../redux/features/OrderSlice";

function Dashboard() {
  const data = [
    { name: "Jan", uv: 400, pv: 2400, amt: 1240 },
    { name: "Feb", uv: 200, pv: 2400, amt: 200 },
    { name: "Mar", uv: 350, pv: 2400, amt: 350 },
    { name: "Apr", uv: 604, pv: 2400, amt: 604 },
    { name: "May", uv: 100, pv: 2400, amt: 100 },
  ];

  const [loading, setLoading] = useState(true);
  const { user, patients, clinicians } = useSelector((store) => store.auth);
  const { orders } = useSelector((store) => store.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const info = { isAdmin: user.isAdmin, facility: user.facility };
        const response = await Promise.all([
          axios.get("/orders/clinicians/" + info),
          axios.get("/clinicians"),
          axios.get("/patients"),
        ]);

        dispatch(setOrders(response[0].data.orders));
        dispatch(setClinicians(response[1].data.clinicians));
        dispatch(setPatients(response[2].data.patients));
        setLoading(false);
      } catch (error) {
        setLoading(false);
        return toast.error(error.response.data.msg);
      }
    })();
  }, [dispatch, user]);

  return (
    <div className="p-3">
      <p className="text-3xl font-bold text-lblack mb-5">Dashboard</p>

      {loading ? (
        <Loader />
      ) : (
        <>
          <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
            <Link to="/orders">
              <div className="flex gap-5 bg-white p-4 rounded-md flex-1">
                <div className="flex justify-center items-center w-[60px] h-[60px] rounded-full bg-green">
                  <AiFillMedicineBox className="text-3xl text-white" />
                </div>
                <div className="">
                  <p className="text-xl text-lblack">Orders</p>
                  <p className="text-2xl font-bold">{orders?.length}</p>
                </div>
              </div>
            </Link>

            <Link to="/clinicians">
              <div className="flex gap-5 bg-white p-4 rounded-md flex-1">
                <div className="flex justify-center items-center w-[60px] h-[60px] rounded-full bg-blue">
                  <TbStethoscope className="text-3xl text-white" />
                </div>
                <div className="">
                  <p className="text-xl text-lblack">Clinicians</p>
                  <p className="text-2xl font-bold">{clinicians?.length}</p>
                </div>
              </div>
            </Link>

            <Link to="/patients">
              <div className="flex gap-5 bg-white p-4 rounded-md flex-1">
                <div className="flex justify-center items-center w-[60px] h-[60px] rounded-full bg-yellow">
                  <HiUsers className="text-3xl text-white" />
                </div>
                <div className="">
                  <p className="text-xl text-lblack">Patients</p>
                  <p className="text-2xl font-bold">{patients?.length}</p>
                </div>
              </div>
            </Link>
          </section>

          <section className="bg-white mt-10 pb-10">
            <p className="p-10 text-2xl text-lblack">Orders made this year.</p>
            <LineChart width={600} height={300} data={data}>
              <Line type="monotone" dataKey="uv" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis />
            </LineChart>
          </section>
        </>
      )}
    </div>
  );
}

export default Dashboard;
