import { useSelector } from 'react-redux';
import { selectors } from '../store/index';

export default () => {
  const channels = useSelector(selectors.channelSelectors.selectAll);
  return channels.map(({ name }) => name);
};
