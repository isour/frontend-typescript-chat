export const getCurrentChannel = ({ channelsInfo }) => {
  const { channels, currentChannelId } = channelsInfo;
  return channels
    ? channels.find((channel) => channel.id === currentChannelId)
    : 0;
};

export const getChannelsList = (state) => {
  const { channels } = state.channelsInfo;
  return channels.map(({ name }) => name);
};
