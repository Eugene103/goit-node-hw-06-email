import sgMail from '@sendgrid/mail'
import "dotenv/config"

const { SENDGRID_API_KEY, SENDGRID_FROM } = process.env

sgMail.setApiKey(SENDGRID_API_KEY)

const SendEmail = async (msg) => {
   await sgMail
    .send({...msg, from: SENDGRID_FROM})
       .then(() => {
    console.log('Email sent')
  })
  .catch((err) => {
    console.log(err)
  })
}


export default SendEmail
