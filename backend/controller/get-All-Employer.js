const employerModel = require("../model/employ-model");
const getAllEmployer = async(req,res) =>{
    try {
        const employers = await employerModel.find();
        if(employers.length<1){
            res.json({
                success:false,
                message:"no data exist!"
            })
        }
        res.json({
            success:true,
            employers,
            message:"data fetched successfully!"
        })
        
    } catch (error) {

        
    }
}
module.exports=getAllEmployer;