class WorkerBridge {
  constructor(workerUrl) {
    this.worker = typeof Worker !== 'undefined' ? new Worker(workerUrl, { type: 'module' }) : null;
    this.handlers = new Map();
  }
  on(type, fn) {
    this.handlers.set(type, fn);
    this.worker?.addEventListener('message', (e) => {
      if (e.data?.type === type) fn(e.data.payload);
    });
  }
  post(type, payload) { this.worker?.postMessage({ type, payload }); }
  terminate() { this.worker?.terminate(); }
}

export { WorkerBridge };
