import loadable from 'react-loadable';
import LoadingIndicator from '../../components/LoadingIndicator';

export default loadable({
  loader: () => import('./BasicTable'),
  loading: LoadingIndicator,
});
