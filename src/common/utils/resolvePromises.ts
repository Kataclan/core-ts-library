export async function resolvePromiseAllSequentially(promises, stopIfError = false) {
  const callablePromises = promises.map((each) => {
    return () => each();
  });

  const responses = [];

  for (const eachPromise of callablePromises) {
    const response = await eachPromise();
    const { error } = response;

    if (error) {
      if (stopIfError) {
        return [{ error }];
      }

      responses.push({ error });
    } else {
      responses.push(response);
    }
  }

  return responses;
}
