import pickle

from flask import Flask, jsonify

app = Flask(__name__)

cptac_ccrcc = pickle.load(open('./data/cptac-ccrcc.pkl', 'rb')).to_dict()


@app.route("/")
def hello():
    return jsonify(cptac_ccrcc)
