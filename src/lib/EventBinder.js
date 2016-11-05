class EventBinder {
  static getEventHandler(props) {
    let handlers = {};
    Object.keys(props).forEach((k) => {
      if (typeof props[k] === 'function' && k.slice(0, 2) === 'on') {
        handlers[k] = props[k];
      }
    });
    return handlers;
  }
}

export default EventBinder;
