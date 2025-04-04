const employerModel = require("../model/employ-model");

const createEmployer = async (req, res) => {
    try {
        let email = req?.body?.email;
        let name = req?.body?.name;
        let department = req?.body?.department;
        let designation = req?.body?.designation;
        let date = req?.body?.date;
        if (!email && !name && !department && !designation && !date) {
           return res.json({
                success: false,
                message: "all filed mandatory!"
            })
        }
        let employ = await employerModel.findOne({email});
        if(employ){
          return res.json({
                succes: false,
                message: "email already exist!"
    
            })
        }
        let createdEmployer = await employerModel.create({
            name,
            email,
            department,
            designation,
            dateOfJoining:date,
        });
        res.json({
            succes: true,
            createdEmployer,
            message: "created successfully!"

        })


    } catch (error) {
        res.json({
            succes: false,
            message: "error with creating employer: " + error.message,

        })

    }

}

module.exports=createEmployer;