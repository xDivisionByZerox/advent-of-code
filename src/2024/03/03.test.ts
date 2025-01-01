import { resolve } from 'node:path';
import { beforeEach, describe, expect, it } from 'vitest';
import { Solution03 } from '.';

describe(Solution03.name, () => {
  let solution: Solution03;

  beforeEach(() => {
    solution = new Solution03(resolve(import.meta.dirname, 'input.txt'));
  });

  it('should solve part 1', () => {
    expect(solution.solvePart1()).toBe(181345830);
  });

  it('should solve part 2', () => {
    expect(solution.solvePart2()).toBe(98729041);
  });
});
