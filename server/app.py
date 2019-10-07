import pickle

from flask import Flask, jsonify, safe_join, send_from_directory
from flask_cors import CORS

STATIC_DIR = '../client/dist/'
ASSETS_DIR = './assets'

app = Flask(__name__,
            static_folder=STATIC_DIR,
            )

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

color_scale = pickle.load(open('../data/color_scale.pkl', 'rb'))
actual_vals = pickle.load(open('../data/actual.pkl', 'rb'))

color_scale_phospho = pickle.load(open('../data/color_scale_phospho.pkl', 'rb'))
actual_vals_phospho = pickle.load(open('../data/actual_phospho.pkl', 'rb'))

pathways = {
    'hallmark': pickle.load(open('../data/pathways/hallmark.pkl', 'rb')),
    'kegg': pickle.load(open('../data/pathways/kegg.pkl', 'rb')),
    'reactome': pickle.load(open('../data/pathways/reactome.pkl', 'rb')),
}

def df_to_apex_data(color_scale_df, actual_df, mutation_series_len):
    series = [
        {
            'name': data_type,
            'data': [
                {
                 'x': val[0], # sample ID
                 'y': val[1], # color scale val
                 'value': actual_df[val[0]][data_type]
                }
                for val in vals.items()
            ]
        }
        for data_type, vals in color_scale_df.iterrows()
    ]
    blank_row = { 'name': '', 'data': [] }
    last_clinical_index = 13
    proteo_separator = last_clinical_index + mutation_series_len + 1
    series.insert(7, blank_row)
    series.insert(11, blank_row)
    series.insert(13, blank_row)
    series.insert(proteo_separator, blank_row)
    return series[::-1]


def df_to_apex_data_phospho(color_scale_df, actual_df):
    series = []
    for data_type, vals in color_scale_df.iterrows():
        gene_symbol = actual_df['Gene symbol'][data_type]
        if len(gene_symbol):
            name = gene_symbol
            phospho_id = data_type
        else:
            name = data_type
            phospho_id = ''
        series.extend([{
            'name': name,
            'phospho_id': phospho_id,
            'data': [
                    {
                        'x': val[0],  # sample ID
                        'y': val[1],  # color scale val
                        'value': actual_df[val[0]][data_type],
                        'phospho_id': phospho_id,
                    }
                    for val in vals.items()
                ]
        }])
    blank_row = { 'name': '', 'data': [] }
    last_clinical_index = 13
    series.insert(7, blank_row)
    series.insert(11, blank_row)
    series.insert(last_clinical_index, blank_row)
    return series[::-1]


def filtered_df(df, genes):
    return df[(df['Gene symbol'].isin(genes)) | (df['Gene symbol'] == '')]


@app.route("/api/color/<genes_input>/")
def color(genes_input):
    genes = genes_input.split(' ')

    filtered_scale = filtered_df(color_scale, genes)
    mutation_series = len(filtered_scale[filtered_scale['Data type'] == 'mutation'])

    series = df_to_apex_data(
        filtered_scale.drop(columns=['Data type', 'Gene symbol']),
        actual_vals,
        mutation_series
    )

    return jsonify({
        'series': series
    })

@app.route("/api/phospho/color/<genes_input>/")
def phospho_color(genes_input):
    genes = genes_input.split(' ')

    filtered_scale = filtered_df(color_scale_phospho, genes)

    series = df_to_apex_data_phospho(
        filtered_scale.drop(columns=['Data type', 'Gene symbol']),
        actual_vals_phospho
    )

    return jsonify({
        'series': series
    })

@app.route("/api/phospho/table/<genes_input>/")
def table_phospho(genes_input):
    genes = genes_input.split(' ')

    filtered_scale = filtered_df(actual_vals_phospho, genes)
    df_list = filtered_scale.to_dict(orient='records')

    for i, row in enumerate(df_list):
        row['idx'] = filtered_scale.index[i]

    return jsonify({
        'excelData': df_list
    })

@app.route("/api/table/<genes_input>/")
def table(genes_input):
    genes = genes_input.split(' ')

    filtered_scale = filtered_df(actual_vals, genes)
    df_list = filtered_scale.to_dict(orient='records')

    for i, row in enumerate(df_list):
        row['idx'] = filtered_scale.index[i]

    return jsonify({
        'excelData': df_list
    })

@app.route("/api/pathways/<db>/<pw>")
def pathway(db='', pw=''):
    return jsonify({
        'pw_genes': pathways[db][pw]
    })

@app.route('/')
def catch_all():
    return app.send_static_file("index.html")

@app.route('/assets/<path:path>')
def send_assets(path):
    return send_from_directory(safe_join(STATIC_DIR, ASSETS_DIR), path)
