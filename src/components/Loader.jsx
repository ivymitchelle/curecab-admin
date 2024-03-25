import { ImSpinner8 } from "react-icons/im";

const Loader = () => {
  return (
    <div className="flex items-center justify-center p-10">
      <ImSpinner8 className="animate-spin text-5xl text-red" />
    </div>
  );
};

export default Loader;
