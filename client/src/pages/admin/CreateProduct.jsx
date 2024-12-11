import { useEffect, useState } from "react";
import Layout from "../../components/layout/layout";
import AdminMenu from "../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Button,
  Input,
  Textarea,
  Select,
  Option,
  Typography,
} from "@material-tailwind/react";
import instance from "../../axios.js";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Fetch categories
  const getAllCategory = async () => {
    try {
      const { data } = await instance.get("/category/get-category");
      if (data?.success) {
        setCategories(data.category);
      } else {
        toast.error(data.message || "Failed to fetch categories");
      }
    } catch (error) {
      console.error("Category fetch error:", error);
      toast.error("Something went wrong in Category fetching");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Submit Handler
  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const productData = new FormData();

      // Append form data
      Object.entries(formData).forEach(([key, value]) => {
        productData.append(key, value);
      });
      if (photo) productData.append("photo", photo);

      // API Call
      const { data } = await instance.post(
        "/product/create-product",
        productData
      );

      if (data?.success) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message || "Product creation failed");
      }
    } catch (error) {
      console.error("Product creation error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Dashboard - Create Product">
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
              className={`lg:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}
            >
              <AdminMenu />
            </div>

            {/* Admin menu - Desktop */}
            <div className="hidden lg:block lg:w-1/4">
              <AdminMenu/>
            </div>

            <div className="w-full ">
              <Typography variant="h4" color="blue-gray" className="mb-6">
                Create Product
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Select
                  label="Select a Category"
                  onChange={(value) => setValue("category", value)}
                >
                  {categories.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>

                <div>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() =>
                      document.getElementById("photo-input").click()
                    }
                  >
                    {photo ? photo.name : "Upload Photo"}
                  </Button>
                  <input
                    type="file"
                    id="photo-input"
                    accept="image/*"
                    hidden
                    onChange={(e) => setPhoto(e.target.files[0])}
                  />
                </div>

                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product"
                      className="rounded-md"
                      style={{ maxHeight: "200px" }}
                    />
                  </div>
                )}

                <Input
                  type="text"
                  label="Product Name"
                  {...register("name", {
                    required: "Product Name is required",
                  })}
                />
                {errors.name && (
                  <Typography variant="small" color="red">
                    {errors.name.message}
                  </Typography>
                )}

                <Textarea
                  label="Description"
                  {...register("description", {
                    required: "Description is required",
                  })}
                />
                {errors.description && (
                  <Typography variant="small" color="red">
                    {errors.description.message}
                  </Typography>
                )}

                <Input
                  type="number"
                  label="Price"
                  {...register("price", {
                    required: "Price is required",
                    valueAsNumber: true,
                  })}
                />
                {errors.price && (
                  <Typography variant="small" color="red">
                    {errors.price.message}
                  </Typography>
                )}

                <Input
                  type="number"
                  label="Quantity"
                  {...register("quantity", {
                    required: "Quantity is required",
                    valueAsNumber: true,
                  })}
                />
                {errors.quantity && (
                  <Typography variant="small" color="red">
                    {errors.quantity.message}
                  </Typography>
                )}

                <Select
                  label="Select Shipping"
                  onChange={(value) => setValue("shipping", value)}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>

                <Button type="submit" fullWidth disabled={loading}>
                  {loading ? "Creating Product..." : "Create Product"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
