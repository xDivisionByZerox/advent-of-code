import { AbstractSolution } from '../solution.abstract';

export class Solution04 extends AbstractSolution<number> {
  /**
   * @see https://adventofcode.com/2024/day/4
   */
  protected implementPart1(input: string[]): number {
    let xmasCount = 0;
    for (let rowIndex = 0; rowIndex < input.length; rowIndex++) {
      const row = input[rowIndex];
      for (let charIndex = 0; charIndex < row.length; charIndex++) {
        const char = row[charIndex];
        if (char !== 'X') {
          continue;
        }

        for (const [baseDirectionX, baseDirectionY] of [
          [-1, -1],
          [0, -1],
          [1, -1],
          [1, 0],
          [1, 1],
          [0, 1],
          [-1, 1],
          [-1, 0],
        ]) {
          const getCharForPostion = (index: number) =>
            input[rowIndex + baseDirectionY * index]?.[charIndex + baseDirectionX * index] ?? '';
          const resultString = getCharForPostion(1) + getCharForPostion(2) + getCharForPostion(3);
          if (resultString === 'MAS') {
            xmasCount++;
          }
        }
      }
    }

    return xmasCount;
  }

  /**
   * @see https://adventofcode.com/2024/day/4#part2
   */
  protected implementPart2(input: string[]): number {
    let xmasCount = 0;
    for (let rowIndex = 0; rowIndex < input.length; rowIndex++) {
      const row = input[rowIndex];
      for (let charIndex = 0; charIndex < row.length; charIndex++) {
        const char = row[charIndex];
        if (char !== 'A') {
          continue;
        }

        const searchStrings = ['MS', 'SM'];
        const getCharForPostion = (x: number, y: number) => input[rowIndex + y]?.[charIndex + x] ?? '';
        const resultString1 = getCharForPostion(-1, -1) + getCharForPostion(1, 1);
        const resultString2 = getCharForPostion(-1, 1) + getCharForPostion(1, -1);
        if (searchStrings.includes(resultString1) && searchStrings.includes(resultString2)) {
          xmasCount++;
        }
      }
    }

    return xmasCount;
  }
}
