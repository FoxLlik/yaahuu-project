/**
 * Өрөөний үзэгчид
 */
class Viewer {
    /**
     * Үзэгчид
     * @param {String} _id          үзэгч role-той хэрэглэгчийн id
     * @param {String} nickName     нэр
     * @param {String} avatar       avatar
     */
    constructor(_id, nickName, avatar)
    {
        this._id = _id
        this.nickName = nickName
        this.avatar = avatar
    }
}

module.exports = Viewer
