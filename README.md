# Tree-Sentience.com API

## currently this is only being used to send an email with paypal payment confirmation and form data for `https://github.com/kingtor69/custom-mc-rooms`

- POST to tree-sentience.com/api/mc/confirmation to send an email containing that info to an email address specified in the POST:
 | endpoint | verb | description |
 | :------- | :--- | :---------- |
 | /api/mc/confirmation/ | POST | sends email confirmation to MC room builder |

 | param | content | required? |
 | :---- | :------ | :-------: |
 | payment_confirmation: id | payment confirmation id from PayPal | yes |
 | payment_confirmation: payer: name | full name of payer |
 | payment_confirmation: payer: email | email address of payer | yes |
 | :---- | :------ | :-------: |
 | form_data: template | type of minecraft experience | yes |
 | form_data: color | color scheme | yes |
 | form_data: message | message to recipient | yes |
 | form_data: name | name of gift giver | no |
 | form_data: email | email for files to be sent | yes |
 | recipient | name of gift recipient | no |
- email sent via `https://smtpjs.com/`
- data used in the backend:
  | variable name | data provided by | e.g. and/or notes |
  | :------- | :------- | :------ |
  | SecureToken | environment variable | token for encoded username/password information, only compatible with `elasticemail` addresses as of this writing |
  | Host | environment varialbe | e.g. 'smtp.yourisp.com' |
  | Username | environment variable | for use if token is not being used |
  | Password | environment variable | see above |
  | To | provided by POST (above) | 'them@domain.com' |
  | From | environment variable | you@domain.com |
  | Subject | variable stored in `ConfirmationEmail.js` |  
  | Body | post data formated in `ConfirmationEmail.js` |  
- data returned to front end (API requester)
  - {"email":{<emailObject>}'
  - OR
  - '{"errors":{<error>:<description>}}'
 - this data is only sent in the email and not stored in a database on the server


## any future API needs for tree-sentience.com will be in this repo