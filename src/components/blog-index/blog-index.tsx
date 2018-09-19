import { Component, State, Method, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';

@Component({
  tag: 'blog-index',
  styleUrl: 'blog-index.css'
})
export class BlogIndex {

  @Prop() history: RouterHistory;
  @State() posts: { file: string, title: string, date: string }[] = [];

  componentWillLoad() {
    console.log(this.history);
    this.indexPosts();
  }

  componentDidLoad() {
    console.log(this.history);
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

  goToPost( title: string, file: string ) {
    let url = '/theblog/' + title;
    this.history.push(url, { title: title, file: file });
  }

  render() {
    let rows = [];
    this.posts.forEach(post => {
      //rows.push(<li><a href={post.file}>{post.title}</a> - {post.date}</li>)
      //post.file = 'theblog/' + post.file;
      post.file = 'theblog/home';
      //rows.push(<li><stencil-route-link url={post.file}>{post.title}- {post.date}</stencil-route-link></li>)
      rows.push(<li onClick={() => this.goToPost( post.title, post.file )}>{post.title}- {post.date}</li>)
    });
    return(
      <ul>{rows}</ul>
    )
  }
}
