async function delay(time: number) {
  await new Promise(resolve => {
    return setTimeout(resolve, time);
  });
}

export { delay }
