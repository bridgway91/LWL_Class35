// // L1
// console.log('Synchronous 1')

// // L2
// setTimeout(_ => console.log('Timeout 2'),0)

// // L3
// Promise.resolve().then(_ => console.log('Promise'))

// // L4
// console.log('Synchronous 4')

//------------------------------------------------

// Basic
const getFruit = async(name) => { // removing async would lead to same result as below comment
    const fruits = {
        pineapple: 'p',
        peach: 'P',
        strawberry: 's'
    }

    return fruits[name] // by putting Promise.resolve(fruits[name])
}

getFruit('peach').then(console.log)


// Async + Await
const makeSmoothie = async() => {
    const a = getFruit('pineapple')
    const b = getFruit('strawberry')
    const smoothie = await Promise.all([a,b])

    return smoothie // promise.all() can be used in situations where the various promises being run are independent of each other
}

makeSmoothie().then(console.log)