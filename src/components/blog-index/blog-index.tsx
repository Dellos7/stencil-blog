import { Component, State, Method } from '@stencil/core';


@Component({
  tag: 'blog-index',
  styleUrl: 'blog-index.css'
})
export class BlogIndex {

  @State() posts: { file: string, title: string, date: string }[] = [];

  componentWillLoad() {
    this.indexPosts();
  }

  async indexPosts() {
    const fetchRes = await fetch(`/posts.json`);
    if( fetchRes && fetchRes.ok ) {
      const postsJson = await fetchRes.json();
      if( postsJson ) {
        this.posts = postsJson.posts;
        return this.posts;
      }
    }
  }

  @Method()
  getPosts() {
    if( !this.posts ) {
      this.indexPosts().then((posts) => {
        return posts;
      });
    }
  }

  render() {
    let rows = [];
    this.posts.forEach(post => {
      //rows.push(<li><a href={post.file}>{post.title}</a> - {post.date}</li>)
      //post.file = 'theblog/' + post.file;
      post.file = 'theblog/home';
      rows.push(<li><stencil-route-link url={post.file}>{post.title}- {post.date}</stencil-route-link></li>)
    });
    return(
      <ul>{rows}</ul>
    )
  }
}
