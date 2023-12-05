import { AbstractSolution } from '../solution.abstract';

type ConversionMapKey =
  | 'SEED_TO_SOIL'
  | 'SOIL_TO_FERTILIZER'
  | 'FERTILIZER_TO_WATER'
  | 'WATER_TO_LIGHT'
  | 'LIGHT_TO_TEMPERATURE'
  | 'TEMPERATURE_TO_HUMIDITY'
  | 'HUMIDITY_TO_LOCATION';

type ConversionEntry = {
  sourceStart: number;
  sourceEnd: number;
  destinationStart: number;
  destinationEnd: number;
};

type ConversionMap = {
  [Key in ConversionMapKey]: ConversionEntry[];
};

class Solution05Parser {
  parse(lines: string[]): ConversionMap {
    const mapResult: ConversionMap = {
      FERTILIZER_TO_WATER: [],
      HUMIDITY_TO_LOCATION: [],
      LIGHT_TO_TEMPERATURE: [],
      SEED_TO_SOIL: [],
      SOIL_TO_FERTILIZER: [],
      TEMPERATURE_TO_HUMIDITY: [],
      WATER_TO_LIGHT: [],
    };

    let currentKey: ConversionMapKey | null = null;
    for (const line of lines) {
      if (line.length <= 0) {
        continue;
      }

      if (this.isDefinitionLine(line)) {
        currentKey = this.getConversionMapKeyFromLine(line);
        continue;
      }

      if (currentKey === null) {
        continue;
      }

      if (this.isConversionEntryLine(line)) {
        mapResult[currentKey].push(this.getConversionEntryFromLine(line));
      }
    }

    return mapResult;
  }

  private isDefinitionLine(line: string) {
    return /[a-z]+\-to-[a-z]+ map:$/.test(line);
  }

  private getConversionMapKeyFromLine(line: string): ConversionMapKey {
    const [name] = line.split(' ');
    switch (name) {
      case 'seed-to-soil':
        return 'SEED_TO_SOIL';
      case 'soil-to-fertilizer':
        return 'SOIL_TO_FERTILIZER';
      case 'fertilizer-to-water':
        return 'FERTILIZER_TO_WATER';
      case 'water-to-light':
        return 'WATER_TO_LIGHT';
      case 'light-to-temperature':
        return 'LIGHT_TO_TEMPERATURE';
      case 'temperature-to-humidity':
        return 'TEMPERATURE_TO_HUMIDITY';
      case 'humidity-to-location':
        return 'HUMIDITY_TO_LOCATION';
      default:
        throw new Error(`Unknown map type "${name}"!`);
    }
  }

  private isConversionEntryLine(line: string): boolean {
    return /(\d+) (\d+) (\d+)/.test(line);
  }

  private getConversionEntryFromLine(line: string): ConversionEntry {
    const [destinationStart, sourceStart, range] = line.split(' ').map((val) => Number.parseInt(val, 10));
    return {
      sourceStart,
      sourceEnd: sourceStart + range - 1,
      destinationStart,
      destinationEnd: destinationStart + range - 1,
    };
  }
}

export class Solution05 extends AbstractSolution<number> {
  private readonly parser = new Solution05Parser();
  /**
   * --- Day 5: If You Give A Seed A Fertilizer ---
   *
   * You take the boat and find the gardener right where you were told he would be:
   * managing a giant "garden" that looks more to you like a farm.
   *
   * "A water source? Island Island is the water source!"
   * You point out that Snow Island isn't receiving any water.
   *
   * "Oh, we had to stop the water because we ran out of sand to filter it with!
   * Can't make snow with dirty water.
   * Don't worry, I'm sure we'll get more sand soon; we only turned off the water a few days... weeks... oh no."
   * His face sinks into a look of horrified realization.
   *
   * "I've been so busy making sure everyone here has food that I completely forgot to check why we stopped getting more sand!
   * There's a ferry leaving soon that is headed over in that direction - it's much faster than your boat.
   * Could you please go check it out?"
   *
   * You barely have time to agree to this request when he brings up another.
   * "While you wait for the ferry, maybe you can help us with our food production problem.
   * The latest Island Island Almanac just arrived and we're having trouble making sense of it."
   *
   * The almanac (your puzzle input) lists all of the seeds that need to be planted.
   * It also lists what type of soil to use with each kind of seed,
   * what type of fertilizer to use with each kind of soil,
   * what type of water to use with each kind of fertilizer, and so on.
   * Every type of seed, soil, fertilizer and so on is identified with a number,
   * but numbers are reused by each category - that is, soil 123 and fertilizer 123 aren't necessarily related to each other.
   *
   * For example:
   *
   * ```txt
   * seeds: 79 14 55 13
   *
   * seed-to-soil map:
   * 50 98 2
   * 52 50 48
   *
   * soil-to-fertilizer map:
   * 0 15 37
   * 37 52 2
   * 39 0 15
   *
   * fertilizer-to-water map:
   * 49 53 8
   * 0 11 42
   * 42 0 7
   * 57 7 4
   *
   * water-to-light map:
   * 88 18 7
   * 18 25 70
   *
   * light-to-temperature map:
   * 45 77 23
   * 81 45 19
   * 68 64 13
   *
   * temperature-to-humidity map:
   * 0 69 1
   * 1 0 69
   *
   * humidity-to-location map:
   * 60 56 37
   * 56 93 4
   * ```
   *
   * The almanac starts by listing which seeds need to be planted: seeds 79, 14, 55, and 13.
   *
   * The rest of the almanac contains a list of maps which describe how to
   * convert numbers from a source category into numbers in a destination category.
   * That is, the section that starts with seed-to-soil map:
   * describes how to convert a seed number (the source) to a soil number (the destination).
   * This lets the gardener and his team know which soil to use with which seeds,
   * which water to use with which fertilizer, and so on.
   *
   * Rather than list every source number and its corresponding destination number one by one,
   * the maps describe entire ranges of numbers that can be converted.
   * Each line within a map contains three numbers:
   * the destination range start, the source range start, and the range length.
   *
   * Consider again the example seed-to-soil map:
   *
   * ```txt
   * 50 98 2
   * 52 50 48
   * ```
   *
   * The first line has a destination range start of 50, a source range start of 98, and a range length of 2.
   * This line means that the source range starts at 98 and contains two values: 98 and 99.
   * The destination range is the same length, but it starts at 50, so its two values are 50 and 51.
   * With this information, you know that seed number 98 corresponds to soil number 50
   * and that seed number 99 corresponds to soil number 51.
   *
   * The second line means that the source range starts at 50 and contains 48 values: 50, 51, ..., 96, 97.
   * This corresponds to a destination range starting at 52 and also containing 48 values: 52, 53, ..., 98, 99.
   * So, seed number 53 corresponds to soil number 55.
   *
   * Any source numbers that aren't mapped correspond to the same destination number.
   * So, seed number 10 corresponds to soil number 10.
   *
   * So, the entire list of seed numbers and their corresponding soil numbers looks like this:
   *
   * ```txt
   * seed  soil
   * 0     0
   * 1     1
   * ...   ...
   * 48    48
   * 49    49
   * 50    52
   * 51    53
   * ...   ...
   * 96    98
   * 97    99
   * 98    50
   * 99    51
   * ```
   *
   * With this map, you can look up the soil number required for each initial seed number:
   *
   * - Seed number 79 corresponds to soil number 81.
   * - Seed number 14 corresponds to soil number 14.
   * - Seed number 55 corresponds to soil number 57.
   * - Seed number 13 corresponds to soil number 13.
   *
   * The gardener and his team want to get started as soon as possible,
   * so they'd like to know the closest location that needs a seed.
   * Using these maps, find the lowest location number that corresponds to any of the initial seeds.
   * To do this, you'll need to convert each seed number through other categories
   * until you can find its corresponding location number. In this example, the corresponding types are:
   *
   * - Seed 79, soil 81, fertilizer 81, water 81, light 74, temperature 78, humidity 78, location 82.
   * - Seed 14, soil 14, fertilizer 53, water 49, light 42, temperature 42, humidity 43, location 43.
   * - Seed 55, soil 57, fertilizer 57, water 53, light 46, temperature 82, humidity 82, location 86.
   * - Seed 13, soil 13, fertilizer 52, water 41, light 34, temperature 34, humidity 35, location 35.
   *
   * So, the lowest location number in this example is 35.
   *
   * What is the lowest location number that corresponds to any of the initial seed numbers?
   */
  protected implementPart1(input: string[]): number {
    const map = this.parser.parse(input);
    const reducerList = this.createReducerList(map);

    const locations = input[0]
      .substring('seeds: '.length)
      .split(' ')
      .map((seed) => reducerList.reduce<number>((result, lookUp) => lookUp(result), Number.parseInt(seed, 10)));

    return Math.min(...locations);
  }

  /**
   * --- Part Two ---
   * 
   * Everyone will starve if you only plant such a small number of seeds. 
   * Re-reading the almanac, it looks like the seeds: 
   * line actually describes ranges of seed numbers.
   * 
   * The values on the initial seeds: line come in pairs. 
   * Within each pair, the first value is the start of the range and the second value is the length of the range. 
   * So, in the first line of the example above:
   * 
   * ```txt
   * seeds: 79 14 55 13
   * ```
   * 
   * This line describes two ranges of seed numbers to be planted in the garden. 
   * The first range starts with seed number 79 and contains 14 values: 79, 80, ..., 91, 92. 
   * The second range starts with seed number 55 and contains 13 values: 55, 56, ..., 66, 67.
   * 
   * Now, rather than considering four seed numbers, you need to consider a total of 27 seed numbers.
   * 
   * In the above example, the lowest location number can be obtained from seed number 82, 
   * which corresponds to soil 84, 
   * fertilizer 84, 
   * water 84, 
   * light 77, 
   * temperature 45, 
   * humidity 46, 
   * and location 46. 
   * So, the lowest location number is 46.
   * 
   * Consider all of the initial seed numbers listed in the ranges on the first line of the almanac. 
   * What is the lowest location number that corresponds to any of the initial seed numbers?
   */
  protected implementPart2(input: string[]): number {
    // TODO: WHILE THIS WORKS, PLEASE OPTIMIZE (TOOK LIKE 5 MINUTES TO RUN)!!!
    const map = this.parser.parse(input);
    const reducerList = this.createReducerList(map);

    const seedRanges = input[0]
      .substring('seeds: '.length)
      .split(' ')
      .map((val) => Number.parseInt(val, 10));

    let smallestLocation = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < seedRanges.length; i += 2) {
      const start = seedRanges[i];
      const range = seedRanges[i + 1];
      const end =  start + range - 1;

      for(let seed = start; seed <= end; seed++) {
        const location = reducerList.reduce<number>((result, lookUp) => lookUp(result), seed);
        if(location < smallestLocation) {
          smallestLocation = location;
        }
      }
    }

    return smallestLocation;
  }

  private createReducerList(map: ConversionMap) {
    function createLookUp(entries: ConversionEntry[]) {
      return (value: number) => {
        const match = entries.find((entry): boolean => entry.sourceStart <= value && value <= entry.sourceEnd);
        if (match === undefined) {
          return value;
        }

        return match.destinationStart + (value - match.sourceStart);
      };
    }

    return [
      createLookUp(map.SEED_TO_SOIL),
      createLookUp(map.SOIL_TO_FERTILIZER),
      createLookUp(map.FERTILIZER_TO_WATER),
      createLookUp(map.WATER_TO_LIGHT),
      createLookUp(map.LIGHT_TO_TEMPERATURE),
      createLookUp(map.TEMPERATURE_TO_HUMIDITY),
      createLookUp(map.HUMIDITY_TO_LOCATION),
    ];
  }
}
