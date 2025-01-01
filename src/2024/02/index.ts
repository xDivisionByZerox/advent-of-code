import { AbstractSolution } from '../solution.abstract';

export function isReportSave(levels: number[]) {
  let direction: 'increase' | 'decrease' | null = null;
  for (let i = 1; i < levels.length; i++) {
    const previousI = i - 1;
    const previousLevel = levels[previousI];
    const currentLevel = levels[i];

    const diff = currentLevel - previousLevel;
    const currentDirection: 'increase' | 'decrease' = diff > 0 ? 'increase' : 'decrease';

    if (direction === null) {
      direction = diff === 0 ? null : currentDirection;
    }

    if (diff === 0 || diff > 3 || diff < -3 || direction !== currentDirection) {
      return false;
    }
  }

  return true;
}

export class Solution02 extends AbstractSolution<number> {
  /**
   * @see https://adventofcode.com/2024/day/2
   */
  protected implementPart1(input: string[]): number {
    let saveReports = 0;
    for (const report of input) {
      const levels = report.split(' ').map((v) => Number.parseInt(v, 10));
      if (isReportSave(levels)) {
        saveReports++;
      }
    }

    return saveReports;
  }

  /**
   * @see https://adventofcode.com/2024/day/2#part2
   */
  protected implementPart2(input: string[]): number {
    let saveReports = 0;
    for (const report of input) {
      const levels = report.split(' ').map((v) => Number.parseInt(v, 10));
      const levelVariationsWithOnePotentialBadLevel = [
        levels,
        ...levels.map((_, outerIndex) => [...levels].filter((_, innerIndex) => innerIndex !== outerIndex)),
      ];
      if (levelVariationsWithOnePotentialBadLevel.some((levelVariation) => isReportSave(levelVariation))) {
        saveReports++;
      }
    }

    return saveReports;
  }
}
