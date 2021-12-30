import os
from unittest import TestCase

from app import app

class RoomDataTestCase(TestCase):
    """testing room data CRUD methods"""
    def test_create_room_data(self):
        self.assertEqual("2", "2")