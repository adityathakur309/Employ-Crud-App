const router = require("express").Router();


const createEmployer = require("../controller/create-Employer");
const getAllEmployer = require("../controller/get-All-Employer");
const updateEmployer = require("../controller/update-Employer");
const deleteEmployer = require("../controller/delete-Employer");


// create employer 
router.post("/", createEmployer);
// end 
// get all employer  
router.get("/",getAllEmployer)
// end
// update employer 
router.put("/:id",updateEmployer)
// end 
// delete employer 
router.delete("/:id",deleteEmployer)
// end  

module.exports = router;

