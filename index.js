/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import Login from './Login';
import Menu from './Menu';
import Signup from './SignUp';

AppRegistry.registerComponent(appName, () => Login);
