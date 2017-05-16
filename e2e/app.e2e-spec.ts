import { PracticeTaskPage } from './app.po';

describe('practice-task App', () => {
  let page: PracticeTaskPage;

  beforeEach(() => {
    page = new PracticeTaskPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
