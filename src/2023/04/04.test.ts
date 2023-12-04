import { beforeEach, describe, expect, it } from 'vitest';
import { Solution04 } from '.';

describe(Solution04.name, () => {
  let solution: Solution04;

  beforeEach(() => {
    solution =  new Solution04('./src/2023/04/input.txt');
  });

  it('should solve part 1', () => {
    expect(solution.solvePart1()).toBe(17803);
  });

  it('should solve part 2', () => {
    expect(solution.solvePart2()).toBeGreaterThan(0);
  });
});
