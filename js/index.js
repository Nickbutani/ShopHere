const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendAMessage = (data, callback) => {
    console.log(data, "input data");
    client.messages
    .create({
       body: "Amount:" + data.amount + " Action:" + data.action + " From:" + data.member + " OTP:" + data.otp,
       from: process.env.MY_NUMBER,
       to: data.to
     })
    .then(message => {
        console.log(message.sid);
        callback(200, {msid:true});
    });
}

module.exports.sendAMessage = sendAMessage
