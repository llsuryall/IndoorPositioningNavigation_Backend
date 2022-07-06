const {connectToDB,disconnectToDB,getConnection}=require('../db.js');

const addFloor=(req,res)=>{
	const {BlockID,FloorID,FloorHeight,FloorWidth} = req.body;
	if(BlockID && FloorID!=null && parseFloat(FloorHeight)>0 && parseFloat(FloorWidth)>0){
		const block_data = [[FloorID,BlockID,FloorHeight,FloorWidth]];
		const query_string = "insert into Floors(FloorID,BlockID,FloorHeight,FloorWidth) values ?"
		connectToDB().then(()=>{
			getConnection().query(query_string,[block_data],(err,result)=>{
				if(err){
					res.status(500).send({
						successful:false,
						error:err
					});
				}else{
					res.status(201).send({
						successful:true
					});
				}
				disconnectToDB();
			});
		}).catch((err)=>{
			console.log(err);
		});
	}else{
		res.status(400).json({
			error:"BlockID,FloorID,FloorHeight and FloorWidth should be valid!"
		});
	}
};

const getAllFloorsFrom=(req,res)=>{
	try{
		const {BlockID}=req.body;
		const query_string="select * from Floors where BlockID = ? ;";
		connectToDB().then(()=>{
			getConnection().query(query_string,BlockID,(err,result)=>{
				if(err){
					res.status(500).send({
						successful:false,
						error:err
					});
				}else{
					res.status(200).send({
						successful:true,
						data:result
					});
				}
				disconnectToDB();
			});
		}).catch((err)=>{
			console.log(err);
		});
	}catch(err){
		console.log(err);
	}
};

const getFloor=(req,res)=>{
	try{
		const {FloorID}=req.body;
		const query_string="select * from Floors where FloorID=?";
		connectToDB().then(()=>{
			getConnection().query(query_string,FloorID,(err,result)=>{
				if(err){
					res.status(500).send({
						successful:false,
						error:err
					});
				}else{
					res.status(200).send({
						successful:true,
						data:result
					});
				}
				disconnectToDB();
			});
		}).catch((err)=>{
			console.log(err);
		});
	}catch(err){
		console.log(err);
	}
};

const deleteFloor=(req,res)=>{
	try{
		const {FloorID,BlockID}=req.body;
		const query_string=`delete from Floors where FloorID=${FloorID} and BlockID=${BlockID}`;
		connectToDB().then(()=>{
			getConnection().query(query_string,FloorID,(err,result)=>{
				if(err){
					res.status(400).send({
						error:err,
						successful:false
					});
				}else{
					res.status(200).send({
						successful:true
					});
				}
				disconnectToDB();
			});
		}).catch((err)=>{
			console.log(err);
		});
	}catch(err){
		console.log(err);
	}
};

const getAllFloors=(req,res)=>{
	try{
		const query_string="select * from Floors;";
		connectToDB().then(()=>{
			getConnection().query(query_string,(err,result)=>{
				if(err){
					res.status(500).send({
						successful:false,
						error:err
					});
				}else{
					res.status(200).send({
						successful:true,
						data:result
					});
				}
				disconnectToDB();
			});
		}).catch((err)=>{
			console.log(err);
		});
	}catch(err){
		console.log(err);
	}
};
module.exports={addFloor,getAllFloorsFrom,getFloor,deleteFloor,getAllFloors};
