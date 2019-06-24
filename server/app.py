import pickle

from flask import Flask, jsonify, safe_join, send_from_directory
from flask_cors import CORS

STATIC_DIR = '../client/dist/'
ASSETS_DIR = './assets'

app = Flask(__name__,
            static_folder=STATIC_DIR,
            # template_folder="../client/dist"
            )

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

proteins = pickle.load(open('../data/proteo.pkl', 'rb'))
available_proteins = set(proteins.index)

clinical = pickle.load(open('../data/clinical.pkl', 'rb'))
clusters = pickle.load(open('../data/clusters.pkl', 'rb'))


# @app.route("/")
# def hello():
#     client_bp = Blueprint('client_app', __name__,
#                           url_prefix='',
#                           static_url_path='',
#                           static_folder='../dist/static/',
#                           template_folder='../dist/',
#                           )


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


@app.route('/')
def catch_all():
    return app.send_static_file("index.html")


@app.route('/assets/<path:path>')
def send_assets(path):
    return send_from_directory(safe_join(STATIC_DIR, ASSETS_DIR), path)
