const express = require('express');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/api/form', (req, res) => {
    nodeMailer.createTestAccount((err, account) => {
        const htmlEmail = `
        <h3>Contact Details</h3>
        <ul>
            <li>Name: ${req.body.firstname} ${req.body.lastname}</li>
            <li>Email: ${req.body.email}</li>
            <li>Date: ${req.body.date}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
        `

        let transporter = nodeMailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'elsie.blick14@ethereal.email',
                pass: 'kS3z1gTXAQ18GNYXfK'
            }
        })

        let emailOption = {
            from: 'test@testaccount.com',
            to: 'elsie.blick14@ethereal.email',
            replyTo: 'test@testaccount.com',
            subject: 'New Message',
            text: req.body.message,
            html: htmlEmail
        }

        transporter.sendMail(emailOption, (err, info) => {
            if(err)
            {
                return console.log(err);
            }

            console.log('Message sent: %s', info.message);
            console.log('Message URL: %s', nodeMailer.getTestMessageURL(nfo));

        })
    })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server listening to PORT ${PORT}`)
})