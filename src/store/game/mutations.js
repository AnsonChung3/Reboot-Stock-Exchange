export function addToMarket (state, payload) {
    console.log('commit');
    console.log(payload);
    state.marketData.push(payload);
}
