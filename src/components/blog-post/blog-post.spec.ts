import { TestWindow } from '@stencil/core/testing';
import { BlogPost } from './blog-post';

describe('blog-post', () => {
  it('should build', () => {
    expect(new BlogPost()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLBlogPostElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [BlogPost],
        html: '<blog-post>' 
          + '</blog-post>'
      });
    });

    it('creates the element', () => {
      expect(element).toBeTruthy();
    });
  });
});
