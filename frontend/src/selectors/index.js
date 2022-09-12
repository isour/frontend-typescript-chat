export const getCurrentRoom = ({roomsInfo}) => {
    const { channels, currentRoomId } = roomsInfo;
    return channels ? channels.find((channel) => channel.id === currentRoomId) : 0;
};

export const getRoomsList = (state) => {
    const { rooms } = state.roomsInfo;
    console.log(rooms)
    return rooms.map(({ name }) => name);
}