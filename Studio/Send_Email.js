exports.handler = function(context, event, callback) {
    var got = require('got');
    var uri = "https://api.sendgrid.com/v3/mail/send";
    var fname = event.fname;
    var email = event.email;
    var phone = event.phone;
    var email_pref = (event.email_pref == 'true');
    var sms_pref = !email_pref;
    console.log(fname + phone + sms_pref);
    var subject = "[YOUR SUBJECT]";
    var from = "[YOUR DOMAIN]";
    var payload = "{\"personalizations\": [{\"to\": [{\"email\": \"" + email + "\"}], \"dynamic_template_data\": {\"fname\": \"" + fname + "\", \"phone\": \"" + phone + "\", \"email_pref\": " + email_pref + ", \"sms_pref\": " + sms_pref + " } }], \"from\": {\"email\": \"[YOUR DOMAIN]\"}, \"template_id\": \"[YOUR TEMPLATE ID]\"}";
    console.log("Payload: " + payload);
    got.post(uri, {
    body: payload,
    headers: {
       'accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': `Bearer ${context.SENDGRID_API_KEY}`
            },
            json: false
            }).then(function(response) {
               console.log(response);
               //json_response = JSON.parse(response);
               callback(null, response);
            }).catch(function(error) {
               console.log("mail send error "+ email);
                callback(error);
            });
};
