const {connectToDB,disconnectToDB,getConnection}=require('../db.js');

const addBuilding=(req,res)=>{
	const {BuildingName,BuildingAddress}=req.body;
	if(BuildingName?.length && BuildingAddress?.length){
		const building_data=[[BuildingName,BuildingAddress]];
		let query_string="insert into Buildings(BuildingName,BuildingAddress) values ?;";
		connectToDB().then(()=>{
			getConnection().query(query_string,[building_data],(err,result)=>{
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
			error:"Either BuildingName or BuildingAddress is empty!"
		});
	}
};

const getAllBuildings=(req,res)=>{
	try{
		const query_string="select * from Buildings;";
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

const getBuilding=(req,res)=>{
	try{
		const {BuildingID}=req.body;
		const query_string="select * from Buildings where BuildingID=?";
		connectToDB().then(()=>{
			getConnection().query(query_string,BuildingID,(err,result)=>{
				if(err){
					res.status(501).send({
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

const deleteBuilding=(req,res)=>{
	try{
		const {BuildingID}=req.body;
		const query_string="delete from Buildings where BuildingID=?";
		connectToDB().then(()=>{
			getConnection().query(query_string,BuildingID,(err,result)=>{
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

const searchBuilding=(req,res)=>{
	try{
		let {SearchString}=req.body;
		SearchString="%"+SearchString+"%";
		const query_string="select * from Buildings where lower(BuildingName) like lower(?);";
		connectToDB().then(()=>{
			getConnection().query(query_string,[SearchString],(err,result)=>{
				if(err){
					res.status(400).send({
						error:err,
						successful:false
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

module.exports={addBuilding,getAllBuildings,getBuilding,deleteBuilding,searchBuilding};
