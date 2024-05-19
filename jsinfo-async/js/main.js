// TASKS - Promise

// // -- Re-resolve a promise?

// // What’s the output of the code below?
// let promise = new Promise(function(resolve, reject) {
//   resolve(1);

//   setTimeout(() => resolve(2), 1000);
// });
// promise.then(alert);
// // alerts 1

// // -- Delay with a promise

// // The built-in function setTimeout uses callbacks. Create a promise-based alternative.
// // The function delay(ms) should return a promise. That promise should resolve after ms milliseconds, so that we can add .then to it, like this:
// function delay(ms) {
//   return new Promise((resolve,reject) => {
//     setTimeout(() => resolve(),ms);
//   })
//   // return new Promise(resolve => setTimeout(resolve,ms))
// }
// delay(3000).then(() => alert('runs after 3 seconds'));

// // -- Animated circle with promise

// // Rewrite the showCircle function in the solution of the task Animated circle with callback so that it returns a promise instead of accepting a callback.
// // The new usage:
// showCircle(150, 150, 100).then(div => {
//   div.classList.add('message-ball');
//   div.append("Hello, world!");
// });
// // Take the solution of the task Animated circle with callback as the base.
// function showCircle(cx, cy, radius) {
//     let div = document.createElement('div');
//     div.style.width = 0;
//     div.style.height = 0;
//     div.style.left = cx + 'px';
//     div.style.top = cy + 'px';
//     div.className = 'circle';
//     document.body.append(div);
//     return new Promise(resolve => {
//         setTimeout(() => {
//             div.style.width = radius * 2 + 'px';
//             div.style.height = radius * 2 + 'px';
//             div.addEventListener('transitionend', function handler() {
//               div.removeEventListener('transitionend', handler);
//               resolve(div);
//             });
//         }, 0);
//     })
//   }

///////////////////////////////////////////////////////////////////////////////

// TASKS - Promise chaining

// // -- Promise: then versus catch

// // Are these code fragments equal? In other words, do they behave the same way in any circumstances, for any handler functions?
// promise.then(f1).catch(f2);
// // Versus:
// promise.then(f1, f2);
// // no, not equal => in #1 if error happens in f1 its handled by the catch, but is not in #2, b/c errors are passed down chain

///////////////////////////////////////////////////////////////////////////////

// TASKS - Error handling with promises

// // -- Error in setTimeout

// // What do you think? Will the .catch trigger? Explain your answer.
// new Promise(function(resolve, reject) {
//   setTimeout(() => {
//     throw new Error("Whoops!");
//   }, 1000);
// }).catch(alert);
// // no, because setTimeout is not a promise, so it'll auto-resolve the initial promise
// // CORRECT -- additionally, the error is still generated, but it is uncaught and so put in console

///////////////////////////////////////////////////////////////////////////////

// TASKS - Async/await

// // -- Rewrite using async/await

// // Rewrite this example code from the chapter Promises chaining using async/await instead of .then/catch:
// // function loadJson(url) {
// //     return fetch(url)
// //       .then(response => {
// //         if (response.status == 200) {
// //           return response.json();
// //         } else {
// //           throw new Error(response.status);
// //         }
// //       });
// //   }
// // loadJson('https://javascript.info/no-such-user.json')
// //   .catch(alert); // Error: 404
// async function loadJson(url) {
//     let response = await fetch(url)
//     if (response.status == 200) {
//         return response.json()
//     } else {
//         throw new Error(response.status)
//     }
// }
// loadJson('https://javascript.info/no-such-user.json').catch(alert)

// // -- Rewrite "rethrow" with async/await

// // Below you can find the “rethrow” example. Rewrite it using async/await instead of .then/catch.
// // And get rid of the recursion in favour of a loop in demoGithubUser: with async/await that becomes easy to do.
// // class HttpError extends Error {
// //     constructor(response) {
// //       super(`${response.status} for ${response.url}`);
// //       this.name = 'HttpError';
// //       this.response = response;
// //     }
// //   }
// // function loadJson(url) {
// //     return fetch(url)
// //       .then(response => {
// //         if (response.status == 200) {
// //           return response.json();
// //         } else {
// //           throw new HttpError(response);
// //         }
// //       });
// //   }
// // // Ask for a user name until github returns a valid user
// // function demoGithubUser() {
// //     let name = prompt("Enter a name?", "iliakan");
// //     return loadJson(`https://api.github.com/users/${name}`)
// //       .then(user => {
// //         alert(`Full name: ${user.name}.`);
// //         return user;
// //       })
// //       .catch(err => {
// //         if (err instanceof HttpError && err.response.status == 404) {
// //           alert("No such user, please reenter.");
// //           return demoGithubUser();
// //         } else {
// //           throw err;
// //         }
// //       });
// //   }
// // demoGithubUser();
// class HttpError extends Error {
//     constructor(response) {
//         super(`${response.status} for ${response.url}`)
//         this.name = 'HttpError'
//         this.response = response
//     }
// }
// async function loadJson(url) {
//     let response = await fetch(url)
//     if (response.status == 200) {
//         return response.json()
//     } else {
//         throw new HttpError(response)
//     }
// }
// async function demoGithubUser() {
//     let user
//     while (true) {
//         let name = prompt("Enter a name?", "iliakan")
//         try {
//             user = await loadJson(`https://api.github.com/users/${name}`)
//             break
//         } catch(err) {
//             if (err instanceof HttpError && err.response.status == 404) {
//                 alert("No such user, please reenter.")
//             } else {
//                 throw err
//             }
//         }
//     }
//     alert(`Full name: ${user.name}`)
//     return user
// }
// demoGithubUser()

// // -- Call async from non-async

// // We have a “regular” function called f. How can you call the async function wait() and use its result inside of f?
// // async function wait() {
// //     await new Promise(resolve => setTimeout(resolve, 1000));
// //     return 10;
// //   }
// //   function f() {
// //     // ...what should you write here?
// //     // we need to call async wait() and wait to get 10
// //     // remember, we can't use "await"
// //   }
// // P.S. The task is technically very simple, but the question is quite common for developers new to async/await.
// async function wait() {
//     await new Promise(resolve => setTimeout(resolve, 1000));
//     return 10;
//   }
// function f() {
//     wait().then(response => alert(response))
//   }
// f()
// // That’s the case when knowing how it works inside is helpful.
// // Just treat async call as promise and attach .then to it: