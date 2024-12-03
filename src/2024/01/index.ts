import { AbstractSolution } from '../solution.abstract';

export class Solution01 extends AbstractSolution<number> {
  /**
   * @see https://adventofcode.com/2024/day/1
   */
  protected implementPart1(input: string[]): number {
    const firstList: number[] = [];
    const secondList: number[] = [];
    for (const touple of input) {
      const [str1, str2] = touple.split(/\s+/);
      firstList.push(Number.parseInt(str1));
      secondList.push(Number.parseInt(str2));
    }

    firstList.sort((a, b) => a - b);
    secondList.sort((a, b) => a - b);

    let result = 0;
    for (let i = 0; i < firstList.length; i++) {
      result += Math.abs(firstList[i] - secondList[i]);
    }

    return result;
  }

  /**
   * @see https://adventofcode.com/2024/day/1#part2
   */
  protected implementPart2(input: string[]): number {
    const firstList: number[] = [];
    const secondListMap: Record<number, number> = {};
    for (const touple of input) {
      const [str1, str2] = touple.split(/\s+/);
      firstList.push(Number.parseInt(str1));
      secondListMap[Number.parseInt(str2)] = (secondListMap[Number.parseInt(str2)] ?? 0) + 1;
    }

    let result = 0;
    for(const value of firstList) {
      result += value * (secondListMap[value] ?? 0);
    }

    return result;
  }
}
