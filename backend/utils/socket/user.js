
const users = []

// Хэрэглэгч нэмэх
const addUser = ({socketId, nickName, room, avatar, _id}) => {

    const existingUser = users.find((user) => {
        return user.room === room && user._id === _id
    });

    const user = {socketId, nickName, room, avatar, _id}

    if (existingUser) {
        // return {error: "Username is taken"};
        return user
    }

    users.push(user)
    return user
}

// Хэрэглэгч хасах
const removeUser = (_id) => {
    const index = users.findIndex(
        user =>
        {
            return user._id === _id
        }
    )

    if(index !== -1) {
        return users.splice(index,1)[0]
    }
}

// Хэрэглэгчийн мэдээлэл авах
const getUser = (_id) => users
        .find((user) => user._id === _id)

// Өрөөндөх бүх хэрэглэгчлийн дата авах
const getUsersInRoom = (room) => {
    const usersList = users.filter(
        user =>
        {
            return user.room === room
        }
    )

    return usersList
}

module.exports = {addUser, removeUser, getUser, getUsersInRoom}
