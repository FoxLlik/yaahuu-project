/** Бичигдсэн string өдрийг ms болгож авах нь
 * example: 1h байлаа гэхэд 3600000 гэж өгөх
*/
exports.timeToMs = function (time)
{
    let type = time.charAt(time.length - 1)
    let much = parseFloat(time.replace(type, ""))

    if (type == 'd') {
        much = much * 60 * 24
    }
    if (type == 'h') {
        much = much * 60
    }
    else if (type == 'm') {
        much = much
    }
    let seconds = much * 60
    let milliseconds = seconds * 1000
    return milliseconds
}
