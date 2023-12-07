import { beforeEach, describe, expect, it } from 'vitest';
import { Solution07 } from '.';

describe(Solution07.name, () => {
  let solution: Solution07;

  beforeEach(() => {
    solution = new Solution07('./src/2023/07/input.txt');
  });

  it('should solve part 1', () => {
    expect(solution.solvePart1()).toBe(250898830);
  });

  it('should solve part 2', () => {
    expect(solution.solvePart2()).toBeGreaterThan(0);
  });
});
