const {connectToDB,disconnectToDB,getConnection}=require('../db.js');

const addDatapoint=(req,res)=>{
	const {X_Coordinate,Y_Coordinate,FloorID,BlockID,APSignalStrengthsJSON} = req.body;
	if(BlockID && FloorID!=null && X_Coordinate!=null && Y_Coordinate!=null && APSignalStrengthsJSON?.length){
		const block_data = [[FloorID,BlockID,X_Coordinate,Y_Coordinate,APSignalStrengthsJSON]];
		const query_string = "insert into Datapoints(FloorID,BlockID,X_Coordinate,Y_Coordinate,APSignalStrengthsJSON) values ?"
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
			error:"BlockID,FloorID,X_Coordinate,Y_Coordinate and APSignalStrengthsJSON should be valid!"
		});
	}
};

const getAllDatapointsFrom=(req,res)=>{
	try{
		const {BlockID}=req.body;
		const query_string=`select * from Datapoints where BlockID=${BlockID};`;
		connectToDB().then(()=>{
			getConnection().query(query_string,(err,result)=>{
				if(err){
					res.status(500).send({
						uccessful:false,
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

const getAllDatapoints=(req,res)=>{
	try{
		const query_string=`select * from Datapoints;`;
		connectToDB().then(()=>{
			getConnection().query(query_string,(err,result)=>{
				if(err){
					res.status(500).send({
						successful:false,
						error:err
					});
				}else{
					res.header("Content-Length:","result.length");
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
module.exports={addDatapoint,getAllDatapointsFrom,getAllDatapoints};
