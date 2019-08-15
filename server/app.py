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

def df_to_apex_data(color_scale_df, actual_df):
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
    series.insert(7, blank_row)
    series.insert(11, blank_row)
    series.insert(13, blank_row)
    return series[::-1]

def filtered_df(df, genes):
    return df[(df['Gene symbol'].isin(genes)) | (df['Gene symbol'] == '')]

@app.route("/api/color/<genes_input>/")
def color(genes_input):
    genes = genes_input.split(' ')

    filtered_scale = filtered_df(color_scale, genes).drop(columns=['Data type', 'Gene symbol'])

    series = df_to_apex_data(filtered_scale, actual_vals)

    return jsonify({
        'series': series
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


@app.route('/')
def catch_all():
    return app.send_static_file("index.html")


@app.route('/assets/<path:path>')
def send_assets(path):
    return send_from_directory(safe_join(STATIC_DIR, ASSETS_DIR), path)
