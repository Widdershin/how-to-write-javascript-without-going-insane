import {run} from '@cycle/xstream-run';
import {makeDOMDriver, div} from '@cycle/dom';
import diagram from 'stream-tree';
import xs from 'xstream';
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
  .split('-----\n');

function view (slide) {
  return (
    div('.slide', {props: {innerHTML: slide}})
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
  Given: ${{xs, slides, limitTo}}

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
  {.fold((total, change) => limitTo(0, slides.length - 1, total + change), 0)}
                     |
    {.map(slideIndex => slides[slideIndex])}
                     |
                   slide$
`;

const main = diagram`
  Given: ${{xs, slides, div, marked, view, slideNavigation}}

          {sources}
              |
      {slideNavigation}
              |
          {.slide$}
              |
       {.map(marked)}
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
