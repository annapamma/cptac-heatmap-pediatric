import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';
import { utils, writeFile } from 'xlsx';

import landingData from './landingData.js';
import landingDataPhospho from './landingDataPhospho.js';
import initialSortOrder from '@/initialSortOrder';

Vue.use(Vuex);

const apiRoot = 'http://127.0.0.1:5000';

export default new Vuex.Store({
  state: {
    excelData: {},
    firstPhosphoFetched: false,
    genes: ['CASP3', 'RRAS2', 'RASA1', 'RPS6KA2', 'NF1', 'BRAF'],
    isLoading: false,
    pathwayIsSelected: false,
    series: landingData.series,
    series_phospho: landingDataPhospho.series,
    selectedView: 'all',
    selectedDisease: 'all',
    selectedPathway: '',
    selectedPhosphoId: '',
    selectedSeries: '',
    selectedSample: '',
    selectedValue: '',
    sortOrder: initialSortOrder,
    sortOrderPhospho: [],
  },
  mutations: {
    ADD_PATHWAY_GENES(state, pwGenes) {
      state.genes = [...new Set([...state.genes, ...pwGenes])];
    },
    ASSIGN_EXCEL_DATA(state, excelData) {
      state.excelData = excelData;
    },
    ASSIGN_GENE_LIST(state, genes) {
      state.genes = genes;
    },
    ASSIGN_SERIES(state, series) {
      state.series = series;
    },
    ASSIGN_SERIES_PHOSPHO(state, series) {
      state.series_phospho = series;
    },
    UPDATE_SELECTED_DATA_POINT(state, {
      selectedSeries, selectedSample, selectedValue, selectedPhosphoId,
    }) {
      state.selectedSeries = selectedSeries;
      state.selectedSample = selectedSample;
      state.selectedValue = selectedValue;
      state.selectedPhosphoId = selectedPhosphoId;
    },
    REORDER_SAMPLES(state) {
      const sortOrder = state.sortOrder.slice();

      const sortByIndex = (a, b) => (sortOrder.indexOf(a.x) > sortOrder.indexOf(b.x) ? 1 : -1);

      state.series = state.series.map(el => ({
        name: el.name,
        data: el.data.sort(sortByIndex),
      }));
    },
    REORDER_SAMPLES_PHOSPHO(state) {
      const sortOrder = state.sortOrderPhospho.slice();

      const sortByIndex = (a, b) => (sortOrder.indexOf(a.x) > sortOrder.indexOf(b.x) ? 1 : -1);

      state.series_phospho = state.series_phospho.map(el => ({
        name: el.name,
        phospho_id: el.phospho_id,
        data: el.data.sort(sortByIndex),
      }));
    },
    SET_GENE_LIST(state, geneListArr) {
      state.genes = geneListArr;
    },
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
    SORT_SAMPLES(state, { ascending, series }) {
      const sortAscendingByY = (a, b) => {
        if (ascending) {
          return a.y > b.y ? 1 : -1;
        }
        return a.y > b.y ? -1 : 1;
      };
      const seriesToSortBy = state.series.find(s => s.name === series);
      const sorted = seriesToSortBy.data.slice().sort(sortAscendingByY);

      state.sortOrder = sorted.map(el => el.x);
    },
    SORT_SAMPLES_PHOSPHO(state, { ascending, series, phospho }) {
      const sortAscendingByY = (a, b) => {
        if (ascending) {
          return a.y > b.y ? 1 : -1;
        }
        return a.y > b.y ? -1 : 1;
      };

      let seriesToSortBy = [];

      if (phospho) {
        seriesToSortBy = state.series_phospho.find(s => s.phospho_id === series);
      } else {
        seriesToSortBy = state.series_phospho.find(s => s.name === series);
      }

      const sorted = seriesToSortBy.data.slice().sort(sortAscendingByY);
      state.sortOrderPhospho = sorted.map(el => el.x);
    },
    UPDATE_FIRST_PHOSPHO_FETCHED(state, firstPhosphoFetched) {
      state.firstPhosphoFetched = firstPhosphoFetched;
    },
    UPDATE_SELECTED_DISEASE(state, disease) {
      state.selectedDisease = disease;
    },
    UPDATE_SELECTED_VIEW(state, selectedView) {
      state.selectedView = selectedView;
    },
    UPDATE_PW_SELECTED(state, pathwayIsSelected) {
      state.pathwayIsSelected = pathwayIsSelected;
    },
    UPDATE_SELECTED_PATHWAY(state, pw) {
      state.selectedPathway = pw;
    },
  },
  actions: {
    fetchPhospho(store) {
      store.commit('SET_LOADING', true);
      const genes = store.state.genes.join('%20');
      axios.get(
        `${apiRoot}/api/phospho/color/${genes}/`,
      ).then(
        ({ data }) => {
          store.commit('ASSIGN_SERIES_PHOSPHO', data.series);
          store.commit('UPDATE_FIRST_PHOSPHO_FETCHED', true);
        },
      ).then(
        () => {
          store.commit('SET_LOADING', false);
        },
      ).catch(
        () => {
          console.log('oh no there was an error!');
        },
      );
    },
    getExcelData(store, { genes }) {
      const route =
        store.state.selectedView === 'phospho' ?
          `${apiRoot}/api/phospho/table/${genes}/` :
          `${apiRoot}/api/table/${genes}/`;
      axios.get(
        route
      ).then(
        ({ data }) => {
          const ws = utils.json_to_sheet(
            data.excelData,
            {
              header: ['idx', 'Data type', 'Gene symbol', ...store.state.sortOrder],
            },
          );
          const wb = utils.book_new();
          utils.book_append_sheet(wb, ws);
          writeFile(wb, 'CPTAC3-pbt.xls');
        },
      );
    },
    loading(store, isLoading) {
      store.commit('SET_LOADING', isLoading);
    },
    setPathwayIsSelected(store, pathwayIsSelected) {
      store.commit('UPDATE_PW_SELECTED', pathwayIsSelected);
      if (!pathwayIsSelected) {
        store.commit('UPDATE_SELECTED_PATHWAY', '');
      }
    },
    sortSamples(store, { ascending, series }) {
      store.commit('SORT_SAMPLES', { ascending, series });
      store.commit('REORDER_SAMPLES');
    },
    sortSamplesPhospho(store, { ascending, series, phospho }) {
      store.commit('SORT_SAMPLES_PHOSPHO', { ascending, series, phospho });
      store.commit('REORDER_SAMPLES_PHOSPHO');
    },

    selectDisease(store, disease) {
      store.commit('UPDATE_SELECTED_DISEASE', disease);
    },
    submitGenes(store, { genes }) {
      store.commit('SET_LOADING', true);
      store.commit('ASSIGN_GENE_LIST', genes.split('%20'));
      store.commit('UPDATE_FIRST_PHOSPHO_FETCHED', false);
      store.commit('UPDATE_SELECTED_VIEW', 'all');
      axios.get(
        `${apiRoot}/api/color/${genes}/`,
      ).then(
        ({ data }) => {
          store.commit('ASSIGN_SERIES', data.series);
        },
      ).then(
        () => {
          store.commit('SET_LOADING', false);
        },
      );
    },
    updateSelectedDataPoint(store, selectedDataPoint) {
      store.commit('UPDATE_SELECTED_DATA_POINT', selectedDataPoint);
    },
    updateSelectedView(store, selectedView) {
      store.commit('UPDATE_SELECTED_VIEW', selectedView);
    },
    fetchPathwayGenes(store, { db, pw }) {
      store.commit('UPDATE_SELECTED_PATHWAY', pw);
      const pw_clean = pw.split('/').join('%2F');
      axios
        .get(
          `${apiRoot}/api/pathways/${db}/${pw_clean}`,
        )
        .then(
          ({ data }) => {
            store.commit('ASSIGN_GENE_LIST', data.pw_genes);
          },
        );
    },
    setGeneList(store, geneTxt) {
      // const geneListArr = geneTxt.trim().toUpperCase().split('\n';
      let geneListArr = [];
      if (geneTxt.length) {
        geneListArr = geneTxt
          .toUpperCase()
          .split('\n');
        // .filter(function(el) { return el; });
      }

      store.commit('SET_GENE_LIST', [...new Set(geneListArr)]);
    },
  },

});
