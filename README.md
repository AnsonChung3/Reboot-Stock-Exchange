# StockExchange

It's a stock exchange mimic game and a portfolio project.

The game pulls price data for 10 stocks from the marketstack API and randomly picks 4 for each game. The player is given $100,000 to trade for 14 trade days. A summary page shows at the end of the playthrough and shows the total gain/lost $s.

## Install the dependencies
```bash
npm install
```

## Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

## Features
1. Request data from API

    Data used in this game is from the marketstack API. They are real prices from the past 100 trade days (from the date of making data request). Http requests are done with Axios.

2. A mix of state management (Vuex 4) and local storage

    Vuex is used to store the current game states, and local storage maintains fetched API data between page refreshes.

3. Reusable compomenets and helpers.js

    Reusable components are used to separate/contain different functionalities (modal and display cards) and keep the main code readable (reusable buttons to contain styling settings).

    helpers.js helps to keep components where a lot of handling happens, such as actions.js and mutations.js in vuex store, readable and concise.

## Limitations
1. "Alphabet Inc - Class A" is excluded to avoid redudancy with "Alphabet Inc - Class C".

2. "Meta Platforms Inc - Class A" is excluded because the API returns a 200 success, but includes no data. As I am on the free API plan, there was no technical support from marketstack's side to debug this issue.

## To Do
1. There can be more done to if player input an invalid API key or doesn't have enough request quota.

2. Use `chart.js` to add a line graph of each symbol for each day. I'd put all of the symbols onto the same graph so players can compare the lines for each symbol
