// Socket холбогдох
const CONNECT = 'connect'

// Тухайн socket /тоглоомын/ өрөөнд холбогдох
const JOIN_ROOM = 'JOIN_ROOM'

// Өрөөн дэх тоголгчдын тоо
const ROOM_PLAYER_COUNT = 'ROOM_PLAYER_COUNT'

// Өрөө бүрийн мэдээлэл
const ROOM_DATA = 'ROOM_DATA'

/**
 * Тоглолтын төлвийг өөрчлөх зориулалттай
 * @param {String} state төлөв
 */
const ROOM_STATE = "ROOM_STATE"

/**
 * Хөзөр гаргах тоглогчийн мэдээлэл өөрчлөх
 * @param {String} _id id
 */
const TURN_PLAYER = 'TURN_PLAYER'

/**
 * Тоглогчийн гарын мод
 * on
 * @param {Array} deck Тоглогчийн гарийн мод
*/
const PLAYER_HAND = 'PLAYER_HAND'

// SOCKET DISCONNECT
const DISCONNECT = 'disconnect'

// Чат
const CHAT_MESSSAGE = 'chat message'

// Өрөөнүүдэд холбогдсон тоглогчдын тоо
const ROOMS_PLAYER_COUNT = 'get room count'

/**
 * Тоглогчийн гарсан хөзрүүд
 * emit
 * @param {Array} card
 */
const SEND_CARD_MOVE = 'SEND_CARD_MOVE'

/**
 * Хөзрөөр гарсан тоглогч
 * on
 * @param {String} _id          хөзөр гаргасан тоглогчийн id
 * @param {Array} deck          гаргасан хөзөр
 * @param {Boolean} validate    validate зөв эсэх
 */
const CARD_MOVE_INFO = 'CARD_MOVE_INFO'

// Өрөөний мэдээлэл өөрчлөх
const UPDATE_ROOM_DATA = 'update room data'

// Өрөөнөөс гарах
const LEAVE_ROOM = 'LEAVE_ROOM'

// Өрөөнд холбогдсон хэрэглэгчдэд мэдэглэл хийх нь
const ROOM_INFO = 'room info'

// Socket-д холбогдсон бүх өрөөний хэрэгэлгчдэд info явуулах нь
const SEND_INFO_TO_ALL_ROOM = 'send msg to all'

// Өрөөлүү дата явуулах нь
const ROOM_INFO_FROM_ADMIN = 'room info'

/**
 * Өрөөнд орж ирсэн тоглогчид тоглолтыг эхлүүлэх
 * emit
 * @param {String}  _id             Хэрэглэгчийн id
 * @param {Boolean} isReady         Бэлэн эсэх
 * @param {String} room             Өрөөний id
 */
const READY_CHECK = 'READY_CHECK'

/**
 * Өрөөнд холбогдсон тоглогч
 * on
 * @param {Object} player       Тоглогч object
 */
const ROOM_JOINED_PLAYER = 'ROOM_JOINED_PLAYER'

/**
 * Өрөөнөөс гарсан тоглогчийн мэдзэлэл
 * @param {String} player       Хэрэлэгчийн id
 */
const ROOM_LEAVE_PLAYER = 'ROOM_LEAVE_PLAYER'

/**
 * Өрөөнд холбогдсон үзэгч
 * on
 * @param {Object} viewer       үзэх төлөвт орж ирсэн хэрэлэгчийн id
 * @param {Boolean} isJoined    Тоглогчийг өрөөнд орсон эсвэл гарсан эсэх
 */
const ROOM_JOINED_VIEWER = 'ROOM_JOINED_VIEWER'

/**
 * Өрөөнөөс гарсан тоглогч
 * on
 * @param {String} id Өрөөнөөс гарсан хэрэглэгчийн id
 */
const ROOM_LEAVE = 'room leave'

/**
 * Өрөөнд орсон хэрэглэгчийн дата
 * on
 * @param {Object} player ороонд орсон хэрэглэгчийн мэдээлэл
 */
const ROOM_CHECK_INFO = 'ROOM_CHECK_INFO'

// Өнжих
const PASS = 'PASS'

/**
 * Алдааны мэдэгдэл
 * on
 * @param {Number} code         Алдааны code
 * @param {String} name         Алдааны нэр
 * @param {String} message      Алдааны тайлбар
 */
const ERROR = 'ERROR'

/**
 * Round дуусах үед ашиглана
 * @param {Object} score    тоглогчдын онооны мэдээлэл
 * @param {Date} date       завсарлах хугацаа
 */
const ROUND_END = 'ROUND_END'

export {
    CONNECT,
    DISCONNECT,

    JOIN_ROOM,
    LEAVE_ROOM,
    ROOMS_PLAYER_COUNT,

    ROOM_DATA,
    ROUND_END,
    ROOM_STATE,
    TURN_PLAYER,
    ROOM_PLAYER_COUNT,

    ROOM_INFO,
    ROOM_LEAVE,
    ROOM_CHECK_INFO,
    UPDATE_ROOM_DATA,

    ROOM_LEAVE_PLAYER,
    ROOM_INFO_FROM_ADMIN,
    SEND_INFO_TO_ALL_ROOM,

    PASS,
    READY_CHECK,
    PLAYER_HAND,
    SEND_CARD_MOVE,
    CARD_MOVE_INFO,
    ROOM_JOINED_PLAYER,
    ROOM_JOINED_VIEWER,

    ERROR,
    CHAT_MESSSAGE,
}
