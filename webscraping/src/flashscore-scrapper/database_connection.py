from pymongo import MongoClient
from pymongo.errors import OperationFailure

class MongoManager:
    def __init__(self, conn: str) -> None:
        self.client = MongoClient(conn)

    def check_connection(self) -> bool:
        try:
            self.client.server_info()
            return 1
        except OperationFailure as err:
            exit("Proper connection not established")