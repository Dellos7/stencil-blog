import { RouterHistory } from '@stencil/router';
const postsDataFile = '/posts.json';

interface Config {
    posts_route: string;
}

interface Post {
    file: string;
    unique_link: string;
    metadata: any;
}

export default class BlogService {

    public static config: Config;
    public static posts: Post[];

    public static readData(): Promise<{ config: Config, posts: Post[] }> {
        return new Promise<{ config: Config, posts: Post[] }>((resolve, reject) => {
            if (!this.config) {
                fetch(postsDataFile)
                    .then(response => response.json())
                    .then(data => {
                        if (data) {
                            BlogService.posts = data.posts;
                            BlogService.config = {
                                posts_route: data.postsRoute
                            };
                            resolve({ config: BlogService.config, posts: BlogService.posts });
                        }
                        else {
                            reject(`Could not read data from ${postsDataFile} file.`);
                        }
                    });
            }
            else {
                resolve({ config: BlogService.config, posts: BlogService.posts });
            }
        });
    }

    public static goToPost(routerHistory: RouterHistory, post: Post) {
        routerHistory.push(`/${BlogService.config.posts_route}/` + post.unique_link, post.metadata);
    }

    public static getMetadataForPost( uniqueLink: string ): any {
        return this.getPropertyForPost( uniqueLink, 'metadata' );
    }

    public static getFileForPost( uniqueLink: string ): string {
        return this.getPropertyForPost( uniqueLink, 'file' );
    }

    public static getPropertyForPost( uniqueLink: string, property: string ): any {
        let post = this.getPost( uniqueLink );
        if( post ) {
            return post[property];
        }
        return null;
    }

    public static getPost( uniqueLink: string ): Post {
        const posts = BlogService.posts;
        let filteredPosts = posts.filter((post) => {
            return post.unique_link === uniqueLink;
        });
        if (filteredPosts && filteredPosts[0]) {
            return filteredPosts[0];
        }
        return null;
    }

}