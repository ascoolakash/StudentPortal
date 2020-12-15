const express = require('express');
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken')
const app = express();
const fileUpload = require('express-fileupload');
const path = require('path');
const db = require("./db");
const collection = "user";
const cookieParser = require('cookie-parser');
const randomstring = require('randomstring');
var cors = require('cors');
const multer = require('multer');
const flash = require('connect-flash');
//const fs = require('fs');
const SECRETKEY = "myClientSecret"

// encryption
const bcrypt = require('bcrypt')
const saltRounds=10
module.exports = app;
//var upload = multer();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use(fileUpload());
app.use(flash());
const { sendEmail } = require('./mail');
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
 var storage=multer.diskStorage({
     destination:function(req,file,cb){
         cb(null,'./uploads/')
     },
     filename:function(req,file,cb){
         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
     }
 })

var upload= multer({
    storage:storage
})

const verifyTheToken = (req, res, next) => {
    // getting the token from the header
    const bearer = req.headers["authorization"];
    console.log("To check bearer value"+bearer)
    if(bearer){
        const bearerToken = bearer.split(" ");
        //console.log("To check bearerToken value"+bearerToken);
        const token = bearerToken[1];
        //console.log("To check token value"+token);
        const string = JSON.stringify(token);
        //console.log("String             :"+string)
        const realToken = token.split(":");
        const realtokenValue = realToken[1];
        const realToken1 = realtokenValue.split("}");
        const realtokenValue1 = realToken1[0];
        
        //console.log(realtokenValue1);
        var decode = jwt.verify(JSON.parse(realtokenValue1) , SECRETKEY);
        //console.log("JWT verification"+ decode);
        //console.log("JWT verification"+ decode.user.userType);
        jwt.verify(JSON.parse(realtokenValue1) , SECRETKEY, (err, data) => {
           // console.log("in verify condition")
            if(err){
                console.log(err) 
             //   console.log("In verify error condition")
                res.sendStatus(403)
            }else{
                const str = JSON.stringify(data);
                console.log("data present in verification data"+str)
                req.userData = data
                const str1 = JSON.stringify(req.userData);  
                console.log("data present in verification data"+str1)
                next()
            }
        })
    }else{
        res.sendStatus(403)
    }
}


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});



app.get('/api/project', verifyTheToken,(req, res) => {
    console.log("TRTYU");
    db.getDB().collection("projects").find({}).toArray((err, documents) => {
        if (err) {
        console.log("ytrtyu");
            console.log(err);}
        else {
            console.log("REFER");
            console.log(documents);
            res.json(documents);
        }
    });
});

app.get('/api/team', verifyTheToken,(req, res) => {
    console.log("TRTYU");
    db.getDB().collection("team").find({}).toArray((err, documents) => {
        if (err) {
        console.log("ytrtyu");
            console.log(err);}
        else {
            console.log("REFER");
            console.log(documents);
            res.json(documents);
        }
    });
});

app.get('/api/coordinator', verifyTheToken,(req, res) => {
    console.log("TRTYU");
    db.getDB().collection("coordinator").find({}).toArray((err, documents) => {
        if (err) {
        console.log("ytrtyu");
            console.log(err);}
        else {
            console.log("REFER");
            console.log(documents);
            res.json(documents);
        }
    });
});
app.get('/api/faculty', verifyTheToken,(req, res) => {
    console.log("TRTYU");
    db.getDB().collection("faculty").find({}).toArray((err, documents) => {
        if (err) {
        console.log("ytrtyu");
            console.log(err);}
        else {
            console.log("REFER");
            console.log(documents);
            res.json(documents);
        }
    });
});
// app.put('/:id',(req,res)=>{
//     const todoID =req.params.id;
//     const userInput = req.body;

//     db.getDB().collection(collection).findOneAndUpdate({_id : db.getPrimarykey(todoID)},{$set : {todo : userInput.todo}},{returnOriginal : false},(err,result)=>{
//         if(err)
//             console.log(err);
//         else
//             res.json(result);
//     });
// });


// insert user in the user table *** sign up***
app.post('/api/Componentfrom', (req, res) => {

    bcrypt.hash(req.body.password, saltRounds, function(err,hash){
    var data = req.body
    console.log(data.firstname);
    var doc = [{
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        password: hash,
        studentId: data.studentId
    }];
    db.getDB().collection("Student").insertMany(doc, (err, result) => {
        if (err)
            console.log(err);
        else
            res.json('User Created');
            
    })
    });
});

app.post('/api/projectInsert', verifyTheToken,(req, res) => {
    console.log("hi there it's for testing")
    //bcrypt.hash(req.body.password, saltRounds, function(err,hash){
    var data = req.body
    console.log(data.projectname);
    var doc = [{
 
        projectname:data.projectname,
        semester:data.semester,
        year:data.year, 
        projectdetails:data.projectdetails,
        coordinator:data.coordinator
    }];
    console.log(data);
    db.getDB().collection("projects").insertMany(doc, (err, result) => {
        if (err)
            console.log(err);
        else
            res.json('User Created');
            
    })
    });
    app.post('/api/addProject', verifyTheToken,(req, res) => {
        console.log("hi there it's for testing")
        //bcrypt.hash(req.body.password, saltRounds, function(err,hash){
        var data = req.body
        console.log(data);
        var doc = [{
            studentemail:data.studentemail,
            projectname:data.projectname,
            semester:data.semester,
            year:data.year, 
            projectdetails:data.projectdetails,
            coordinator:data.coordinator
        }];
        console.log(data);
        db.getDB().collection("student_project").insertMany(doc, (err, result) => {
            if (err)
                console.log(err);
            else
                res.json('User Created');
                
        })
        });
    
    
    app.post('/api/teamInsert', verifyTheToken,(req, res) => {
        console.log("hi there it's for testing")
        //bcrypt.hash(req.body.password, saltRounds, function(err,hash){
        var data = req.body
        console.log(data.studentname);
        console.log(data)
        var doc = [{
     
            studentname:data.studentname,
            semester:data.semester,
            year:data.year, 
            workAssigned:data.workAssigned,
            coordinator:data.coordinator,
            role:data.role
        }];
        console.log(data);
        db.getDB().collection("team").insertMany(doc, (err, result) => {
            if (err)
                console.log(err);
            else
                res.json('User Created');
                
        })
        });

        app.post('/api/coordinatorInsert', verifyTheToken,(req, res) => {
            console.log("hi there it's for testing")
            //bcrypt.hash(req.body.password, saltRounds, function(err,hash){
            var data = req.body
            console.log(data.studentname);
            console.log(data)
            var doc = [{
                coordinator_name:data.coordinator_name,
                project_name:data.project_name,
                project_details:data.project_details,
                semester:data.semester,
                year:data.year, 
        }];
            console.log(data);
            db.getDB().collection("coordinator").insertMany(doc, (err, result) => {
                if (err)
                    console.log(err);
                else
                    res.json('User Created');
                    
            })
            });
            app.post('/api/facultyInsert', verifyTheToken,(req, res) => {
                //console.log("hi there it's for testing")
                //bcrypt.hash(req.body.password, saltRounds, function(err,hash){
                var data = req.body
                //console.log(data.studentname);
                const secretToken = randomstring.generate();
                //console.log(data)
                var doc = [{
                    faculty_name:data.faculty_name,
                    faculty_email:data.faculty_email,
                    faculty_password : secretToken,
                    faculty_dept:data.faculty_dept,
                    coordinator_email:data.coordinator_email,
                }];
                console.log(data);
                db.getDB().collection("faculty").insertMany(doc, (err, result) => {
                    if (err)
                        console.log(err);
                    else{
                        sendEmail(data.faculty_email, doc, "updatePassword")
                        res.json('User Created');
                    }
                        
                })
                });
          

// Sign in check user is present if yes then login
app.post('/api/Login', (req, res) => {
    console.log("ereeer1");
    var data = req.body
    // var doc = {
    //     email: data.email,
    //     password: data.password,
    // };
    console.log(data)
    console.log(data.email)
    db.getDB().collection("Student").findOne({email:data.email},function(err, result) {
        if (err)
            console.log(err);
        else{
            //console.log(result.password)
            //console.log("Akash"+result);
            //console.log(result.password);
            //console.log("AKASH SAURABH"+result.email);
            var email = result.email;
            //console.log("AKASH SAURABH"+result.userType);
            var userType = result.userType;
            //console.log("AKASH SAURABH"+result.joingroup);
	    bcrypt.compare(req.body.password,result.password,function(err,result){
                if(result===true){
                    const user = {
                        email
                    }
                    jwt.sign({user}, SECRETKEY, (err, token) => {
                        if(err){
                            res.sendStatus(403)
                        }else{
                            res.json({
                                token
                            })
                        }
                    })
                    //res.json(true)
                    //console.log("LOGGED IN")
                } else{
                    console.log("incorrect password")
                    res.json("false")
                    console.log(result)
                }
            });
        }   
    });
});


// Sign in check coordinator is present if yes then login
app.post('/api/LoginCoordinator', (req, res) => {
    console.log("ereeer1");
    var data = req.body
    // var doc = {
    //     email: data.email,
    //     password: data.password,
    // };
    console.log(data)
    console.log(data.email)
    db.getDB().collection("Coordinator").findOne({coordinatorEmail:data.email},function(err, result) {
        if (err)
            console.log(err);
        else{
            var email = result.coordinatorEmail;
            const str = JSON.stringify(result);
            //console.log("AKASH SAURABH"+str);
	    bcrypt.compare(req.body.password,result.password,function(err,result){
                if(result===true){
                    const user = {
                        email
                    }
                    jwt.sign({user}, SECRETKEY, (err, token) => {
                        if(err){
                            res.sendStatus(403)
                        }else{
                            res.json({
                                token
                            })
                        }
                    })
                    //res.json(true)
                    //console.log("LOGGED IN")
                } else{
                    console.log("incorrect password")
                    res.json("false")
                    console.log(result)
                }
            });
        }   
    });
});
// Sign in check coordinator is present if yes then login
app.post('/api/LoginFaculty', (req, res) => {
    console.log("ereeer1");
    var data = req.body
    // var doc = {
    //     email: data.email,
    //     password: data.password,
    // };
    console.log(data)
    console.log(data.email)
    db.getDB().collection("faculty").findOne({faculty_email:data.email},function(err, result) {
        if (err)
            console.log(err);
        else{
            var email = result.faculty_email;
            const str = JSON.stringify(result);
            //console.log("AKASH SAURABH"+str);
	    bcrypt.compare(req.body.password,result.faculty_password,function(err,result){
                if(result===true){
                    const user = {
                        email
                    }
                    jwt.sign({user}, SECRETKEY, (err, token) => {
                        if(err){
                            res.sendStatus(403)
                        }else{
                            res.json({
                                token
                            })
                        }
                    })
                    //res.json(true)
                    //console.log("LOGGED IN")
                } else{
                    console.log("incorrect password")
                    res.json("false")
                    console.log(result)
                }
            });
        }   
    });
});

// Sign in check user is present if yes then login
app.post('/api/checkSecretToken', (req, res) => {
    console.log("ereeer1");
    var data = req.body
    // var doc = {
    //     email: data.email,
    //     password: data.password,
    // };
    console.log(data)
    db.getDB().collection('faculty').findOne({faculty_password:data.SecretToken},function(err, result) {
        if (err)
            console.log(err);
        else{
            //console.log(result.password)
            //console.log("Akash"+result);
            //console.log(result.password);
            //console.log("AKASH SAURABH"+result.email);
           // var SecretToken = result.faculty_password;
            //console.log("AKASH SAURABH"+result.userType);
            //var userType = result.userType;
            //console.log("AKASH SAURABH"+result.joingroup);
	   // bcrypt.compare(req.body.SecretToken,result.SecretToken,function(err,result){
           console.log(result);
           console.log(req.body.password)
           //console.log(req.body.SecretToken+"           "+result.faculty_password)
           if(result){
                if(req.body.SecretToken===result.faculty_password){
                    console.log("In the if condition")
                    bcrypt.hash(req.body.password, saltRounds, function(err,hash){
                        db.getDB().collection('faculty').updateOne({"faculty_password": result.faculty_password}, {$set: {'faculty_password':hash}}, function(err, result){
                            //  assert.equal(null, err);
                            //res.json('Password Updated');
                    
                            res.json("updated")
                              console.log('Item updated'+result);
                           });
                    });
                    //res.json(true)
                    //console.log("LOGGED IN")
                } else{
                    console.log("incorrect password")
                    res.json("false")
                    console.log(result)
                }
           }else{
            console.log("Secret Token does not match, Please check the secret token")
            //req.flash('error', 'Sorry, Please check the secret token');
            res.json("Secret Token does not match, Please check the secret token")
            console.log(result)
           }
         //   });
        }   
    });
});


//To save design need project data to database
app.post('/api/design_need', (req, res) => {
    var data = req.body
    //var file = req.files.file
   // console.log(file)
    console.log(req.files);
    
   // var pdf = fs.readFileSync(data.file.path);
    console.log("iam here")
   // var encode_pdf = pdf.toString('base64');
    console.log("Akash");
    var doc = [{
        statement: data.projectStatement,
        stakeholders: data.stakeholders,
        information: data.information,
        informationgathering: data.informationgathering,
        designBrief:data.designBrief,
        outcome:data.outcome,
        //informationgathering: informationgathering,npm
        //file: data.file,
        //contentType:req.file.mimetype,
        //path:req.file.path,
        pdf: req.files
        //pdf: new Buffer(encode_pdf,'base64'),
        //Review:data.Review
    }];
    console.log(doc)
    db.getDB().collection("design_need").insertMany(doc, (err, result) => {
        if (err)
            console.log(err);
        else
            res.json('data inserted');
            
    })
});


// To save project planning data to databae
app.post('/api/project_planning', (req, res) => {
    var data = req.body
    //var file = req.files.file
   // console.log(file)
    console.log(req.files);
    
   // var pdf = fs.readFileSync(data.file.path);
    console.log("iam here")
   // var encode_pdf = pdf.toString('base64');
    console.log("Akash");
    var doc = [{
        designTeam: data.designTeam,
        developTasks: data.developTasks,
        marketResearch: data.marketResearch,
        estimatedCost: data.estimatedCost,
        pdf: req.files
        //pdf: new Buffer(encode_pdf,'base64'),
        //Review:data.Review
    }];
    console.log(doc)
    db.getDB().collection("project_planning").insertMany(doc, (err, result) => {
        if (err)
            console.log(err);
        else
            res.json('data inserted');
            
    })
});

// To save design requirement data to databae
app.post('/api/design_requirement', (req, res) => {
    var data = req.body
    //var file = req.files.file
   // console.log(file)
    console.log(req.files);
    //customerReq, OFDpro, EngReq, pdf_customerReq, pdf_OFDprocess, pdf_EngReq
   // var pdf = fs.readFileSync(data.file.path);
    console.log("iam here")
   // var encode_pdf = pdf.toString('base64');
    console.log("Akash");
    var doc = [{
        customerReq: data.customerReq,
        OFDpro: data.OFDpro,
        EngReqmarketResearch: data.EngReq,
        pdf: req.files
        //pdf: new Buffer(encode_pdf,'base64'),
        //Review:data.Review
    }];
    console.log(doc)
    db.getDB().collection("design_requirement").insertMany(doc, (err, result) => {
        if (err)
            console.log(err);
        else
            res.json('data inserted');
            
    })
});

//To save design concepts data to database
app.post('/api/design_concepts', (req, res) => {
    var data = req.body
    //var file = req.files.file
   // console.log(file)
    console.log(req.files);
    
   // var pdf = fs.readFileSync(data.file.path);
    console.log("iam here")
   // var encode_pdf = pdf.toString('base64');
   //, , , , , pdf_functionalrequirement, pdf_brainstroming, pdf_experts, pdf_patents, pdf_refernce};
    console.log("Akash");
    var doc = [{
        functionalrequirement: data.functionalrequirement,
        brainstroming: data.brainstroming,
        experts: data.experts,
        patents: data.patents,
        refernce:data.refernce,
        pdf: req.files
    }];
    console.log(doc)
    db.getDB().collection("design_concepts").insertMany(doc, (err, result) => {
        if (err)
            console.log(err);
        else
            res.json('data inserted');
            
    })
});

//To save design concepts data to database
app.post('/api/detail_design_evaluation', (req, res) => {
    var data = req.body
    //var file = req.files.file
   // console.log(file)
    console.log(req.files);
    
   // var pdf = fs.readFileSync(data.file.path);
    console.log("iam here")
   // var encode_pdf = pdf.toString('base64');
   //, , , , , pdf_functionalrequirement, pdf_brainstroming, pdf_experts, pdf_patents, pdf_refernce};
    console.log("Akash");
    var doc = [{
        designstandard: data.designstandard,
        pdf: req.files
    }];
    console.log(doc)
    db.getDB().collection("detail_design_evaluation").insertMany(doc, (err, result) => {
        if (err)
            console.log(err);
        else
            res.json('data inserted');
            
    })
});

//To save design concepts data to database
app.post('/api/design_evaluation_and_communication', (req, res) => {
    var data = req.body
    //var file = req.files.file
   // console.log(file)
    console.log(req.files);
    
   // var pdf = fs.readFileSync(data.file.path);
    console.log("iam here")
   // var encode_pdf = pdf.toString('base64');
   //, , , , , pdf_functionalrequirement, pdf_brainstroming, pdf_experts, pdf_patents, pdf_refernce};
    console.log("Akash");
    var doc = [{
        SpecifyingCommunicatingFinalDesign: data.SpecifyingCommunicatingFinalDesign,
        ImplementingDesignDecision: data.ImplementingDesignDecision,
        VerifyingEvaluatingDesign: data.VerifyingEvaluatingDesign,
        DesignStrategy: data.DesignStrategy,
        pdf: req.files
    }];
    console.log(doc)
    db.getDB().collection("design_evaluation_and_communication").insertMany(doc, (err, result) => {
        if (err)
            console.log(err);
        else
            res.json('data inserted');
            
    })
});

  app.post('/api/update',(req, res)=> {
    console.log("baba is here")
    console.log(req.body)
    var item = {
        projectname: req.body.name,
        semester: req.body.Semester,
        year: req.body.Year,
        projectdetails: req.body.Description,
        coordinator: req.body.Mentor
    };
    var id = req.body.id;
    //assert.equal(null, err);
      db.getDB().collection('projects').updateOne({"_id": objectId(id)}, {$set: item}, function(err, result){
      //  assert.equal(null, err);
      res.json("updated")
        console.log('Item updated');
     });

  });
  app.post('/api/teamUpdate',(req, res)=> {
    console.log("baba is here")
    console.log(req.body)
    var item = {
        studentname: req.body.studentname,
        semester: req.body.semester,
        year: req.body.year,
        workAssigned: req.body.workAssigned,
        coordinator: req.body.coordinator,
        role:req.body.role
    };
    var id = req.body.id;
    //assert.equal(null, err);
      db.getDB().collection('team').updateOne({"_id": objectId(id)}, {$set: item}, function(err, result){
      //  assert.equal(null, err);
      res.json("updated")
        console.log('Item updated');
     });

  });

  app.post('/api/coordinatorUpdate',(req, res)=> {
    console.log("baba is here")
    console.log(req.body)
    var data = req.body
    var item = {
        coordinator_name:data.coordinator_name,
        project_name:data.project_name,
        project_details:data.project_details,
        semester:data.semester,
        year:data.year, 
    };
    var id = req.body.id;
    //assert.equal(null, err);
      db.getDB().collection('coordinator').updateOne({"_id": objectId(id)}, {$set: item}, function(err, result){
      //  assert.equal(null, err);
      res.json("updated")
        console.log('Item updated');
     });

  });
  app.post('/api/facultyUpdate',(req, res)=> {
    console.log("baba is here")
    console.log(req.body)
    var data = req.body
    var item = {
        faculty_name:data.faculty_name,
        faculty_email:data.faculty_email,
        faculty_dept:data.faculty_dept,
        coordinator_email:data.coordinator_email
    };
    var id = req.body.id;
    //assert.equal(null, err);
      db.getDB().collection('faculty').updateOne({"_id": objectId(id)}, {$set: item}, function(err, result){
      //  assert.equal(null, err);
      res.json("updated")
        console.log('Item updated');
     });

  });
  app.post('/api/Delete',(req, res)=> {
    console.log(req.body)
    // var item = {
    //     projectname: req.body.name,
    //     semester: req.body.Semester,
    //     year: req.body.Year,
    //     projectdetails: req.body.Description,
    //     coordinator: req.body.Mentor
    // };
    var id = req.body.id;
    //assert.equal(null, err);
      db.getDB().collection('projects').deleteOne({"_id": objectId(id)}, function(err, result) {
      //  assert.equal(null, err);
      res.json("deleted")
        console.log('Item updated');
     });
  });

  app.post('/api/teamDelete',(req, res)=> {
    console.log(req.body)
    // var item = {
    //     projectname: req.body.name,
    //     semester: req.body.Semester,
    //     year: req.body.Year,
    //     projectdetails: req.body.Description,
    //     coordinator: req.body.Mentor
    // };
    var id = req.body.id;
    //assert.equal(null, err);
      db.getDB().collection('team').deleteOne({"_id": objectId(id)}, function(err, result) {
      //  assert.equal(null, err);
      res.json("deleted")
        console.log('Item updated');
     });
  });

  app.post('/api/coordinatorDelete',(req, res)=> {
    console.log(req.body)
    // var item = {
    //     projectname: req.body.name,
    //     semester: req.body.Semester,
    //     year: req.body.Year,
    //     projectdetails: req.body.Description,
    //     coordinator: req.body.Mentor
    // };
    var id = req.body.id;
    //assert.equal(null, err);
      db.getDB().collection('coordinator').deleteOne({"_id": objectId(id)}, function(err, result) {
      //  assert.equal(null, err);
      res.json("deleted")
        console.log('Item updated');
     });
  });
  app.post('/api/facultyDelete',(req, res)=> {
    console.log(req.body)
    // var item = {
    //     projectname: req.body.name,
    //     semester: req.body.Semester,
    //     year: req.body.Year,
    //     projectdetails: req.body.Description,
    //     coordinator: req.body.Mentor
    // };
    var id = req.body.id;
    //assert.equal(null, err);
      db.getDB().collection('faculty').deleteOne({"_id": objectId(id)}, function(err, result) {
      //  assert.equal(null, err);
      res.json("deleted")
        console.log('Item updated');
     });
  });
// app.post('/api/project_planning, (req, res) => {
//     var data = req.body
//     console.log(data);
//     var doc = [{
//         statement: data.projectStatement,
//         stakeholders: data.stakeholders,
//         information: data.information,
//         informationgathering: informationgathering,
//         file: data.file,
//         designBrief:data.designBrief,
//         Review:data.Review
//     }];
//     db.getDB().collection("Design_need").insertMany(doc, (err, result) => {
//         if (err)
//             console.log(err);
//         else
//             res.json('data inserted');
            
//     })
// });
// app.delete('/:id', (req, res) => {
//     const todoID = req.params.id;
//     console.log(todoID);
//     db.getDB().collection(collection).findOneAndDelete({ _id: db.getPrimarykey(todoID) }, (err, result) => {
//         if (err) {
//             console.log(err);
//             console.log(id);
//         }
//         else
//             res.json(result);
//         console.log("data inserted");
//     });
// });

 

db.connect((err) => {
    if (err) {
        console.log(err);
        console.log('unable to connect to database');
        process.exit(1);
    }
    else {
        app.listen(() => {
            console.log('connected to db, app listening on port')
        });
    }
})