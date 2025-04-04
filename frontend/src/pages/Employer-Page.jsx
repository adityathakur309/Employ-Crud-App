import { useNavigate } from "react-router-dom"
import { Card } from "../components/Card"
import {useEffect, useState } from "react";
import axios from "axios";
import { notify } from "../utls/notify";
import { ToastContainer } from "react-toastify";

export const EmployerPage = () => {
    let navigate = useNavigate();
    const [employerList, setList] = useState([]);
    const [updating, setUpdaing] = useState(false);
    const [loading, setLoading] = useState(false)
    const [employer, setEmployer] = useState({
        name: "",
        email: "",
        department: "",
        designation: "",
        date: "",
    })
    useEffect(() => {
        let fetch = async () => {
            setLoading(true)
            try {
                let res = await axios.get("http://localhost:3000/employer");
                if(res?.data?.success){
                    let newList = [...res?.data?.employers];
                    setList(newList);
                    notify("success", res?.data?.message);
                    setLoading(false)
                }else{
                    notify("error","no data exist!")
                    setLoading(false)
                }
            

            } catch (error) {
                notify("error", error.message)

            }
            setLoading(false)
        }

        fetch();
    }, [])


    // handle update 
    const handleUpdate = async (employ) => {
        setEmployer(employ)
        setUpdaing(true)


    }
    // end 
    // han dle input 
    const handleInput = (e) => {
        const { name, value } = e.target;
    
        const onlyLettersAndSpaces = /^[a-zA-Z\s]*$/;
    
        setEmployer((prev) => {
            switch (name) {
                case "name":
                case "designation":
                case "department":
                    if (onlyLettersAndSpaces.test(value)) {
                        return { ...prev, [name]: value };
                    } else {
                        notify("error", "Field should contain only letters and spaces!");
                        return { ...prev };
                    }
                default:
                    return { ...prev, [name]: value };
            }
        });
    };
    
    // handle form 

    const handleForm = async (e) => {
        try {
            setLoading(true)
            e.preventDefault();
            let res = await axios.put(`http://localhost:3000/employer/${employer._id}`, employer);
            if (res.data.succes) {
                notify("success", "updated successfully");
                setUpdaing(false)
            setLoading(false)


            } else {
                setLoading(false)
               notify("error",res.data.message)
            }


        } catch (error) {
        notify("error",error.message)
        }
        setLoading(false)


    }


    return (
        <>
            {updating ? <div className="container">
                <h1>update employer</h1>
                <form action="" onSubmit={handleForm}>
                    <div className="input">
                        <input type="text" name="name" placeholder="enter your name" value={employer.name} onChange={handleInput} required />
                    </div>
                    <div className="input">
                        <input type="email" name="email" placeholder="enter your email" value={employer.email} onChange={handleInput} required />
                    </div>
                    <div className="input">
                        <input type="text" name="designation" placeholder="enter your designation" value={employer.designation} onChange={handleInput} required />
                    </div>
                    <div className="input">
                        <input type="text" name="department" placeholder="enter your department" value={employer.department} onChange={handleInput} required />
                    </div>
                    <div className="input">
                        <input type="date" name="date" placeholder=" joining date" value={employer.date} onChange={handleInput} required />
                    </div>
                    <button type="submit" className="btn update">update employer</button>
                    <button type="button" className="btn" onClick={() =>setUpdaing(false) }>see all employer</button>
                    <button type="button" className="btn" onClick={() => navigate("/")}>create employer</button>
                </form>

            </div> : <section className="employer-section container">
                <h1>all employer</h1>
                {
                    loading ? (
                        <div className="loader" style={{ margin: "0 auto" }}></div>
                    ) : (
                        <>
                            <button
                                className="btn"
                                style={{ margin: "20px auto" }}
                                onClick={() => navigate(-1)}
                            >
                                Go Back
                            </button>
                            <button type="button" className="btn" style={{marginLeft:"10px"}} onClick={() => navigate("/")}>create employer</button>

                            <div className="employer-container container grid">
                                {employerList.length > 0 ? (
                                    employerList.map((employ, index) => (
                                        <Card
                                            key={index}
                                            setLoading={setLoading}
                                            employ={employ}
                                            setList={setList}
                                            handleUpdate={handleUpdate}
                                        />
                                    ))
                                ) : (
                                    <h2>No employer yet</h2>
                                )}
                            </div>
                        </>
                    )
                }


            </section>}
            <ToastContainer position="top-right" autoClose={3000}>

            </ToastContainer>
        </>
    )
}