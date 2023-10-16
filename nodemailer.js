const nodemailer = require("nodemailer");
const googleapis = require("googleapis");

const CLIENT_ID = `613244486459-kbehn20sp4tnf20qnr024pbj6sucjjnj.apps.googleusercontent.com`;
const CLIENT_SECRET = `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`;
const REFRESH_TOKEN = `1//04j7oEZWnH3TjCgYIARAAGAQSNwF-L9Ir9P1NGkUUWtFr-UxT7cCDImeiU9xiMczZIQXu6vZBABV5vcwWNwuZy5JLK3SwuQTkJQ8`;
const REDIRECT_URI = `https://developers.google.com/oauthplayground`;

const authClient = new googleapis.google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
authClient.setCredentials({refresh_token: REFRESH_TOKEN});

async function mailer(receiveremail, id, key){
    try{
        const ACCESS_TOKEN = await authClient.getAccessToken();

        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "harshu8545@gmail.com",
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: ACCESS_TOKEN
            }
        })
        const details = {
            from: "Harsh Sharma<harshu8545@gmail.com>",
            to: receiveremail,
            subject: "helllllllllllyyoooo",
            text: "kuchh kuchhh kuchhhhh",
            html: `hey you can recover your account by clicking following link <a href="http://localhost:3000/forgot/${id}/${key}">localhost:3000/forgot/${id}/${key}</a>`
        }

        const result = await transport.sendMail(details);
        return result;
    }
    catch(err){
        return err;
    }
}

module.exports = mailer;