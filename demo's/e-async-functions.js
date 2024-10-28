function propose() {
    const promise = new Promise((resolve, reject) => {
        console.log('Will you marry me?');

        setTimeout(() => {
            if (Math.random() < 0.5) {
                resolve('Just married!');
            } else {
                reject('It\'s not you, it\s me!');
            }
        }, 3650);
    });

    return promise;
}

async function groupProposal() {
    console.log('Before proposal');
    try {
        const result = await propose();

        console.log(result);
        console.log('After proposal');
    } catch (err) {
        console.log(err);
    }
}

console.log('Before group proposal')
groupProposal();
console.log('After group proposal')
// Async functions always return promise
