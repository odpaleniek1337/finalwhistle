import os
import sys

from resolvers import resolve_arguments, read_arguments
from dotenv import load_dotenv
from factories import ChromeSeleniumFactory
from flashscore_utils import SUPPORTED_FOOTBALL_COUNTRIES, SUPPORTED_LEAGUES_MAP
from flashscore_chrome_selenium import find_country_recursive

def main():
    load_dotenv()
    argument_list = read_arguments(sys.argv[1:])
    
    sport, country, target = resolve_arguments(argument_list) # country resolver needs to be changed in case of world cup/euro/champions league etc.

    if not sport:
        exit("Exiting... unknown sport!")
    print(country, SUPPORTED_FOOTBALL_COUNTRIES)

    if country not in SUPPORTED_FOOTBALL_COUNTRIES:
        exit("Exiting... country not in supported countries!")

    factory = ChromeSeleniumFactory()
    flashscore_driver = factory.get_driver()
    flashscore_driver.change_site(os.getenv(sport))

    flashscore_driver.find_and_click_by_id("onetrust-reject-all-handler") #reject all cookies and close silly popup

    country_menu = flashscore_driver.find_by_class_name("lmc__menu")

    show_more_element = flashscore_driver.find_by_class_name_within_element(country_menu, "leftMenu__icon--arrow")

    flashscore_driver.try_scroll_before_clicking(show_more_element)

    blocks_all = flashscore_driver.find_all_by_class_name_within_element(country_menu, "lmc__block ")

    needed_block = find_country_recursive(blocks_all, country)

    href = flashscore_driver.get_href_by_class_name_within_element(needed_block, "lmc__item ")
    #print(href)
    flashscore_driver.change_site(href)
    #if live present switch to standings

if __name__ == "__main__":
    main()