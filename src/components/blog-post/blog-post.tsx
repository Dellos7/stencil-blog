import { Component, Prop, State, Element } from '@stencil/core';
import { MatchResults, RouterHistory, injectHistory } from '@stencil/router';


@Component({
  tag: 'blog-post',
  styleUrl: 'blog-post.css'
})
export class BlogPost {

  @Element() el: HTMLStencilElement;
  @Prop() match: MatchResults;
  @Prop() history: RouterHistory;

  file: string;
  title: string;

  @Prop() uniqueLink: string;
  @State() postContent: string;

  componentWillLoad() {
    return this.loadContent();
  }

  getFileName(uniqueLink: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      fetch(`/posts.json`)
        .then(response => response.json())
        .then(data => {
          if (data) {
            console.log(uniqueLink);
            console.log(data.posts);
            let filteredPosts = data.posts.filter((post) => {
              return post.unique_link === uniqueLink;
            });
            console.log(filteredPosts);
            if (filteredPosts && filteredPosts[0]) {
              resolve(filteredPosts[0].file);
            }
            else {
              reject(`No post with unique link ${uniqueLink} was found.`);
            }
          }
          else {
            reject(`No post with unique link ${uniqueLink} was found.`);
          }
        });
    });
  }

  loadContent() {
    return new Promise((resolve, reject) => {
      let uniqueLink =
        this.match && this.match.params && this.match.params.unique_link
          ? this.match.params.unique_link
          : null;
      if (!uniqueLink) {
        uniqueLink = this.history && this.history.location && this.history.location.state && this.history.location.state.unique_link ? this.history.location.state.unique_link : null;
      }
      if( !uniqueLink ) {
        uniqueLink = this.uniqueLink;
      }
      this.getFileName(uniqueLink).then((fileName) => {
        fetch(fileName)
          .then(response => response.text())
          .then(data => {
            this.postContent = data;
            resolve();
          });
      })
        .catch(err => {
          console.error(err);
          reject(err);
        });
    });
  }

  render() {
    return [
      <stencil-route-link url='/'>
      &larr;Go back
    </stencil-route-link>,
        <slot name="before" />,
        <div class="blog-post" padding>
          <div innerHTML={this.postContent}></div>
        </div>,
        <slot name="after" />
    ];
  }
}

injectHistory(BlogPost);