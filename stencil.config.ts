import { Config } from '@stencil/core';
const { sass } = require('@stencil/sass');

// https://stenciljs.com/docs/config
export const config: Config = {
  outputTargets: [
    {
      type: 'www',
      serviceWorker: {
        swSrc: 'src/sw.js'
      }
    }
  ],
  copy: [
    { src: 'blog/' },
    { src: 'posts.json' }
  ],
  globalScript: 'src/global/app.ts',
  globalStyle: 'src/global/app.scss',
  plugins: [
    sass({
      injectGlobalPaths: [
        'src/global/app.scss',
      ]
    })
  ]
};
