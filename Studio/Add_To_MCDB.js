// *NOTE* - CUSTOM FIELDS WILL NEED TO BE DEFINED IN SENDGRID FIRST. FIELD ID'S MAY NEED TO BE UPDATED.
exports.handler = function(context, event, callback) {
    var got = require('got');
    var uri = "https://api.sendgrid.com/v3/marketing/contacts";
    var fname = event.fname;
    var phone = event.phone;
    var email = event.email;
    var lname = event.lname;
    var preference = event.preference;
    console.log(fname + phone);
    var payload = "{\"contacts\": [{\"email\": \"" + email + "\", \"custom_fields\": {\"<<FNAME CUSTOM FIELD ID>>\": \"" + fname + "\", \"<<LNAME CUSTOM FIELD ID>>\": \"" + lname + "\", \"<<PHONE CUSTOM FIELD ID>>\": \"" + phone + "\", \"<<PREFERENCE CUSTOM FIELD ID>>\": \"" + preference + "\"} }] }";
    console.log("Payload: " + payload);
    got.put(uri, {
    body: payload,
    headers: {
       'accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': `Bearer ${context.SENDGRID_API_KEY}`
            },
            json: false
            }).then(function(response) {
               console.log(response.body);
               //json_response = JSON.parse(response);
               callback(null, response);
            }).catch(function(error) {
               console.log("mail send error "+ email);
                callback(error);
            });
};
