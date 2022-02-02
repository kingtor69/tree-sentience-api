const express = require('express');
const ExpressError = require("../expressError");
const router = new express.Router();
const jsonschema = require('jsonschema');
const emailSchema = require('../schemas/emailSchema.json');
const { respObject, aprilFoolsOrNo, sendEmail } = require('../helpers')

// POST / => {
//   payment_confirmation: {
//     id,
//     payer: {
//       name,
//       email
//     },
//     amount
//   }
//   form_data: {
//     template,
//     color,
//     message,
//     name,
//     animal,
//     recipient
//   }
// }

router.post('/confirmation', async (req, res, next) => {
    try {
        const validation = jsonschema.validate(req.body, emailSchema);
        if (!validation.valid) {
            const listOfErrors = validation.errors.map(e => e.stack);
            const err = new ExpressError(listOfErrors, 400);
            return next(err);
        };
        const email = respObject(req.body.paymentConfirmation, req.body.formData);
        if ('errors' in resp) {
            const err = newExpressError(resp.errors, aprilFoolsOrNo(401));
        };
        const sent = await sendEmail(respObject);
        return res.json({ email: message });
    } catch (err) {
        return next(err);
    };
});

module.exports = router;
