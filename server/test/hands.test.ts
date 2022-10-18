import {calculateHandRanking, caluclateScoreFromHighCard, Card, Suit, Value} from "../src/game"

describe('caluclateScoreFromHighCard module', () => {
  test('ace vs 4 kings test', () => {
      let hand1 = [
        Value.Two,
        Value.Two,
        Value.Two,
        Value.Two,
        Value.Ace
      ]
      let hand2 = [
        Value.King,
        Value.King,
        Value.King,
        Value.King,
        Value.Queen,
      ]
      let handRanking1 = caluclateScoreFromHighCard(hand1);
      let handRanking2 = caluclateScoreFromHighCard(hand2);
      expect(handRanking1).toBeGreaterThan(handRanking2);
  })
})


describe('calculateHandRanking module', () => {
  test('high card compare test', () => {
    let hand1: Card[] = [
      {value: Value.Two, suit: Suit.Diamond}, 
      {value: Value.Ace, suit: Suit.Club}
    ]
    let hand2: Card[] = [
      {value: Value.Two, suit: Suit.Diamond}, 
      {value: Value.Jack, suit: Suit.Club}
    ]
    let table: Card[] = [
      {value: Value.Three, suit: Suit.Club}, 
      {value: Value.Five, suit: Suit.Diamond}, 
      {value: Value.Eight, suit: Suit.Heart}, 
      {value: Value.Ten, suit: Suit.Heart}, 
      {value: Value.King, suit: Suit.Diamond}, 
    ]

    let handRanking1 = calculateHandRanking(table, hand1);
    let handRanking2 = calculateHandRanking(table, hand2);
    expect(handRanking1).toBeGreaterThan(handRanking2);
  });
  
  test('high card test', () => {
    let hand: Card[] = [
      {value: Value.Two, suit: Suit.Diamond}, 
      {value: Value.Jack, suit: Suit.Club}
    ]
    let table: Card[] = [
      {value: Value.Three, suit: Suit.Club}, 
      {value: Value.Five, suit: Suit.Diamond}, 
      {value: Value.Eight, suit: Suit.Heart}, 
      {value: Value.Ten, suit: Suit.Heart}, 
      {value: Value.Ace, suit: Suit.Diamond}, 
    ]
    let handRanking = calculateHandRanking(table, hand);
    expect(handRanking).toBeGreaterThanOrEqual(0);
    expect(handRanking).toBeLessThan(100);
  });

  test('one pair test', () => {
    let hand: Card[] = [
      {value: Value.Two, suit: Suit.Diamond}, 
      {value: Value.Two, suit: Suit.Club}
    ]
    let table: Card[] = [
      {value: Value.Three, suit: Suit.Club}, 
      {value: Value.Five, suit: Suit.Diamond}, 
      {value: Value.Eight, suit: Suit.Heart}, 
      {value: Value.Ten, suit: Suit.Heart}, 
      {value: Value.Ace, suit: Suit.Diamond}, 
    ]
    let handRanking = calculateHandRanking(table, hand);
    expect(handRanking).toBeGreaterThanOrEqual(100);
    expect(handRanking).toBeLessThan(200);
  });

  test('two pair test', () => {
    let hand: Card[] = [
      {value: Value.Two, suit: Suit.Diamond}, 
      {value: Value.Two, suit: Suit.Club}
    ]
    let table: Card[] = [
      {value: Value.Three, suit: Suit.Club}, 
      {value: Value.Three, suit: Suit.Diamond}, 
      {value: Value.Eight, suit: Suit.Heart}, 
      {value: Value.Ten, suit: Suit.Heart}, 
      {value: Value.Ace, suit: Suit.Diamond}, 
    ]
    let handRanking = calculateHandRanking(table, hand);
    expect(handRanking).toBeGreaterThanOrEqual(200);
    expect(handRanking).toBeLessThan(300);
  });

  test('three of a kind test', () => {
    let hand: Card[] = [
      {value: Value.Two, suit: Suit.Diamond}, 
      {value: Value.Two, suit: Suit.Club}
    ]
    let table: Card[] = [
      {value: Value.Three, suit: Suit.Club}, 
      {value: Value.Two, suit: Suit.Diamond}, 
      {value: Value.Eight, suit: Suit.Heart}, 
      {value: Value.Ten, suit: Suit.Heart}, 
      {value: Value.Ace, suit: Suit.Diamond}, 
    ]
    let handRanking = calculateHandRanking(table, hand);
    expect(handRanking).toBeGreaterThanOrEqual(300);
    expect(handRanking).toBeLessThan(400);
  });

  test('straight test', () => {
    let hand: Card[] = [
      {value: Value.Two, suit: Suit.Diamond}, 
      {value: Value.Five, suit: Suit.Club}
    ]
    let table: Card[] = [
      {value: Value.Three, suit: Suit.Club}, 
      {value: Value.Four, suit: Suit.Diamond}, 
      {value: Value.Eight, suit: Suit.Heart}, 
      {value: Value.Six, suit: Suit.Heart}, 
      {value: Value.Ace, suit: Suit.Diamond}, 
    ]
    let handRanking = calculateHandRanking(table, hand);
    expect(handRanking).toBeGreaterThanOrEqual(400);
    expect(handRanking).toBeLessThan(500);
  });

  test('straight test', () => {
    let hand: Card[] = [
      {value: Value.Two, suit: Suit.Diamond}, 
      {value: Value.Five, suit: Suit.Club}
    ]
    let table: Card[] = [
      {value: Value.Three, suit: Suit.Club}, 
      {value: Value.Four, suit: Suit.Diamond}, 
      {value: Value.Eight, suit: Suit.Heart}, 
      {value: Value.Six, suit: Suit.Heart}, 
      {value: Value.Ace, suit: Suit.Diamond}, 
    ]
    let handRanking = calculateHandRanking(table, hand);
    expect(handRanking).toBeGreaterThanOrEqual(400);
    expect(handRanking).toBeLessThan(500);
  });

  test('flush test', () => {
    let hand: Card[] = [
      {value: Value.Two, suit: Suit.Diamond}, 
      {value: Value.Four, suit: Suit.Diamond}
    ]
    let table: Card[] = [
      {value: Value.Three, suit: Suit.Club}, 
      {value: Value.Two, suit: Suit.Spade}, 
      {value: Value.Eight, suit: Suit.Diamond}, 
      {value: Value.Ten, suit: Suit.Diamond}, 
      {value: Value.Ace, suit: Suit.Diamond}, 
    ]
    let handRanking = calculateHandRanking(table, hand);
    expect(handRanking).toBeGreaterThanOrEqual(500);
    expect(handRanking).toBeLessThan(600);
  });

  test('full house standard test', () => {
    let hand: Card[] = [
      {value: Value.Two, suit: Suit.Diamond}, 
      {value: Value.Two, suit: Suit.Diamond}
    ]
    let table: Card[] = [
      {value: Value.Three, suit: Suit.Club}, 
      {value: Value.Two, suit: Suit.Spade}, 
      {value: Value.Eight, suit: Suit.Diamond}, 
      {value: Value.Eight, suit: Suit.Spade}, 
      {value: Value.Ace, suit: Suit.Club}, 
    ]
    let handRanking = calculateHandRanking(table, hand);
    expect(handRanking).toBeGreaterThanOrEqual(600);
    expect(handRanking).toBeLessThan(700);
  });

  test('full house two three of a kind test', () => {
    let hand: Card[] = [
      {value: Value.Two, suit: Suit.Diamond}, 
      {value: Value.Two, suit: Suit.Diamond}
    ]
    let table: Card[] = [
      {value: Value.Three, suit: Suit.Club}, 
      {value: Value.Two, suit: Suit.Spade}, 
      {value: Value.Eight, suit: Suit.Diamond}, 
      {value: Value.Eight, suit: Suit.Spade}, 
      {value: Value.Eight, suit: Suit.Club}, 
    ]
    let handRanking = calculateHandRanking(table, hand);
    expect(handRanking).toBeGreaterThanOrEqual(600);
    expect(handRanking).toBeLessThan(700);
  });

  test('full house three of a kind with two pairs test', () => {
    let hand: Card[] = [
      {value: Value.Two, suit: Suit.Club}, 
      {value: Value.Two, suit: Suit.Diamond}
    ]
    let table: Card[] = [
      {value: Value.Two, suit: Suit.Spade}, 
      {value: Value.Eight, suit: Suit.Diamond}, 
      {value: Value.Eight, suit: Suit.Spade}, 
      {value: Value.Ace, suit: Suit.Club}, 
      {value: Value.Ace, suit: Suit.Club}, 
    ]
    let handRanking = calculateHandRanking(table, hand);
    expect(handRanking).toBeGreaterThanOrEqual(600);
    expect(handRanking).toBeLessThan(700);
  });

  test('four of a kind test', () => {
    let hand: Card[] = [
      {value: Value.Ten, suit: Suit.Diamond}, 
      {value: Value.Ten, suit: Suit.Club}
    ]
    let table: Card[] = [
      {value: Value.Three, suit: Suit.Club}, 
      {value: Value.Ten, suit: Suit.Spade}, 
      {value: Value.Eight, suit: Suit.Diamond}, 
      {value: Value.Ten, suit: Suit.Heart}, 
      {value: Value.Ace, suit: Suit.Diamond}, 
    ]
    let handRanking = calculateHandRanking(table, hand);
    expect(handRanking).toBeGreaterThanOrEqual(700);
    expect(handRanking).toBeLessThan(800);
  });

  test('straight flush test', () => {
    let hand: Card[] = [
      {value: Value.Two, suit: Suit.Diamond}, 
      {value: Value.Three, suit: Suit.Diamond}
    ]
    let table: Card[] = [
      {value: Value.Three, suit: Suit.Club}, 
      {value: Value.Two, suit: Suit.Spade}, 
      {value: Value.Four, suit: Suit.Diamond}, 
      {value: Value.Five, suit: Suit.Diamond}, 
      {value: Value.Six, suit: Suit.Diamond}, 
    ]
    let handRanking = calculateHandRanking(table, hand);
    expect(handRanking).toBeGreaterThanOrEqual(800);
    expect(handRanking).toBeLessThan(900);
  });

  test('straight flush edge case test', () => {
    let hand: Card[] = [
      {value: Value.Two, suit: Suit.Diamond}, 
      {value: Value.Three, suit: Suit.Diamond}
    ]
    let table: Card[] = [
      {value: Value.Ace, suit: Suit.Diamond}, 
      {value: Value.Two, suit: Suit.Spade}, 
      {value: Value.Four, suit: Suit.Diamond}, 
      {value: Value.Five, suit: Suit.Diamond}, 
      {value: Value.Eight, suit: Suit.Diamond}, 
    ]
    let handRanking = calculateHandRanking(table, hand);
    expect(handRanking).toBeGreaterThanOrEqual(800);
    expect(handRanking).toBeLessThan(900);
  });

  test('royale flush test', () => {
    let hand: Card[] = [
      {value: Value.Jack, suit: Suit.Spade}, 
      {value: Value.Ace, suit: Suit.Spade}
    ]
    let table: Card[] = [
      {value: Value.Three, suit: Suit.Club}, 
      {value: Value.Queen, suit: Suit.Spade}, 
      {value: Value.Three, suit: Suit.Diamond}, 
      {value: Value.Ten, suit: Suit.Spade}, 
      {value: Value.King, suit: Suit.Spade}, 
    ]
    let handRanking = calculateHandRanking(table, hand);
    expect(handRanking).toBe(900);
  });
});

//    expect(1 + 2).toBe(3);