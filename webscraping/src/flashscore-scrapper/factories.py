from flashscore_chrome_selenium import ChromeSelenium
from flashscore_football import FootballChromeSelenium
from pymongo import MongoClient

class ChromeSeleniumFactory:
    def get_driver(self):
        return ChromeSelenium()

class FootballChromeSeleniumFactory(ChromeSeleniumFactory):
    def get_driver(self):
        return FootballChromeSelenium()

class MongoClientFactory:
    def get_client(self, conn: str):
        return MongoClient(conn)
