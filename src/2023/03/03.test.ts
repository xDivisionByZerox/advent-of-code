import { beforeEach, describe, expect, it } from 'vitest';
import { Solution03 } from '.';

describe(Solution03.name, () => {
  let solution: Solution03;

  beforeEach(() => {
    solution = new Solution03('./src/2023/03/input.txt');
  });

  it('should solve part 1', () => {
    expect(solution.solvePart1()).toBe(512794);
  });

  it('should solve part 2', () => {
    expect(solution.solvePart2()).toBeGreaterThanOrEqual(0);
  });
});
