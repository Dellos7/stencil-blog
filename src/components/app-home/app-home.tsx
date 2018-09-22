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
      {/*<div class='app-home'>
        <p>Welcome to my blog!! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti earum quae, consectetur nihil ullam eaque saepe excepturi officiis sunt veniam magnam harum praesentium nisi, ipsa sequi dolore dignissimos hic quos?</p>
        <ul class="posts-list">
          {(document.querySelector("#the-blog-component") as HTMLBlogComponentElement).posts.map((post) =>
            <li class="posts-list__item" onClick={() => (document.querySelector("#the-blog-component") as HTMLBlogComponentElement).goToPost(this.history, post)}>
              <div class="posts-list__item-info">
                <h2 class="posts-list__item-info-title">{post.metadata.title}</h2>
                <p class="posts-list__item-info-date">{post.metadata.date}</p>
                <p class="posts-list__item-info-summary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore dicta ut reiciendis qui tenetur dolores suscipit,.</p>
              </div>
              <div class="posts-list__item-image">
              </div>
            </li>
          )}
        </ul>

    </div>*/}
    ];
  }
}
