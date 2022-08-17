import { DateAgoPipe } from './date-ago.pipe';

describe('DateAgoPipe', () => {
  it('create an instance', () => {
    const pipe = new DateAgoPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return "1 second ago"', () => {
    const pipe = new DateAgoPipe();
    expect(pipe.transform(new Date(Date.now() - 1000))).toBe('Just now');
  });

  it('should return "1 minute ago"', () => {
    const pipe = new DateAgoPipe();
    expect(pipe.transform(new Date(Date.now() - 60000))).toBe('1 minute ago');
  });

  it('should return "2 hours ago"', () => {
    const pipe = new DateAgoPipe();
    expect(pipe.transform(new Date(Date.now() - 7200000))).toBe('2 hours ago');
  });

  it('should fail if the input is not a Date', () => {
    const pipe = new DateAgoPipe();
    const x = Boolean(1);
    expect(() => pipe.transform(x, Boolean)).toBeFalsy();
  });
});
