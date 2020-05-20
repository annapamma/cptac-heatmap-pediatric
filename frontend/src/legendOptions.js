const fixedCategories = {
    horizontal: {
        Missing: [
            ['', '#ffffff'],
        ],
    },
    vertical: {
            'Stage/Grade': [
                ['I', '#1fc600'],
                ['II', '#089000'],
                ['III', '#0a5d00'],
                ['IV', '#063b00'],
            ],
            'CCRCC': [
                ['No', '#E8E8E8'],
                ['Yes', '#003366'],
            ],
            'Immune Group': [
                ['Metabolic immune-desert', '#98f367'],
                ['VEGF immune-desert', '#ffa500'],
                ['CD8- inflamed', '#9ecae3'],
                ['CD8+ inflamed', '#cc0000'],
            ],
            'Gender': [
                ['Male', '#57d440'],
                ['Female', '#446c40'],
            ],
            't(3;2)/t(3;5)/Genome instability/CIMP': [
                ['Negative', '#ececec'],
                ['Positive', '#cc0000'],
            ],
            '3p/5q/7p/9p/14q-CNV': [
                ['Loss', '#003366'],
                ['LR neutral LOH', '#c2e2ec'],
                ['LR neutral', '#E8E8E8'],
                ['LR amplification', '#d94040'],
            ],
    },
}
export default {
    'all': {
        categoriesHorizontal: {
            'Proteo/mRNA/Phospho/Methyl Z-Score': [
                ['-3', '#00004d'],
                ['-2', '#0066cc'],
                ['-1', '#82b6ff'],
                ['0', '#E8E8E8'],
                ['1', '#ff7777'],
                ['2', '#ff1111'],
                ['3', '#990000'],
            ],
            'CNV': [
                ['(-inf, -0.5]', '#00004d'],
                ['(-0.5, -0.2]', '#82b6ff'],
                ['(-0.2, 0.2]', '#E8E8E8'],
                ['(0.2, 0.5]', '#ff7777'],
                ['(0.5, +inf)', '#990000'],
            ],
            ...fixedCategories.horizontal,
        },
        categories: {
            ...fixedCategories.vertical,
            'Mutation': [
                ['No', '#E8E8E8'],
                ['Yes', '#003366'],
            ],
        },
    },
    'phospho': {
        categoriesHorizontal: {
            'Phosphosite abundance (mean normalized)': [
                ['<-3', '#00004d'],
                ['-2', '#0066cc'],
                ['-1', '#82b6ff'],
                ['0', '#E8E8E8'],
                ['1', '#ff7777'],
                ['2', '#ff1111'],
                ['>3', '#990000'],
            ],
            ...fixedCategories.horizontal
        },
        categories: {
            ...fixedCategories.vertical
        },
    },
    'mutation': {
        categoriesHorizontal: {
            'Mutation occurrences': [
                ['0', '#ececec'],
                ['1', '#FFA500'],
                ['2', '#993F00'],
            ],
            ...fixedCategories.horizontal
        },
        categories: {
            ...fixedCategories.vertical
        },
    },
}
