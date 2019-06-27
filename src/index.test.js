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
  describe('__.lastValid', () => {
    it('should return with the last valid thruthy reslult', async() => {
      let count = 0;
      const taskA = async () => {
        count++;
        return await Promise.resolve('first')
      };
      const taskB = async () => {
        count++;
        return await Promise.resolve('second')
      };
      const result = await __.lastValid([taskA, taskB]);
      expect(count).toEqual(2);
      expect(result).toEqual('second');
    });
    it('should return with the default value', async() => {
      let count = 0;
      const taskA = async () => {
        count++;
        return await Promise.resolve(false)
      };
      const taskB = async () => {
        count++;
        return await Promise.resolve(false)
      };
      const result = await __.lastValid([taskA, taskB], 'default');
      expect(count).toEqual(1);
      expect(result).toEqual('default');
    });

  });

  describe('__.first', () => {
    it('should return with the first valid result', async() => {
      const taskA = async () => await Promise.resolve(null);
      const taskB = async () => await Promise.resolve(undefined);
      const taskC = async () => await Promise.resolve(true);

      const result = await __.first([taskA, taskB, taskC]);
      expect(result).toEqual(true);
    });

    it('should return with undefined in case of no valid result', async () => {
      const taskA = async () => await Promise.resolve(null);
      const taskB = async () => await Promise.resolve(null);

      const result = await __.first([taskA, taskB]);
      expect(result).toEqual(undefined);

    });

    it('should use arguments passed', async () => {
      const taskA = async () => await Promise.resolve(null);
      const taskB = async (a, b) => await Promise.resolve(a + b);

      const result = await __.first([taskA, taskB], 40, 2);
      expect(result).toEqual(42);
    });
  });

  describe('__.select', () => {
    it('should select the true case', async() => {
      const result = await __.select(true, 'A', 'B');
      expect(result).toEqual('A');
    });
    it('should select the false case', async() => {
      const result = await __.select(false, 'A', 'B');
      expect(result).toEqual('B');
    });
    it('should select the false case', async() => {
      const taskA = async () => await Promise.resolve('A');
      const taskB = async () => await Promise.resolve('B');
      const functionResult = await __.select(true, taskA, taskB);
      expect(functionResult).toEqual('A');
    });
  });
});
