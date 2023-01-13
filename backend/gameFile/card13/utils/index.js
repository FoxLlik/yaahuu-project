/**
 * Одоогоос өгөгдсөн хугацааны дараах цагийг буцаана
 * @param {Number} time хүлээх цаг
 * @returns time
 */
exports.setTimeFromNow = function (time)
{
    Date.prototype.addSecond = function(sec) {
        this.setTime(this.getTime() + (sec*1000));
        return this;
    }

    return new Date().addSecond(time)
}

/**
 * 0-ээс max хүртлэх тооноос random-оор авах
 * @param {Number} max 0-max
 * @returns random number
 */
exports.setRandomNumber = function (max, min=0)
{
    return Math.random() * (max - min) + min
}
