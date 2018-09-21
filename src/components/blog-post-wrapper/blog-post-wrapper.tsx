import { Component, Prop } from '@stencil/core';
import BlogService from '../../services/config';


@Component({
  tag: 'blog-post-wrapper',
  styleUrl: 'blog-post-wrapper.css'
})
export class BlogPostWrapper {

  @Prop() uniqueLink: string;
  @Prop({reflectToAttr: true}) metadata: any;

  componentWillLoad() {
    if( !this.metadata ) this.metadata = BlogService.getMetadataForPost( this.uniqueLink );
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
