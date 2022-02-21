export const IntervalFactory = (delay = 1000) => {
  let listeners = [];
  let interval = setInterval(() => {
    listeners.map((l)=> l())
  }, delay);

  return {
    onTick: (listener) => {
      listeners.push(listener);
      return () => {
        let i = listeners.indexOf(listener);
        listeners.splice(i, 1);
      }
    },
    removeAll: () => {
      listeners = [];
    }
  }
}

export const timer = IntervalFactory(1000);
