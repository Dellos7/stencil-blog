import { TestWindow } from '@stencil/core/testing';
import { BlogIndex } from './blog-index';

describe('blog-index', () => {
  it('should build', () => {
    expect(new BlogIndex()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLBlogIndexElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [BlogIndex],
        html: '<blog-index>' 
          + '</blog-index>'
      });
    });

    it('creates the element', () => {
      expect(element).toBeTruthy();
    });
  });
});
