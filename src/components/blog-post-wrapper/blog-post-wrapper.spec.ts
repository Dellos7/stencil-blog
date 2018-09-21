import { TestWindow } from '@stencil/core/testing';
import { BlogPostWrapper } from './blog-post-wrapper';

describe('blog-post-wrapper', () => {
  it('should build', () => {
    expect(new BlogPostWrapper()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLBlogPostWrapperElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [BlogPostWrapper],
        html: '<blog-post-wrapper>' 
          + '</blog-post-wrapper>'
      });
    });

    it('creates the element', () => {
      expect(element).toBeTruthy();
    });
  });
});
