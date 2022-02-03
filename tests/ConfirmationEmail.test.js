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
        expect(email.formatEmail()).toBe(expectedEmailObject);
    })
})