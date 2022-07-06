const express=require("express");
const router=express.Router();
const {addFloor,getAllFloors,getFloor,deleteFloor,getAllFloorsFrom}=require("../controllers/Floors.js");

router.route('/add')
.post(addFloor);

router.route('/all')
.post(getAllFloors);

router.route('/delete')
.post(deleteFloor);

router.route('/get')
.post(getFloor);

router.route('/all_from')
.post(getAllFloorsFrom);

module.exports=router
