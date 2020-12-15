const mailer = require("nodemailer");
const xoauth2 = require('xoauth2');
const { updatePassword } = require("./updatePassword");

const getEmailData = (to, name, template) => {
    let data = null;
    console.log("AKASH SAS "+to,name,template);
    switch (template) {
        case "updatePassword":
            data = {
                from: "Akash Saurabh<asakashcool487@gmail.com>",
                to,
                subject: `Priority : Update password ${to}`,
                html: updatePassword(to,name)
            }
            break; 

        case "thanks":
            data = {
                from: "John Ahn <jaewon@gmail.com>",
                to,
                subject: `Hello ${name}`,
                html: Thanks()
            }
            break;
        default:
            data;
    }
    return data;
}


const sendEmail = (to, name, type) => {

    const smtpTransport = mailer.createTransport({
        service: "gmail",
        port: 465,
        //secure: false, // upgrade later with STARTTLS
        auth: { 
            user: "asakash759@gmail.com",
            pass: "As@16091992"
        } 
    }) 

    const mail = getEmailData(to, name, type)

    smtpTransport.sendMail(mail, function(error, response) {
        if(error) {
            console.log(error)
        } else {
            console.log( " email sent successfully")
        }
        smtpTransport.close();
    })


}

module.exports = { sendEmail }