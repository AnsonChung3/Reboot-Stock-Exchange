export function trimObj (obj) {
    const filterProps = ['name', 'symbol'];
    return Object.fromEntries(
        Object.entries(obj).filter(([key, _]) => filterProps.includes(key))
    );
}

export function mapPrices (array) {
    // multiply data from API by 100 to force decimals into integers
    return array.map(eod => eod.open * 100);
}
