from flashscore_team_lookups import FLASHSCORE_PREMIER_LEAGUE_MAP_NAME, \
    FLASHSCORE_BUNDESLIGA_MAP_NAME, FLASHSCORE_LALIGA_MAP_NAME, \
    FLASHSCORE_EKSTRAKLASA_MAP_NAME, FLASHSCORE_PIERWSZA_LIGA_MAP_NAME, \
    FLASHSCORE_VEIKKAUSLIIGA_MAP_NAME

SUPPORTED_FOOTBALL_COUNTRIES = ['england', 'germany', 'spain', 'poland', 'finland']
SUPPORTED_LEAGUES_MAP = {
    'england': {
        'leagues': [{
            'name': 'premier-league',
            'map': FLASHSCORE_PREMIER_LEAGUE_MAP_NAME
        }]
    },
    'germany': {
        'leagues': [{
            'name': 'bundesliga',
            'map': FLASHSCORE_BUNDESLIGA_MAP_NAME
        }]
    },
    'spain': {
        'leagues': [{
            'name': 'laliga',
            'map': FLASHSCORE_LALIGA_MAP_NAME
        }]
    },
    'poland': {
        'leagues': [
            {
                'name': 'ekstraklasa', 
                'map': FLASHSCORE_EKSTRAKLASA_MAP_NAME
            },
            {
                'name': 'division-1',
                'map': FLASHSCORE_PIERWSZA_LIGA_MAP_NAME
            }
        ]
    },
    'finland': {
        'leagues': [{
            'name': 'veikkausliiga',
            'map': FLASHSCORE_VEIKKAUSLIIGA_MAP_NAME
        }]
    }
}

#HTML/CSS/ETC markers
FLASHSCORE_REJECT_COOKIES = 'onetrust-reject-all-handler'
FLASHSCORE_LEFT_MENU = 'lmc__menu'
FLASHSCORE_EXPAND_LEFT_MENU = 'leftMenu__icon--arrow'
FLASHSCORE_ALL_BLOCKS = 'lmc__block '
FLASHSCORE_BLOCK_ITEM = 'lmc__item '
FLASHSCORE_BLOCK_TEAM_NAME = 'lmc__elementName'
FLASHSCORE_TABLE_TOURNAMENT = 'tournament-table-tabs-and-content'
FLASHSCORE_TABLE_TABS = 'tabs__tab'
FLASHSCORE_TABLE_BODY = 'ui-table__body'
FLASHSCORE_TABLE_ROW = 'ui-table__row'
FLASHSCORE_ROW_NAME = 'tableCellParticipant__name'
FLASHSCORE_ROW_PLACE = 'tableCellRank'
FLASHSCORE_ROW_COLS = 'table__cell--value'
FLASHSCORE_ROW_FORM_INSIDE = 'wld'
FLASHSCORE_ROW_FORM_UNKNWN = 'tableCellFormIcon--TBD '