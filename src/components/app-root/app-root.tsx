import { Component, Prop, Listen } from '@stencil/core';
import '@stencil/router';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {
  
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
        <h1>Stencil App Starter</h1>
      </header>

      <main>
        <stencil-router>
          <stencil-route-switch scrollTopOffset={0}>
            <stencil-route url='/' component='app-home' exact={true} />
            <stencil-route url='/profile/:name?' component='app-profile' />
            <stencil-route url='/post/:unique_link' component='blog-post'>
            </stencil-route>
          </stencil-route-switch>
        </stencil-router>
      </main>
    </div>
    );
  }
}
