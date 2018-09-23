import { Component, Prop, State, Element } from '@stencil/core';
import { MatchResults, RouterHistory } from '@stencil/router';


@Component({
  tag: 'blog-post',
  styleUrl: 'blog-post.css'
})
export class BlogPost {

  @Element() el: HTMLStencilElement;
  @Prop() match: MatchResults;
  @Prop() history: RouterHistory;

  @Prop({ mutable: true }) uniqueLink: string;
  @Prop({ mutable: true }) metadata: string;

  @State() postContent: string;

  componentWillLoad() {
    return this.loadContent();
  }

  private _getUniqueLink() {
    let uniqueLink = this.match && this.match.params && this.match.params.unique_link
      ? this.match.params.unique_link
      : null;
    if (!uniqueLink) {
      uniqueLink = this.history && this.history.location && this.history.location.state && this.history.location.state.unique_link ? this.history.location.state.unique_link : null;
    }
    if (!uniqueLink) {
      uniqueLink = this.uniqueLink;
    }
    return uniqueLink;
  }

  private _getMetadata() {
    let metadata = this.match && this.match.params && this.match.params.metadata
      ? this.match.params.metadata
      : null;
    if (!metadata) {
      metadata = this.history && this.history.location && this.history.location.state && this.history.location.state.metadata ? this.history.location.state.metadata : null;
    }
    if (!metadata) {
      metadata = this.metadata;
    }
    return metadata;
  }

  loadContent() {
    return new Promise((resolve, reject) => {
      this.uniqueLink = this._getUniqueLink();
      this.metadata = this._getMetadata();

      let fileName = (document.querySelector("#the-blog-component") as HTMLBlogComponentElement).getFileForPost(this.uniqueLink);
      if (!fileName) {
        console.error(`No post with unique link ${this.uniqueLink} was found.`)
      }
      else {
        fetch(fileName)
          .then(response => response.text())
          .then(data => {
            this.postContent = data;
            resolve();
          })
          .catch((err) => reject(err));
      }
    })
  }

  render() {
    return [
      <slot name="before" />,
      <div class="blog-post-content" innerHTML={this.postContent}></div>,
      <slot name="after" />
    ];
  }
}