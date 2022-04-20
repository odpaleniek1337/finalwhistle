from flashscore_chrome_selenium import ChromeSelenium
from flashscore_football import FootballChromeSelenium
from database_connection import MongoManager

class ChromeSeleniumFactory:
    def get_driver(self):
        return ChromeSelenium()

class FootballChromeSeleniumFactory(ChromeSeleniumFactory):
    def get_driver(self):
        return FootballChromeSelenium()

class MongoManagerFactory:
    def get_manager(self, conn: str):
        return MongoManager(conn)
