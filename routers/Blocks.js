const express=require("express");
const router=express.Router();
const {addBlock,getAllBlocks,getBlock,deleteBlock,getAllBlocksFrom}=require("../controllers/Blocks.js");

router.route('/add')
.post(addBlock);

router.route('/all')
.post(getAllBlocks);

router.route('/delete')
.post(deleteBlock);

router.route('/get')
.post(getBlock);

router.route('/all_from')
.post(getAllBlocksFrom)

module.exports=router
