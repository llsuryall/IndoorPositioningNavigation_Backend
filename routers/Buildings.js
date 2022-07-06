const express=require("express");
const router=express.Router();
const {addBuilding,getAllBuildings,getBuilding,deleteBuilding,searchBuilding}=require("../controllers/Buildings.js");

router.route('/add')
.post(addBuilding);

router.route('/all')
.post(getAllBuildings);

router.route('/delete')
.post(deleteBuilding);

router.route('/get')
.post(getBuilding);

router.route('/search')
.post(searchBuilding);

module.exports=router;
