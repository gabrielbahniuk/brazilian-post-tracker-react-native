import { createStackNavigator, createAppContainer } from 'react-navigation';

import HomePage from './pages/HomePage';
import TrackDetails from './pages/TrackDetails';

const Routes = createAppContainer(
    createStackNavigator({
        HomePage,
        TrackDetails
    }),
);

export default Routes;
