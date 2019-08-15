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

@app.route("/api/color/<genes_input>/<sort_category>/<ascending>")
def color(genes_input, sort_category='default', ascending=1):
    genes = genes_input.split(' ')
    ascending = ascending == 1

    filtered_scale = filtered_df(color_scale, genes)

    if sort_category == 'default':
        sort_order = filtered_scale.drop(columns=['Data type', 'Gene symbol']).columns
    else:
        sort_order = list(
            filtered_scale
                .drop(columns=['Data type', 'Gene symbol'])
                .loc[sort_category]
                .sort_values(ascending=ascending)
                .index
        )

    sorted_scale = filtered_scale[sort_order]
    series = df_to_apex_data(sorted_scale, actual_vals)

    return jsonify({
        'series': series
    })


@app.route('/')
def catch_all():
    return app.send_static_file("index.html")


@app.route('/assets/<path:path>')
def send_assets(path):
    return send_from_directory(safe_join(STATIC_DIR, ASSETS_DIR), path)
