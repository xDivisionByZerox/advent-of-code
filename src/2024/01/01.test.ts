import { beforeEach, describe, expect, it } from 'vitest';
import { resolve } from 'node:path';
import { Solution01 } from '.';

describe(Solution01.name, () => {
  let solution: Solution01;

  beforeEach(() => {
    solution = new Solution01(resolve(import.meta.dirname, 'input.txt'));
  });

  it('should solve part 1', () => {
    expect(solution.solvePart1()).toBe(1222801);
  });

  it('should solve part 2', () => {
    expect(solution.solvePart2()).toBe(22545250);
  });
});
