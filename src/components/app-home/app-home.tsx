import { Component, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss'
})
export class AppHome {

  @Prop() history: RouterHistory;

  render() {
    return [
      <div class="home-page">
        <h2 class="heading-secondary">
          About me
        </h2>
        <p>
          David López Castellote
        </p>
      </div>
    ];
  }
}
