const fs = require('fs');

function decodeValue(value, base) {
    return parseInt(value, base);
}

function findConstantTerm(points) {
    let c = 0; 

    for (let i = 0; i < points.length; i++) {
        let term = points[i].y; 

        for (let j = 0; j < points.length; j++) {
            if (i !== j) { 
                term *= (-points[j].x) / (points[i].x - points[j].x);
            }
        }

        c += term; 
    }

    return Math.round(c); 
}

function processInput(filename) {

    const data = fs.readFileSync(filename, 'utf8');
    const input = JSON.parse(data);

    const n = input.keys.n; 
    const k = input.keys.k; 
    const points = []; 

    
    for (let key in input) {
        if (key !== "keys") { 
            const x = parseInt(key); 
            const base = parseInt(input[key].base); 
            const value = input[key].value; 
            const y = decodeValue(value, base); 
            points.push({ x, y }); 
        }
    }

    
    if (points.length < k) {
        console.error("Not enough points to solve for the polynomial.");
        return;
    }

    const c = findConstantTerm(points);
    console.log(`The secret (c) is: ${c}`);
}

function main() {

    const testCase1 = 'testcase1.json';
    const testCase2 = 'testcase2.json';

    console.log("Processing Test Case 1:");
    processInput(testCase1);

    console.log("\nProcessing Test Case 2:");
    processInput(testCase2);
}

main();