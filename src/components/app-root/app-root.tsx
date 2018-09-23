import { Component, Prop, Listen, State } from '@stencil/core';
import '@stencil/router';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss'
})
export class AppRoot {

  @State() postsRoute: string;
  @Prop({ connect: 'ion-toast-controller' }) toastCtrl: HTMLIonToastControllerElement;

  /**
   * Handle service worker updates correctly.
   * This code will show a toast letting the
   * user of the PWA know that there is a
   * new version available. When they click the
   * reload button it then reloads the page
   * so that the new service worker can take over
   * and serve the fresh content
   */
  @Listen('window:swUpdate')
  async onSWUpdate() {
    const toast = await this.toastCtrl.create({
      message: 'New version available',
      showCloseButton: true,
      closeButtonText: 'Reload'
    });
    await toast.present();
    await toast.onWillDismiss();
    window.location.reload();
  }

  componentDidLoad() {
    //Obviously we set the postsRoute after the blog-component has loaded
    this.postsRoute = (document.querySelector("#the-blog-component") as HTMLBlogComponentElement).config.posts_route;
  }

  /*render() {
    return (
      <ion-app>
        <ion-router useHash={false}>
          <ion-route url="/" component="app-home" />
          <ion-route url="/profile/:name" component="app-profile" />
          <ion-route url="/theblog/:name" component="blog-post" />
    </ion-router>
        <ion-nav />
      </ion-app>
    );
  }*/

  render() {
    if( !this.postsRoute ) {
      return (<blog-component id="the-blog-component"></blog-component>);
    }
    return [
      <div>
        <nav class="navigation">
          <ul class="navigation__list">
            <li class="navigation__list-item">
            <stencil-route-link url="/" activeClass="link-active" exact={true}>
                Home
              </stencil-route-link>
            </li>
            <li class="navigation__list-item">
              <stencil-route-link url="/blog" activeClass="link-active">
                Blog
              </stencil-route-link>
            </li>
            <li class="navigation__list-item"><a href="https://github.com/Dellos7/" target="_blank">Github</a></li>
          </ul>
        </nav>
        <header class="header">
          <div class="header__text-box">
            <h1 class="heading-primary">
              <span class="heading-primary--main heading-primary--main__anim">David López Castellote</span>
              <span class="heading-primary--sub heading-primary--sub__anim">Programmer</span>
            </h1>
          </div>
          <div class="header__bottom-image">
          </div>
        </header>

        <main>
          <blog-component id="the-blog-component">
            <stencil-router>
              <stencil-route-switch scrollTopOffset={0}>
                <stencil-route url='/' component='app-home' exact={true} />
                <stencil-route url='/blog' component='blog-page' exact={true}/>
                {/* For this route we will render a 'blog-post-wrapper' component
                    that gets the 'uniqueLink' param so to be able to load the post content */}
                {/*<stencil-route url={'/' + this.postsRoute + '/:unique_link'}*/}
                <stencil-route url={'/' + this.postsRoute + '/:unique_link'}
                  routeRender={(props: { [key: string]: any }) => {
                    return (
                      <blog-post-wrapper uniqueLink={props.match.params.unique_link}></blog-post-wrapper>
                    );
                  }}>
                </stencil-route>
              </stencil-route-switch>
            </stencil-router>
          </blog-component>
        </main>
      </div>
    ];
  }
}
