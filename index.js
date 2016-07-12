import {run} from '@cycle/xstream-run';
import {makeDOMDriver, div} from '@cycle/dom';
import diagram from 'stream-tree';
import xs from 'xstream';
import debounce from 'xstream/extra/debounce';
import marked from 'marked';
import {highlight} from 'highlight.js';

import keysDriver from './drivers/keys-driver';

marked.setOptions({
  highlight: function (code) {
    return highlight('js', code).value;
  }
});

const fs = require('fs');

const slides = fs
  .readFileSync(__dirname + '/README.md', 'utf-8')
  .split('-----\n')
  .map((slide, index) => ({slide, key: index}));

function highlightCode (slide$) {
  return slide$
    .map(({slide, key}) => ({slide: marked(slide), key}));
}

function view ([slide, direction]) {
  const style = {
    position: 'absolute',
    width: '93.5%',
    transform: `translate(${100 * direction}vw, 0%)`,
    delayed: {transform: `translate(0, 0)`},
    remove: {transform: `translate(${100 * -direction}vw, 0)`}
  };

  return (
    div('.slide', {key: slide.key, style, props: {innerHTML: slide.slide}})
  );
}

function limitTo (min, max, value) {
  if (value < min) {
    return min;
  }

  if (max < value) {
    return max;
  }

  return value;
}

const slideNavigation = diagram`
  Given: ${{xs, slides, limitTo, debounce}}

                   {sources.Keys}
                   /     |      \
                  /      |       \
                 /       |        \
                /        |         \
  {.down('Left')} {.down('Right')} {.down('Space')}
          |              |              |
          |            right$         space$
          |              |              |
          |         {xs.merge(right$, space$)}
          |                   |
    {.mapTo(-1)}         {.mapTo(+1)}
          |                   |
        back$             forward$
          |                   |
        {xs.merge(back$, forward$)}
                    |
         {.compose(debounce(100))}
            |                |
            |                |
            |                |
            |       {.fold((total, change) => limitTo(0, slides.length - 1, total + change), 0)}
            |                          |
      {.startWith(1)}     {.map(slideIndex => slides[slideIndex])}
            |                          |
        direction$                 slide$
`;

const main = diagram`
  Given: ${{xs, slides, div, highlightCode, view, slideNavigation}}

                    {sources}
                        |
                {slideNavigation}
                     |         |
                 {.slide$} {.direction$}
                     |         |
           {highlightCode}     |
                     |         |
                     |         |
                   slide$  direction$
                     |         |
  {slide$.map(slide => direction$.map(direction => [slide, direction]))}
                        |
                    {.flatten()}
                        |
                    {.map(view)}
                        |
                       DOM

`;

const drivers = {
  DOM: makeDOMDriver('.app'),
  Keys: keysDriver
};

run(main, drivers);
