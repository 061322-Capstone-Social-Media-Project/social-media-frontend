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

//will work on later
//had to comment out right now so karma will stop throwing errors. -Trey
// describe('Likes', () => {
//   it('should create an instance', () => {
//     expect(new Likes(id,user_id,post_id)).toBeTruthy();
//   });
// });
