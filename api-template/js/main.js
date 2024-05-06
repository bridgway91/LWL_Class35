//Make an api request using async await
async function getACuteDogPhoto() {
    const res = await fetch('https://dog.ceo/api/breeds/image/rando')
    const data = await res.json()
    console.log(data)
}
try {
    getACuteDogPhoto();
} catch (error) {
    console.log(error);
}
