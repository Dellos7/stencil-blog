import { TestWindow } from '@stencil/core/testing';
import { BlogPage } from './blog-page';

describe('blog-page', () => {
  it('should build', () => {
    expect(new BlogPage()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLBlogPageElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [BlogPage],
        html: '<blog-page>' 
          + '</blog-page>'
      });
    });

    it('creates the element', () => {
      expect(element).toBeTruthy();
    });
  });
});
