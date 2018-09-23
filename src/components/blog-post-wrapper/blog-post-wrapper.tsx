import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'blog-post-wrapper',
  styleUrl: 'blog-post-wrapper.scss'
})
export class BlogPostWrapper {

  @Prop() uniqueLink: string;
  @Prop({mutable: true}) metadata: any;

  componentWillLoad() {
    //Maybe we have not passed the metadata as property, then we load the metadata using the blog-component
    if( !this.metadata ) this.metadata = (document.querySelector("#the-blog-component") as HTMLBlogComponentElement).getMetadataForPost( this.uniqueLink );
  }

  formateDate( date: string ) {
    return new Date(date).toLocaleDateString();
  }

  render() {
    if( !this.uniqueLink || !this.metadata ) {
      return (<div>Loading...</div>);
    }
    else {
      return (
        <div class="blog-post-wrapper">
          <div class="back-button">
            <stencil-route-link url="/blog">&larr;Back to blog</stencil-route-link>
          </div>
          <blog-post uniqueLink={this.uniqueLink}>
            <div slot="before">
            <h2 class="post-title">
              {this.metadata.title}
            </h2>
            <h3 class="post-date">
              {this.formateDate(this.metadata.date)}
            </h3>
            </div>
            <div class="post-footer" slot="after">Created by David at {this.formateDate(this.metadata.date)}</div>
          </blog-post>
        </div>
      );
    }
  }
}
