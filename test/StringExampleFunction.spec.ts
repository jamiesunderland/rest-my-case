import { noCase } from 'change-case';

describe('StringExampleFunction', () => {

  const camelCaseWithUpperCaseID = (str) => {
    return noCase(str)
      .toLowerCase()
      .split(' ')
      .map(s => s == 'id' ? 'ID': s)
      .map((s, i) => {
        if (i == 0) {
          return s;
        }
        var firstChar = s[0].toUpperCase();
        return firstChar + s.substr(1);
      })
      .join('');
  }

  describe('#camelCaseWithUpperCaseID', () => {

    it('should take a snake case string and return the id key in all caps', () => {
      const snakeCaseString = 'string_with_id_in_it';
      const value = camelCaseWithUpperCaseID(snakeCaseString);
      expect(value).toEqual('stringWithIDInIt');
      const snakeCaseUserID = 'user_id';
      const userIdValue = camelCaseWithUpperCaseID(snakeCaseUserID);
      expect(userIdValue).toEqual('userID');
    });

  });

});
