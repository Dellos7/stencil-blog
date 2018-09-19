import { Component, Prop, State, Watch } from '@stencil/core';
import { MatchResults } from '@stencil/router';


@Component({
  tag: 'blog-post',
  styleUrl: 'blog-post.css'
})
export class BlogPost {

  @Prop() match: MatchResults;
  @Prop() post: string;
  @State() postContent: string;

  componentWillLoad() {
    this.loadContent();
  }

  @Watch('post')
  async loadContent() {
    const post = this.match.params.post;
    console.log('POST');
    console.log(post);
    this.post = post;
    //const fetchRes = await fetch(`/blog/${this.post}`);
    const fetchRes = await fetch(`/blog/${post}.html`);
    //const fetchRes = await fetch(`/blog/${post}.html`);
    if( fetchRes && fetchRes.ok ) {
      const data = await fetchRes.text();
      if( data ) {
        this.postContent = data;
        console.log(this.postContent);
      }
    }
  }

  render() {
    return [
      <div><p>hey!! {this.post}</p></div>,
      <div innerHTML={this.postContent}></div>
    ];
  }
}
