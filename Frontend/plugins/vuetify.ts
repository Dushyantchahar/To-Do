// // import this after install `@mdi/font` package
// import '@mdi/font/css/materialdesignicons.css'

// import 'vuetify/styles'
// import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'

// import { createVuetify } from 'vuetify'

// export default defineNuxtPlugin((app) => {
//   const vuetify = createVuetify({
//     // ... your configuration
//   })
//   app.vueApp.use(vuetify)
// })
// export default createVuetify({
//   components,
//   directives,
//   // any other configuration options
// })

import '@mdi/font/css/materialdesignicons.css';


import 'vuetify/styles';
import { createVuetify } from 'vuetify';


import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    // any other configuration options
  });

  nuxtApp.vueApp.use(vuetify);
});
