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

class ConfirmationEmail {
  constructor(reqData) {
    this.paymentConfirmation = reqData.payment_confirmation;
    this.formData = reqData.form_data;
  }
  
  formatEmail () {
    for (let key in ['animal', 'recipient']) {
      if (!(key in this.formData)) {
        this.formData[key] = 'none chosen';
      };
    };
    
    const Body = `
      PAYMENT CONFIRMATION ${this.paymentConfirmation.id}:
      payer name: ${this.paymentConfirmation.payer.name}, 
      payer email: ${this.paymentConfirmation.payer.email}, 
      amount: ${this.paymentConfirmation.amount}. 
  
      ROOM ORDER INFO:
      template: ${this.formData.template}, 
      color: ${this.formData.color}, 
      message: ${this.formData.message}, 
      name (from): ${this.formData.name}, 
      animal: ${this.formData.animal}, 
      recipient: ${this.formData.recipient}
    `

    const isEmailValid = () => {
      if (Host && Username && Password) return true
      return false
      };
  
    let emailObject = false;
    if (!To || !From) {
      emailObject.errors = { invalidEmailAddresses: "To and/or From email addresses are not found in server environment." }
    } else if (SecureToken) {
      emailObject = {
        SecureToken,
        To,
        From,
        Subject,
        Body
      }
    } else if (isEmailValid()) {
      emailObject = {
        Host,
        Username,
        Password,
        To,
        From,
        Subject,
        Body
      }
    } else {
      emailObject.errors = { invalidEnvironmentalVariables: "there are not sufficient environmental variables on the server to send an email" };
    };
    
    Email.send(emailObject).then(
      message => (message)
    );
   
    return { email : emailObject }
  }
};

module.exports = ConfirmationEmail;
