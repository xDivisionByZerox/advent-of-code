import { beforeEach, describe, expect, it } from 'vitest';
import { Solution05 } from '.';

describe(Solution05.name, () => {
  let solution: Solution05;

  beforeEach(() => {
    solution = new Solution05('./src/2023/05/input.txt');
  });

  it('should solve part 1', () => {
    expect(solution.solvePart1()).toBe(535088217);
  });

  it('should solve part 2', () => {
    expect(solution.solvePart2()).toBe(51399228);
  });
});
