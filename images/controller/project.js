var database = require('../app')
var promise = require('bluebird');
var buffer = require('buffer');
const fs = require('fs');
var config = require('../config/keys')
var key = require('../config/keys')
const multer = require('multer');
const upload = multer({ dest: '/images' })
var options = {
    promiseLib: promise
};
var database = require('../app')
var rn = require('random-number');
var options = {
    min: -1000000
    , max: 10000000
    , integer: true
}

id: rn(options),

    exports.saveProject = function (req, res) {
        console.log("request.body", req.body)
        var issueID = null
        var videopathName = null;
        if (!req.file) {
            console.log(" video file not found")
        }
        else if (req.file) {
            console.log("req.file : ", req.file)
            if (req.file.size > (1024 * 1024 * 12)) {
                res.status(450).send({
                    success: 0,
                    lengthExceeds: 1,
                    msg: " the audio exceeds 12 mb"
                })
            }
            videopathName = config.domain + '/public/audio/' + req.body.projectName + '.mp4'
        }
        console.log("req.body.imageData:", typeof(req.body.imageData))
        if (req.body.imageData != "null") {
            console.log("i am inside if")
            var imageBuffer = decodeBase64Image(req.body.imageData);
        }
        var rand2 = rn(options)

        if (req.body.isquestion == "true" || req.body.issueID == null) {
            issueID = rand2
        }
        else {
            issueID = req.body.issueID;
        }
        if (req.body.imageData != "null") {
            fs.writeFile('public/images/' + req.body.projectName + '.png', imageBuffer.data, function (err) {
                if (err) {
                    console.log("error : ", err)
                    return res.status(500).send({
                        success: 0,
                        msg: "some error occured while saving you idea. Please try again agter some time"
                    })
                }
            })
            var imgurl = config.domain + '/public/images/' + req.body.projectName + '.png';
        }
        else {
            var imgurl = config.domain + '/public/images/default.png'
        }
        var dateNow = new Date().toString()
        var rand = rn(options)
        database.db.oneOrNone('insert into projects(name,email, projectid,  date,textExplain ,issueid,isquestion, imgurl,videofilepath)' +
            'values(${name},${email}, ${projectid},${date},${textExplain},${issueid},${isquestion},${imgurl},${videofilepath})',
            {
                name: req.body.projectName,
                email: req.user.email,
                projectid: rand,
                date: dateNow,
                imgurl: imgurl,
                textExplain: req.body.textExplain,
                isquestion: req.body.isquestion,
                issueid: issueID,
                videofilepath: videopathName,
            }).then((respponse) => {
                console.log("saving project successfull")
                database.db.one('select * from projects where projectid = $1', rand)
                    .then(data => {
                        res.status(201).send({
                            success: 1,
                            data: data
                        })

                    })
            })
            .catch((err) => {
                console.log("error : ", err)
                res.status(500).send({ success: 0, msg: "some error occured while saving you idea. Please try again agter some time" })
            })
    }

exports.storeItems = function (req, res) {
    projectid = ""
    database.db.oneOrNone('select * from projects where name = $1', req.body.projectName)
        .then(data => {
            projectid = data.projectid
            database.db.oneOrNone('insert into canvitems (projectid,items)' + 'values(${projectid},${items})', {
                projectid: projectid,
                items: req.body.items
            }).then(data => {
                res.status(200).send({
                    success: 1,
                    msg: "data successfullt stored"
                })
            }).catch(err => {
                console.log("not success full... error : " + err)
                res.status(500).send({
                    success: 0,
                    msg: err
                })
            })
        }
        )
}



exports.retrieveItems = function (req, res) {
    database.db.oneOrNone('select * from canvitems  where projectid = $1', req.params.id)
        .then(data => {
            res.status(200).send({
                success: 1,
                msg: data
            })
        }).catch(err => {
            console.log("not success full... error : " + err)
            res.status(500).send({
                success: 0,
                msg: err
            })
        }
        )

}

exports.getAllProject = function (req, res) {
    database.db.manyOrNone('select * from projects')
        .then(data => {
            res.status(200).send({ success: 1, data: data })
        })
        .catch(error => {
            res.status(500).send({ success: 0, msg: error })
        })


}
exports.getProjectById = function (req, res) {

    database.db.manyOrNone('select * from projects where projectid = $1', req.params.id)
        .then(projects => {
            res.status(200).send({
                success: 1,
                data: projects
            })
        })
        .catch(error => {
            res.status(500).send({
                sucess: 0,
                msg: error
            })
        })
}


exports.getAllProjectByIssue = function (req, res) {
    database.db.manyOrNone('select * from projects where issueid = $1', req.params.issueid)
        .then(projects => {

            if (projects) {
                res.status(200).send({
                    success: 1,
                    data: projects
                })
            }

        })
}



function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    return response;
}

