import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="bg-input min-h-screen h-full">
      <Navbar />
      <div className="w-full mx-auto max-w-[1400px] bg-input">{children}</div>
    </div>
  );
}

export default Layout;
