const { Email } = require('./smtp.js');

class ConfirmationEmail {
  constructor(reqData) {
    this.paymentConfirmation = reqData.payment_confirmation;
    this.formData = reqData.form_data;
    this.SecureToken = process.env.SMPTJS_SECURE_TOKEN || false;
    this.Host = process.env.SMPTJS_HOST || false;
    this.Username = process.env.SMPTJS_USERNAME || false;
    this.Password = process.env.SMPTJS_PASSWORD || false;
    this.To = process.env.MC_MAKER_EMAIL | false;
    this.From = process.env.SMPTJS_FROM || false;
    this.Subject = "minecraft order in"
    this.formatEmail = () => {
      debugger;
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

  return this.formatEmail()
};

module.exports = ConfirmationEmail;
