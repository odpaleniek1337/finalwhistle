import datetime

from typing import Tuple
from pymongo import MongoClient
from pymongo.errors import OperationFailure
from bson.objectid import ObjectId

class MongoManager:
    def __init__(self, conn: str) -> None:
        self.client = MongoClient(conn)
        self.database = None

    def check_connection(self) -> bool:
        try:
            self.client.server_info()
            self.database = self.client.finalwhistle
            return 1
        except OperationFailure as err:
            exit(f"Proper connection not established \n Error: {err}")

    def _update_league_description(self, league: str) -> bool:
        try:
            current_timestamp = datetime.datetime.now()
            self.database.League.update_one({"Name": league}, { "$set": { "LatestUpdate": current_timestamp}})
            return 1
        except Exception as err:
            print(err)
            return 0

    def update_teams(self, teams: list, league: str) -> Tuple[bool, bool]:
        try:
            for team in teams:
                self.database.Team.update_one({"Name": team.get("Name")}, { "$set": {key:val for key, val in team.items()}})
        except Exception as err:
            print(err)
            return (0, 0)
        return 1, self._update_league_description(league)

    def add_new_teams(self, teams: list, league_id: str) -> bool:
        try:
            for team in teams:
                team['LeagueID'] = ObjectId(league_id)
            self.database.Team.insert_many(teams)
        except Exception as err:
            print(err)
            return 0
        return 1