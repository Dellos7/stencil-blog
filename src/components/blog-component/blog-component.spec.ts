import { TestWindow } from '@stencil/core/testing';
import { BlogComponent } from './blog-component';

describe('blog-component', () => {
  it('should build', () => {
    expect(new BlogComponent()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLBlogComponentElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [BlogComponent],
        html: '<blog-component>' 
          + '</blog-component>'
      });
    });

    it('creates the element', () => {
      expect(element).toBeTruthy();
    });
  });
});
