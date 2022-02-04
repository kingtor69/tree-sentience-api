const { Email } = require('./smtp.js');

class ConfirmationEmail {
  constructor(reqData) {
    this.paymentConfirmation = reqData.payment_confirmation;
    this.formData = reqData.form_data;
    this.SecureToken = process.env.SMPTJS_SECURE_TOKEN || false;
    this.Host = process.env.SMPTJS_HOST || false;
    this.Username = process.env.SMPTJS_USERNAME || false;
    this.Password = process.env.SMPTJS_PASSWORD || false;
    this.noTokenValidEmail = this.Host && this.Username && this.Password
    this.To = process.env.MC_MAKER_EMAIL || false;
    this.From = process.env.SMPTJS_FROM || false;
    this.Subject = "minecraft order in";
    this.emailObject = false;
  };

  formatEmail() {
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
      recipient: ${this.formData.recipient}. 
    `
    
    if (this.SecureToken) {
      this.emailObject = {
        SecureToken: this.SecureToken,
        To: this.To,
        From: this.From,
        Subject: this.Subject,
        Body
      }
    } else if (this.noTokenValidEmail) {
      this.emailObject = {
        Host: this.Host,
        Username: this.Username,
        Password: this.Password,
        To: this.To,
        From: this.From,
        Subject: this.Subject,
        Body: this.Body
      } 
    } else {
      this.emailObject.errors = { invalidEnvironmentalVariables: "there are not sufficient environmental variables on the server to send an email" };
    };
    
    return this.emailObject;
  };

  sendEmail() {
    if (this.environment = "test") {
      Email.send(this.emailObject).then(
        message => (message)
      );
    };

    return { email: this.emailObject }
  };

};

module.exports = ConfirmationEmail;
