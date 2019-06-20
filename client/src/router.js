import Vue from 'vue';
import Router from 'vue-router';
import DiseaseAll from './views/DiseaseAll.vue';

Vue.use(Router);

// function diseaseRoute(disease) {
//   return {
//     path: `/${disease}`,
//     name: `${disease}`,
//     props: {
//       disease,
//     },
//     component: () => import(/* webpackChunkName: "diseaseSingle" */ './views/DiseaseSingle.vue'),
//   };
// }

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'disease-all',
      component: DiseaseAll,
    },
    // diseaseRoute('Ependymoma'),
  ],
});
