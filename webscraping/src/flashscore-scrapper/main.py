import os
import sys

from resolvers import resolve_arguments, read_arguments
from dotenv import load_dotenv
from factories import FootballChromeSeleniumFactory, MongoManagerFactory

def main():
    load_dotenv()
    argument_list = read_arguments(sys.argv[1:])
    
    sport, country, target = resolve_arguments(argument_list) # country resolver needs to be changed in case of world cup/euro/champions league etc.

    mongo_factory = MongoManagerFactory()
    database_manager = mongo_factory.get_manager(os.getenv('DB_URL'))
    if database_manager.check_connection():
        pass
    
    if sport == 'FLASHSCORE_FOOTBALL':
        football_selenium_factory = FootballChromeSeleniumFactory()
        flashscore_driver = football_selenium_factory.get_driver()
        flashscore_driver.change_site(os.getenv(sport)) #part of the loop in case multiple leagues/targets appear :)
        flashscore_driver.reject_cookies()

        league_data, league = flashscore_driver.get_league_with_target(country, target)
        flashscore_driver.serialize(f'{league}.pkl', league_data)

if __name__ == "__main__":
    main()