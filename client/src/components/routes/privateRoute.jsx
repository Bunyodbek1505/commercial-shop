/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { useAuth } from "../../context/auth"
import instance from "../../axios"
import { Outlet } from "react-router-dom"

const PrivateRoute = () => {
    const [ok, setOk] = useState(false)
    const {auth, setAuth} = useAuth()

    useEffect(() => {
        const authCheck = async () => {
            const res = await instance.get(`auth/user-auth`, {
                //  bu headerni auth.jsx olib kelib beradi, barcha sorovlar uchun
                headers: {
                    Authorization: auth?.token,
                }
            })
            if(res.data.ok){
                setOk(true)
            }else{
                setOk(false)
            }
        }
        // auth?.token bo'lgandagina tekshirsin
        if(auth?.token) authCheck()
    }, [auth?.token])

  return ok ? <Outlet/> : "spinner"
}

export default PrivateRoute