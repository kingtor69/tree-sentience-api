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
const expectedEmailObject = {
  SecureToken: process.env.SMPTJS_SECURE_TOKEN,
  To: process.env.MC_MAKER_EMAIL,
  From: process.env.SMPTJS_FROM,
  Subject: "minecraft order in",
  Body: `
      PAYMENT CONFIRMATION ${schemaObj.payment_confirmation.id}: 
      payer name: ${schemaObj.payment_confirmation.payer.name}, 
      payer email: ${schemaObj.payment_confirmation.payer.email}, 
      amount: ${schemaObj.payment_confirmation.amount}. 

      ROOM ORDER INFO: 
      template: ${schemaObj.form_data.template}, 
      color: ${schemaObj.form_data.color}, 
      message: ${schemaObj.form_data.message}, 
      name (from): ${schemaObj.form_data.name}, 
      animal: ${schemaObj.form_data.animal}, 
      recipient: ${schemaObj.form_data.recipient}. 
  `
};

const expectedResponseObject = { email: expectedEmailObject};

const bogusRequest = {
  payment_confirmation: {
    bananas: "yummy"
  },
  form_data: {
    form: "what form?"
  }
};

module.exports = {
  schemaObj,
  schemaJSON,
  didItMyselfJSON,
  expectedResponseObject,
  expectedEmailObject,
  bogusRequest
}
