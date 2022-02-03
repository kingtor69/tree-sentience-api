const express = require('express');
const ExpressError = require("../expressError");
const router = new express.Router();
const jsonschema = require('jsonschema');
const emailSchema = require('../schemas/emailSchema.json');
const ConfirmationEmail = require('../ConfirmationEmail');

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
        if ('errors' in res) {
            throw newExpressError(res.errors, aprilFoolsOrNo(400));
        };
        const email = new ConfirmationEmail(req.body);
        return res.json(email);
    } catch (err) {
        return next(err);
    };
});

module.exports = router;
