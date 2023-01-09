import { useSelector } from 'react-redux';
import { selectors } from '../store/index.js';

export default () => {
  const channels = useSelector(selectors.channelSelectors.selectAll);
  return channels.map(({ name }) => name);
};
