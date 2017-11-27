import __ from './';

describe('adash', () => {
  describe('__.true', () => {
    it('should run the functions till got true', async() => {
      let count = 0;
      const taskA = async () => {
        count++;
        return await Promise.resolve(true)
      };
      const taskB = async () => {
        count++;
        return await Promise.resolve(true)
      };
      const result = await __.true([taskA, taskB]);
      expect(count).toEqual(2);
      expect(result).toEqual(true);
    });
    it('should run just the fist function', async() => {
      let count = 0;
      const taskA = async () => {
        count++;
        return await Promise.resolve(false)
      };
      const taskB = async () => {
        count++;
        return await Promise.resolve(true)
      };
      const result = await __.true([taskA, taskB]);
      expect(count).toEqual(1);
      expect(result).toEqual(false);
    });
  });
});
