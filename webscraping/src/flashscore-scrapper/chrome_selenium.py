from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager

class ChromeSelenium:
    def __init__(self):
        self.driver = webdriver.Chrome(ChromeDriverManager().install())
    
    def change_site(self, site):
        self.driver.get(site)