import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/layout";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const { auth } = useAuth();
  return (
    <Layout title={"Dashboard"}>
      <div className="container mx-auto p-6">
        <h1>Admin Panel</h1>
        <div className="flex gap-2">
          <div className="  ">
            <AdminMenu />
          </div>
          <div className="w-full">
            <div className="card bg-white shadow-lg rounded-lg p-6">
              <h1 className="text-xl font-bold mb-4">
                Admin Name: {auth?.user?.name}
              </h1>
              <h1 className="text-xl font-bold mb-4">
                Admin Email: {auth?.user?.email}
              </h1>
              <h1 className="text-xl font-bold">
                Admin Contact: {auth?.user?.phone}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
