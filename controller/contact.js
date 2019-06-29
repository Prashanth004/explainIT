var database = require('../app');
exports.saveContact = function(req,res){
   
    if(req.user.id === req.body.contactid){
        res.status(450).send({
            success:0,
            msg:"Cant add own contact"
        });
        return
    }
    database.db.oneOrNone('insert into contacts(profileid,contactid,custinfo)' +
    'values(${profileid},${contactid},${custinfo})',
    {
        profileid:req.user.id,
        contactid:req.body.contactid,
        custinfo:null
    }).then(data=>{
        res.status(201).send({
            success:1,
        })
    }).catch(error=>{
        res.status(500).send({
            success:0,
            error:error
        })
    })
}

exports.getAllContact = function(req,res){
    database.db.manyOrNone('select * from contacts where profileid = $1',req.user.id)
    .then(function(data){
        res.status(200).send({
            success:1,
            data:data
        })
    }).catch(function(error){
        console.log("error : ",error)
        res.status(500).send({
            success:0,
            error:error
        })
    })
}

exports.getContactById = function(req,res){
    database.db.oneOrNone('select * from contacts where profileid = $1 and contactid =$2',[req.user.id,req.params.id])
    .then(function(data){
        console.log(data)
        res.status(200).send({
            success:1,
            data:data
        })
    })
    .catch(function(error){
        console.log("error : ",error)
        res.status(500).send({
            success:0,
            error:error
        })
    })
}