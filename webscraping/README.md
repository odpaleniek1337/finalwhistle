# Activate venv WIN cmd

`
webscrap_env\Scripts\activate
`

# Fill .env in src with:
`
FLASHSCORE_FOOTBALL=
FLASHSCORE_MOTORSPORT=
FLASHSCORE_HOCKEY=
DB_URL=
`

# Run with venv

`
python src\flashscore-scrapper\main.py
`

# Run with example valid args

`
python src\flashscore-scrapper\main.py -s foOtball --country england -t liverpool
python src\flashscore-scrapper\main.py -s foOtball --country poland -t "Widzew Lodz"
python src\flashscore-scrapper\main.py -s foOtball --country finland -t haka
`

# For now optimized only for football and certain leagues, which are in lookup

## TODO easy to forget potential improvements
- [ ] Need to update requirements in setups
- [ ] Add getting theme colors for teams to db, so team listings could be more personalized