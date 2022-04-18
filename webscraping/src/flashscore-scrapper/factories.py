from flashscore_chrome_selenium import ChromeSelenium
from pymongo import MongoClient

class ChromeSeleniumFactory:
    def get_driver(self):
        return ChromeSelenium()

class MongoClientFactory:
    def get_client(self, conn: str):
        return MongoClient(conn)
