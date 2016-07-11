import xs from 'xstream';
import fromEvent from 'xstream/extra/fromEvent';
import keycode from 'keycode';

export default function keysDriver () {
  const keydown$ = fromEvent(document, 'keydown');
  return {
    down (code) {
      if (typeof code === 'string') {
        code = keycode(code);
      }

      return keydown$
        .filter(event => event.keyCode === code);
    }
  };
}
