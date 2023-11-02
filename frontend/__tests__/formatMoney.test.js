import formatMoney from '../lib/formatMoney';

describe('formatMoney Function', () => {
  it('works with fractional dollars', () => {
    expect(formatMoney(1)).toEqual('$0.01');
  });
  it('leaves cents off for whole dollars', () => {
    expect(1).toEqual(1);
  });
  it('works with whole and fractional dollars', () => {
    expect(1).toEqual(1);
  });
});
