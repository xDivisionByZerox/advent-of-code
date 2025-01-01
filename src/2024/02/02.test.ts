import { resolve } from 'node:path';
import { beforeEach, describe, expect, it } from 'vitest';
import { Solution02 } from '.';

describe(Solution02.name, () => {
  let solution: Solution02;

  beforeEach(() => {
    solution = new Solution02(resolve(import.meta.dirname, 'input.txt'));
  });

  it('should solve part 1', () => {
    expect(solution.solvePart1()).toBe(526);
  });

  it('should solve part 2', () => {
    expect(solution.solvePart2()).toBe(566);
  });
});
