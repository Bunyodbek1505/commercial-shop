import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import instance from "../../axios";
import ProductCard from "../../components/product-card/productCard";
import EditProductModal from "../../components/product-card/EditProduct";
import Layout from "../../components/layout/layout";
import AdminMenu from "../../components/layout/AdminMenu";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const getAllProducts = async () => {
    try {
      const { data } = await instance.get("product/get-product");
      if (data?.success) {
        setProducts(data.products);
      } else {
        toast.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Something went wrong while fetching products");
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await instance.get("/category/get-category");
      if (data?.success) {
        setCategories(data.category || []);
      } else {
        toast.error(data.message || "Failed to fetch categories");
      }
    } catch (error) {
      console.error("Category fetch error:", error);
      toast.error("Something went wrong in Category fetching");
    }
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleUpdateProduct = async (formData) => {
    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("description", formData.description);
      form.append("price", formData.price);
      form.append("category", formData.category);
      form.append("shipping", formData.shipping === "true");

      // Photo faqat tanlanganida qo'shing
      if (formData.photo && formData.photo[0]) {
        form.append("photo", formData.photo[0]);
      }

      const { data } = await instance.put(
        `product/update-product/${selectedProduct._id}`,form );

      if (data?.success) {
        toast.success("Product updated successfully");
        setIsModalOpen(false);
        setSelectedProduct(null);
        getAllProducts();
      } else {
        toast.error(data?.message || "Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong while updating the product"
      );
    }
  };

  useEffect(() => {
    getAllProducts();
    getAllCategory();
  }, []);

  return (
    <Layout title={"Dashboard - All Products"}>
      <div className="min-h-screen bg-gray-50">
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
          <div className="flex flex-col md:flex-row gap-6">
            <div
              className={`lg:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}
            >
              <AdminMenu />
            </div>

            <div className="hidden lg:block lg:w-1/4">
              <AdminMenu />
            </div>
            <div className="w-full md:w-3/4">
              <h1 className="text-2xl font-bold text-gray-800 mb-6">
                All Products
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products?.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onEdit={handleEditProduct}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <EditProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
        onSubmit={handleUpdateProduct}
        product={selectedProduct}
        categories={categories}
      />
    </Layout>
  );
}

export default Products;
