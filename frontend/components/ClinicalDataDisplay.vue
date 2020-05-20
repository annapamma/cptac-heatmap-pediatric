<template>
    <div class="clinical-data-display">
        <h3>{{ sample }}</h3>
        <i>Clinical/Demographic Data</i>
        <div v-for="(val, dataType) in clinicalData">
            <p><b>{{ dataType }}</b>: {{ val }}</p>
        </div>
    </div>
</template>

<script>
    import { get } from 'axios'

    export default {
        name: "clinical-data-display",
        data() {
            return {
                clinicalData: {}
            }
        },
        props: ['sample'],
        computed: {
            // histologyData () {
            //     return this.$store.state.histology[this.sample]
            // }
        },
        mounted() {
            get(
                `https://pdc-dev.esacinc.com/graphql?query={case (case_submitter_id: "${this.sample}") {case_submitter_id project_submitter_id disease_type demographics { ethnicity gender race vital_status year_of_birth } diagnoses { age_at_diagnosis }}}`
            )
            .then(
                response => {
                    const data = response.data['data']['case'];
                    this.clinicalData = {
                        'Gender': data['demographics'][0]['gender'],
                        'Vital Status': data['demographics'][0]['vital_status'],
                        'Year of birth': data['demographics'][0]['year_of_birth'],
                        'Age at Diagnosis': Math.floor(data['diagnoses'][0]['age_at_diagnosis']/365),
                        'Race': data['demographics'][0]['race'],
                        'Ethnicity': data['demographics'][0]['ethnicity'],
                    };
                }
            )
        }
    }
</script>

<style scoped>
    .clinical-data-display{
        width: 90%;
        margin: 5px;
        padding: 10px;
        background: white;
        height: 100%;
    }

    .clinical-data-display a {
        color: black;
    }

    .clinical-data-display a:hover {
        color: blue;
    }
</style>
