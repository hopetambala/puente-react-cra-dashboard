import { get_age } from './js/providers/Functions';
import { assert } from 'chai';

it('gets the age of the person', () => {
  const date = '1998-10-27';
  const expectedAge = 22;

  let age = get_age(date, new Date());

  assert.equal(age, expectedAge, 'Asserts age function works');
});


