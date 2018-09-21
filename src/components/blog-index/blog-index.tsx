import { Component, State, Method, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';

@Component({
  tag: 'blog-index',
  styleUrl: 'blog-index.css'
})
export class BlogIndex {

  @Prop() routerHistory: RouterHistory;
  @Prop() history: RouterHistory;
  
  @State() posts: { file: string, title: string, date: string, unique_link: string }[] = [];

  componentWillLoad() {
    return this.indexPosts();
  }

  indexPosts() {
    return fetch(`/posts.json`)
    .then( response => response.json() )
    .then( data => this.posts = data.posts );
  }

  @Method()
  getPosts(): Promise<{ file: string, title: string, date: string, unique_link: string }[]> {
    return new Promise( (resolve, _) => {
      this.indexPosts().then((posts) => {
        this.posts = posts;
        resolve(posts);
      });
    });
  }

}
