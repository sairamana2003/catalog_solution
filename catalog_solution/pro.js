const fs = require('fs');


function decodeValue(base, value) {
    return parseInt(value, parseInt(base));
}


function lagrangeInterpolation(points) {
    const n = points.length;
    let c = 0; 

    for (let i = 0; i < n; i++) {
        let xi = points[i][0];
        let yi = points[i][1]; 

        let li = 1; 
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                li *= (0 - points[j][0]) / (xi - points[j][0]);
            }
        }
        c += li * yi;
    }

    return Math.round(c); 
}


function computeSecretFromJSON(filePath) {
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const keys = jsonData.keys;
    const n = keys.n;
    const k = keys.k;

    let points = [];

    for (let i = 1; i <= n; i++) {
        const base = jsonData[i].base;
        const value = jsonData[i].value;

        const decodedY = decodeValue(base, value);
        points.push([parseInt(i), decodedY]); 
    }


    const secret = lagrangeInterpolation(points);
    console.log(`The secret (constant term c) is: ${secret}`);
}


computeSecretFromJSON('test_case_1.json'); //output for first tescase is -17
computeSecretFromJSON('test_case_2.json'); //output for second testcase is 79836264464384