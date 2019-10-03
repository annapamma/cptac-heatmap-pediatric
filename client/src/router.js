import Vue from 'vue';
import Router from 'vue-router';
import DiseaseAll from './views/DiseaseAll.vue';
import DiseasePhospho from './views/DiseasePhospho.vue';

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
    {
      path: '/phospho',
      name: 'disease-phospho',
      component: DiseasePhospho,
    },
  ],
});
