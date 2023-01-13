
class Player {
    /**
     * Тоглогчийн мэдээлэл
     * @param {string} socketId         socket ID
     * @param {string} _id              тоглогчийн mongo DB ID
     * @param {string} nickName       нэр
     * @param {number} score            оноо
     * @param {string} playerNumber     тоглогчийн дугаар
     * @param {string} avatar           profile image
     * @param {Array} deck              тоглогчийн хөзөр
     * @param {Boolean} isLoss          тоглогч хожигдсон эсэх
     * @param {String}  isOnline        онлайн эсэх
     * @param {Object}  skin            skin мэдээлэл
     */
    constructor(_id, socketId, nickName, playerNumber, avatar, isBot=false) {
        this._id = _id
        this.socketId = socketId
        this.nickName = nickName
        this.playerNumber = playerNumber
        this.avatar = avatar
        this.isBot = isBot
        this.deck  = []
        this.score = 0
        this.readyCheck = false
        this.deckLength = 13
        this.isLoss = false
        this.isOnline = true
        this.skin = {
            card: undefined,
            HUD: undefined,
            table: undefined,
            frame: undefined,
        }
    }

    /**
     * Тоглогчийн оноог авах нь
     * @returns score
     */
    getScore()
    {
        return this.score
    }

    /**
     * Тоглогчийн хөзрийн уртыг авна
     * @returns тоглогчийн гарт байгаа хөзрийн тоо
     */
    getDeckLength()
    {
        return this.deckLength
    }

    /**
     * Skin мэдэлэл авах
     * @returns skin
     */
    getSking()
    {
        return this.skin
    }

    /**
     * Skin мэдээлэл хадгалах
     * @param {*} card      хөзөр
     * @param {*} HUD       HUD
     * @param {*} table     ширээ
     * @param {*} frame     avatar хүрээ
     */
    setSkin(card, HUD, table, frame)
    {
        this.skin = {
            card: card,
            HUD: HUD,
            table: table,
            frame: frame,
        }
    }


    /**
     * Deck
     * @param {Array} deck хөзөрнүүд
     */
    setDeck(deck)
    {
        this.deck = deck
    }

    /**
     * Socket id change
     * @param {String} socketId socket id
     */
    setSocketId(socketId)
    {
        this.socketId = socketId
    }

    /**
     * READY_CHECK set
     * @param {Boolean} isReady бэлэн эсэх
     */
    setReadyCheck(isReady)
    {
        this.readyCheck = isReady
    }

    /**
     * Тоглогчийн хөзрийн тоог reset хийх
     */
    resetDeckLength()
    {
        this.deckLength = 13
    }

    /**
     * Гарт байгаа хөзрийн тоог өөрчлөх
     * @returns тоглогчийн хөзрийн тоо
     */
    setDeckLengthFromDeck()
    {
        return this.deckLength = this.deck.length
    }

    /**
     * Тоглогч хожигдсон болгох
     */
    setLoss()
    {
        this.isLoss = true
    }

    /**
     * Тоглогчийн дугаарыг өөрчлөх
     * @param {Number} number өрөөний дараалал
     */
    setPlayerNumber(number)
    {
        this.playerNumber = number
    }

    /**
     * Одоо байгаа оноон дээр оноог нэсэх
     * @param {Number} newScore нэсэх оноо
     */
    addScore(newScore)
    {
        return this.score = this.score + newScore
    }

    calculateScore()
    {
        let deckLength = this.getDeckLength()
        let newScore = 0
        if (deckLength === 13)
        {
            newScore = deckLength * 3
        }
        else if (deckLength < 13 && deckLength > 9)
        {
            newScore = deckLength * 2
        }
        else
        {
            newScore = deckLength
        }

        return newScore
    }

    /**
     * Хэрэлэгчийн хөзрийг хасна
     * @param {Array} cards хөзрийн олонлог
     */
    removeCardFromDeck(cards)
    {
        this.deck = this.deck.filter((card) => !cards.includes(card))
        return this.setDeckLengthFromDeck(cards.length)
    }

}

module.exports = Player
