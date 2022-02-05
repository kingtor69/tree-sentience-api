const express = require('express');
const ExpressError = require("../expressError");
const router = new express.Router();
const jsonschema = require('jsonschema');
const emailSchema = require('../schemas/emailSchema.json');
const ConfirmationEmail = require('../ConfirmationEmail');
const { aprilFoolsOrNo } = require('../helpers');

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
        if (!req) {
            const err = new ExpressError('request can not be empty', aprilFoolsOrNo(400));
        };
        if ('devmode' in req.body) {
            process.env.NODE_ENV = "test";
            delete req.body.devmode;
        };
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
        email.formatEmail();
        if (process.env.NODE_ENV = "test") {
            return res.status(201).json({email: email.emailObject});
        };
        const emailSent = email.sendEmail();
        return res.status(201).json(emailSent);
    } catch (err) {
        return next(err);
    };
});

module.exports = router;
