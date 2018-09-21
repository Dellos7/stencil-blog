import { Component, Prop, Listen, State } from '@stencil/core';
import '@stencil/router';
import BlogService from '../../services/config';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
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

  async componentWillLoad() {
    const data = await BlogService.readData();
    this.postsRoute = data.config.posts_route;
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
    return (
      <div>
      <header>
        <h1>Blog</h1>
      </header>

      <main>
        <stencil-router>
          <stencil-route-switch scrollTopOffset={0}>
            <stencil-route url='/' component='app-home' exact={true} />
            <stencil-route url='/profile/:name?' component='app-profile' />
            {/*<stencil-route url='/post/:unique_link' component='blog-post'>
            </stencil-route>*/}
            <stencil-route url={'/' + this.postsRoute + '/:unique_link'}
              routeRender={(props: { [key: string]: any }) => {
                return (
                  <blog-post-wrapper uniqueLink={props.match.params.unique_link} metadata={props.history.location.state}></blog-post-wrapper>
                );
              }}>
            </stencil-route>
          </stencil-route-switch>
        </stencil-router>
      </main>
    </div>
    );
  }
}
