import pickle

from flask import Flask, jsonify

app = Flask(__name__)

# cptac_ccrcc = pickle.load(open('./data/cptac-ccrcc.pkl', 'rb')).to_dict()
proteins = pickle.load(open('../data/proteo.pkl', 'rb'))
available_proteins = set(proteins.index)

clinical = pickle.load(open('../data/clinical.pkl', 'rb'))
clusters = pickle.load(open('../data/clusters.pkl', 'rb'))

@app.route("/")
def hello():
    return jsonify({'hi': 'world'})


# input: array of genes
# output: dict of genes with sample names and z-scores
# {gene: [{x: sample, y: z-score}]}
@app.route("/api/proteo/<genes_input>")
def proteo(genes_input):
    genes = genes_input.split(' ')
    proteins_found = set(genes).intersection(available_proteins)

    if not len(proteins_found):
        return jsonify({'proteins_found': False})

    protein_z_scores = proteins.loc[proteins_found].to_dict(orient='index')
    reshaped = {}
    for gene in protein_z_scores:
        reshaped[gene] = [
            {'x': sample, 'y': zscore}
            for (sample, zscore) in protein_z_scores[gene].items()
        ]

    return jsonify({
        'proteo': reshaped,
        'proteins_found': True
        }
    )

