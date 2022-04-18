import getopt
from typing import Tuple, List
from help import CORRECT_USAGE

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
            #_resolve_target(arg)
            pass
    return (sport, country, target)

def _resolve_sport(arg: str) -> str:
    arg = arg.lower()
    if arg in ('MOTORSPORT', 'HOCKEY'):
        return 'FLASHSCORE_ ' + arg 
    elif arg in ('football', ''):
        return 'FLASHSCORE_FOOTBALL'
    else:
        print(f'unresolved sport: {arg}')
        return ''

def _resolve_country(arg: str) -> str:
    """Returns value if country is found and supported""" #lookup
    return arg.replace(' ', '-').lower()

def _resolve_target(arg: str) -> str:
    """Returns target if its found and supported"""
    pass