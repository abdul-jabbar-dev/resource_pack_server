const nodemailer = require('nodemailer')
const googleapis = require('googleapis')

const authClient = new googleapis.google.auth.OAuth2(
    "545023828402-19ecvgre7l7lj1pbc9qatgpnoopkc4pk.apps.googleusercontent.com",
    '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',
    'https://developers.google.com/oauthplayground') 
authClient.setCredentials({ refresh_token: "1//04yUqw38ygD9xCgYIARAAGAQSNwF-L9IrJH2sIJW6ibGdAe5w1HUa52_XnLezeMTwGTyy0GwhxlkXWuYNItmk6r_lYOx70ISytKg" })

module.exports.sendMailByGmail = async (data) => {
    const accessToken = (await authClient.getAccessToken()).token 
    let transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            type:"OAuth2",
            user: 'abduljabber1532002@gmail.com',//sender email
            clientId: "545023828402-19ecvgre7l7lj1pbc9qatgpnoopkc4pk.apps.googleusercontent.com",
            clientSecret: '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',
            accessToken:accessToken
        }
    })
    const mailData ={
        from: 'abduljabber1532002@gmail.com',//sender email
        to: data.email,//recever email
        subject:data.subject,
        text:data.body
    } 
    let sended = await  transporter.sendMail(mailData)
    return sended
}