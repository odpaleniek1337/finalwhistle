def resolve_sport(arg: str) -> str:
    arg = arg.lower()
    if arg in ('MOTORSPORT', 'HOCKEY'):
        return 'FLASHSCORE_ ' + arg 
    elif arg in ('football', ''):
        return 'FLASHSCORE_FOOTBALL'
    else:
        print(f'unresolved sport: {arg}')
        return ''

def resolve_country(arg: str) -> str:
    """Returns value if country is found and supported"""
    pass

def resolve_target(arg: str) -> str:
    """Returns target if its found and supported"""
    pass