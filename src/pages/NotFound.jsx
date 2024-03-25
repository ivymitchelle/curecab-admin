import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex w-full h-screen justify-center items-center flex-col">
      <img
        src="no-plug.gif"
        alt=""
        className="w-full h-full max-h-[300px] max-w-[300px]"
      />
      <p className="text-xl text-lblack">
        Invalid page url.
        <Link className="text-red ml-4 font-bold" to="/">
          Go to home.
        </Link>
      </p>
    </div>
  );
}

export default NotFound;
