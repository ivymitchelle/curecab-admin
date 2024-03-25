import { NavLink, Link } from "react-router-dom";
import { AiOutlineDashboard, AiFillMedicineBox } from "react-icons/ai";
import { TbStethoscope } from "react-icons/tb";
import { HiUsers } from "react-icons/hi";
import { CgMenuRightAlt } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/features/AuthSlice";

function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  return (
    <section className="bg-white sticky top-0 border-b-bcolor border-b-[1px] p-2 px-4 z-1000">
      <nav className="w-full max-w-[1400px] items-center justify-between mx-auto flex">
        <Link to="/" className="text-4xl font-bold text-red my-3">
          CURECAB
        </Link>
        <ul className="px-3 flex-1 flex items-center justify-center gap-5 hidden lg:flex">
          <li className="">
            <NavLink
              className={({ isActive }) =>
                `text-lg flex items-center gap-4 px-4 py-2 ease-in-out duration-200 hover:text-red ${
                  isActive && "text-red bg-redlt"
                }`
              }
              to="/"
            >
              <AiOutlineDashboard />
              <span className="">Dashboard</span>
            </NavLink>
          </li>

          <li className="">
            <NavLink
              className={({ isActive }) =>
                `text-lg flex items-center gap-4 px-4 py-2 ease-in-out duration-200 hover:text-red ${
                  isActive && "text-red bg-redlt"
                }`
              }
              to="/orders"
            >
              <AiFillMedicineBox />
              <span className="">Orders</span>
            </NavLink>
          </li>

          <li className="">
            <NavLink
              className={({ isActive }) =>
                `text-lg flex items-center gap-4 px-4 py-2 ease-in-out duration-200 hover:text-red ${
                  isActive && "text-red bg-redlt"
                }`
              }
              to="/clinicians"
            >
              <TbStethoscope />
              <span className="">Clinicians</span>
            </NavLink>
          </li>

          <li className="">
            <NavLink
              className={({ isActive }) =>
                `text-lg flex items-center gap-4 px-4 py-2 ease-in-out duration-200 hover:text-red ${
                  isActive && "text-red bg-redlt"
                }`
              }
              to="/patients"
            >
              <HiUsers />
              <span className="">Patients</span>
            </NavLink>
          </li>
        </ul>
        <div className="flex items-center gap-2">
          <button
            className="w-[55px] h-[55px] rounded-full overflow-hidden"
            onClick={() => dispatch(logout())}
          >
            <img src={user.photoUrl} alt="" className="object-cover" />
          </button>
          <button className="text-4xl text-lblack lg:hidden">
            <CgMenuRightAlt />
          </button>
        </div>
      </nav>
    </section>
  );
}

export default Navbar;
