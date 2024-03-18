export function initGameMarket (state, payload) {
    console.log('commit init game market');
    console.log(state.marketData);
    for (let i = 0; i < payload.data.length; i++) {
        state.marketData.push(payload.data[i]);
    }
    console.log('end of for loop to add data to market');
    console.log(state.marketData);
}
