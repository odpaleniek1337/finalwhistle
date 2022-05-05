from flashscore_chrome_selenium import ChromeSelenium, find_country_recursive
from flashscore_utils import * #CHANGE IT
from re import search as regex_search

class FootballChromeSelenium(ChromeSelenium):
    def __init__(self):
        super().__init__()

    def reject_cookies(self):
        self._find_and_click_by_id(FLASHSCORE_REJECT_COOKIES)
    
    def get_league_with_target(self, country: str, league: str) -> list:
        country_menu = self._find_by_class_name(FLASHSCORE_LEFT_MENU)
        show_more_element = self._find_by_class_name_within_element(country_menu, FLASHSCORE_EXPAND_LEFT_MENU)
        self._try_scroll_before_clicking(show_more_element)
        blocks_all = self._find_all_by_class_name_within_element(country_menu, FLASHSCORE_ALL_BLOCKS)
        needed_block = find_country_recursive(blocks_all, country)
        href = self._get_href_by_class_name_within_element(needed_block, FLASHSCORE_BLOCK_ITEM)
        self.change_site(href + league + '/standings/')
        self.driver.implicitly_wait(3)
        league_content = self._find_by_id(FLASHSCORE_TABLE_TOURNAMENT)
        selected = self._get_href_by_class_name_within_element(league_content, 'selected')
        self._click_standings_if_needed(league_content, selected)
        table_body = self._find_by_class_name_within_element(league_content, FLASHSCORE_TABLE_BODY)
        all_teams = self._find_all_by_class_name_within_element(table_body, FLASHSCORE_TABLE_ROW)
        teams_with_data = self._collect_teams(all_teams)
        return teams_with_data, league

    
    def _click_standings_if_needed(self, content: object, selected: str) -> None:
        if selected.endswith('live'):
            tabs = self._find_all_by_class_name_within_element(content, FLASHSCORE_TABLE_TABS)
            for tab in tabs:
                if tab.get_attribute("href").endswith('table'):
                    tab.click()
                    break

    def _collect_teams(self, teams_block: object) -> list:
        teams_collected = []
        for team in teams_block:
            team_to_save = {}
            team_to_save['Name'] = self._find_by_class_name_within_element(team, FLASHSCORE_ROW_NAME).get_attribute('text')
            team_to_save['Link'] = self._find_by_class_name_within_element(team, FLASHSCORE_ROW_NAME).get_attribute('href')
            team_to_save['Place'] = int(self._find_by_class_name_within_element(team, FLASHSCORE_ROW_PLACE).get_attribute('innerHTML')[:-1])
            mpwdl = self._find_all_by_class_name_within_element(team, FLASHSCORE_ROW_COLS)
            team_to_save['Matches'] = int(mpwdl[0].get_attribute('innerHTML'))
            team_to_save['Wins'] = int(mpwdl[1].get_attribute('innerHTML'))
            team_to_save['Draws'] = int(mpwdl[2].get_attribute('innerHTML'))
            team_to_save['Losses'] = int(mpwdl[3].get_attribute('innerHTML'))
            team_to_save['Goals'] = mpwdl[4].get_attribute('innerHTML')
            team_to_save['Points'] = int(mpwdl[5].get_attribute('innerHTML'))
            team_form = self._find_all_by_class_name_within_element(team, FLASHSCORE_ROW_FORM_INSIDE)
            if team_form[0].get_attribute('innerHTML') == '?':
                start_form = 1
                team_to_save['NextMatch'] = regex_search(
                    '[0-9]{2}.[0-9]{2}.[0-9]{2}', 
                    self._find_by_class_name_within_element(team, FLASHSCORE_ROW_FORM_UNKNWN).get_attribute('title')
                    )[0]
            else:
                start_form = 0
            team_to_save['Form'] = ''.join([f.get_attribute('innerHTML') for f in team_form[start_form:]])
            teams_collected.append(team_to_save)
        return teams_collected
