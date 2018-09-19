import { Component } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Home ;)</ion-title>
        </ion-toolbar>
      </ion-header>,

      <blog-index></blog-index>,

      <ion-content padding>
        {/*<p>
          Welcome to the PWA Toolkit. You can use this starter to build entire
          apps with web components using Stencil and ionic/core! Check out the
          README for everything that comes in this starter out of the box and
          check out our docs on <a href="https://stenciljs.com">stenciljs.com</a> to get started.
        </p>

        <ion-button href="/profile/ionic" expand="block">Profile page</ion-button>*/}
        <p>Hi</p>
        <blog-index></blog-index>
        {/*<blog-post post="Home_2018-9-18.html"></blog-post>
        <blog-post post="readme_2018-9-18.html"></blog-post>*/}
      </ion-content>
    ];
  }
}
