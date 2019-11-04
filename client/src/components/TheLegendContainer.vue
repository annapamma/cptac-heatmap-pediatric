<template>
    <div class="the-legend-container">
        <div v-if="loaded">
            <ul id="legend-categories-horizontal" class="legend-categories">
              <li v-for="(elements, category) in categoriesHorizontal">
                <legend-category-horizontal :category="category" :elements="elements"/>
                </li>
            </ul>
            <ul id="legend-categories" class="legend-categories">
              <li v-for="(elements, category) in categories">
                <legend-category :category="category" :elements="elements"/>
            </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import LegendCategory from './LegendCategory.vue';
    import LegendCategoryHorizontal from './LegendCategoryHorizontal.vue';

    export default {
        name: 'the-legend-container',
        components: {
            LegendCategory,
            LegendCategoryHorizontal
        },
        data () {
            return {
                categoriesHorizontal: {
                    'Z-Score': [
                        ['3', '#990000'],
                        ['2', '#ff4d4d'],
                        ['1', '#ff8080'],
                        ['0', '#E8E8E8'],
                        ['-1', '#b3ccff'],
                        ['-2', '#4d88ff'],
                        ['-3', '#003366'],
                    ],
                    'Missing': [
                        ['', '#ffffff']
                    ],
                },
                categories: {
                    // 'Z-Score': [
                    //     ['3', '#990000'],
                    //     ['2', '#ff4d4d'],
                    //     ['1', '#ff8080'],
                    //     ['0', '#E8E8E8'],
                    //     ['-1', '#b3ccff'],
                    //     ['-2', '#4d88ff'],
                    //     ['-3', '#003366'],
                    // ],
                    'CNV': [
                        ['(-Inf, -0.5)', '#003366'],
                        ['(-0.5, -0.2]', '#80aaff'],
                        ['(-0.2, 0.2]', '#E8E8E8'],
                        ['(0.2, 0.5]', '#ff8080'],
                        ['(0.5, +Inf)', '#990000'],
                    ],
                    'CNV subtype': [
                        ['CNV1', '#87c0e2'],
                        ['CNV2', '#128c24'],
                        ['CNV3', '#fffe56'],
                        ['CNV4', '#e73225'],
                    ],
                    'Mutation': [
                        ['Yes', '#00004d'],
                        ['No', '#ffffff'],
                    ],
                    'CCRCC': [
                        ['Yes', '#00004d'],
                        ['No', '#ececec'],
                    ],
                    'Immune Group': [
                        ['CD8- inflamed', '#9ecae3'],
                        ['CD8+ inflamed', '#cc0000'],
                        ['Metabolic immune-desert', '#98f367'],
                        ['VEGF immune-desert', '#fff871'],
                    ],
                    't(3;2)/t(3;5)/Genome instability': [
                        ['Yes', '#d94040'],
                        ['No', '#ececec'],
                    ],
                    'Gender': [
                        ['Male', '#57d440'],
                        ['Female', '#446c40'],
                    ],
                    'CIMP': [
                        ['Positive', '#cc0000'],
                        ['Negative', '#ececec'],
                    ],
                    'Stage/Grade': [
                        ['I', '#1fc600'],
                        ['II', '#089000'],
                        ['III', '#0a5d00'],
                        ['IV', '#063b00'],
                    ],
                    '3p/5q/7p/9p/14q-CNV': [
                        ['Loss', '#003366'],
                        ['Neutral LOH', '#c2e2ec'],
                        ['Neutral', '#E8E8E8'],
                        ['Amplification', '#d94040'],
                    ]
                },
            }
        },
        computed: {
            loaded () {
                return this.$store.state.loaded;
            },
            loading () {
                return this.$store.state.loading;
            },
        }
    }
</script>

<style scoped>
.the-legend-container {
    width: 15%;
    height: 15%;
    /*background-color: pink;*
    display: flex;
    /*flex-direction: column;*/
}
</style>
