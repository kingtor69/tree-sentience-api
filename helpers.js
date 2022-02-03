const { Email } = require('./smtp.js');

const SecureToken = process.env.SMPTJS_SECURE_TOKEN || false;
const Host = process.env.SMPTJS_HOST || false;
const Username = process.env.SMPTJS_USERNAME || false;
const Password = process.env.SMPTJS_PASSWORD || false;

const To = process.env.MC_MAKER_EMAIL | false;
const From = process.env.SMPTJS_FROM || false;
const Subject = "minecraft order in"

const aprilFoolsOrNo = eNum => {
  const datetime = new Date(Date.now());
  const isAprilFools = (datetime.getMonth() === 3 && datetime.getDate() === 1);
  return isAprilFools ? 418 : eNum;
};

const formatEmail = ({payment_confirmation, form_data}) => {
  for (let key in ['animal', 'recipient']) {
    debugger;
    if (!(key in form_data)) {
      form_data[key] = 'none chosen';
    };
  };
  
  const Body = `
    PAYMENT CONFIRMATION ${payment_confirmation.id}:
    payer name: ${payment_confirmation.payer.name}, 
    payer email: ${payment_confirmation.payer.email}, 
    amount: ${payment_confirmation.amount}. 
    
    ROOM ORDER INFO:
    template: ${form_data.template}, 
    color: ${form_data.color}, 
    message: ${form_data.message}, 
    name (from): ${form_data.name}, 
    animal: ${form_data.animal}, 
    recipient: ${form_data.recipient}
  `

  const isEmailValid = () => {
    if (Host && Username && Password) return true
    return false
  };
  
  let respObject = false;
  if (!To || !From) {
    respObject.errors = {invalidEmailAddresses: "To and/or From email addresses are not found in server environment."} 
  } else if (SecureToken) {
    respObject = {
      SecureToken,
      To,
      From,
      Subject,
      Body
    } 
  } else if (isEmailValid()) {
    respObject = {
      Host,
      Username,
      Password,
      To,
      From,
      Subject,
      Body
    }
  } else {
    respObject.errors = {invalidEnvironmentalVariables: "there are not sufficient environmental variables on the server to send an email"};
  };

  return respObject;
};
    
const sendEmail = email => {
  Email.send(email).then(
    message => (message)
  );
  return { email }
};

module.exports = {
  aprilFoolsOrNo,
  formatEmail,
  sendEmail
};
