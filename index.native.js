import { AppRegistry } from 'react-native';
import App from 'src/App'; // Assuming your main component is in App.js
import { name as appName } from 'app.json'; // Or directly use your project name

AppRegistry.registerComponent(appName, () => App);