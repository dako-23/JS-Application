function proposal() {
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

// const promise = proposal();

// promise
//     .then(result => {
//         console.log(result);
//     })
//     .catch(err => {
//         console.log(err);
//     });

// Promise.all
const firstProposal = proposal();
const secondProposal = proposal();
const thirProposal = proposal();
const fourthProposal = proposal();
// Resolves only if all promises resolves
const groupProposal = Promise.all([
    firstProposal,
    secondProposal,
    thirProposal,
    fourthProposal,
]);

groupProposal
    .then((results) => console.log(results))
    .catch((err) => console.log(err))
    .finally(() => console.log('I da padnem i da biem...'));

// const groupProposal = Promise.allSettled([
//     firstProposal,
//     secondProposal,
//     thirProposal,
//     fourthProposal,
// ]);

// groupProposal
//     .then((result) => console.log(result))
