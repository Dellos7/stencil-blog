import { Component, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';

@Component({
  tag: 'blog-page',
  styleUrl: 'blog-page.scss'
})
export class BlogPage {

  @Prop() history: RouterHistory;

  formateDate( date: string ) {
    return new Date(date).toLocaleDateString();
  }

  render() {
    return (
      <div class="blog-page">
        <ul class="posts-list">
        {(document.querySelector("#the-blog-component") as HTMLBlogComponentElement).posts.map((post) =>
          <li class="posts-list__item" onClick={() => (document.querySelector("#the-blog-component") as HTMLBlogComponentElement).goToPost(this.history, post)}>
            <div class="posts-list__item-info">
              <h2 class="posts-list__item-info-title">{post.metadata.title}</h2>
              <p class="posts-list__item-info-date">{this.formateDate(post.metadata.date)}</p>
              <p class="posts-list__item-info-summary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore dicta ut reiciendis qui tenetur dolores suscipit dicta ut reiciendis qui tenetur dolores suscipit dicta ut reiciendis qui tenetur dolores suscipit...</p>
            </div>
            <div class="posts-list__item-image">
            </div>
          </li>
        )}
      </ul>
      </div>
    );
  }
}
