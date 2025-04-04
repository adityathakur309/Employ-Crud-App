
import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { AppContext } from "../context/App-Context";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const EmployerApp = () => {
    let { handleInput, employer, handleFormSubmit, actionType, loading } = useContext(AppContext)
    let navigate = useNavigate();

    return (
        <>
            <section className="employer-section">
                <div className="container">
                    <h1>Create employer</h1>
                    <form action="" onSubmit={handleFormSubmit}>
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
                        {
                            loading
                                ? <div className="loader" style={{ margin: "0 auto" }}></div>
                                : actionType === "create"
                                    ? <button type="submit" className="btn create">Create Employer</button>
                                    : <button type="submit" className="btn update">Update Employer</button>
                        }
                        <button type="button" className="btn" onClick={() => navigate("/all-employer")}>see all employer</button>

                    </form>

                </div>
                <ToastContainer position="top-right" autoClose={3000} />

            </section>
        </>
    )
}