import { Route, IndexRoute } from 'react-router';

import Root from './Root';
import Home from 'components/Home';
import ContactCreate from 'components/ContactCreate';

const routes = (
  <Route path="/" component={ Root }>
    <IndexRoute component={ Home } />
    <Route path="create" component={ ContactCreate } />
  </Route>
);

export default routes;
