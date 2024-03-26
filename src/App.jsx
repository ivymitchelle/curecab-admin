import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Verify from "./pages/Verify";
import Orders from "./pages/Orders";
import Clinicians from "./pages/Clinicians";
import Patients from "./pages/Patients";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "./redux/features/AuthSlice";
import axios from "axios"

axios.defaults.baseURL="https://curecab-api.onrender.com/api/v1"
function App() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = () => {
      try {
        const storedUser = localStorage.getItem("user");
        dispatch(setUser(JSON.parse(storedUser)));
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute user={user}>
          <Layout>
            <Dashboard />
          </Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: "/login",
      element: (
        <NoUserRoute user={user}>
          <Login />
        </NoUserRoute>
      ),
    },
    {
      path: "/verify",
      element: (
        <NoUserRoute user={user}>
          <Verify />
        </NoUserRoute>
      ),
    },
    {
      path: "/orders",
      element: (
        <ProtectedRoute user={user}>
          <Layout>
            <Orders />
          </Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: "/clinicians",
      element: (
        <ProtectedRoute user={user}>
          <Layout>
            <Clinicians />
          </Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: "/patients",
      element: (
        <ProtectedRoute user={user}>
          <Layout>
            <Patients />
          </Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return (
    <div className="">
      <RouterProvider router={router} />
    </div>
  );
}

const ProtectedRoute = ({ children, user }) => {
  if (!user) return <Navigate to="/login" replace={true} />;
  return children;
};

const NoUserRoute = ({ children, user }) => {
  if (user) return <Navigate to="/" replace={true} />;
  return children;
};

export default App;
