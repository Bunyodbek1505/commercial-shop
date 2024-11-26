import AdminMenu from "../../components/layout/AdminMenu"
import Layout from "../../components/layout/Layout"

const CreateProduct = () => {
  return (
    <Layout title={"Dashboard - Create Product"}>
    <div className="container mx-auto p-6">
      <h1>Create Category</h1>
      <div className="flex gap-2">
        <div className=" ">
          <AdminMenu />
        </div>
        <div className="w-full">
          
        </div>
      </div>
    </div>
  </Layout>
  )
}

export default CreateProduct