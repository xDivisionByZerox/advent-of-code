import { AbstractSolution } from '../solution.abstract';

function parseMultiplicationInstruction(instruction: string): [number, number] {
  const [num1, num2] = instruction.substring(4, instruction.length - 1).split(',');
  return [Number.parseInt(num1, 10), Number.parseInt(num2, 10)];
}

type Token =
  | {
      type: 'activate';
    }
  | { type: 'deactivate' }
  | { type: 'multiply'; num1: number; num2: number };

function tokenizeProgram(program: string): Token[] {
  const tokenList: Token[] = [];
  while (program.length > 0) {
    const match = program.match(/do\(\)|don't\(\)|mul\(\d{1,3},\d{1,3}\)/);
    if (match === null) {
      break;
    }

    const [matchContent] = match;
    if (matchContent === 'do()') {
      tokenList.push({ type: 'activate' });
    } else if (matchContent === "don't()") {
      tokenList.push({ type: 'deactivate' });
    } else if (matchContent.startsWith('mul')) {
      const [num1, num2] = parseMultiplicationInstruction(matchContent);
      tokenList.push({ type: 'multiply', num1, num2 });
    } else {
      console.log('Unknown command:', match);
    }

    program = program.substring((match.index ?? 0) + matchContent.length);
  }

  return tokenList;
}

export class Solution03 extends AbstractSolution<number> {
  /**
   * @see https://adventofcode.com/2024/day/3
   */
  protected implementPart1(input: string[]): number {
    const instructions = input.join('');
    const finds = instructions.matchAll(/mul\(\d{1,3},\d{1,3}\)/g);
    let result = 0;
    for (const [instruction] of finds) {
      const [num1, num2] = parseMultiplicationInstruction(instruction);
      if (Number.isNaN(num1) || Number.isNaN(num2)) {
        console.log(JSON.stringify({ instruction, num1, num2 }));
      }
      result += num1 * num2;
    }

    return result;
  }

  /**
   * @see https://adventofcode.com/2024/day/3#part2
   */
  protected implementPart2(input: string[]): number {
    const program = input.join('');
    const instructions = tokenizeProgram(program);
    console.log(instructions);

    let result = 0;
    let isMultiplicationActive = true;
    for (const instruction of instructions) {
      switch (instruction.type) {
        case 'activate':
          isMultiplicationActive = true;
          break;
        case 'deactivate':
          isMultiplicationActive = false;
          break;
        case 'multiply':
          if (isMultiplicationActive) {
            result += instruction.num1 * instruction.num2;
          }
      }
    }

    return result;
  }
}
