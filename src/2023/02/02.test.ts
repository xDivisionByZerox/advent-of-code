import { beforeEach, describe, expect, it } from 'vitest';
import { Solution02 } from '.';

describe(Solution02.name, () => {
  let solution: Solution02;

  beforeEach(() => {
    solution = new Solution02('./src/2023/02/input.txt');
  });

  it('should solve part 1', () => {
    expect(solution.solvePart1()).toBe(2416);
  });

  it('should solve part 2', () => {
    expect(solution.solvePart2()).toBe(63307);
  });
});
