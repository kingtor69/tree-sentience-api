const ConfirmationEmail = require('../ConfirmationEmail');

const schemaObj = {
  payment_confirmation: {
    id: "730361933S7740744",
    payer: {
      name: "Stevie Steve",
      email: "steve@stevie.com"
    },
    amount: "5.65"
  },
  form_data: {
    template: "castle",
    color: "magenta",
    message: "One Pod",
    name: "Wildquest",
    animal: "dolphin",
    email: "dolphins@wildquest.com",
    recipient: "Bobby Bob"
  }
};

const schemaJSON = JSON.stringify(schemaObj);

const didItMyselfJSON = `     
  {
    "payment_confirmation": {
      "id":"730361933S7740744",
      "payer": {
        "name":"Stevie Steve",
        "email":"steve@stevie.com"
      },
      "amount":"5.65"
    },
    "form_data": {
      "template": "castle",
      "color": "magenta",
      "message": "One Pod",
      "name": "Wildquest",
      "animal": "dolphin",
      "email": "dolphins@wildquest.com",
      "recipient": "Bobby Bob"
    }
  }
`

const expectedResponseObject = new ConfirmationEmail(schemaObj);

module.exports = {
  schemaObj,
  schemaJSON,
  didItMyselfJSON,
  expectedResponseObject
}
