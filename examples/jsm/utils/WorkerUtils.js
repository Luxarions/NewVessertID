export const WorkerUtils = {
  create(url, opts = { type: 'module' }) { return new Worker(url, opts); },
  transferable(arrayBuffer) { return [arrayBuffer]; }
};
