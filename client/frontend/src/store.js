import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';
import { utils, writeFile } from 'xlsx';

import landingData from './landingData.js';
import landingDataPhospho from './landingDataPhospho.js';
import initialSortOrder from './initialSortOrder.js';
import chromosomeSeries from './chromosomeSeries.js';
import bottomSeries from './bottomSeries.js';
import landingDataMutation from "./landingDataMutation.js";

Vue.use(Vuex);

//TODO (6/13): show clinical
const apiRoot = 'http://127.0.0.1:5000/';

export default new Vuex.Store({
  state: {
    bottomSeries,
    chromosomeSeries,
    excelData: {},
    firstPhosphoFetched: false,
    genes: ['BRAF'],
    geneDetails: {},
    heights: {
        16: 300,
        15: 300,
        14: 300,
        13: 280,
        8: 168,
        7: 153,
        6: 138,
        5: 123,
        4: 108,
        3: 110,
        2: 78,
        1: 68
    },
    HGVSp_Short: '',
    isLoading: false,
    mutationSeries: landingDataMutation.series,
    pathwayIsSelected: false,
    series: landingData.series,
    seriesUnfiltered: landingData.series,
    phosphoSeries: landingDataPhospho.series,
    selectedView: 'all',
    selectedGene: '',
    selectedPathway: '',
    selectedPeptide: '',
    selectedSeries: '',
    selectedSample: '',
    selectedTracks: [
        'CNV (baf)',
        'CNV (lr)',
        'Protein',
        'Mutation',
        'Methy',
    ],
    selectedValue: '',
    sortOrder: initialSortOrder,
    sortOrderPhospho: [],
    topSeries: [],
  },
  mutations: {
    ADD_GENE_DETAILS(state, geneDetails) {
        state.geneDetails = geneDetails;
    },
    ADD_PATHWAY_GENES(state, pwGenes) {
      state.genes = [...new Set([...state.genes, ...pwGenes])];
    },
    ASSIGN_EXCEL_DATA(state, excelData) {
      state.excelData = excelData;
    },
    ASSIGN_GENE_DETAILS(state, geneDetails) {
      state.geneDetails = geneDetails;
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
      selectedSeries, selectedSample, selectedValue, selectedPeptide, selectedGene, HGVSp_Short
    }) {
      state.selectedSeries = selectedSeries;
      state.selectedSample = selectedSample;
      state.selectedValue = selectedValue;
      state.selectedPeptide = selectedPeptide;
      state.selectedGene = selectedGene;
      state.HGVSp_Short = HGVSp_Short ? HGVSp_Short.join('; ') : '';
    },
    REORDER_SAMPLES(state) {
      const sortOrder = state.sortOrder.slice();

      const sortByIndex = (a, b) => (sortOrder.indexOf(a.x) > sortOrder.indexOf(b.x) ? 1 : -1);
      let sortedObj = {};
      if (state.selectedView === 'phospho') {
          for (let geneName in state.phosphoSeries) {
              const series = state.phosphoSeries[geneName];

              sortedObj[geneName] =
                  series.map((el) => {
                      return {
                        name: el.name,
                        data: el.data.sort(sortByIndex),
                      }
                  });
          }
          state.phosphoSeries = sortedObj;
      } else if (state.selectedView === 'mutation') {
          for (let geneName in state.mutationSeries) {
              const series = state.mutationSeries[geneName];

              sortedObj[geneName] =
                  series.map((el) => {
                      return {
                        name: el.name,
                        data: el.data.sort(sortByIndex),
                      }
                  });
          }
          state.mutationSeries = sortedObj;
      } else {
          for (let geneName in state.series) {
              const series = state.series[geneName];

              sortedObj[geneName] =
                  series.map((el) => {
                      return {
                        name: el.name,
                        data: el.data.sort(sortByIndex),
                      }
                  });
          }
          state.series = sortedObj;
      }
      state.topSeries = state.topSeries.map((el) => {
                  return {
                    name: el.name,
                    data: el.data.sort(sortByIndex),
                  }
              });
      state.bottomSeries = state.bottomSeries.map((el) => {
                  return {
                    name: el.name,
                    data: el.data.sort(sortByIndex),
                  }
              });
      state.chromosomeSeries = state.chromosomeSeries.map((el) => {
                  return {
                    name: el.name,
                    data: el.data.sort(sortByIndex),
                  }
              });
    },
    SET_GENE_LIST(state, geneListArr) {
      state.genes = geneListArr;
    },
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
    SORT_SAMPLES(state, ascending) {
        const ccrccPositive = {
        'C3L-00103': 1, 'C3L-00097': 1, 'C3L-00088': 1, 'C3L-00096': 1, 'C3L-00010': 1, 'C3L-00079': 1, 'C3L-00011': 1, 'C3L-00026': 1, 'C3L-00004': 1, 'C3L-00359': 0, 'C3L-00360': 1, 'C3L-00369': 1, 'C3L-00418': 1, 'C3L-00447': 1, 'C3L-00581': 1, 'C3L-00910': 1, 'C3N-00310': 1, 'C3N-00312': 1, 'C3L-00416': 1, 'C3L-00448': 1, 'C3N-00305': 1, 'C3N-00313': 0, 'C3N-00314': 1, 'C3N-00315': 1, 'C3N-00317': 1, 'C3N-00320': 1, 'C3N-00437': 1, 'C3N-00491': 1, 'C3N-00494': 1, 'C3N-00194': 1, 'C3N-00244': 1, 'C3N-00242': 1, 'C3L-00792': 1, 'C3L-00813': 1, 'C3L-00765': 1, 'C3N-00390': 1, 'C3N-00435': 0, 'C3L-00583': 1, 'C3N-00168': 1, 'C3N-00177': 1, 'C3N-00380': 1, 'C3L-00561': 1, 'C3L-00917': 1, 'C3N-00852': 1, 'C3L-00607': 1, 'C3L-00610': 1, 'C3L-00766': 1, 'C3L-00799': 1, 'C3L-00800': 1, 'C3L-00812': 1, 'C3N-00246': 1, 'C3N-00733': 1, 'C3L-00791': 1, 'C3L-00902': 1, 'C3L-01302': 1, 'C3L-00907': 1, 'C3N-00953': 1, 'C3L-00790': 1, 'C3L-00796': 1, 'C3L-00814': 1, 'C3L-00817': 1, 'C3L-01553': 1, 'C3L-00183': 1, 'C3N-00150': 1, 'C3N-00573': 1, 'C3N-00577': 1, 'C3L-01352': 1, 'C3N-01200': 1, 'C3N-01214': 1, 'C3N-01213': 1, 'C3N-01220': 1, 'C3N-01522': 1, 'C3N-01524': 1, 'C3N-01261': 1, 'C3N-00495': 1, 'C3N-01175': 0, 'C3N-00832': 0, 'C3N-00834': 1, 'C3N-01176': 1, 'C3N-01178': 1, 'C3N-00492': 0, 'C3L-01288': 1, 'C3L-00606': 1, 'C3L-01283': 1, 'C3L-01287': 1, 'C3L-01281': 1, 'C3N-00148': 1, 'C3N-00154': 1, 'C3N-00646': 1, 'C3N-00149': 1, 'C3L-01557': 1, 'C3L-01560': 1, 'C3L-00908': 1, 'C3L-01313': 1, 'C3L-01836': 1, 'C3L-01286': 1, 'C3L-01603': 1, 'C3N-01646': 1, 'C3N-01648': 1, 'C3N-01649': 1, 'C3N-01651': 1, 'C3N-01361': 1, 'C3N-01179': 1, 'C3N-01180': 0, 'C3N-00831': 1, 'C3N-01808': 1, 'C3L-01607': 1, 'C3L-01861': 1, 'C3L-01882': 1, 'C3L-01885': 1};

      const sortAscendingByY = (a, b) => {
          if (ascending) {
              if (ccrccPositive[a.x] === ccrccPositive[b.x]) {
                    return a.y >= b.y ? 1 : -1
                } else {
                    return !ccrccPositive[a.x] ? 1 : -1
                }
          }

          if (ccrccPositive[a.x] === ccrccPositive[b.x]) {
                return a.y <= b.y ? 1 : -1
            } else {
                return !ccrccPositive[a.x] ? 1 : -1
            }
      };
      let seriesToSortBy = [];
      if (state.selectedGene.length) {
          if (state.selectedView === 'phospho') {
              seriesToSortBy = state.phosphoSeries[state.selectedGene].find(s => {
                  return s.name === state.selectedSeries
              });
          } else if (state.selectedView === 'mutation') {
              seriesToSortBy = state.mutationSeries[state.selectedGene].find(s => {
                  return s.name === state.selectedSeries
              });
          } else {
            seriesToSortBy = state.series[state.selectedGene].find(s => s.name === state.selectedSeries);
          }
      } else {
          seriesToSortBy = [
              ...state.topSeries,
              ...state.chromosomeSeries,
              ...state.bottomSeries
          ].find(s => s.name === state.selectedSeries);
      }
      const sorted = seriesToSortBy.data.slice().sort(sortAscendingByY);
      state.sortOrder = sorted.map(el => el.x);
    },
    UPDATE_FIRST_PHOSPHO_FETCHED(state, firstPhosphoFetched) {
      state.firstPhosphoFetched = firstPhosphoFetched;
    },
      UPDATE_SELECTED_TRACKS(state, selectedTracks) {
        let series = {};
        state.selectedTracks = selectedTracks;
        for (const [g, d] of Object.entries(state.seriesUnfiltered)) {
          const filtered = d.filter(s => selectedTracks.includes(s.dataType));
          if (filtered.length) {
              series[g] = filtered;
          }
        }
        state.series = series;
      },
    UPDATE_SERIES(state, series) {
        state.seriesUnfiltered = series;
        state.series = series;
    },
      UPDATE_SERIES_MUTATION(state, series) {
        state.mutationSeries = series;
      },
    UPDATE_SERIES_PHOSPHO(state, series) {
        state.phosphoSeries = series;
    },
    UPDATE_TOP_SERIES(state, topSeries) {
        state.topSeries = topSeries;
    },
    UPDATE_SELECTED_VIEW(state, selectedView) {
        state.selectedView = selectedView
    },
    UPDATE_PW_SELECTED(state, pathwayIsSelected) {
      state.pathwayIsSelected = pathwayIsSelected;
    },
    UPDATE_SELECTED_PATHWAY(state, pw) {
      state.selectedPathway = pw;
    },
  },
  actions: {
    fetchGeneDetails(store, genes) {
        axios.post(
        `/api/genedetails/`,
            genes
      ).then(
        ({ data }) => {
            store.commit('ASSIGN_GENE_DETAILS', data.geneDetails)
        },
      ).catch(
        (e) => {
          console.error('FetchError: ', e.message);
        },
      );
    },
    downloadExcel(store, { genes }) {
      axios.post(
        `/api/table/`,
            genes
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
          writeFile(wb, 'CPTAC3-ccrcc.xls');
        },
      ).catch(
        (e) => {
          console.error('FetchError: ', e.message);
        },
      );
    },
    downloadExcelPhospho(store, { genes }) {
      axios.post(
        `/api/phospho_table/`,
            genes
      ).then(
        ({ data }) => {
          const ws = utils.json_to_sheet(
            data.excelData,
            {
              header: ['idx', 'Peptide', 'Gene symbol', ...store.state.sortOrder],
            },
          );
          const wb = utils.book_new();
          utils.book_append_sheet(wb, ws);
          writeFile(wb, 'CPTAC3-ccrcc-phospho.xls');
        },
      ).catch(
        (e) => {
          console.error('FetchError: ', e.message);
        },
      );
    },
   downloadExcelMutation(store, { genes }) {
      axios.post(
        `/api/mutation_table/`,
            genes
      ).then(
        ({ data }) => {
          const ws = utils.json_to_sheet(
            data.excelData,
            {
              header: ['idx', 'Gene symbol', 'Variant_Classification', ...store.state.sortOrder],
            },
          );
          const wb = utils.book_new();
          utils.book_append_sheet(wb, ws);
          writeFile(wb, 'CPTAC3-ccrcc-mutation.xls');
        },
      ).catch(
        (e) => {
          console.error('FetchError: ', e.message);
        },
      );
    },
    loading(store, isLoading) {
      store.commit('SET_LOADING', isLoading);
    },
    loadFirstData(store) {
      axios.get(
        `${apiRoot}api/clinical_data/`)
      .then(
        ({ data }) => {
          store.commit('UPDATE_TOP_SERIES', data.series)
        },
      ).catch(
        (e) => {
          console.error('FetchError: ', e.message);
        },
      );
    },
    setPathwayIsSelected(store, pathwayIsSelected) {
      store.commit('UPDATE_PW_SELECTED', pathwayIsSelected);
      if (!pathwayIsSelected) {
        store.commit('UPDATE_SELECTED_PATHWAY', '');
      }
    },
    sortSamples(store, ascending) {
      store.commit('SORT_SAMPLES', ascending);
      store.commit('REORDER_SAMPLES');
    },
    selectDisease(store, disease) {
      store.commit('UPDATE_SELECTED_DISEASE', disease);
    },
    submitGenes(store, genes) {
      store.commit('SET_LOADING', true);
      store.commit('ASSIGN_GENE_LIST', genes['genes']);
      axios.post(
        `${apiRoot}api/series/`,
            genes
      ).then(
        ({ data }) => {
            console.log('payload ', data)
            store.commit('UPDATE_SERIES', data.series);
        },
      ).catch(
        (e) => {
          console.error('FetchError: ', e.message);
        },
      );
    },
    submitGenesPhospho(store, genes) {
      axios.post(
        `${apiRoot}api/phospho_series/`,
            genes
      ).then(
        ({ data }) => {
            store.commit('UPDATE_SERIES_PHOSPHO', data.series);
        },
      ).catch(
        (e) => {
          console.error('FetchError: ', e.message);
        },
      );
    },
    submitGenesMutation(store, genes) {
      axios.post(
        `/api/mutation_series/`,
            genes
      ).then(
        ({ data }) => {
            store.commit('UPDATE_SERIES_MUTATION', data.series);
        },
      ).catch(
        (e) => {
          console.error('FetchError: ', e.message);
        },
      );
    },
    updateSelectedDataPoint(store, selectedDataPoint) {
      store.commit('UPDATE_SELECTED_DATA_POINT', selectedDataPoint);
    },
    updateSelectedTracks(store, selectedTracks) {
      store.commit('UPDATE_SELECTED_TRACKS', selectedTracks)
    },
    updateSelectedView(store, selectedView) {
      store.commit('UPDATE_SELECTED_VIEW', selectedView);
    },
    fetchPathwayGenes(store, { db, pw }) {
      store.commit('UPDATE_SELECTED_PATHWAY', pw);
      const pwClean = pw.split('/').join('%2F');
      axios
        .get(
          `${apiRoot}/api/pathways/${db}/${pwClean}`,
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
