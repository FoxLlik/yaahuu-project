const Player = require("./player")

const HIGH_CARD = require('./cardValidation/highCard')
const FIVE_RANKS = require('./cardValidation/fiveRanks')
const gameSocket = require('../../socket/card13')
const { top } = require("cli-color/move")


// Хөзрийн дүрсний эрэмбийг тогтоох нь
dursRank = {
    "s": 4,         //  S -> ♤ Гил ♤
    "h": 3,         //  H -> ♥ Бунд ♥
    "c": 2,         //  C -> ♧ Цэцэг ♧
    "d": 1,         //  D -> ♢ Дөөшиг ♢
}

tooRank = {
    "2": 13,        // 2 ->
    "a": 12,        // A ->
    "k": 11,        // K ->
    "q": 10,        // Q ->
    "j": 9,         // J ->
    "10": 8,        // 10 ->
    "9": 7,         // 9 ->
    "8": 6,         // 8 ->
    "7": 5,         // 7 ->
    "6": 4,         // 6 ->
    "5": 3,         // 5 ->
    "4": 2,         // 4 ->
    "3": 1,         // 3 ->
}

cardRank = {
    "STRAIGHT": 1,
    "FLUSH": 2,
    "FULL_HOUSE": 3,
    "FOUR_OF_A_KIND": 4,
    "STRAIGHT_FLUSH": 5,
    "ROYAL_FLUSH": 6,
}

/**
 * BOT
 */
class Bot extends Player{

    constructor(_id, nickName, playerNumber, avatar)
    {
        super(_id, null, nickName, playerNumber, avatar, true)
    }

    /**
     * Хөзрийн дүрс тоо салгах
     * @param {String} card хөзөр
     * @returns тоо хөзрийн дүрс
     */
    getCardNumberDurs(card)
    {
        return { durs: card.charAt(0), too: card.slice(1) }
    }

    /**
     * Өгөгдсөн хөзрийн ранкнаас дээших ранкны key-ийн жагсаалтыг авах
     * @param {Array} currentRank 5 хөзрийн ранк
     * @returns key list
     */
    getRank(currentRank)
    {
        let searchRanks = []
        const objectArray = Object.entries(cardRank);

        objectArray.forEach(([key, value]) => {
            if (value >=cardRank[currentRank])
                searchRanks.push(key)
        });

        return searchRanks
    }

    /**
     * Bot дугаарыг өөрчлөх
     * @param {Number} number өрөөний дараалал
     */
    setPlayerNumber(number)
    {
        return super.setPlayerNumber(number)
    }

    /**
     * Bot гаргах боломжтой хөзрийг тооцоолох
     * @param {String} lastMovedPlayerId     сүүлд гарсан тоглогч
     * @param {Array} lastMOvedCard         сүүлд гарсан тоглогчийн хөзөр
     * @returns тухайн bot гаргах боломжтой хөзөр
     */
    generateBotMove(lastMovedPlayerId, removeCardList)
    {
        const lastMovedCardLength = removeCardList.length
        const lastMoveKey = removeCardList.join('')
        let lastRank = 0
        let sendCard = []
        let myCards = this.deck

        // Хамгийн сүүлд гарсан тоглогч өөрөө байх юм бол хамгийн муу хөзрөөр гарна
        if(lastMovedPlayerId === this._id)
        {
            sendCard.push(myCards[0])
        }
        else
        {
            // Газрын хөзрийн ширхэгээс хамаарч идэх боломжтой хамгиийн муу модоор гаргана
            if(lastMovedCardLength === 1)
            {
                lastRank = HIGH_CARD[lastMoveKey]
                for(let i=0; i<myCards.length ; i++)
                {
                    let removeCardRank = HIGH_CARD[myCards[i]]

                    if(lastRank < removeCardRank)
                    {
                        sendCard.push(myCards[i])
                        i = myCards.length
                    }
                }
            }
            else if (lastMovedCardLength === 2 && myCards.length >= 2)
            {
                const lastBestCard = this.findBestCard(removeCardList)
                sendCard = this.findTwoPairsFromDeck(myCards, lastBestCard.too, lastBestCard.durs)
            }
            else if (lastMovedCardLength === 3 && myCards.length >= 3)
            {
                const lastBestCard = this.findBestCard(removeCardList)
                sendCard = this.findThreePairFromDeck(myCards, lastBestCard.too, lastBestCard.durs)
            }
            else if (lastMovedCardLength === 5 && myCards.length >= 5)
            {
                const combinations = this.getCombinationsOfLen(myCards, 5)
                sendCard = this.findMoveCardForFive(combinations, removeCardList)
                // const removeCardListWithDursToo = removeCardList.map(card =>
                //     {
                //         return this.getCardNumberDurs(card)
                //     })

                // const removeCardRank = this.findCardRank(removeCardListWithDursToo)

                // if (removeCardRank === undefined)
                //     return sendCard

                // const removeCardSetRank = this.getRank(removeCardRank)
                // const myCardsWithTooDurs = myCards.map(card =>
                //     {
                //         return this.getCardNumberDurs(card)
                //     })
                // sendCard = this.findMoveCardForFive(myCards, removeCardSetRank, removeCardList, removeCardListWithDursToo)
            }
        }

        return sendCard
    }

    /**
     * Тухайн хөзрийн олонлогоос two pair ялгах
     * @param {Array} deck                  Тоглогчийн хөзөрүүд
     * @param {String} lastToo               Газар гаргасан хөзрийн тоо
     * @param {String} lastDurs              Газар гаргасан хөзрийн дүрс
     * @returns Газрийн хөзрийг дийлэх хөзрийн жагсаалт
     */
    findTwoPairsFromDeck(deck, lastToo, lastDurs)
    {
        let cardMove = []
        for(let i=0 ; i<deck.length-1 ; i++)
        {
            for(let j=i+1 ; j<deck.length ; j++)
            {
                let { durs: firstDurs, too: firstToo } = this.getCardNumberDurs(deck[i])
                let { durs: secondDurs, too: secondToo } = this.getCardNumberDurs(deck[j])
                if(firstToo===secondToo && tooRank[lastToo] < tooRank[firstToo] ||
                    (firstToo===secondToo && tooRank[lastToo] === tooRank[firstToo] && (dursRank[lastDurs] < dursRank[firstDurs] || dursRank[lastDurs] < dursRank[secondDurs])))
                {
                    cardMove.push(deck[i])
                    cardMove.push(deck[j])
                    i = deck.length-1
                    j = deck.length
                }
            }
        }
        return cardMove
    }

    /**
     * Гарынн модыг дийлэх threePair байгаа эсэхийг шалгах
     * @param {Array} deck                  Тоглогчийн хөзөрүүд
     * @param {String} lastToo               Газар гаргасан хөзрийн тоо
     * @param {String} lastDurs              Газар гаргасан хөзрийн дүрс
     * @returns Газрийн хөзрийг дийлэх хөзрийн жагсаалт
     */
    findThreePairFromDeck(deck, lastToo, lastDurs)
    {
        let cardMove = []
        let convertedDeck = []
        let skipIndex = []
        let threePairs = []
        let currentSkipIndex = []
        let dursRank =false

        for(let i = 0 ; i < deck.length ; i++)
        {
            const { durs, too } = this.getCardNumberDurs(deck[i])
            convertedDeck.push({ durs, too })
        }

        for(let i = 0 ; i < convertedDeck.length ; i++)
        {
            // 3 Хос байхгүй хөзрийн index давхцаж байгаа эсхийг шалгаад skip-лэх
            if(skipIndex.includes(i))
            {
                continue
            }

            const count = convertedDeck.filter((card, index) =>
                {
                    if(card.too === convertedDeck[i].too)
                    {
                        if(threePairs.length < 4  && tooRank[lastToo] < tooRank[card.too])
                        {
                            if(dursRank[lastDurs] < dursRank[card.durs])
                                dursRank = true
                            threePairs.push(card.durs + card.too)
                            return true
                        }
                        else
                        {
                            currentSkipIndex.push(index)
                        }
                    }
                    else
                    {
                        return false
                    }
                }).length

            if (count === 3 && dursRank)
            {
                cardMove = threePairs
                i = convertedDeck.length
            }
            else
            {
                threePairs = []
                skipIndex = skipIndex.concat(currentSkipIndex)
                dursRank = false
            }
            currentSkipIndex = []
        }
        return cardMove
    }

        /**
     * Тухайн хөзрийн олонлогоос хамгийн том хөзрийг олох
     * @param {String} cards     Хөзрийн жагсаалт
     */
    findBestCard(cards)
    {
        let topRanker = {
            card: undefined,
            durs: undefined,
            too: undefined,
        }

        cards.map(card =>
            {
                const { durs, too } = this.getCardNumberDurs(card)
                if (tooRank[topRanker.too] < tooRank[too] ||
                    ( tooRank[topRanker.too] === tooRank[too] && dursRank[topRanker.durs] < dursRank[durs]) ||topRanker.too === undefined || topRanker.durs === undefined)
                {
                    topRanker = {
                        card: card,
                        durs: durs,
                        too: too,
                    }
                }
            })

        return topRanker
    }

    /**
     * Газрын хөзрөөс дээш ранк бүхий set олонлог
     * @param {String} cards хөзрийн жагсаалт
     * @returns Тухайн хөзрийн жагсаалт straight мөн эсэхийг буцаана
     */
    findCardRank(cards)
    {
        let cardRank = undefined
        let isStaight = true
        let isFlush = true
        let isFullHouse = false
        let fourKind = false
        let fistCardToo = cards[0].too
        let lastCardToo = cards[4].too

        for (let i = 0 ; i < cards.length-1 ; i++)
        {
            if (tooRank[cards[i].too]+1 !== tooRank[cards[i+1].too])
            {
                isStaight = false
            }
            if(dursRank[cards[i].durs] !== dursRank[cards[i+1].durs])
            {
                isFlush = false
            }
        }

        if (
            (cards[1].too === fistCardToo && cards[2].too === fistCardToo && cards[3].too === fistCardToo) ||
            (cards[1].too === lastCardToo && cards[2].too === lastCardToo && cards[3].too === lastCardToo)
            )
            {
                fourKind = true
            }

        if(
            (cards[0].too === fistCardToo && cards[1].too === fistCardToo && cards[2].too === fistCardToo && cards[3].too === lastCardToo && cards[4].too === lastCardToo) ||
            (cards[0].too === fistCardToo && cards[1].too === fistCardToo && cards[2].too === lastCardToo && cards[3].too === lastCardToo && cards[4].too === lastCardToo)
            )
            {
                isFullHouse = true
            }

        if (isStaight && isFlush && cards[4] === 'a')
        {
            cardRank = 'ROYAL_FLUSH'
        }
        else if (isFullHouse)
        {
            cardRank = 'FULL_HOUSE'
        }
        else if (fourKind)
        {
            cardRank = 'FOUR_OF_A_KIND'
        }
        else if (isStaight && isFlush)
        {
            cardRank = 'STRAIGHT_FLUSH'
        }
        else if (isFlush)
        {
            cardRank = 'FLUSH'
        }
        else if (isStaight)
        {
            cardRank = 'STRAIGHT'
        }

        return cardRank
    }

    // findMoveCardForFive(myCards, removeCardSetRank, removeCardList, removeCardListWithDursToo)
    // {
    //     let sendCard = []
    //     for (let i = 0; i < removeCardSetRank.length; i++) {
    //         if (removeCardSetRank[i] === 'STRAIGHT')
    //         {
    //             sendCard = this.findStraight(myCards, removeCardList)
    //         }
    //         if(sendCard.length > 0)
    //         {
    //             i = removeCardSetRank.length
    //         }
    //     }
    //     return sendCard
    // }

    /**
     * 5аар гарах үед bot хөзөрөөр гарах боломжтой хөзрийг тооцоолох нь
     * @param {String} mycardList            bot хөзөр
     * @param {String} removeCard            газрийн хөзөр
     * @returns газрын хөзрийг дарах боломжтой жагсаалт
     */
    //NOTE: Хэтэрхий удаан бол сайжруулах естой
    findMoveCardForFive(mycardList, removeCard)
    {
        let rank = 10000
        let removeCardKey = removeCard.join('')
        let removeCardRank = FIVE_RANKS[removeCardKey]
        let sendCardsList = []
        mycardList.map(myCard =>
            {
                let myCardKey = myCard.join('')
                let myCardRank = FIVE_RANKS[myCardKey]
                if(removeCardRank < myCardRank)
                {
                    rank = FIVE_RANKS[myCardKey]
                    sendCardsList = myCard
                }
            })
        return sendCardsList
    }

    /**
     * Тухайн гарын хөзрийг дарах straight байгаа эсэхийг шалгах
     * @param {String} myCards           bot-ны хөзрийн жагсаалт
     * @param {String} removeCard        Газрын хөзөр
     * @returns дарах боломжтой хөзрийн жагсаалт
     */
    // findStraight(myCards, removeCard)
    // {
    //     let sendCard = []
    //     let removeCardKey = removeCard.join('')
    //     let removeCardRank = FIVE_RANKS[removeCardKey]
    //     for(let i = 0 ; i <= myCards.length-5; i++)
    //     {
    //         let cardList = []
    //         cardList.push(myCards[i])
    //         for (let j=i+1 ; j < i+5 ; j++)
    //         {
    //             cardList.push(myCards[j])
    //         }
    //         let myCardKey = cardList.join('')
    //         let myCardRank = FIVE_RANKS[myCardKey]

    //         if(removeCardRank < myCardRank)
    //         {
    //             i = myCards.length-5
    //             sendCard = cardList
    //         }
    //     }
    //     return sendCard
    // }

    /**
     * Жагсаалтын n урттай боломжит хослолыг олох нь
     */
    getCombinationsOfLen(arr, n)
    {
        var result = [];
        var f = function(prefix, arr, n) {
        if(prefix.length === n) {
            result.push(prefix)
        }
        for (var i = 0; i < arr.length; i++) {
        f(prefix.concat(arr[i]), arr.slice(i + 1), n);
        }
        }
        f([], arr, n);
        return result;
    }
}

module.exports = Bot
