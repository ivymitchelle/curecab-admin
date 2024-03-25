import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { setUser } from "../redux/features/AuthSlice";
import { useDispatch } from "react-redux";
import { CgSpinnerTwoAlt } from "react-icons/cg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error("All fields are required!");

    setLoading(true);
    try {
      const { data } = await axios.post(
        "/clinicians/login",
        {
          email,
          password,
        }
      );
      toast.success(data.msg);
      localStorage.setItem("user", JSON.stringify(data.user));
      setLoading(false);
      dispatch(setUser(data.user));
    } catch (error) {
      setLoading(false);
      return toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <form
        className="bg-white p-3 rounded-md w-full max-w-[500px] py-6"
        onSubmit={handleSubmit}
      >
        <div className="relative">
          <p className="text-3xl mb-5 text-center">Login</p>
        </div>

        <div className="w-full mb-3">
          <label htmlFor="" className="text-[18px]">
            Email address
          </label>
          <input
            disabled={loading}
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            required
            type="email"
            placeholder="abc@example.com"
            className="w-full bg-input p-4 rounded-sm mt-2 outline-none text-lblack
             focus:border-green border-[1px] border-input text-lg
            "
          />
        </div>

        <div className="w-full mb-3">
          <label className="text-[18px]" htmlFor="">
            Password
          </label>
          <input
            disabled={loading}
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
            minLength={6}
            maxLength={16}
            required
            type="password"
            placeholder="* * * * * *"
            className="w-full bg-input p-4 rounded-sm mt-2 text-lg
            outline-none text-lblack focus:border-green border-[1px] border-input"
          />
        </div>

        <button
          disabled={loading}
          onClick={handleSubmit}
          className="w-full bg-red py-3 text-white text-bold text-xl hover:opacity-[.8] rounded-md mt-5"
        >
          {loading ? (
            <CgSpinnerTwoAlt className="animate-spin mx-auto duration-30 text-3xl" />
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
}

export default Login;
