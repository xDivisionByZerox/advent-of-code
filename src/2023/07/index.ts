import { AbstractSolution } from '../solution.abstract';

type CardResult = {
  A: number;
  K: number;
  Q: number;
  J: number;
  T: number;
  '9': number;
  '8': number;
  '7': number;
  '6': number;
  '5': number;
  '4': number;
  '3': number;
  '2': number;
};


const HAND_TO_VALUE = Object.freeze({
  FIVE: 7,
  FOUR: 6,
  FULL_HOUSE: 5,
  THREE: 4,
  TWO_PAIR: 3,
  PAIR: 2,
  HIGH: 1,
});

type Hand = keyof typeof HAND_TO_VALUE;

const CARDS_TO_VALUE: Record<string, number> = {
  '2': 1,
  '3': 2,
  '4': 3,
  '5': 4,
  '6': 5,
  '7': 6,
  '8': 7,
  '9': 8,
  T: 9,
  J: 10,
  Q: 11,
  K: 12,
  A: 13,
};

export class Solution07 extends AbstractSolution<number> {
  protected implementPart1(input: string[]): number {
    return input
      .map((line): { bid: number; hand: Hand; handValue: number; orginalHand: string } => {
        const [cardPart, bidString] = line.split(' ');
        const bid = Number.parseInt(bidString);
        const cards = this.getCardsOfLine(cardPart);
        const hand = this.getHandFromCards(cards);

        return { bid, hand, handValue: HAND_TO_VALUE[hand], orginalHand: cardPart };
      })
      .sort((a, b) => {
        const result = a.handValue - b.handValue;
        if (result !== 0) {
          return result;
        }

        return this.compareByHighCard(a.orginalHand, b.orginalHand);
      })
      .reduce((result, value, index): number => {
        return result + value.bid * (index + 1);
      }, 0);
  }

  protected implementPart2(input: string[]): number {
    return 0;
  }

  private getCardsOfLine(cardPart: string): CardResult {
    function getNumberOfCards(card: keyof CardResult) {
      return [...cardPart.matchAll(new RegExp(card, 'g'))].length;
    }

    return {
      '2': getNumberOfCards('2'),
      '3': getNumberOfCards('3'),
      '4': getNumberOfCards('4'),
      '5': getNumberOfCards('5'),
      '6': getNumberOfCards('6'),
      '7': getNumberOfCards('7'),
      '8': getNumberOfCards('8'),
      '9': getNumberOfCards('9'),
      T: getNumberOfCards('T'),
      J: getNumberOfCards('J'),
      Q: getNumberOfCards('Q'),
      K: getNumberOfCards('K'),
      A: getNumberOfCards('A'),
    };
  }

  private getHandFromCards(cards: CardResult): Hand {
    const values = Object.values(cards);
    if (values.includes(5)) {
      return 'FIVE';
    } else if (values.includes(4)) {
      return 'FOUR';
    } else if (values.includes(3) && values.includes(2)) {
      return 'FULL_HOUSE';
    } else if (values.includes(3)) {
      return 'THREE';
    } else if (values.filter((val) => val === 2).length === 2) {
      return 'TWO_PAIR';
    } else if (values.includes(2)) {
      return 'PAIR';
    } else {
      return 'HIGH';
    }
  }

  private compareByHighCard(hand1: string, hand2: string): number {
    let compareValue = 0;
    let i = 0;
    while (compareValue === 0 && i < hand1.length) {
      compareValue = CARDS_TO_VALUE[hand1[i]] - CARDS_TO_VALUE[hand2[i]];
      i++;
    }

    return compareValue;
  }
}
