import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { CgSpinnerTwoAlt } from "react-icons/cg";

function Verify() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPassWord, setConfirmPassWord] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!confirmPassWord || !password)
      return toast.error("All fields are required!");

    if (password !== confirmPassWord)
      return toast.error("Passwords must be the same!");

    setLoading(true);
    try {
      const { data } = await axios.patch(
        "/clinicians/verify",
        {
          token: location.search.split("=").pop(),
          password,
        }
      );
      setLoading(false);
      toast.success(data.msg);
      return navigate("/login");
    } catch (error) {
      setLoading(false);
      return toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <form className="bg-white p-3 rounded-md w-full max-w-[500px] py-6">
        <div className="relative">
          <p className="text-3xl mb-5 text-center">Set password</p>
        </div>

        <div className="w-full mb-3">
          <label htmlFor="" className="text-[18px]">
            Password
          </label>
          <input
            disabled={loading}
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
            type="password"
            placeholder="* * * * * *"
            className="w-full bg-input p-4 rounded-sm mt-2 outline-none text-lblack  
            focus:border-green border-[1px] border-input text-lg"
          />
        </div>

        <div className="w-full mb-3">
          <label className="text-[18px]" htmlFor="">
            Confirm Password
          </label>
          <input
            disabled={loading}
            value={confirmPassWord}
            onChange={(e) => setConfirmPassWord(e.target.value.trim())}
            minLength={6}
            maxLength={16}
            type="password"
            placeholder="* * * * * *"
            className="w-full bg-input p-4 rounded-sm  mt-2 text-lg
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
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
}

export default Verify;
