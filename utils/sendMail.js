const nodeMailer = require('nodemailer');

const sendMail = async( options ) =>{

    const transporter = nodeMailer.createTransport({
        host : process.env.SMTP_HOST , 
        port : process.env.SMTP_PORT , 
        service : process.env.MAIL_SERVICE , 
        auth : {
            user : process.env.USER_EMAIL ,
            pass : process.env.USER_EMAIL_PASSWORD 
        } , 
    }) ; 

    const mailOptions = {
        from : process.env.USER_EMAIL , 
        to : options.email , 
        subject : options.subject ,
        text : options.message , 
    }

    await transporter.sendMail(mailOptions);
} 

module.exports = sendMail ; 