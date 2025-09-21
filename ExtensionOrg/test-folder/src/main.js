// Sample JavaScript file for testing
function calculateSum(a, b) {
    return a + b;
}

async function fetchData(url) {
    const response = await fetch(url);
    return response.json();
}

class DataProcessor {
    constructor(config) {
        this.config = config;
    }

    process(data) {
        return data.map(item => item.value * 2);
    }
}

module.exports = { calculateSum, fetchData, DataProcessor };