import os
from unittest import TestCase
from models import *

from app import app

app.config['SQLALCHEMY_DATABASE_URI'] += '_test'
app.config['SQLALCHEMY_ECHO'] = False

class UserTestCase(TestCase):
    """testing room data CRUD methods"""
    def setUp(self):
            User.query.delete()

    def tearDown(self):
        db.session.rollback()

    def test_hashpass(self):
        """should work when receiving an email, password and a non-negative integer representing privileges and should be retrieved using the email in a query"""
        new_user = User.hashpass("email@gmail.com", "pickles@R3g00d", 2)
        db.session.add(new_user)
        db.session.commit()
        test_user = db.query.get("email@gmail.com")
        self.assertEquals(test_user, "<User email@gmail.com: end_user>")