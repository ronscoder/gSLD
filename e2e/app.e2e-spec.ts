import { GSLDPage } from './app.po';

describe('g-sld App', () => {
  let page: GSLDPage;

  beforeEach(() => {
    page = new GSLDPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
