import { Notify } from './notification';
import { notificationType } from './notificationType';


describe('Notification', () => {
  it('should create an instance', () => {
    expect(new Notify(1, "test body", 1, notificationType.POST, "date", "read")).toBeTruthy();
  });
});