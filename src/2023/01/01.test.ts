import { beforeEach, describe, expect, it } from 'vitest';
import { Solution01 } from '.';

describe(Solution01.name, () => {
  let solution: Solution01;

  beforeEach(() => {
    solution = new Solution01('./src/2023/01/input.txt');
  });

  it('should solve part 1', () => {
    expect(solution.solvePart1()).toBe(54953);
  });

  it('should solve part 2', () => {
    expect(solution.solvePart2()).toBe(53868);
  });
});
