import { createContext, useState } from "react";
import axios from "axios"
import { notify } from "../utls/notify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext({
    handleInput: () => { },
    createEmployer: () => { },
    handleFormSubmit: () => { },
    error: "",
    actionType: ""
});

export const AppContextProvider = ({ children }) => {
    const [employerList, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [actionType, stType] = useState("create");
    let navigate = useNavigate();
    const [employer, setEmployer] = useState({
        name: "",
        email: "",
        department: "",
        designation: "",
        date: "",
    })
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
    


    // validate form 
    const validateForm = () => {
        const newErrors = {};

        if (!employer.name.trim()) newErrors.name = "Name is required";
        else if (employer.name.trim().length < 4) newErrors.name = "Name must be at least 4 characters";

        if (!employer.email.trim()) newErrors.email = "Email is required";
        else if (!/^\S+@\S+\.\S+$/.test(employer.email)) newErrors.email = "Invalid email format";

        if (!employer.designation.trim()) newErrors.designation = "Designation is required";
        else if (employer.designation.trim().length < 2) newErrors.designation = "Designation must be at least 2 characters";
        else if (!/^[A-Za-z\s]+$/.test(employer.designation)) newErrors.designation = "Designation must contain only letters";

        if (!employer.department.trim()) newErrors.department = "Department is required";
        else if (employer.department.trim().length < 2) newErrors.department = "Department must be at least 2 characters";
        else if (!/^[A-Za-z\s]+$/.test(employer.department)) newErrors.department = "Department must contain only letters";

        if (!employer.date.trim()) newErrors.date = "Joining date is required";

        setError(newErrors);
        return newErrors;
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm();

        if (Object.keys(errors).length === 0) {
            if (e.nativeEvent.submitter.classList.contains("create")) {
                stType("create")
                createEmployer()
            } else if (e.nativeEvent.submitter.classList.contains("update")) {
                stType("update")
                updateEmployer()
            } else {
                return;

            }

        } else {
            const errorMessages = Object.values(errors).join("\n");
            alert(errorMessages);
        }
    };

    // create employer
    const createEmployer = async () => {
        try {
            setLoading(true)
            console.log("okk")
            let res = await axios.post(`http://localhost:3000/employer`, employer);
            if (res.data.succes) {
                let res = await axios.get("http://localhost:3000/employer");
                setList(res.data.employers);
                notify("success", "data created successfully!");
                setLoading(false);
                setTimeout(() => {
                    navigate("/all-employer")
                }, 1000)
            } else {
                notify("error", res.data.message)
                setLoading(false)

            }

        } catch (error) {
            notify("error", error.message)

        }
        setLoading(false)


    }
    // en

    // end 

    return <AppContext.Provider value={{
        employerList,
        handleInput,
        loading,
        employer,
        handleFormSubmit,
        actionType,
        setList,
        employerList,

    }}>
        {children}
    </AppContext.Provider>
}

