export function trimObj (obj) {
    const filterProps = ['name', 'symbol'];
    return Object.fromEntries(
        Object.entries(obj).filter(([key, _]) => filterProps.includes(key))
    );
}

export function mapPrices (array) {
    // multiply data from API by 100 to force decimals into integers
    return array.map(eod => Math.floor(eod.open * 100));
}

export function getRandom (max) {
    // function returns a number excluding the max value
    return Math.floor(Math.random() * max);
}

export function getArrayOfRandom (length, max) {
    const array = [];
    while (array.length < length) {
        let rnd = getRandom(max);
        while (array.includes(rnd)) {
            rnd = getRandom(max);
        }
        array.push(rnd);
    }
    return array;
}

export function rateDelay () {
    return new Promise(resolve => setTimeout(resolve, 1500));
}
