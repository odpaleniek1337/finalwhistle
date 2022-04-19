import getopt

from typing import Tuple, List
from help import CORRECT_USAGE
from flashscore_utils import SUPPORTED_LEAGUES_MAP, SUPPORTED_FOOTBALL_COUNTRIES

def read_arguments(arg_list: List) -> List[tuple]:
    try:
        opts, args = getopt.getopt(arg_list, "s:t:c:", ["sport=", "country=", "target="])
    except getopt.getopt.GetoptError:
        print(CORRECT_USAGE)
        exit("Error in operators")
    return opts

def resolve_arguments(opts: Tuple) -> Tuple[str, str, str]:
    sport = country = target = None
    print(opts)
    for opt, arg in opts:
        if opt in ('-s', '--sport'):
            sport = _resolve_sport(arg)
        elif opt in ('-c', '--country'):
            country = _resolve_country(arg)
        elif opt in ('-t', '--target'):
            if sport == 'FLASHSCORE_FOOTBALL':
                target = _resolve_football_target(country, arg)
            else:
                pass
    if not sport or not country or not target:
        exit("Exiting...")
    return (sport, country, target)

def _resolve_sport(arg: str) -> str:
    arg = arg.upper()
    if arg in ('MOTORSPORT', 'HOCKEY'):
        return 'FLASHSCORE_ ' + arg 
    elif arg in ('FOOTBALL', ''):
        return 'FLASHSCORE_FOOTBALL'
    else:
        print(f'unresolved sport: {arg}')
        return ''

def _resolve_country(arg: str) -> str:
    """Returns value if country is found and supported""" 
    arg = arg.replace(' ', '-').lower()
    if arg not in SUPPORTED_FOOTBALL_COUNTRIES:
        print(f'country : {arg} not in supported countries')
        return ''
    return arg

def _resolve_football_target(country: str, arg: str) -> str:
    """Returns football target if its found and supported"""
    map = SUPPORTED_LEAGUES_MAP[country]
    for league in map['leagues']:
        if arg in league['map'].keys() or arg in league['map'].values():
            return league['name']
    return ''