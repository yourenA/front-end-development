module.exports={
	note : {
		title : { type : String , required : true },
		description : { type : String , required : true },
		date : { type : String , required : true }
	},
	user:{
		username : { type : String , required : true },
		password : { type : String , required : true },
		register_date : { type : String , required : true }
	}
};