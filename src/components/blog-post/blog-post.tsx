import { Component, Prop, State, Watch } from '@stencil/core';


@Component({
  tag: 'blog-post',
  styleUrl: 'blog-post.css'
})
export class BlogPost {

  @Prop() post: string;
  @State() postContent: string;

  componentWillLoad() {
    this.loadContent();
  }

  @Watch('post')
  async loadContent() {
    const fetchRes = await fetch(`/blog/${this.post}`);
    if( fetchRes && fetchRes.ok ) {
      const data = await fetchRes.text();
      if( data ) {
        this.postContent = data;
      }
    }
  }

  render() {
    return [
      <div innerHTML={this.postContent}></div>
    ];
  }
}
