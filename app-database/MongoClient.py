# This file creates the MongoClient that will connect to the swelab cluster.

import pymongo


class MongoClient:
    def __init__(self):
        self.client = None

    def connect(self, user, password):
        connection_str = "mongodb+srv://" + user + ":" + password + "@swelab.bo7ayiw.mongodb.net/?retryWrites=true&w" \
                                                                    "=majority "
        self.client = pymongo.MongoClient(connection_str)
        return self.client

#   def insert_one(self):
#   def insert_many(self)
#   def find(self)
#   def count(self)

