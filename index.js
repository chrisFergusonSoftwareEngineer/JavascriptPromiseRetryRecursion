'use strict';

let repeatPromiseArray = [];

let i;
for(i = 0; i < 10; i++) {
    repeatPromiseArray.push(repeatPromise(i, basePromise, 0))
}

Promise.all(repeatPromiseArray)
.then((results) => {
    results.forEach((result) => {
        console.log(JSON.stringify(result));
    })
})

function repeatPromise(targetSecondOnesPlace, promise, recursionCount) {
    return new Promise((resolve, reject) => {
        promise(targetSecondOnesPlace)
        .then((result) => {
            if (result == "retry") {
                sleep(250);
                repeatPromise(targetSecondOnesPlace, promise, recursionCount + 1)
                .then((retryResult) => {
                    resolve(retryResult);
                })
            } else {
                console.log("[" + recursionCount + "]")
                resolve({result: result, count: recursionCount});
            }
        });
    });
}

function basePromise(targetSecondOnesPlace) {
    return new Promise ((resolve, reject) => {
        let now = new Date();
        
        if ((now.getSeconds() % 10) == targetSecondOnesPlace) {
            resolve(now.toISOString());
        }

        resolve("retry");
    });
}

function sleep(ms) {
    let d = new Date();
    d.setTime(d.getTime() + ms);
    let currentTime = new Date();
    while (currentTime.getTime() < d.getTime()) {
        currentTime = new Date();
    }
}