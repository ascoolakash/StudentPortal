const db = require("./db");
const updatePassword = (data,name) => {
    //const securityToken;
    console.log("AKASH SAURABH SAS DAMN IMPORTANT"+data,name);
    //let anubhav = "";
    //const abc =  (db.getDB().collection('faculty').findOne({ faculty_email: data }).then(data => {return data}));
    //const str = JSON.stringify(abc);
    //console.log("AKASH SAURABH"+str);
    //console.log("Akash"+abc.faculty_password)
    //console.log("anubhav")
    //console.log(anubhav)
    //console.log(this.anubhav)
    const str = Object.assign({}, name);

    console.log("AKASH SAURABH"+typeof(str)+"        STR     "+str);
    const str1 = JSON.stringify(str);
    console.log("   New object   "+str1)
    console.log("Aah it's not working"+str[0].faculty_password)
    console.log("Aah it's not working"+str[0].faculty_name)
    //Promise.resolve(console.log(abc))
    return (
        
        `
      <!DOCTYPE html>
     <html style="margin: 0; padding: 0;">
     
         <head>
             <title>Hello</title> 
         </head>

             <body style="margin: 0; padding: 0;">
                Hi ${str[0].faculty_name},
                <br/>
                Please change your password on priority and copy the below secuirty code in the verifation holder. 
                <h1>${str[0].faculty_password}</h1>
                <br/><br/>

                <a href="http://localhost:3000/checkSecretKey">http://localhost:3000/checkSecretKey</a>
                <br/><br/>
                Have a pleasant day.
             </body>
     
       </html>
      `);
  };
  
  module.exports = { updatePassword };