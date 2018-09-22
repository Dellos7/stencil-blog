import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'blog-post-wrapper',
  styleUrl: 'blog-post-wrapper.css'
})
export class BlogPostWrapper {

  @Prop() uniqueLink: string;
  @Prop({mutable: true}) metadata: any;

  componentWillLoad() {
    //Maybe we have not passed the metadata as property, then we load the metadata using the blog-component
    if( !this.metadata ) this.metadata = (document.querySelector("#the-blog-component") as HTMLBlogComponentElement).getMetadataForPost( this.uniqueLink );
  }

  render() {
    if( !this.uniqueLink || !this.metadata ) {
      return (<div>Loading...</div>);
    }
    else {
      return (
        <blog-post uniqueLink={this.uniqueLink}>
          <p slot="before">{this.metadata.title}</p>
          <p slot="after">Created by David at {this.metadata.date}</p>
        </blog-post>
      );
    }
  }
}
