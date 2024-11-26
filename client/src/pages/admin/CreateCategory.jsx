import { useEffect, useState } from "react";
import CategoryForm from "../../components/form/CategoryForm";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import instance from "../../axios";
import { Button } from "@material-tailwind/react";
import toast from "react-hot-toast";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  // Get all categories
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

  // Create category
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

  // Delete category
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

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container mx-auto p-6">
        <div className="flex gap-6">
          <div>
            <AdminMenu />
          </div>

          <div className="w-screen ">
            <div className="w-full ">
              <div className="bg-white p-6 w-full rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold mb-6">
                  Manage Categories
                </h1>
                <CategoryForm
                  handleSubmit={handleSubmit}
                  value={name}
                  setValue={setName}
                />
              </div>
            </div>

            <div className="w-full max-w-4xl grid gap-4">
              {categories?.map((category) => (
                <div
                  key={category._id}
                  className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
                >
                  <h2 className="text-lg font-medium">{category.name}</h2>
                  <div className="space-x-2">
                    <Button variant="outlined" color="blue" size="sm">
                      Edit
                    </Button>
                    <Button
                      color="red"
                      size="sm"
                      onClick={() => handleDelete(category._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
