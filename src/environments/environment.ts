// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

// <>となっている部分は、自分のapiKeyを入力
export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBfHPAfvNAmfb3K-U7s9z4GItKIdCnT9RE',
    authDomain: 'chatapp-6da0d.firebaseapp.com',
    databaseURL: 'https://chatapp-6da0d.firebaseio.com',
    projectId: 'chatapp-6da0d',
    storageBucket: 'chatapp-6da0d.appspot.com',
    messagingSenderId: '477317826459'
  }
};
