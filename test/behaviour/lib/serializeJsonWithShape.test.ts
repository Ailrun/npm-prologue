import { serializeJsonWithShape, serializationShape } from '$/lib/serializeJsonWithShape';

const testShape0: serializationShape = {
  order: [],
};
const testObject0 = {
  a: 123,
  b: '234',
};

const testShape1: serializationShape = {
  order: ['this', 'that', 'theirs'],
  subserializers: {},
};
const testObject1 = {
  that: "abc",
  theirs: true,
  this: {
    world: ['is'],
    other: 12,
  },
  more: "value",
};
const testRegExp1_0 = RegExp(`
{"this":{[^}]*},"that":"abc","theirs":true,[^}]*}
`.trim());
const testRegExp1_1 = RegExp(`
{
abc"this": {
abcabc[^}]*
abc},
abc"that": "abc",
abc"theirs": true,
[^}]*
}
`.trim());

const testShape2: serializationShape = {
  order: ['test0', 'package'],
  subserializers: {
    test0(json, space) {
      return serializeJsonWithShape(json, space, {
        order: ['value', 'result'],
      });
    },
  },
};
const testObject2 = {
  test0: {
    other: true,
    result: 'failed',
    value: 5,
  },
  package: [1, 2, 3],
};
const testRegExp2_0 = RegExp(`
{"test0":{"value":5,"result":"failed","other":true},"package":\\[1,2,3\\]}
`.trim());
const testRegExp2_1 = RegExp(`
{
\t"test0": {
\t\t"value": 5,
\t\t"result": "failed",
\t\t"other": true
\t},
\t"package": \\[
\t\t1,
\t\t2,
\t\t3
\t\\]
}
`.trim());

describe('serializeJsonWithShape', () => {
  it('should work without shape, and the result should be same with result of JSON.stringify', () => {
    expect(serializeJsonWithShape(testObject0)).toBe(JSON.stringify(testObject0));
    expect(serializeJsonWithShape(testObject0, 0)).toBe(JSON.stringify(testObject0, undefined, 0));
    expect(serializeJsonWithShape(testObject0, 2)).toBe(JSON.stringify(testObject0, undefined, 2));
    expect(serializeJsonWithShape(testObject0, '\t')).toBe(JSON.stringify(testObject0, undefined, '\t'));
  });

  it('should work with empty shape and the result should be same with result of JSON.stringify', () => {
    expect(serializeJsonWithShape(testObject0, undefined, testShape0)).toBe(JSON.stringify(testObject0));
    expect(serializeJsonWithShape(testObject0, 0, testShape0)).toBe(JSON.stringify(testObject0, undefined, 0));
    expect(serializeJsonWithShape(testObject0, 2, testShape0)).toBe(JSON.stringify(testObject0, undefined, 2));
    expect(serializeJsonWithShape(testObject0, 20, testShape0)).toBe(JSON.stringify(testObject0, undefined, 20));
    expect(serializeJsonWithShape(testObject0, '', testShape0)).toBe(JSON.stringify(testObject0, undefined, ''));
    expect(serializeJsonWithShape(testObject0, ' ', testShape0)).toBe(JSON.stringify(testObject0, undefined, ' '));
    expect(serializeJsonWithShape(testObject0, 'abc', testShape0)).toBe(JSON.stringify(testObject0, undefined, 'abc'));
    expect(serializeJsonWithShape(testObject0, '$$$$$-----~~~~~', testShape0)).toBe(JSON.stringify(testObject0, undefined, '$$$$$-----~~~~~'));
  });

  it('should follow the order of shape in the result if the order is given', () => {
    expect(serializeJsonWithShape(testObject1, undefined, testShape1)).toMatch(testRegExp1_0);
    expect(serializeJsonWithShape(testObject2, undefined, testShape2)).toMatch(testRegExp2_0);
  });

  it('should ignore second argument of empty string or zero', () => {
    expect(serializeJsonWithShape(testObject1, '', testShape1)).toMatch(testRegExp1_0);
    expect(serializeJsonWithShape(testObject1, 0, testShape1)).toMatch(testRegExp1_0);
    expect(serializeJsonWithShape(testObject2, '', testShape2)).toMatch(testRegExp2_0);
    expect(serializeJsonWithShape(testObject2, 0, testShape2)).toMatch(testRegExp2_0);
  });

  it('should add appropriate spaces if non-zero/non-empty second argument is passed', () => {
    expect(serializeJsonWithShape(testObject1, 'abc', testShape1)).toMatch(testRegExp1_1);
    expect(serializeJsonWithShape(testObject2, '\t', testShape2)).toMatch(testRegExp2_1);
  });
});
