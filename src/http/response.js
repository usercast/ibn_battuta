export const noop = () => {};

export const successErrorHandler = (resolve, reject) => {
  const success = (data, status) => resolve(data);
  const err = error => {
    console.error(error);
    reject && reject(error);
  };
  return {
    success,
    err
  };
};
