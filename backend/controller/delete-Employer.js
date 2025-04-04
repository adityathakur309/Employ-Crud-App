const employerModel = require("../model/employ-model");
const { default: mongoose} = require("mongoose");

const deleteEmployer = async (req, res) => {
    try {
        let id = req?.params?.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.json({
                success: false,
                message: " error with delete data. no employer match!"
            })
        }
        let deletedEmployer = await employerModel.findOneAndDelete({_id:id});
        if(deletedEmployer){
          return  res.json({
                succes:true,
                deletedEmployer,
                message:`data deleted successfully!`
            })
        }else{
            return  res.json({
                succes:false,
                message:`failed to delete employer no employer match!`
            })

        }
        


    } catch (error) {
        res.json({
            succes: false,
            message: `error with deleting employer ${error.message}`,
        })

    }
}
module.exports=deleteEmployer;
