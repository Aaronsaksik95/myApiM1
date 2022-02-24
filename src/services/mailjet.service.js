const config = require('../configs/mailjet.config')
const mailjet = require('node-mailjet')
    .connect(config.key1, config.key2)

exports.sendMailSub = (mailTo, sub) => {
    var message = "";
    sub ? message = "60" : message = "30"
    const request = mailjet
        .post("send", { 'version': 'v3.1' })
        .request({
            "Messages": [
                {
                    "From": {
                        "Email": "aaron.saksik@ynov.com",
                        "Name": "Netflix"
                    },
                    "To": [
                        {
                            "Email": mailTo,
                            "Name": "User"
                        }
                    ],
                    "Subject": "Abonnement Netflix",
                    "TextPart": "Mail validation d'abonnement",
                    "HTMLPart": `<h3>Félicitation pour votre abonnement à ${message}€ par mois sans engagement chez Netflix !</h3><br /> <h4>Vous pouvez désormais regarder vos films préférés en ilimité.<a href='https://my-next-m1.vercel.app/browse'> Notre catalogue</a><h4>`,
                    "CustomID": "AppGettingStartedTest"
                }
            ]
        })
    request
        .then((result) => {
            console.log(result.body)
        })
        .catch((err) => {
            console.log(err.statusCode)
        })
}

exports.sendMailUnsub = (mailTo) => {
    const request = mailjet
        .post("send", { 'version': 'v3.1' })
        .request({
            "Messages": [
                {
                    "From": {
                        "Email": "aaron.saksik@ynov.com",
                        "Name": "Netflix"
                    },
                    "To": [
                        {
                            "Email": mailTo,
                            "Name": "User"
                        }
                    ],
                    "Subject": "Désabonnement Netflix",
                    "TextPart": "Mail validation de désabonnement",
                    "HTMLPart": `<h3>Nous sommes tellement triste de vous voir partir !</h3><br /> <h4>Vous pouvez toutefois revenir quand vous voulez.<a href='https://my-next-m1.vercel.app/'> Inscription</a><h4>`,
                    "CustomID": "AppGettingStartedTest"
                }
            ]
        })
    request
        .then((result) => {
            console.log(result.body)
        })
        .catch((err) => {
            console.log(err.statusCode)
        })
}

exports.sendMailSignup = (mailTo) => {
    const request = mailjet
        .post("send", { 'version': 'v3.1' })
        .request({
            "Messages": [
                {
                    "From": {
                        "Email": "aaron.saksik@ynov.com",
                        "Name": "Netflix"
                    },
                    "To": [
                        {
                            "Email": mailTo,
                            "Name": "User"
                        }
                    ],
                    "Subject": "Inscription Netflix",
                    "TextPart": "Mail validation d'inscription",
                    "HTMLPart": "<h3>Félicitation pour votre inscription chez Netflix !</h3><br /> <h4>Vous pouvez désormais continuer en choisissant votre abonnement .<a href='https://my-next-m1.vercel.app/signup/planform'> Abonnement</a><h4>",
                    "CustomID": "AppGettingStartedTest"
                }
            ]
        })
    request
        .then((result) => {
            console.log(result.body)
        })
        .catch((err) => {
            console.log(err.statusCode)
        })
}
