import { Component, Prop, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {

  @Prop() history: RouterHistory;
  @State() posts: { file: string, title: string, date: string, unique_link: string }[] = [];

  goToProfile() {
    this.history.push( '/profile', { name: 'stencil' } );
  }

  goToPost( title: string, uniqueLink: string ) {
    this.history.push( '/post/' + uniqueLink, { title: title, unique_link: uniqueLink } );
  }

  componentDidLoad() {
    document.querySelector('blog-index').getPosts().then( (posts) => {
      console.log('pOSTS');
      console.log(posts);
      this.posts = posts;
    });
  }

  render() {
    return [
      <blog-index></blog-index>,
      <div class='app-home'>
        <p>
          Welcome to the Stencil App Starter.
          You can use this starter to build entire apps all with
          web components using Stencil!
          Check out our docs on <a href='https://stenciljs.com'>stenciljs.com</a> to get started.
        </p>

        <stencil-route-link url='/profile/stencil'>
          <button>
            Profile page
          </button>
        </stencil-route-link>

        
        <button onClick={ ()=>this.goToProfile() }>Profile page history</button>
        <button onClick={ ()=>this.goToPost( 'readme', '/blog/readme.html' ) }>Go to post</button>
        <ul>
        { this.posts.map( (post) =>
          <li onClick={ () => this.goToPost( post.title, post.unique_link ) }><a>{post.title}</a></li>
        )}
      </ul>

      <blog-post-wrapper></blog-post-wrapper>

      </div>
    ];
  }
}
