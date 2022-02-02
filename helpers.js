const { Email } = require('./smtp.js');

const SecureToken = process.env.SMPTJS_SECURE_TOKEN || false;
const Host = process.env.SMPTJS_HOST || false;
const Username = process.env.SMPTJS_USERNAME || false;
const Password = process.env.SMPTJS_PASSWORD || false;

const To = process.env.mc_maker_email | false;
const From = process.env.smptjs_from || false;
const Subject = "minecraft order in"

const Body = (paymentConfirmation, formData) => {
    for (let key in ['animal', 'recipient']) {
        if (!(key in formData)) {
            formData[key] = 'none chosen';
        }
    };
    
    return (`
        PAYMENT CONFIRMATION ${paymentConfirmation.id}:
        payer name: ${paymentConfirmation.payer.name}, 
        payer email: ${paymentConfirmation.payer.email}, 
        amount: ${paymentConfirmation.amount}. 

        ROOM ORDER INFO:
        template: ${formData.template}, 
        color: ${formData.color}, 
        message: ${formData.message}, 
        name (from): ${formData.name}, 
        animal: ${formData.animal}, 
        recipient: ${formData.recipient}
    `)
}

const isEmailValid = () => {
    if (Host && Username && Password) return true
    return false
};

let respObject = false;
if (!!To || !!From) {
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

const aprilFoolsOrNo = eNum => {
    const datetime = new Date(Date.now());
    const isAprilFools = (datetime.getMonth() === 3 && datetime.getDate() === 1);
    return isAprilFools ? 418 : eNum;
};

const sendEmail = emailObject => {
    Email.send(emailObject).then(
        message => (message)
    );
};

module.exports = {
    respObject,
    aprilFoolsOrNo,
    sendEmail
};
