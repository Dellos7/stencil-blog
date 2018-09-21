import { TestWindow } from '@stencil/core/testing';
import { Blog } from './blog';

describe('blog', () => {
  it('should build', () => {
    expect(new Blog()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLBlogElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [Blog],
        html: '<blog>' 
          + '</blog>'
      });
    });

    it('creates the element', () => {
      expect(element).toBeTruthy();
    });
  });
});
