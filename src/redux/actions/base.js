export default (action, promise, meta = () => {}) =>
  promise.then((payload) => ({
    type: action,
    payload,
    meta: meta(payload),
  }));
