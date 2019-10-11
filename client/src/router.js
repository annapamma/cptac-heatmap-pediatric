import Vue from 'vue';
import Router from 'vue-router';
import DiseaseAll from './views/DiseaseAll.vue';
import DiseaseSingleType from './views/DiseaseSingleType.vue';
import DiseasePhospho from './views/DiseasePhospho.vue';

Vue.use(Router);

function singleTrackRoute(track) {
  return {
    path: `/${track}`,
    name: `disease-${track}`,
    props: {
      track,
    },
    component: () => import(/* webpackChunkName: "diseaseSingle" */ './views/DiseaseSingleType.vue'),
  };
}

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'disease-all',
      component: DiseaseAll,
    },
    singleTrackRoute('mutation'),
    singleTrackRoute('proteo'),
    {
      path: '/phospho',
      // path: '/',
      name: 'disease-phospho',
      component: DiseasePhospho,
    },
  ],
});
