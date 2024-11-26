import { useEffect, useState } from "react"
import CategoryForm from "../../components/form/CategoryForm"
import AdminMenu from "../../components/layout/AdminMenu"
import Layout from "../../components/layout/Layout"
import instance from "../../axios"
import { Button } from "@material-tailwind/react"

const CreateCategory = () => {
  const [cat, setCat] = useState([])
  const [name, setName] = useState('')

  useEffect(()=>{
   instance.get('/category/get-category').then(res => setCat(res.data.category))
  },[])

  async function postCategory(e){
    e.preventDefault()

    try{
      const res = await instance.post('/category/create-category', {name})

      if(res.data.success){
        console.log("Category created succesfully")
      }
    }
    catch(error){
      console.log(error)
    }
    
  }


  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container mx-auto p-6">
        <h1>Create Category</h1>
        <div className="flex flex-col items-center gap-2">
          <div className="  ">
            <AdminMenu />
          </div>
          <div className="w-full">
              <CategoryForm handleSubmit={postCategory} value={name} setValue={setName}/>
          </div>
          <br />

          <div className="cts grid grid-cols-1 gap-4 w-full">
          {
            cat?.map(sinCat => (
              <div key={sinCat._id} className="rounded-sm w-[80%] p-4 flex flex-col gap-3 bg-blue-gray-500 border-solid border-[1px] border-green-500 ">
              <h1>{sinCat.name}</h1>
              <Button variant="outlined">Edit</Button>
              <Button>Delete</Button>
              </div>
            ))
          }
          </div>

        </div>
      </div>
    </Layout>
  )
}

export default CreateCategory