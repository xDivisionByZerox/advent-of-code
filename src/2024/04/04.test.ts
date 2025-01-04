import { resolve } from 'node:path';
import { beforeEach, describe, expect, it } from 'vitest';
import { Solution04 } from '.';

describe(Solution04.name, () => {
  let solution: Solution04;

  beforeEach(() => {
    solution = new Solution04(resolve(import.meta.dirname, 'input.txt'));
  });

  it('should solve part 1', () => {
    expect(solution.solvePart1()).toBe(2504);
  });

  it('should solve part 2', () => {
    expect(solution.solvePart2()).toBe(1923);
  });
});
