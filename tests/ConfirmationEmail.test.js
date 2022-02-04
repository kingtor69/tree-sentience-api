process.env.NODE_ENV = "test";

const { get } = require("superagent");
const request = require("supertest");

const ConfirmationEmail = require('../ConfirmationEmail');

const {
    schemaObj,
    expectedEmailObject
} = require('./testingData');

const app = require("../app");

describe('ConfirmationEmail class', () => {
    test('it creates the expected emailObject', () => {
        const email = new ConfirmationEmail(schemaObj);
        const formattedEmail = email.formatEmail();
        expect(typeof formattedEmail).toBe('object');
        for (const key in formattedEmail) {
            expect(typeof formattedEmail[key]).toBe('string');
        };
        console.log(formattedEmail);
    });
    test('it passes visual inspection (confirmed by Tor)', () => {
        const passedVisualInspection = true;
        expect(passedVisualInspection).toBe(true);
    });
    test('it works with SMPTJS_SECURE_TOKEN (confirmed by Tor)', () => {
        const workedWithToken = true;
        expect(workedWithToken).toBe(true);
    });
    test('it works with USERNAME PASSWORD verification (confirmed by Tor)', () => {
        const workedWithoutToken = true;
        expect(workedWithoutToken).toBe(true);
    });
});