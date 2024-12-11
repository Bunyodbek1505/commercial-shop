import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import CategoryForm from "../../components/form/CategoryForm";
import AdminMenu from "../../components/layout/AdminMenu";
import instance from "../../axios";
import toast from "react-hot-toast";
import { Dialog } from "@material-tailwind/react";
import Layout from "../../components/layout/layout";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [select, setSelect] = useState(null);
  const [updateName, setUpdateName] = useState("");
  const [modal, setModal] = useState(false);

  const getAllCategories = async () => {
    try {
      const { data } = await instance.get("/category/get-category");
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await instance.post("/category/create-category", {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategories();
        setName("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in creating category");
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await instance.delete(`/category/delete-category/${id}`);
      if (data.success) {
        toast.success("Category deleted successfully");
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await instance.put(
        `/category/update-category/${select._id}`, {name: updateName}
      );
      if(data?.success){
        toast.success(`${updateName} is updated`)
        setModal(false)
        setSelect(null)
        await getAllCategories()
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title="Dashboard - Create Category">
      <div className="min-h-screen bg-gray-50">
        {/* Mobile Menu Button */}
        <div className="lg:hidden p-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Admin Menu - Mobile */}
            <div
              className={`lg:hidden ${
                isMobileMenuOpen ? "block" : "hidden"
              } mb-6`}
            >
              <AdminMenu />
            </div>

            {/* Admin Menu - Desktop */}
            <div className="hidden lg:block lg:w-1/4">
              <AdminMenu />
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h1 className="text-2xl font-semibold mb-6 text-gray-800">
                  Manage Categories
                </h1>
                <CategoryForm
                  handleSubmit={handleSubmit}
                  value={name}
                  setValue={setName}
                />
              </div>

              {/* Categories Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4">
                {categories?.map((category) => (
                  <div
                    key={category._id}
                    className="bg-white p-4 rounded-lg shadow-md"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <h2 className="text-lg font-medium text-gray-800">
                        {category.name}
                      </h2>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <button
                          className="flex-1 sm:flex-none inline-flex items-center justify-center px-3 py-2 border border-blue-600 text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                          onClick={() => {
                            setModal(true);
                            setUpdateName(category.name);
                            setSelect(category);
                          }}
                        >
                          <Pencil size={16} className="mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(category._id)}
                          className="flex-1 sm:flex-none inline-flex items-center justify-center px-3 py-2 border border-red-600 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                        >
                          <Trash2 size={16} className="mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Dialog open={modal} handler={() => setModal(true)}>
                <CategoryForm
                  value={updateName}
                  setValue={setUpdateName}
                  handleSubmit={handleEdit}
                />
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
