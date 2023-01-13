// Socket холбогдох
exports.CONNECT = 'connect'

// Тухайн socket /тоглоомын/ өрөөнд холбогдох
exports.JOIN_ROOM = 'JOIN_ROOM'

// Өрөөн дэх тоголгчдын тоо
exports.ROOM_PLAYER_COUNT = 'ROOM_PLAYER_COUNT'

/**
 * Өрөө бүрийн мэдээлэл
 * @param {Object}  өрөөний тоглолтын мэдээлэл
*/
exports.ROOM_DATA = 'ROOM_DATA'

/**
 * Өрөөнд холбогдсон тоглогч
 * on
 * @param {Object} player       Тоглогч object
 */
exports.ROOM_JOINED_PLAYER = 'ROOM_JOINED_PLAYER'

/**
 * Өрөөнөөс гарсан тоглогчийн мэдзэлэл
 * @param {String} player       Хэрэлэгчийн id
 */
exports.ROOM_LEAVE_PLAYER = 'ROOM_LEAVE_PLAYER'

/**
 *  Өрөөнөөс гарасан үзэгчийн мэдээлэл
 *  @param {String} _id         Хэрэлэгчийн id
 */
exports.ROOM_LEAVE_VEAWER = 'ROOM_LEAVE_VEAWER'

/**
 * Өрөөнд орж ирсэн тоглогчид тоглолтыг эхлүүлэх
 * emit
 * @param {String}  _id             Хэрэглэгчийн id
 * @param {Boolean} isReady         Бэлэн эсэх
 */
exports.READY_CHECK = 'READY_CHECK'

/**
 * Тоглолтын төлвийг өөрлөх зориулалттай
 * @param {String} state төлөв
 */
exports.ROOM_STATE = 'ROOM_STATE'

/**
 * Хөзөр гаргах тоглогчийн мэдээлэл өөрчлөх
 * @param {String} _id id
 */
exports.TURN_PLAYER = 'TURN_PLAYER'

/**
 * Тоглогчийн гарсан хөзрүүд
 * emit
 * @param {Array} card
 */
exports.SEND_CARD_MOVE = 'SEND_CARD_MOVE'

/**
 * Хөзрөөр гарсан тоглогч
 * on
 * @param {String} _id          хөзөр гаргасан тоглогчийн id
 * @param {Array} cards          гаргасан хөзөр
 */
exports.CARD_MOVE_INFO = 'CARD_MOVE_INFO'

// Өнжих
exports.PASS = 'PASS'

/**
 * Тоглогчийн гарын мод
 * on
 * @param {Array} deck Тоглогчийн гарийн мод
*/
exports.PLAYER_HAND = 'PLAYER_HAND'

// SOCKET DISCONNECT
exports.DISCONNECT = 'disconnect'

// Өрөөнөөс гарах
exports.LEAVE_ROOM = 'LEAVE_ROOM'

/**
 * Round дуусах үед ашиглана
 * @param {Object} score    тоглогчдын онооны мэдээлэл
 * @param {Date} date       завсарлах хугацаа
 */
exports.ROUND_END = 'ROUND_END'

/**
 * Алдааны мэдэгдэл
 * on
 * @param {Number} code         Алдааны code
 * @param {String} name         Алдааны нэр
 * @param {String} message      Алдааны тайлбар
 */
exports.ERROR = 'ERROR'

/**
 * Өрөөнд холбогдсон үзэгч
 * on
 * @param {Object} viewer       үзэх төлөвт орж ирсэн хэрэлэгчийн id
 * @param {Boolean} isJoined    Тоглогчийг өрөөнд орсон эсвэл гарсан эсэх
 */
exports.ROOM_JOINED_VIEWER = 'ROOM_JOINED_VIEWER'

// Чат
// exports.CHAT_MESSSAGE = 'chat message'

// Өрөөнүүдэд холбогдсон тоглогчдын тоо
exports.ROOMS_PLAYER_COUNT = 'get room count'

// Өрөөнд холбогдсон хэрэглэгчдэд мэдэглэл хийх нь
// ашиглахгүй байгаа
exports.ROOM_INFO = 'room info'

// Socket-д холбогдсон бүх өрөөний хэрэгэлгчдэд info явуулах нь
// ашиглахгүй байгаа
exports.SEND_INFO_TO_ALL_ROOM = 'send msg to all'

// Өрөөлүү дата явуулах нь
// ашиглахгүй байгаа
exports.ROOM_INFO_FROM_ADMIN = 'room info'

/**
 * Өрөөнд орсон хэрэглэгчийн дата
 * on
 * @param {Object} player ороонд орсон хэрэглэгчийн мэдээлэл
 */
// ашиглахгүй байгаа
exports.ROOM_CHECK_INFO = 'ROOM_CHECK_INFO'
