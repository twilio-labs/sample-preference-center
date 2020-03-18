# Preference Center

This is a mock up preference center allowing your user to choose from two messaging types to receive communication from your brand. Additionally this will integrate with the Phone Number Lookup and Email Validation API to clean data entered by users.

## How It Works

![Entire Product Diagram Image](https://marketing-image-production.s3.amazonaws.com/uploads/91600c8dc918e70cd1cb3acb45f355685181829ab86e1a7060010fd667930941262d2a3586eefe58c57c75bc7213506fd24863a57d4800fb97ca86f9259f33c8.jpeg)

Users enter data on a webpage including first and last name, phone number, email address and contact preference (SMS or Email).

![Webpage Image](https://marketing-image-production.s3.amazonaws.com/uploads/59c8a2006ac2c79f64ca63df44c55ab6215ebbd2aca9e556b2ba1581fde127eccfca64128626dd0cc6d797a9db11fbfd238eab3b12ec05f82449ba17e73024e7.png)

This data, along with found data from Twilio API endpoints detailing the validity of the entered phone number and email address, is fed into a Studio Flow. This will determine how the users confirmation should be delivered and the appropriate content to send based on if this matched the users entered contact preference.

![Decision Tree Image](https://marketing-image-production.s3.amazonaws.com/uploads/5e71637166a44738d60ec9654bda258fa33b4cb086841c3c2f1708091b9cdb842301a6825dc4ad0f50a833c04b74e11210efcbc6ade1b957bc70121c69ee80a7.png)

## Twilio Products Used

- [Programmable SMS](https://www.twilio.com/docs/sms)
- [Email Validation API](https://sendgrid.com/solutions/email-validation-api/)
- [Lookup API](https://www.twilio.com/docs/lookup/api)
- [Studio](https://www.twilio.com/docs/studio)
- [Email API](https://sendgrid.api-docs.io/v3.0/mail-send/v3-mail-send)
- [Dynamic Transactional Templates](https://sendgrid.com/solutions/transactional-email-templates/)
- [Marketing Campaigns](https://sendgrid.com/solutions/email-marketing/)

## Set Up

### Prerequisites

- [SendGrid Mail Send API Key](https://app.sendgrid.com/settings/api_keys)
- [SendGrid Email Validation API Key](https://sendgrid.com/docs/ui/managing-contacts/email-address-validation/#generating-your-email-validation-api-key)
- [Twilio Authentication Token](https://www.twilio.com/console)
- [SMS capable Twilio Phone Number](https://www.twilio.com/console/phone-numbers/search)

### SendGrid console

- Create Transactional Template

  We will need to create the HTML content we plan to send to users - we will do this using SendGrid Dynamic Transactional Templates using these API calls:

  Create Template (replace `<<YOUR_API_KEY_HERE>>`):

  ```
  curl --request POST \
    --url https://api.sendgrid.com/v3/templates \
    --header 'authorization: Bearer <<YOUR_API_KEY_HERE>>' \
    --header 'content-type: application/json' \
    --data '{"name":"Preference_Center"}'
  ```

  **Save the returned ‘id’ parameter for later use**, including this API call (replace `<<YOUR_API_KEY_HERE>>` and `<<TEMPLATE_ID>>`):

  ```
  curl --request POST \
    --url https://api.sendgrid.com/v3/templates/<<TEMPLATE_ID>>/versions \
    --header 'authorization: Bearer <<YOUR_API_KEY_HERE>>' \
    --header 'content-type: application/json' \
    --data '{"active":1,"name":"v1","html_content":"<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\"><html data-editor-version=\"2\" class=\"sg-campaigns\" xmlns=\"http://www.w3.org/1999/xhtml\"><head>\r\n      <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\r\n      <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1\">\r\n      <!--[if !mso]><!-->\r\n      <meta http-equiv=\"X-UA-Compatible\" content=\"IE=Edge\">\r\n      <!--<![endif]-->\r\n      <!--[if (gte mso 9)|(IE)]>\r\n      <xml>\r\n        <o:OfficeDocumentSettings>\r\n          <o:AllowPNG/>\r\n          <o:PixelsPerInch>96</o:PixelsPerInch>\r\n        </o:OfficeDocumentSettings>\r\n      </xml>\r\n      <![endif]-->\r\n      <!--[if (gte mso 9)|(IE)]>\r\n  <style type=\"text/css\">\r\n    body {width: 600px;margin: 0 auto;}\r\n    table {border-collapse: collapse;}\r\n    table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}\r\n    img {-ms-interpolation-mode: bicubic;}\r\n  </style>\r\n<![endif]-->\r\n      <style type=\"text/css\">\r\n    body, p, div {\r\n      font-family: arial,helvetica,sans-serif;\r\n      font-size: 14px;\r\n    }\r\n    body {\r\n      color: #ffffff;\r\n    }\r\n    body a {\r\n      color: #42ee99;\r\n      text-decoration: none;\r\n    }\r\n    p { margin: 0; padding: 0; }\r\n    table.wrapper {\r\n      width:100% !important;\r\n      table-layout: fixed;\r\n      -webkit-font-smoothing: antialiased;\r\n      -webkit-text-size-adjust: 100%;\r\n      -moz-text-size-adjust: 100%;\r\n      -ms-text-size-adjust: 100%;\r\n    }\r\n    img.max-width {\r\n      max-width: 100% !important;\r\n    }\r\n    .column.of-2 {\r\n      width: 50%;\r\n    }\r\n    .column.of-3 {\r\n      width: 33.333%;\r\n    }\r\n    .column.of-4 {\r\n      width: 25%;\r\n    }\r\n    @media screen and (max-width:480px) {\r\n      .preheader .rightColumnContent,\r\n      .footer .rightColumnContent {\r\n        text-align: left !important;\r\n      }\r\n      .preheader .rightColumnContent div,\r\n      .preheader .rightColumnContent span,\r\n      .footer .rightColumnContent div,\r\n      .footer .rightColumnContent span {\r\n        text-align: left !important;\r\n      }\r\n      .preheader .rightColumnContent,\r\n      .preheader .leftColumnContent {\r\n        font-size: 80% !important;\r\n        padding: 5px 0;\r\n      }\r\n      table.wrapper-mobile {\r\n        width: 100% !important;\r\n        table-layout: fixed;\r\n      }\r\n      img.max-width {\r\n        height: auto !important;\r\n        max-width: 100% !important;\r\n      }\r\n      a.bulletproof-button {\r\n        display: block !important;\r\n        width: auto !important;\r\n        font-size: 80%;\r\n        padding-left: 0 !important;\r\n        padding-right: 0 !important;\r\n      }\r\n      .columns {\r\n        width: 100% !important;\r\n      }\r\n      .column {\r\n        display: block !important;\r\n        width: 100% !important;\r\n        padding-left: 0 !important;\r\n        padding-right: 0 !important;\r\n        margin-left: 0 !important;\r\n        margin-right: 0 !important;\r\n      }\r\n    }\r\n  </style>\r\n      <!--user entered Head Start-->\r\n    \r\n     <!--End Head user entered-->\r\n    </head>\r\n    <body>\r\n      <center class=\"wrapper\" data-link-color=\"#42ee99\" data-body-style=\"font-size:14px; font-family:arial,helvetica,sans-serif; color:#ffffff; background-color:#000000;\">\r\n        <div class=\"webkit\">\r\n          <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" width=\"100%\" class=\"wrapper\" bgcolor=\"#000000\">\r\n            <tbody><tr>\r\n              <td valign=\"top\" bgcolor=\"#000000\" width=\"100%\">\r\n                <table width=\"100%\" role=\"content-container\" class=\"outer\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\r\n                  <tbody><tr>\r\n                    <td width=\"100%\">\r\n                      <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\r\n                        <tbody><tr>\r\n                          <td>\r\n                            <!--[if mso]>\r\n    <center>\r\n    <table><tr><td width=\"600\">\r\n  <![endif]-->\r\n                                    <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width:100%; max-width:600px;\" align=\"center\">\r\n                                      <tbody><tr>\r\n                                        <td role=\"modules-container\" style=\"padding:0px 0px 0px 0px; color:#ffffff; text-align:left;\" bgcolor=\"#000000\" width=\"100%\" align=\"left\"><table class=\"module preheader preheader-hide\" role=\"module\" data-type=\"preheader\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;\">\r\n    <tbody><tr>\r\n      <td role=\"module-content\">\r\n        <p>Show What You Know!</p>\r\n      </td>\r\n    </tr>\r\n  </tbody></table><table class=\"module\" role=\"module\" data-type=\"spacer\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\" data-muid=\"icX5PBWtGGjcdoUuHWNuAe\">\r\n      <tbody><tr>\r\n        <td style=\"padding:0px 0px 20px 0px;\" role=\"module-content\" bgcolor=\"#000000\">\r\n        </td>\r\n      </tr>\r\n    </tbody></table><table class=\"wrapper\" role=\"module\" data-type=\"image\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\" data-muid=\"r3azsJ2DW4XzUUq2Nv7PyU\">\r\n      <tbody><tr>\r\n        <td style=\"font-size:6px; line-height:10px; padding:30px 0px 30px 0px; background-color:#000000;\" valign=\"top\" align=\"center\">\r\n          <img class=\"max-width\" border=\"0\" style=\"display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:50% !important; width:50%; height:auto !important;\" src=\"https://marketing-image-production.s3.amazonaws.com/uploads/ec77ef33b95b4cb71b77f85ff3f632b501dba916e30cd5bf00c4c51bc0ceeb606668f7ae5bd99f9c95fb4fa20ba910aaafeb9724ceb0289c441a541bec24858e.png\" alt=\"SongRiddle\" width=\"300\" data-responsive=\"true\" data-proportionally-constrained=\"true\">\r\n        </td>\r\n      </tr>\r\n    </tbody></table><table class=\"module\" role=\"module\" data-type=\"text\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\" data-mc-module-version=\"2019-10-22\" data-muid=\"M3mPiFK3RGkXt2qQHXCmn\">\r\n      <tbody><tr>\r\n        <td style=\"background-color:#000000; padding:10px 20px 10px 20px; line-height:40px; text-align:justify;\" height=\"100%\" valign=\"top\" bgcolor=\"#000000\"><div><h1 style=\"text-align: center\"><span style=\"color: #ffffff; font-size: 28px; font-family: verdana, geneva, sans-serif\"><strong>Welcome to SongRiddle!</strong></span></h1><div></div></div></td>\r\n      </tr>\r\n    </tbody></table><table class=\"wrapper\" role=\"module\" data-type=\"image\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\" data-muid=\"ksVBJnBbgyGdyvheu64zMJ\">\r\n      <tbody><tr>\r\n        <td style=\"font-size:6px; line-height:10px; padding:0px 0px 0px 0px; background-color:#000000;\" valign=\"top\" align=\"center\">\r\n          <img class=\"max-width\" border=\"0\" style=\"display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:100% !important; width:100%; height:auto !important;\" src=\"https://marketing-image-production.s3.amazonaws.com/uploads/c4f7e550ea6e1dc8618193f5d31ae9c2aba8f542a5c7b20de199ef019965e396a34356c8181ce010e4a180058e1309fb033edd29246b3820fa2126343c17292c.png\" alt=\"\" width=\"600\" data-responsive=\"true\" data-proportionally-constrained=\"true\">\r\n        </td>\r\n      </tr>\r\n    </tbody></table><table class=\"module\" role=\"module\" data-type=\"text\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\" data-mc-module-version=\"2019-10-22\" data-muid=\"k6iikcA9hyEPkdC9BooF2S\">\r\n      <tbody><tr>\r\n        <td style=\"background-color:#000000; padding:40px 40px 40px 40px; line-height:22px; text-align:inherit;\" height=\"100%\" valign=\"top\" bgcolor=\"#000000\"><div><div style=\"font-family: inherit; text-align: inherit\"><span style=\"font-size: 16px; font-family: verdana, geneva, sans-serif\">Hey {{fname}}, thanks for joining SongRiddle! <br>\r\n{{#if email_pref}}</span></div>\r\n<div style=\"font-family: inherit; text-align: inherit\"><span style=\"font-size: 16px; font-family: verdana, geneva, sans-serif\">We'\''re so happy you decided to join our growing community of music fans around the world! <br>\r\n{{else if sms_pref}}<br>\r\nWe know you prefer to receive SMS, but the number you provided ( {{phone}} ) cannot receive text messages. Please login to your account and update your phone number.<br>\r\n{{/if}}</span></div>\r\n<div style=\"font-family: inherit; text-align: inherit\"> </div><div></div></div></td>\r\n      </tr>\r\n    </tbody></table><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"module\" data-role=\"module-button\" data-type=\"button\" role=\"module\" style=\"table-layout:fixed\" width=\"100%\" data-muid=\"k7JTvo5kgP27gVfiZtYsdG\"><tbody><tr><td align=\"center\" class=\"outer-td\" style=\"padding:20px 20px 60px 20px;\" bgcolor=\"\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"button-css__deep-table___2OZyb wrapper-mobile\" style=\"text-align:center\"><tbody><tr><td align=\"center\" bgcolor=\"#00dc73\" class=\"inner-td\" style=\"border-radius:6px; font-size:16px; text-align:center; background-color:inherit;\"><a style=\"background-color:#00dc73; border:0px solid #08b65d; border-color:#08b65d; border-radius:0px; border-width:0px; color:#ffffff; display:inline-block; font-family:verdana,geneva,sans-serif; font-size:16px; font-weight:normal; letter-spacing:3px; line-height:30px; padding:12px 18px 12px 18px; text-align:center; text-decoration:none; border-style:solid;\" href=\"\" target=\"_blank\">Login</a></td></tr></tbody></table></td></tr></tbody></table><table class=\"wrapper\" role=\"module\" data-type=\"image\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\" data-muid=\"bFD91XtLLpbakrSCru5K66\">\r\n      <tbody><tr>\r\n        <td style=\"font-size:6px; line-height:10px; padding:0px 0px 0px 0px;\" valign=\"top\" align=\"center\">\r\n          <img class=\"max-width\" border=\"0\" style=\"display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:100% !important; width:100%; height:auto !important;\" src=\"https://marketing-image-production.s3.amazonaws.com/uploads/7d3a644f0bab87f4a5d64a2d9a623138d9e415852fbccd6dc4393ba4c725b3ab55a101ae8022e1fc8fd1430601b482e38daf0aa90927ae1d09e74eeb93cf10ec.png\" alt=\"\" width=\"600\" data-responsive=\"true\" data-proportionally-constrained=\"true\">\r\n        </td>\r\n      </tr>\r\n    </tbody></table><table class=\"module\" role=\"module\" data-type=\"spacer\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\" data-muid=\"ccry5SKPk8R8zrRC4bXscH\">\r\n      <tbody><tr>\r\n        <td style=\"padding:0px 0px 30px 0px;\" role=\"module-content\" bgcolor=\"#000000\">\r\n        </td>\r\n      </tr>\r\n    </tbody></table><table class=\"module\" role=\"module\" data-type=\"divider\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\" data-muid=\"emKuBa9TqXYgYRKtPVKwgr\">\r\n      <tbody><tr>\r\n        <td style=\"padding:0px 0px 0px 0px; background-color:#000000;\" role=\"module-content\" height=\"100%\" valign=\"top\" bgcolor=\"#000000\">\r\n          <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" width=\"100%\" height=\"3px\" style=\"line-height:3px; font-size:3px;\">\r\n            <tbody><tr>\r\n              <td style=\"padding:0px 0px 3px 0px;\" bgcolor=\"#42ee99\"></td>\r\n            </tr>\r\n          </tbody></table>\r\n        </td>\r\n      </tr>\r\n    </tbody></table><table class=\"module\" role=\"module\" data-type=\"spacer\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\" data-muid=\"m8Z6fdx1ZMYdsEamBtzm2u\">\r\n      <tbody><tr>\r\n        <td style=\"padding:0px 0px 30px 0px;\" role=\"module-content\" bgcolor=\"#000000\">\r\n        </td>\r\n      </tr>\r\n    </tbody></table><table class=\"module\" role=\"module\" data-type=\"social\" align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\" data-muid=\"WZtxYEgXRsEJpo7MaNXNv\">\r\n      <tbody>\r\n        <tr>\r\n          <td valign=\"top\" style=\"padding:0px 0px 0px 0px; font-size:6px; line-height:10px; background-color:#000000;\" align=\"center\">\r\n            <table align=\"center\">\r\n              <tbody>\r\n                <tr><td style=\"padding: 0px 5px;\">\r\n      <a role=\"social-icon-link\" href=\"https://www.facebook.com/sendgrid/\" target=\"_blank\" alt=\"Facebook\" title=\"Facebook\" style=\"display:inline-block; background-color:rgb(0, 220, 115); height:30px; width:30px;\">\r\n        <img role=\"social-icon\" alt=\"Facebook\" title=\"Facebook\" src=\"https://marketing-image-production.s3.amazonaws.com/social/white/facebook.png\" style=\"height:30px; width:30px;\" height=\"30\" width=\"30\">\r\n      </a>\r\n    </td><td style=\"padding: 0px 5px;\">\r\n      <a role=\"social-icon-link\" href=\"https://twitter.com/sendgrid?ref_src=twsrc%5egoogle%7ctwcamp%5eserp%7ctwgr%5eauthor\" target=\"_blank\" alt=\"Twitter\" title=\"Twitter\" style=\"display:inline-block; background-color:rgb(0, 220, 115); height:30px; width:30px;\">\r\n        <img role=\"social-icon\" alt=\"Twitter\" title=\"Twitter\" src=\"https://marketing-image-production.s3.amazonaws.com/social/white/twitter.png\" style=\"height:30px; width:30px;\" height=\"30\" width=\"30\">\r\n      </a>\r\n    </td><td style=\"padding: 0px 5px;\">\r\n      <a role=\"social-icon-link\" href=\"https://www.instagram.com/sendgrid/?hl=en\" target=\"_blank\" alt=\"Instagram\" title=\"Instagram\" style=\"display:inline-block; background-color:rgb(0, 220, 115); height:30px; width:30px;\">\r\n        <img role=\"social-icon\" alt=\"Instagram\" title=\"Instagram\" src=\"https://marketing-image-production.s3.amazonaws.com/social/white/instagram.png\" style=\"height:30px; width:30px;\" height=\"30\" width=\"30\">\r\n      </a>\r\n    </td><td style=\"padding: 0px 5px;\">\r\n      <a role=\"social-icon-link\" href=\"https://www.pinterest.com/sendgrid/\" target=\"_blank\" alt=\"Pinterest\" title=\"Pinterest\" style=\"display:inline-block; background-color:rgb(0, 220, 115); height:30px; width:30px;\">\r\n        <img role=\"social-icon\" alt=\"Pinterest\" title=\"Pinterest\" src=\"https://marketing-image-production.s3.amazonaws.com/social/white/pinterest.png\" style=\"height:30px; width:30px;\" height=\"30\" width=\"30\">\r\n      </a>\r\n    </td></tr>\r\n              </tbody>\r\n            </table>\r\n          </td>\r\n        </tr>\r\n      </tbody>\r\n    </table><table class=\"module\" role=\"module\" data-type=\"spacer\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\" data-muid=\"4NFUdqMUjrrirCBvGuKrPP\">\r\n      <tbody><tr>\r\n        <td style=\"padding:0px 0px 30px 0px;\" role=\"module-content\" bgcolor=\"#000000\">\r\n        </td>\r\n      </tr>\r\n    </tbody></table><table class=\"module\" role=\"module\" data-type=\"spacer\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\" data-muid=\"nfsGAdtiKmL1EYgfXumbmT\">\r\n      <tbody><tr>\r\n        <td style=\"padding:0px 0px 30px 0px;\" role=\"module-content\" bgcolor=\"#000000\">\r\n        </td>\r\n      </tr>\r\n    </tbody></table><table class=\"module\" role=\"module\" data-type=\"spacer\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\" data-muid=\"jBwcqUkrWFVHWriEuEBqjU\">\r\n      <tbody><tr>\r\n        <td style=\"padding:0px 0px 30px 0px;\" role=\"module-content\" bgcolor=\"#000000\">\r\n        </td>\r\n      </tr>\r\n    </tbody></table></td>\r\n                                      </tr>\r\n                                    </tbody></table>\r\n                                    <!--[if mso]>\r\n                                  </td>\r\n                                </tr>\r\n                              </table>\r\n                            </center>\r\n                            <![endif]-->\r\n                          </td>\r\n                        </tr>\r\n                      </tbody></table>\r\n                    </td>\r\n                  </tr>\r\n                </tbody></table>\r\n              </td>\r\n            </tr>\r\n          </tbody></table>\r\n        </div>\r\n      </center>\r\n    \r\n  \r\n</body></html>","subject":"Thanks for joining!"}'
  ```

Alternatively you can create a Transactional Template by logging into your SendGrid account and pasting the content in [TemplateHTML.html](https://github.com/stevinoverholser/Preference_Center/blob/master/TemplateHTML.html).

[You can confirm creation and see content in the UI](https://mc.sendgrid.com/dynamic-templates)

- Custom Fields

  If you would like to add the user to your SendGrid [Marketing Campaigns](https://sendgrid.com/docs/ui/sending-email/how-to-send-email-with-marketing-campaigns/) Contacts we will need to create some [Custom Fields](https://sendgrid.com/docs/ui/managing-contacts/custom-fields/) for first name (Fname), last name (Lname), phone number (Phone) and contact preference (Preference) using these API calls:

  **Make sure you save the returned “id” parameter for these API calls for future use**

  Create Fname (replace `<<YOUR_API_KEY_HERE>>`):

  ```
  curl --request POST \
    --url https://api.sendgrid.com/v3/marketing/field_definitions \
    --header 'authorization: Bearer <<YOUR_API_KEY_HERE>>' \
    --data '{"name":"Fname","field_type":"Text"}'
  ```

  Create Lname (replace `<<YOUR_API_KEY_HERE>>`):

  ```
    curl --request POST \
    --url https://api.sendgrid.com/v3/marketing/field_definitions \
    --header 'authorization: Bearer <<YOUR_API_KEY_HERE>>' \
    --data '{"name":"Lname","field_type":"Text"}'
  ```

  Create Phone (replace `<<YOUR_API_KEY_HERE>>`):

  ```
  curl --request POST \
    --url https://api.sendgrid.com/v3/marketing/field_definitions \
    --header 'authorization: Bearer <<YOUR_API_KEY_HERE>>' \
    --data '{"name":"Phone","field_type":"Text"}'
  ```

  Create Preference (replace `<<YOUR_API_KEY_HERE>>`):

  ```
    curl --request POST \
    --url https://api.sendgrid.com/v3/marketing/field_definitions \
    --header 'authorization: Bearer <<YOUR_API_KEY_HERE>>' \
    --data '{"name":"Preference","field_type":"Text"}'
  ```

### Twilio Console

- Environmental Variable

  We will need to define a environmental variable for our SendGrid API key to avoid hardcoding this:

  Adding SendGrid API key to 'Environmental Variables' (Key = `<<SENDGRID_API_KEY>>`)

  https://www.twilio.com/console/runtime/functions/configure

  ![API Key](https://marketing-image-production.s3.amazonaws.com/uploads/88c36bee49701a76d1254d8ef086b55d83a36060864d2e285770f934198a2ec4ca421dbcfb7baa097c5d2aebd9c9b486ead4d1d9d2e562296b291aa85fef92f0.png)

- NPM Module

  We will need to add a dependency on the same page for a NPM module ‘got’ that we will be using for HTTP requests:

  Importing NPM module 'got' version '8.0.3' to Dependencies.

  https://www.twilio.com/console/runtime/functions/configure

  ![NPM Module](https://marketing-image-production.s3.amazonaws.com/uploads/9951ba2598d509df19f69fbf738bf6b281560e9dc84c5818c1df0999e16622231f569a041aaed3b631232080f675d959539c1ec4fe6950b7990d267e804c3bc0.png)

- Functions

  Now to create functions that can be utilizes in our Studio Flow

  **Mail Send:**

  Create new blank Function

  https://www.twilio.com/console/functions/manage

  Name this function ‘sg_mail_send’ and add ‘/sg_mail_send’ as the path. Paste the contents of ‘Send_Email.js’ into the CODE box and replace `<<YOUR TEMPLATE ID>>` with the Dynamic Template ‘id’ and `<<YOUR DOMAIN>>` with the from address you want to use.

  Save function

  **Add to Contacts:**

  Create new blank Function

  https://www.twilio.com/console/functions/manage

  Name this function ‘add_to_contacts’ and add ‘/add_to_contacts’ as the path. Paste the contents of ‘Add_To_MCDB.js’ into the CODE box and replace `<<FNAME CUSTOM FIELD ID>>` with the Fname ‘id’, `<<LNAME CUSTOM FIELD ID>>` with the Lname ‘id’, `<<PHONE CUSTOM FIELD ID>>` with the Phone ‘id’ and `<<PREFERENCE CUSTOM FIELD ID>>` with the Preference ‘id’,

  Save function

- Studio

  Now we can build our Studio Flow using the JSON import functionality

  Create new Studio Flow and name it whatever you would like, select ‘Import from JSON’ (near bottom), paste in content of ‘studio.json’

  https://www.twilio.com/console/studio/flows

  We now weed to point the widgets in our Studio Flow to our Functions we created

  Select the Widget for ‘Send_Email’, in dropdown for FUNCTION URL select ‘sg_mail_send’

  Select the Widget for ‘Add_To_MCDB’, in dropdown for FUNCTION URL select ‘add_to_contacts’

  Finally select the top Trigger Widget - copy and save the REST API URL for later use

  Publish this flow

## Local

We are now ready to run our Sinatra application and test functionality, save ‘landingpage.rb’ and ‘views’ folder locally to a location you want to run this script from.

Edit ‘landingpage.rb’ and replace the following:

`<<VALIDATION_API_KEY>>` - Your SendGrid validation API key (this is different than the one used in mail send and need to be created with validation scopes)
`<<TWILIO_ACCOUNT_SID>>` - Found on Twilio Console
`<<TWILIO_AUTH_TOKEN>>` - Found on Twilio Console
`<<TWILIO_STUDIO_ENDPOINT_WITH_AUTHENTICATION>>` - This will be the REST API URL found earlier, we will need to add authentication to this endpoint using account SID and auth token, for example:

`https://<<TWILIO_ACCOUNT_SID>>:<<TWILIO_AUTH_TOKEN>>@studio.twilio.com/v1/Flows/<<FW_ID>>/Executions`

`<<PLACEHOLDER_TO_NUMBER>>` - Any phone number as a place holder, generally your personal number (ex: +11234567890)
`<<FROM_NUMBER>>` - Your **Twilio** SMS capable phone number (ex: +11234567890)

Pending you have all the Ruby Gems installed (rubygems, twilio-ruby, sinatra, httparty, and cgi) you can run the landing page locally:

`ruby landingpage.rb`

Open `http://localhost:4567/` in a browser to view the UI and test!

For troubleshooting use Studio Flow’s logs to see where it may be failing

Optionally you can push this to a public URL using NGROK https://ngrok.com/. If set up, in a separate terminal window run

`./ngrok http 4567`

And open the resulting URL in your browser or share with others to test.

## Testing

- Try common typos in the domain such as gmial.com or yaho.com to see a suggestion webpage.
- Try using a known landline number and selecting SMS preference to get a email prompting you to update phone number
- Try using a known bounced email in your Bounce suppression list and Email preference to get a SMS prompting the user to update email address.

## Contributing

All third party contributors acknowledge that any contributions they provide will be made under the same open source license that the open source project is provided under.

Please be aware that this project has a [Code of Conduct](https://github.com/twilio-labs/configure-env/blob/master/CODE_OF_CONDUCT.md). The tldr; is to just be excellent to each other ❤️

## License

MIT
