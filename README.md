# Tree-Sentience.com restful API

## currently this is only being used to send an email with paypal payment confirmation and form data for `https://github.com/kingtor69/custom-mc-rooms`

- POST to tree-sentience.com/api/mc-info to send an email containing that info to an email address specified in the POST:
  | :------- | :------- | :------ |
  | parameter | required? | format |
  | :------- | :------- | :------ |
  | toEmail | yes | string |
  | paymentConfirmation | no | JSONified object |
  | formData | no | JSONified object |
  | :------- | :------- | :------ |
  - note that even though only the email parameter required, the email will contain no information without at least one of the others, preferably both
- email sent via `https://smtpjs.com/`
- data used in the backend:
  | :------- | :------- | :------ |
  | variable name | data provided by | e.g. and/or notes |
  | :------- | :------- | :------ |
  | SecureToken | environment variable | token for encoded username/password information, only compatible with `elasticemail` addresses as of this writing |
  | Host | environment varialbe | e.g. 'smtp.yourisp.com' |
  | Username | environment variable | for use if token is not being used |
  | password | environment variable | see above |
  | To | provided by POST (above) | 'them@domain.com' |
  | From | environment variable | you@domain.com |
  | Subject | variable stored in `helpers.js` |  
  | Body | post data formated in `helpers.js` |  
- data returned to front end (API requester)
  - {"email":{"sent":"true","to":<To>}'
  - OR
  - '{"errors":{<error>:<description>}}'


## any future API needs for tree-sentience.com will be in this repo