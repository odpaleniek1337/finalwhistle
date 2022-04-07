import os
import sys, getopt

from resolvers import resolve_sport, resolve_country, resolve_target
from dotenv import load_dotenv
from factories import ChromeSeleniumFactory

def main(argv):
    load_dotenv()
    sport = country = target = None
    try:
        opts, args = getopt.getopt(argv, "s:t:c:", ["sport=", "country=", "target="])
    except getopt.getopt.GetoptError:
        print(f"""
        main.py \n\n
        COMMANDS:
        -s      --sport         <arg>       Choose for now from (FOOTBALL, MOTORSPORT, HOCKEY)
        -c      --country       <arg>       Country for searched target
        -t      --target        <arg>       Driver will try to search for given target on the given sport site
        """)
    for opt, arg in opts:
        if opt in ('-s', '--sport'):
            sport = resolve_sport(arg)
        elif opt in ('-c', '--country'):
            resolve_country(arg)
        elif opt in ('-t', '--target'):
            resolve_target(arg)
    
    if not sport:
        exit(50)
    else:
        football_flashscore = factory.get_driver()
        factory = ChromeSeleniumFactory()
        football_flashscore.change_site(os.getenv(sport))

if __name__ == "__main__":
    main()