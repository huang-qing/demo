
import {registryApp,start} from './src/index.js'

registryApp('http://localhost:8889', (location) => location.pathname === '/subapp1');
registryApp('http://localhost:8890', (location) => location.pathname === '/subapp2');
start()


// https://github.com/parcel-bundler/parcel

// cnpm install -g  nodemon
// cnpm install express
// yarn add --dev parcel@next

// nodemon nodemon example/server/subApp1.js
// nodemon nodemon example/server/subApp2.js
// yarn parcel index.html
