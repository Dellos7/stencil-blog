/**
* This is an autogenerated file created by the Stencil compiler.
* It contains typing information for all components that exist in this project.
*/
/* tslint:disable */

import '@stencil/core';

import '@stencil/router';
import '@stencil/state-tunnel';
import '@ionic/core';
import 'ionicons';
import {
  MatchResults,
  RouterHistory,
} from '@stencil/router';
import {
  Config,
  Post,
} from './model/interfaces';


export namespace Components {

  interface AppHome {
    'history': RouterHistory;
  }
  interface AppHomeAttributes extends StencilHTMLAttributes {
    'history'?: RouterHistory;
  }

  interface AppRoot {}
  interface AppRootAttributes extends StencilHTMLAttributes {}

  interface BlogComponent {
    'config': Config;
    /**
    * Gets the file (ex. /blog/index.html) that should be fetched in order to show its content
    */
    'getFileForPost': (uniqueLink: string) => string;
    /**
    * Gets the metadata (front matter) for this post
    */
    'getMetadataForPost': (uniqueLink: string) => any;
    /**
    * Go to this post using the stencil router
    */
    'goToPost': (routerHistory: RouterHistory, post: Post) => void;
    'history': RouterHistory;
    'posts': Post[];
    /**
    * Reads the data from the 'posts.json' file and sets it as attribute
    */
    'readData': () => Promise<{ config: Config; posts: Post[]; }>;
  }
  interface BlogComponentAttributes extends StencilHTMLAttributes {
    'config'?: Config;
    'history'?: RouterHistory;
    'posts'?: Post[];
  }

  interface BlogPage {
    'history': RouterHistory;
  }
  interface BlogPageAttributes extends StencilHTMLAttributes {
    'history'?: RouterHistory;
  }

  interface BlogPostWrapper {
    'metadata': any;
    'uniqueLink': string;
  }
  interface BlogPostWrapperAttributes extends StencilHTMLAttributes {
    'metadata'?: any;
    'uniqueLink'?: string;
  }

  interface BlogPost {
    'history': RouterHistory;
    'match': MatchResults;
    'metadata': string;
    'uniqueLink': string;
  }
  interface BlogPostAttributes extends StencilHTMLAttributes {
    'history'?: RouterHistory;
    'match'?: MatchResults;
    'metadata'?: string;
    'uniqueLink'?: string;
  }
}

declare global {
  interface StencilElementInterfaces {
    'AppHome': Components.AppHome;
    'AppRoot': Components.AppRoot;
    'BlogComponent': Components.BlogComponent;
    'BlogPage': Components.BlogPage;
    'BlogPostWrapper': Components.BlogPostWrapper;
    'BlogPost': Components.BlogPost;
  }

  interface StencilIntrinsicElements {
    'app-home': Components.AppHomeAttributes;
    'app-root': Components.AppRootAttributes;
    'blog-component': Components.BlogComponentAttributes;
    'blog-page': Components.BlogPageAttributes;
    'blog-post-wrapper': Components.BlogPostWrapperAttributes;
    'blog-post': Components.BlogPostAttributes;
  }


  interface HTMLAppHomeElement extends Components.AppHome, HTMLStencilElement {}
  var HTMLAppHomeElement: {
    prototype: HTMLAppHomeElement;
    new (): HTMLAppHomeElement;
  };

  interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {}
  var HTMLAppRootElement: {
    prototype: HTMLAppRootElement;
    new (): HTMLAppRootElement;
  };

  interface HTMLBlogComponentElement extends Components.BlogComponent, HTMLStencilElement {}
  var HTMLBlogComponentElement: {
    prototype: HTMLBlogComponentElement;
    new (): HTMLBlogComponentElement;
  };

  interface HTMLBlogPageElement extends Components.BlogPage, HTMLStencilElement {}
  var HTMLBlogPageElement: {
    prototype: HTMLBlogPageElement;
    new (): HTMLBlogPageElement;
  };

  interface HTMLBlogPostWrapperElement extends Components.BlogPostWrapper, HTMLStencilElement {}
  var HTMLBlogPostWrapperElement: {
    prototype: HTMLBlogPostWrapperElement;
    new (): HTMLBlogPostWrapperElement;
  };

  interface HTMLBlogPostElement extends Components.BlogPost, HTMLStencilElement {}
  var HTMLBlogPostElement: {
    prototype: HTMLBlogPostElement;
    new (): HTMLBlogPostElement;
  };

  interface HTMLElementTagNameMap {
    'app-home': HTMLAppHomeElement
    'app-root': HTMLAppRootElement
    'blog-component': HTMLBlogComponentElement
    'blog-page': HTMLBlogPageElement
    'blog-post-wrapper': HTMLBlogPostWrapperElement
    'blog-post': HTMLBlogPostElement
  }

  interface ElementTagNameMap {
    'app-home': HTMLAppHomeElement;
    'app-root': HTMLAppRootElement;
    'blog-component': HTMLBlogComponentElement;
    'blog-page': HTMLBlogPageElement;
    'blog-post-wrapper': HTMLBlogPostWrapperElement;
    'blog-post': HTMLBlogPostElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
