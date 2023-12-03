import { readFileSync } from 'fs';

export abstract class AbstractSolution<Output> {
  constructor(private readonly inputPath: string) {}

  solvePart1(): Output {
    return this.implementPart1(this.parseInput());
  }

  solvePart2(): Output {
    return this.implementPart2(this.parseInput());
  }

  protected parseInput(): string[] {
    return readFileSync(this.inputPath).toString().split(/\r?\n/);
  }

  /**
   * The implementation of part 1 of the puzzle.
   *
   * @param input A list of lines of the original input file.
   */
  protected abstract implementPart1(input: string[]): Output;

  /**
   * The implementation of part 2 of the puzzle.
   *
   * @param input A list of lines of the original input file.
   */
  protected abstract implementPart2(input: string[]): Output;
}
