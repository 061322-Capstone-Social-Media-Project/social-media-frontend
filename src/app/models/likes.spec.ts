import { Likes } from './likes';

describe('Likes', () => {
  let likes: Likes;

  beforeEach(() => {
    likes = new Likes(1,1,1);
  })
  it('should create an instance', () => {
    expect(likes).toBeTruthy();
  });
});


describe('Likes', () => {
  it('should create an instance', () => {
    expect(new Likes(2,2,2)).toBeTruthy();
  });
});
