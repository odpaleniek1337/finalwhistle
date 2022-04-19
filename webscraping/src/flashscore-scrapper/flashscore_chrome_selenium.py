from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.common.exceptions import ElementClickInterceptedException
from selenium.webdriver.common.action_chains import ActionChains
from flashscore_utils import FLASHSCORE_BLOCK_TEAM_NAME

class ChromeSelenium:
    def __init__(self):
        self.driver = webdriver.Chrome(ChromeDriverManager().install())
    
    def change_site(self, site):
        self.driver.get(site)

    def _find_and_click_by_id(self, passed_id: str):
        self.driver.find_element(By.ID, passed_id).click()

    def _find_by_id(self, passed_id: str):
        return self.driver.find_element(By.ID, passed_id)

    def _find_by_class_name(self, passed_name: str):
        return self.driver.find_element(By.CLASS_NAME, passed_name)

    def _find_by_class_name_within_element(self, element: object, passed_name: str):
        return element.find_element(By.CLASS_NAME, passed_name)

    def _find_all_by_class_name_within_element(self, element: object, passed_name: str):
        return element.find_elements(By.CLASS_NAME, passed_name)

    def _get_href_by_class_name_within_element(self, element: object, passed_name: str):
        return element.find_element(By.CLASS_NAME, passed_name).get_attribute("href")

    def _try_scroll_before_clicking(self, element: object):
        try:
            element.click()
        except ElementClickInterceptedException:
            action = ActionChains(self.driver)
            self.driver.execute_script(
                "arguments[0].scrollIntoView();", 
                element
            )
            element.click()
    
def _check_country_to_click(one_block: object, country: str):
    block_country = one_block.find_element(By.CLASS_NAME, FLASHSCORE_BLOCK_TEAM_NAME).text.lower()
    if block_country == country:
        print("found")
        return 0
    elif block_country > country:
        return -1
    else:
        return 1

def find_country_recursive(block_list: list, country_to_find: str):
    length = len(block_list)
    if length == 1:
        return block_list[0]
    middle = length // 2

    sign = _check_country_to_click(block_list[middle], country_to_find)
    if not sign:
        return block_list[middle]
    elif sign == 1:
        return find_country_recursive(block_list=block_list[middle:], country_to_find=country_to_find)
    else:
        return find_country_recursive(block_list=block_list[:middle], country_to_find=country_to_find)