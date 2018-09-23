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
        <div class="home-page__container">
          <div class="home-page__container--main">
            <h2 class="heading-secondary">
              About me
            </h2>
            <p class="paragraph">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt adipisci autem illum? Provident nulla culpa, assumenda tenetur sapiente odio hic ad maiores alias cumque eius tempora corrupti voluptate nobis ipsam?
            </p>
          </div>
          <div class="home-page__container--side">
          <h2 class="heading-secondary">
              Skills
          </h2>
          <p class="paragraph">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt adipisci autem illum? Provident nulla culpa, assumenda tenetur sapiente odio hic ad maiores alias cumque eius tempora corrupti voluptate nobis ipsam?
            </p>
            <h2 class="heading-secondary">
              Languages
          </h2>
          <p class="paragraph">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt adipisci autem illum? Provident nulla culpa, assumenda tenetur sapiente odio hic ad maiores alias cumque eius tempora corrupti voluptate nobis ipsam?
            </p>
          </div>
        </div>
      </div>
    ];
  }
}
