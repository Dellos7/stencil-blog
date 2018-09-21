import { Component, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import BlogService from '../../services/config';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {

  @Prop() history: RouterHistory;

  render() {
    return [
      <div class='app-home'>
        <p>Welcome to my blog!!</p>
        <ul>
          {BlogService.posts.map((post) =>
            <li onClick={() => BlogService.goToPost(this.history, post)}>
              <a>{post.metadata.title}</a>
            </li>
          )}
        </ul>

      </div>
    ];
  }
}
