const mysql= require('mysql');

let connection;

const connectToDB=()=>{
	return new Promise((resolve,reject)=>{
		connection=mysql.createConnection({
			host: process.env.HOST,
			user: process.env.DB_USER,
			password: process.env.PASSWORD,
			database: process.env.DATABASE,
			port: process.env.DB_PORT
		});
		connection.connect((err)=>{
			if(err){
				reject(err);
			}else{
				console.log('Database connected!');
				resolve();
			}
		});
	});
}

const getConnection=()=>{
	return connection;
}

const disconnectToDB=()=>{
	connection.end((err)=>{
		if(err){
			console.log('Error - '+err.message);
		}
		console.log('Database Disconnected!');
	});
}

module.exports= {connectToDB,disconnectToDB,getConnection};
