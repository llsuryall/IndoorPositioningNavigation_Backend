const express=require("express");
const router=express.Router();
const {addDatapoint,getAllDatapoints,getDatapoint,deleteDatapoint,getAllDatapointsFrom}=require("../controllers/Datapoints.js");

router.route('/add')
.post(addDatapoint);

router.route('/all')
.post(getAllDatapoints);

router.route('/all_from')
.post(getAllDatapointsFrom);

module.exports=router
