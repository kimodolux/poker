

export enum Suit {
    Heart = "Heart",
    Diamond = "Diamond",
    Spade = "Spade",
    Club = "Club"
}

export enum Value {
    Two = 2,
    Three = 3,
    Four = 4,
    Five = 5,
    Six = 6,
    Seven = 7,
    Eight = 8,
    Nine = 9,
    Ten = 10,
    Jack = 11,
    Queen = 12,
    King = 13,
    Ace = 14
}

export type Card = {
    suit: Suit,
    value: Value
}

export type Deck = Card[]

export type Duplicate = {
    value: Value,
    count: number
}

let constructNewDeck = () => {
    let deck: Deck = []
    for (let suit in Suit) {
        for(let x=2; x<=14; x++){
            let card: Card = {suit: suit as Suit, value: x as Value}
            deck.push(card)
        }   
    }
    return deck
}

// not using cryptographically secure random numbers, good enough for now
let shuffleDeck = (deck: Deck) => {
    let oldDeck = deck;
    let newDeck = [];
    while(oldDeck.length > 0){
        let length = oldDeck.length
        let randomNum = Math.floor(Math.random() * (length - 1))
        let randomCard = oldDeck[randomNum]
        newDeck.push(randomCard)
        oldDeck.splice(randomNum, 1)
    }
    return newDeck
}

let compareCards = (a: Card, b: Card) => {
    return a.value - b.value
}

// takes hand excluding the cards that make the highest rank and returns a score to settle high card
export let caluclateScoreFromHighCard = (cards: Value[]) => {
    let score = 0;
    let normalize = 433175
    cards.sort((a,b) => a-b)
    cards.map((value) => value = value-2) //from 2-14 to 0-12
    cards.forEach((value, index) => {
        score += Math.pow(value, index) // max - 12
    })
    return score/normalize;
}

// take hand cards and table cards and return a numerical score to compare to other hands
export let calculateHandRanking = (communityCards: Card[], hand: Card[]) => {
    let combinedCards = communityCards.concat(hand)
    combinedCards.sort(compareCards)
    let highestValueCard = 0
    let hearts = 0;
    let spades = 0;
    let clubs = 0;
    let diamonds = 0;
    let previousCard: Card | undefined = undefined;
    let longestSequence = 0;
    // if ace exists, start sequence at 1
    let currentSequence = combinedCards[combinedCards.length-1].value === Value.Ace ? 1 : 0;
    let sequenceMaxValue = 0;
    let duplicates: Duplicate[] = [] 
    
    for(let i = 0; i < combinedCards.length; i++){
        let card = combinedCards[i]
        if(card.value > highestValueCard){
            highestValueCard = card.value
        }
        switch(card.suit){
            case Suit.Club:
                clubs++;
                break;
            case Suit.Spade:
                spades++;
                break;
            case Suit.Diamond:
                diamonds++;
                break;
            case Suit.Heart:
                hearts++;
                break;
            default:
                break;
        }
        if(previousCard){
            if(previousCard.value + 1 === card.value){
                currentSequence++
                if(currentSequence > longestSequence){
                    sequenceMaxValue = card.value
                    longestSequence = currentSequence
                }
            }
            else if(previousCard.value === card.value){
                let dupelicateFound = false
                for(let d=0; d < duplicates.length; d++){
                    if(duplicates[d].value === card.value){
                        duplicates[d].count++
                        dupelicateFound = true
                    }
                }
                if(!dupelicateFound){
                    duplicates.push({value: card.value, count: 2})
                }
            }
            else{
                currentSequence = 0
            }   
        }
        previousCard = card
    }
    let flushExists = false
    if(clubs >= 5 || spades >= 5 || hearts >= 5 || diamonds >= 5){
        flushExists = true
    }
    let flush: Card[] = []
    // check royale flush, 900
    // check straight flush, 800 - 899
    if(flushExists){
        if(clubs >= 5){
            flush = combinedCards.filter((card) => card.suit === Suit.Club)
        }
        else if(spades >= 5){
            flush = combinedCards.filter((card) => card.suit === Suit.Spade)
        }
        else if(hearts >= 5){
            flush = combinedCards.filter((card) => card.suit === Suit.Heart)
        }
        // must be diamonds as flush exists
        else{
            flush = combinedCards.filter((card) => card.suit === Suit.Diamond)
        }
        if(flush[0].value === Value.Ten && flush[1].value === Value.Jack && flush[2].value === Value.Queen && flush[3].value === Value.King &&flush[4].value === Value.Ace){
            // royal flush!!
            return 900
        }
        // check straight flush
        // remember to check ace edge case
        let counter = 1;
        let prevValue = -2;
        for(let i = 0; i < flush.length; i++){
            if(flush[i].value === prevValue+1){
                counter++
            }
            else{
                counter = 1;
            }
            prevValue = flush[i].value
        }
        if(counter >= 5){
            return 800 + prevValue / 14 * 99
        }
        // edge case of ace to five straight
        else if(flush[0].value === Value.Two && flush[1].value === Value.Three && flush[2].value === Value.Four && flush[3].value === Value.Five && flush[flush.length-1].value === Value.Ace){
            return 800 + 5 / 14 * 99
        }
    }

    // check four of a kind, 700 - 799
    if(duplicates.length > 0){
        //4 of a kind!
        for(let d = 0; d < duplicates.length; d++){
            if(duplicates[d].count === 4){
                let highCards = combinedCards.filter(c => c.value != duplicates[d].value).map(c => c.value)
                return 700 + (duplicates[d].value/14) + caluclateScoreFromHighCard(highCards)
            }
        }
        
    }

    // check full house, 600 - 699
    if(duplicates.length >= 2){
        // sort duplicates by count
        let sortedDuplicated = [...duplicates]
        sortedDuplicated.sort((a,b) => b.count - a.count)
        if(duplicates.length > 2){
            // check three of a kind and two pairs
            if(sortedDuplicated[0].count === 3 && sortedDuplicated[1].count === 2 && sortedDuplicated[2].count === 2){
                let max = Math.max(sortedDuplicated[1].value, sortedDuplicated[2].value)
                return 600 + sortedDuplicated[0].count + max/14
            }
        }
        // check two three of a kind
        else if(sortedDuplicated[0].count === 3 && sortedDuplicated[1].count === 3){
            if(sortedDuplicated[0].value > sortedDuplicated[1].value){
                return 600 + sortedDuplicated[0].value + sortedDuplicated[1].value/14
            }
            else{
                return 600 + sortedDuplicated[1].value + sortedDuplicated[0].value/14
            }
        }
        // three of a kind and a pair
        else{
            if(sortedDuplicated[0].count === 3 && sortedDuplicated[1].count === 2){
                return 600 + sortedDuplicated[0].count + sortedDuplicated[1].count/14                
            }
        }
    }
    
    // check flush, 500 - 599
    if(flushExists && flush){
        let flushValues = flush.map(c => c.value)
        return 500 + caluclateScoreFromHighCard(flushValues)
    }

    // check straight, 400 - 499
    if(longestSequence >= 5){
        return 400 + sequenceMaxValue/14 * 99
    }

    // check three of a kind, 300 - 399
    if(duplicates.length > 0){
        for(let d = 0; d < duplicates.length; d++){
            if(duplicates[d].count === 3){
                // three of a kind!
                let highCards = combinedCards.filter(c => c.value != duplicates[d].value).map(c => c.value)
                return 300 + (duplicates[d].value/14*50) + caluclateScoreFromHighCard(highCards)
            }
        }
    }
    // check 2 pair, 200 - 299
    if(duplicates.length >= 2){
        if(duplicates[0].count === 2 && duplicates[1].count){
            // edge case of 3 two pairs
            if(duplicates.length > 2){
                let pairs = duplicates.map(d => d.value)
                pairs.sort((a,b) => b-a)
                let topPairs = pairs.slice(0, 1)
                //two pair!
                let highCards = combinedCards.filter(d => !(d.value in topPairs)).map(c => c.value)
                return 200 + (Math.pow(topPairs[0], 2) / 392 + Math.pow(topPairs[1], 2) / 392) * 50 + caluclateScoreFromHighCard(highCards)
            }
            // two pair
            let pairs = duplicates.map(d => d.value)
            let highCards = combinedCards.filter(d => !(d.value in pairs)).map(c => c.value)
            return 200 + (Math.pow(pairs[0], 2) / 392 + Math.pow(pairs[1], 2) / 392) * 50 + caluclateScoreFromHighCard(highCards)
        }
    }

    // check pair, 100 - 199
    if(duplicates.length > 0){
        for(let d = 0; d < duplicates.length; d++){
            if(duplicates[d].count === 2){
                // pair!
                let pair = duplicates[d].value
                let highCards = combinedCards.filter(d => d.value != pair).map(c => c.value)
                return 100 + pair/14*50 + caluclateScoreFromHighCard(highCards)
            }
        }
    }
    // high card, 0 - 99
    // take top 5 cards
    let highCards = combinedCards.slice(2).map(c => c.value)
    return caluclateScoreFromHighCard(highCards)
}

