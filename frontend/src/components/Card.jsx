import { useContext, useState } from "react";
import { CiCalendar, CiMail } from "react-icons/ci";
import { FcDepartment } from "react-icons/fc";
import axios from "axios"

import { notify } from "../utls/notify";
import { useNavigate } from "react-router-dom";



export const Card = ({employ,setList,setUpdating,handleUpdate,setLoading}) => {
    const navigate = useNavigate();
//    delete employer 
    const handleDeleteEmployer = async (id) => {
        try {
            setLoading(true)
            let res = await axios.delete(`http://localhost:3000/employer/${id}`);
            if(res?.data?.succes){
                let res = await axios.get("http://localhost:3000/employer");
                setList([])
                notify("success","deleted successfully!")
                setLoading(false)

            }
            else{
                notify("error",res.message)
                setLoading(false)
            }

        } catch (error) {
          alert(error.message)

        }
        setLoading(false)



    }
    // handle update 
    
    // end 

    return (
        <div className="card">
            <div className="employer-card">
                <div className="employer-card__header">
                    <div className="employer-card__header-content">
                        <div>
                            <h2 className="employer-card__name">name : {employ?.name}</h2>
                            <p className="employer-card__designation">designation : {employ?.designation}</p>
                        </div>
                    </div>
                </div>

                <div className="employer-card__body">
                    <div className="employer-card__info">
                        <div>department : <span>{employ?.department}</span></div>
                        <div>
                            email : 
                            <a href={`mailto:${"uuu"}`}>{employ?.email}</a>
                        </div>
                        <div><span>Joined date : {employ.dateOfJoining.toLocaleString()}</span></div>
                    </div>
                    <div className="flex">
                    <button className="btn" onClick={()=>{
                        handleUpdate(employ)
                    }}>edit</button>
                    <button className="btn danger" onClick={()=>{
                        handleDeleteEmployer(employ._id)
                    }}>delete</button>
                </div>
                </div>

                
            </div>

        </div>
    )
}