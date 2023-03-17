async function delay(time) {
    await new Promise(resolve => {
        return setTimeout(resolve, time);
    });
}
export { delay };
