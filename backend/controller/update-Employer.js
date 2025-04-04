const { default: mongoose} = require("mongoose");
const employerModel = require("../model/employ-model");
const updateEmployer = async (req, res) => {
    try {
        let newData = req?.body;
        let id = req?.params?.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.json({
                success: false,
                message: " error with update data. no employer match!"
            })
        }
        let updatedEmployer = await employerModel.findByIdAndUpdate(id,{
            $set:{...newData}
        },{new:true});
        if(updateEmployer){
           return  res.json({
                succes:true,
                updatedEmployer,
                message:"data updated succesfully!"
            })

        }else{
          return  res.json({
                succes:flase,
                message:"no employer found!"
            })

        }
       


    } catch (error) {
        res.json({
            success: false,
            message: `error: ${error.message}`
        })

    }
}
module.exports = updateEmployer