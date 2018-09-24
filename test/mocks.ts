export const serverCase = {
  key_one: 1,
  key_two: "two",
  key_three: {
    key_four: [
      {
        key_five: 5
      },
      {
        key_six: 6
      }
    ]
  }
  
};

export const clientCase = {
  keyOne: 1,
  keyTwo: "two",
  keyThree: {
    keyFour: [
      {
        keyFive: 5
      },
      {
        keySix: 6
      }
    ]
  }
  
};

export interface ClientCase {
  keyOne: number;
  ketTwo: string;
  keyThree: {
    keyFour: Array<{
      keyFive?: number;
      keySix?: number;
    }>
  }
}

export interface ErrorCase {
  errorType: string;
};
