export interface Config {
    posts_route: string;
}

export interface Post {
    file: string;
    unique_link: string;
    metadata: any;
}