function add(a, b) {
  const aNum = parseInt(a);
  const bNum = parseInt(b);
  return aNum + bNum;
}
describe('Sample test 101', () => {
  it('works as expected', () => {
    expect(1).toEqual(1);
    const age = 100;
    expect(age).toEqual(100);
  });
  it('runs the add function', () => {
    expect(add(1, 2)).toEqual(3);
    expect(add(2, 2)).toEqual(4);
  });
  it('can add strings together', () => {
    expect(add('1', '2')).toBe(3);
    expect('test').toContain('test');
  });
});
