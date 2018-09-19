import { Component } from '@stencil/core';


@Component({
  tag: 'blog-post-wrapper',
  styleUrl: 'blog-post-wrapper.css'
})
export class BlogPostWrapper {

  render() {
    return [
      <blog-post uniqueLink="index">
        <p slot="before">Before index</p>
        <p slot="after">After index</p>
      </blog-post>,
      <blog-post uniqueLink="post1">
        <p slot="before">Before post1</p>
        <p slot="after">After post1</p>
      </blog-post>
    ];
  }
}
