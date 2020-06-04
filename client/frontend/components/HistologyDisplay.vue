<template>
    <div class="histology-display">
        <h3>{{ sample }}</h3>
        <i>Histologic Images</i>
        <div v-for="(data, slide) in histologyData">
            <p><a :href="data['URL']" target="_blank" :title="slide">
                {{ data['type']}} {{ data['site'].length ? `: ${data['site']}` : ''}}
            </a></p>
        </div>
        <div id="all-cptac-images-link">
            <a href="https://www.cancerimagingarchive.net/datascope/cptac/home/" target="_blank">All CPTAC Cancer Images</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "histology-display",
        props: ['sample'],
        computed: {
            histologyData () {
                return this.$store.state.histology[this.sample]
            }
        }
    }
</script>

<style scoped>
    .histology-display {
        width: 90%;
        margin: 5px;
        padding: 10px;
        background: white;
        height: 100%;
    }

    .histology-display a {
        color: black;
    }

    .histology-display a:hover {
        color: blue;
    }

    #all-cptac-images-link {
        margin-top: 40px;
        /*padding-top: 100px;*/
    }
</style>
