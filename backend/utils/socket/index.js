/**
 * nameSpace-ийн нийт өрөөний тоог авах
 */
exports.nameSpaceRoomsCount = function(adminNameSpace)
{
    let roomsInfo = {}

    for (let key of adminNameSpace.adapter.rooms.keys()) {
        if (key?.startsWith('Game'))
            roomsInfo[key] = adminNameSpace.adapter.rooms.get(key).size
    }
    return roomsInfo
}
