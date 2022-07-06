const {connectToDB,disconnectToDB,getConnection}=require('../db.js');

const addBlock=(req,res)=>{	
	const {BuildingID,BlockName,BlockLatitude,BlockLongitude} = req.body;
	if(BuildingID && BlockName?.length && parseFloat(BlockLatitude)<=180 && parseFloat(BlockLatitude)>=-180 && parseFloat(BlockLongitude)<=90 && parseFloat(BlockLongitude)>=-90){
		const block_data = [[BuildingID,BlockName,BlockLatitude,BlockLongitude]];
		query_string = "insert into Blocks(BuildingID,BlockName,BlockLatitude,BlockLongitude) values ?"
		connectToDB().then(()=>{
			getConnection().query(query_string,[block_data],(err,result)=>{
				if(err){
					res.status(500).send({
						successful:false,
						error:err
					});
				}else{
					query_string="select last_insert_id();";
					getConnection().query(query_string,(err,result)=>{
						if(err){
							res.status(500).send({
								successful:false,
								error:err
							});
						}else{
							res.status(201).send({
								successful:true,
								id:result[0]["last_insert_id()"]
							});
						}
					});
				}
				disconnectToDB();
			});
		}).catch((err)=>{
			console.log(err);
		});
	}else{
		res.status(400).json({
			error:"BuildingID,BlockName,BlockLatitude and BlockLongitude should be valid!"
		});
	}
};

const getAllBlocksFrom=(req,res)=>{
	try{
		const {BuildingID}=req.body;
		const query_string="select * from Blocks where BuildingID=?;";
		connectToDB().then(()=>{
			getConnection().query(query_string,BuildingID,(err,result)=>{
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

const getBlock=(req,res)=>{
	try{
		const {BlockID}=req.body;
		const query_string="select * from Blocks where BlockID=?";
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

const deleteBlock=(req,res)=>{
	try{
		const {BlockID}=req.body;
		const query_string="delete from Blocks where BlockID=?";
		connectToDB().then(()=>{
			getConnection().query(query_string,BlockID,(err,result)=>{
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

const getAllBlocks=(req,res)=>{
	try{
		const query_string="select * from Blocks;";
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

module.exports={addBlock,getAllBlocksFrom,getBlock,deleteBlock,getAllBlocks};
