import { AbstractSolution } from '../solution.abstract';

type Position = {
  row: number;
  col: number;
};

type Node = Position & {
  value: string;
};

export class Solution10 extends AbstractSolution<number> {
  protected implementPart1(input: string[]): number {
    const graph = this.findGraph(input);
    return graph.length / 2;
  }

  protected implementPart2(input: string[]): number {
    return 0;
  }

  private findGraph(input: string[]): Node[] {
    function findStart(input: string[]): Position {
      for (let rowIndex = 0; rowIndex < input.length; rowIndex++) {
        const row = input[rowIndex];
        for (let colIndex = 0; colIndex < row.length; colIndex++) {
          if (row[colIndex] === 'S') {
            return { row: rowIndex, col: colIndex };
          }
        }
      }

      throw new Error('Was not able to find starting position.');
    }

    function depthFirstSearch(grid: string[], start: Position): Node[] {
      const nodes: Node[] = [];
      const visited: boolean[][] = Array.from(
        {
          length: input.length,
        },
        () => Array.from({ length: input[0].length }, () => false),
      );

      const stack: Position[] = [start];
      while (stack.length > 0) {
        const { col, row } = stack.pop()!;
        const isValid =
          !visited[row][col] && row >= 0 && row <= grid.length - 1 && col >= 0 && col <= grid[row].length - 1;
        if (!isValid) {
          continue;
        }

        visited[row][col] = true;
        nodes.push({ col, row, value: grid[row][col] });

        switch (grid[row][col]) {
          case '|': {
            stack.push({ col, row: row - 1 });
            stack.push({ col, row: row + 1 });
            break;
          }
          case '-': {
            stack.push({ col: col - 1, row });
            stack.push({ col: col + 1, row });
            break;
          }
          case 'L': {
            stack.push({ col, row: row - 1 });
            stack.push({ col: col + 1, row });
            break;
          }
          case 'J': {
            stack.push({ col, row: row - 1 });
            stack.push({ col: col - 1, row });
            break;
          }
          case '7': {
            stack.push({ col: col - 1, row });
            stack.push({ col, row: row + 1 });
            break;
          }
          case 'F': {
            stack.push({ col, row: row + 1 });
            stack.push({ col: col + 1, row });
            break;
          }
          case 'S':
          case '.': {
            break;
          }
          default: {
            throw new Error(`Unknown symbol found "${grid[row][col]}"`);
          }
        }
      }

      return nodes;
    }

    const start = findStart(input);
    const adjecentCells = [
      { row: start.row, col: start.col - 1 },
      { row: start.row, col: start.col + 1 },
      { row: start.row - 1, col: start.col },
      { row: start.row + 1, col: start.col },
    ];

    let loop: Node[] | null = null;
    for (const cell of adjecentCells) {
      const graph = depthFirstSearch(input, cell);
      const lastNode = graph[graph.length - 1];
      if (lastNode.col === start.col && lastNode.row === start.row) {
        loop = graph;
        break;
      }
    }

    if (loop === null) {
      throw new Error('No loop found from starting position');
    }

    return loop;
  }
}
