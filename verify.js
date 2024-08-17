const accountSid = 'AC2b0809af9f584ffa02803281bb673ca3';
const authToken = 'd01428445032b4480fc152ef510c3622';
const client = require('twilio')(accountSid, authToken);

client.verify.v2.services("VA7e45f4293d13f5be9161c6fdca2d5798")
      .verifications
      .create({to: '+918247364575', channel: 'sms'})
      .then(verification => console.log(verification.sid));