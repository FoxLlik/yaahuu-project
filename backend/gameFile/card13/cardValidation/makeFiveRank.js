const fs = require('fs');

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


let durs = [
    "d",
    "c",
    "h",
    "s",
]

let cards = {
    'd': "♦",
    'c': "♣",
    'h': "♥",
    's': "♠",
}

let fives = [
    [ '5', '4', '3', '2', 'a' ],
    [ '6', '5', '4', '3', '2' ],
    [ '7', '6', '5', '4', '3' ],
    [ '8', '7', '6', '5', '4' ],
    [ '9', '8', '7', '6', '5' ],
    [ '10', '9', '8', '7', '6' ],
    [ 'j', '10', '9', '8', '7' ],
    [ 'q', 'j', '10', '9', '8' ],
    [ 'k', 'q', 'j', '10', '9' ],
    [ 'a', 'k', 'q', 'j', '10' ]
]

let toos = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "j",
    "q",
    "k",
    "a",
]

let tooRankTest = [
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "j",
    "q",
    "k",
    "a",
    "2",
]

let groups = [
    [ '3', '4', '5', '6', '7', '8' ],
    [ '3', '4', '5', '6', '7', '8', '9' ],
    [ '3', '4',  '5','6', '7',  '8','9', '10' ],
    [ '3', '4',  '5', '6', '7',  '8', '9', '10', 'j' ],
    [ '3', '4',  '5', '6', '7',  '8', '9', '10', 'j', 'q' ],
    [ '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k' ],
    [ '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k', 'a' ],
    [ '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k', 'a', '2' ],
]

let DURS = [
    'd',
    'c',
    'h',
    's',
]

let lol = ''
let rank = 1

// straigth үүсгэх
for (let five of fives) {
    let too1 = five[0]
    let too2 = five[1]
    let too3 = five[2]
    let too4 = five[3]
    let too5 = five[4]

    for (let durs1 of DURS) {
        let check = durs1
        let _checkedDurs
        if (durs1 === 'd') {
            _checkedDurs = "Дөрвөлжингийн"
        } else if (durs1 === 'c') {
            _checkedDurs = "Цэцгийн"
        } else if (durs1 === 'h') {
            _checkedDurs = "Будангийн"
        } else {
            _checkedDurs = "Гилийн"
        }

        let text = `\n\n// ${_checkedDurs} ${too1} хүртэлх strgaight`
        lol = lol + text
        for (let durs2 of DURS) {
            for (let durs3 of DURS) {
                for (let durs4 of DURS) {
                    for (let durs5 of DURS) {
                        let allEqual = false
                        if (check === durs1 && check === durs2 && check === durs3 && check === durs4 && check === durs5) {
                            allEqual = true
                        }
                        if (!allEqual) {
                            let key = `${durs5}${too5}${durs4}${too4}${durs3}${too3}${durs2}${too2}${durs1}${too1}`
                            lol = lol + `\n${key}: ${rank},   // ${cards[durs5]}${too5} ${cards[durs4]}${too4} ${cards[durs3]}${too3} ${cards[durs2]}${too2} ${cards[durs1]}${too1}`
                        }
                    }
                }
            }
        }
        rank++
    }
}


// flush
for (let group of groups) {
    let lastIdx = group.length
    let lastKey = group[lastIdx-1]

    let addIdx = lastIdx - 6

    for (let i=0; i<group.length-4; i++) {
        let idx1 = i
        let idx2 = i + 1
        let idx3 = i + 2
        let idx4 = i + 3
        let idx5 = i + 4

        let text = `\n\n// ${lastKey}-с доошоо ${group[i]} хүртэлх бүх боломжит flush`
        lol = lol + text

        for (let _idx1=idx1; _idx1<idx2+1+addIdx; _idx1++) {
            for (let _idx2=idx2; _idx2<idx3+1+addIdx; _idx2++) {
                for (let _idx3=idx3; _idx3<idx4+1+addIdx; _idx3++) {
                    for (let _idx4=idx4; _idx4<idx5+1+addIdx; _idx4++) {
                        for (let _durs of durs) {
                            if ((_idx1 < idx2 && _idx2 < _idx3 && _idx3 < _idx4 && _idx4 < lastIdx - 1)) {
                                let straight = false
                                if ((_idx1 == 0) && (_idx2 == 1) && (_idx3 == 2) && (_idx4 == 3)) {
                                    straight = true
                                }
                                if (!straight) {
                                    let key = `\n${_durs}${group[_idx1]}${_durs}${group[_idx2]}${_durs}${group[_idx3]}${_durs}${group[_idx4]}${_durs}${lastKey}: ${rank},   // ${cards[_durs]}${group[_idx1]} ${cards[_durs]}${group[_idx2]} ${cards[_durs]}${group[_idx3]} ${cards[_durs]}${group[_idx4]} ${cards[_durs]}${lastKey}`
                                    rank++

                                    lol = lol + key

                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

// full house
for (let i=0; i<13; i++) {
    let too1 = toos[i]
    for (let j=0; j<13; j++) {
        let too2 = toos[j]
        if (too1 !== too2) {

            let text = `\n\n// three kind нь ${too1}, pair нь ${too2} боломжит full house`
            lol = lol + text

            for (let too1Idx=0; too1Idx<2; too1Idx++) {
                for (let too2Idx=too1Idx+1; too2Idx<3; too2Idx++) {
                    for (let too3Idx=too2Idx+1; too3Idx<4; too3Idx++) {
                        for (let durs21=0; durs21<3; durs21++) {
                            for (let durs22=durs21+1; durs22<4; durs22++) {
                                let key
                                if (tooRank[too1] < tooRank[too2]) {
                                    key = `\n${durs[too1Idx]}${too1}${durs[too2Idx]}${too1}${durs[too3Idx]}${too1}${durs[durs21]}${too2}${durs[durs22]}${too2}: ${rank}, // ${cards[durs[too1Idx]]}${too1} ${cards[durs[too2Idx]]}${too1} ${cards[durs[too3Idx]]}${too1} ${cards[durs[durs21]]}${too2} ${cards[durs[durs22]]}${too2}`
                                } else {
                                    key = `\n${durs[durs21]}${too2}${durs[durs22]}${too2}${durs[too1Idx]}${too1}${durs[too2Idx]}${too1}${durs[too3Idx]}${too1}: ${rank}, // ${cards[durs[durs21]]}${too2} ${cards[durs[durs22]]}${too2} ${cards[durs[too1Idx]]}${too1} ${cards[durs[too2Idx]]}${too1} ${cards[durs[too3Idx]]}${too1}`
                                }
                                lol = lol + key

                            }
                        }
                    }
                }
            }
        }
    }
    rank++

}

// poker
for (let i = 0; i < 13; i++) {
    for (let j = 0; j < 13; j++) {
        let too1 = tooRankTest[i]
        let too2 = tooRankTest[j]

        if (too1 !== too2) {
            let text = `\n\n// poker нь ${too1}, хөл нь ${too2}`
            lol = lol + text
            for (let k = 0; k < 4; k++) {


                let durs1 = DURS[0]
                let durs2 = DURS[1]
                let durs3 = DURS[2]
                let durs4 = DURS[3]

                let durs = DURS[k]

                let key

                if (tooRank[too1] < tooRank[too2]) {
                    key = `\n${durs1}${too1}${durs2}${too1}${durs3}${too1}${durs4}${too1}${durs}${too2}: ${rank}, // ${cards[durs1]}${too1} ${cards[durs2]}${too1} ${cards[durs3]}${too1} ${cards[durs4]}${too1} ${cards[durs]}${too2}`
                } else {
                    key = `\n${durs}${too2}${durs1}${too1}${durs2}${too1}${durs3}${too1}${durs4}${too1}: ${rank}, // ${cards[durs]}${too2} ${cards[durs1]}${too1} ${cards[durs2]}${too1} ${cards[durs3]}${too1} ${cards[durs4]}${too1}`
                }

                lol = lol + key

            }
        }
    }
    rank++
}

for (let j=0; j<13-4; j++) {
    let too1 = toos[j]
    let too2 = toos[j+1]
    let too3 = toos[j+2]
    let too4 = toos[j+3]
    let too5 = toos[j+4]

    let text = `\n\n// ${too1}-с ${too5} хүртэлх straigth flush`
    lol = lol + text

    for (let durs of DURS) {
        let key = `\n${durs}${too1}${durs}${too2}${durs}${too3}${durs}${too4}${durs}${too5}: ${rank}, // ${cards[durs]}${too1} ${cards[durs]}${too2} ${cards[durs]}${too3} ${cards[durs]}${too4} ${cards[durs]}${too5}`
        lol = lol + key
        rank++
    }
}


async function writeKey() {
    const check1 = await fs.promises.appendFile(__dirname + '/test.txt', lol, {
        encoding: 'utf8'
    });

    return true
}

const check = writeKey()
console.log(check);
