import { Component, Prop, Method } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import { Config, Post } from '../../model/interfaces';

const postsDataFile = '/posts.json';

@Component({
  tag: 'blog-component',
  styleUrl: 'blog-component.css'
})
export class BlogComponent {

    @Prop({mutable: true}) config: Config;
    @Prop({mutable: true}) posts: Post[];
    @Prop() history: RouterHistory;

    componentWillLoad() {
      return this.readData();
    }

    /**
     * Reads the data from the 'posts.json' file and sets it as attribute
     */
    @Method()
    readData(): Promise<{ config: Config, posts: Post[] }> {
        return new Promise<{ config: Config, posts: Post[] }>((resolve, reject) => {
            if (!this.config) {
                fetch(postsDataFile)
                    .then(response => response.json())
                    .then(data => {
                        if (data) {
                            this.posts = data.posts;
                            this.config = {
                                posts_route: data.postsRoute
                            };
                            resolve({ config: this.config, posts: this.posts });
                        }
                        else {
                            reject(`Could not read data from ${postsDataFile} file.`);
                        }
                    });
            }
            else {
                resolve({ config: this.config, posts: this.posts });
            }
        });
    }

    /**
     * Go to this post using the stencil router
     * @param routerHistory instance, in this comp. we can't load it as property so we need to get it as param.
     * @param post the post where we want to go to
     */
    @Method()
    goToPost(routerHistory: RouterHistory, post: Post) {
        routerHistory.push(`/${this.config.posts_route}/` + post.unique_link, post.metadata);
    }

    /**
     * Gets the metadata (front matter) for this post
     * @param uniqueLink 
     */
    @Method()
    getMetadataForPost( uniqueLink: string ): any {
        return this.getPropertyForPost( uniqueLink, 'metadata' );
    }

    /**
     * Gets the file (ex. /blog/index.html) that should be fetched in order to show its content
     * @param uniqueLink 
     */
    @Method()
    getFileForPost( uniqueLink: string ): string {
        return this.getPropertyForPost( uniqueLink, 'file' );
    }

    getPropertyForPost( uniqueLink: string, property: string ): any {
        let post = this.getPost( uniqueLink );
        if( post ) {
            return post[property];
        }
        return null;
    }

    getPost( uniqueLink: string ): Post {
        const posts = this.posts;
        let filteredPosts = posts.filter((post) => {
            return post.unique_link === uniqueLink;
        });
        if (filteredPosts && filteredPosts[0]) {
            return filteredPosts[0];
        }
        return null;
    }

  render() {
    return (
      <div>
        <slot/>
      </div>
    );
  }
}
