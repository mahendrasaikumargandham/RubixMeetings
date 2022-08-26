# !pip install folium
# !pip install geocoder

import geocoder
import webbrowser
ip = geocoder.ip("161.185.160.93")
print(ip.city)
print(ip.latlng)
import os
# def genratehtmlink(lat,lng):
# ip = [lat, lng]
location = ip.latlng
import folium
import requests
import json


from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)
cors = CORS(app)
@app.route("/recei", methods=["POST"])
#Create the receiver API POST endpoint:


    
#{"openBrowse" : (False, filename), "cretaehtml": (False, [lat, long])}
def postME():
    data = request.get_json()
    data = jsonify(data)
    gotjson = data.json

   
    # returnjson = {}
    # returnjson['Abusive_YesOrNo'] = -1

    # response = app.response_class(
    #         response=json.dumps(returnjson),
    #         status=200,
    #         mimetype='application/json'
    #     )

    # return response

if __name__ == "__main__": 
#    model = Bert_Text_OCR(num_labels=2, config=BertConfig.from_pretrained('bert-base-uncased'))
#    model.load_state_dict(torch.load("/Users/mahendra/Documents/Mobile/RubixMeetings/components/AbusiveAnalizer/Python/ALLcheckpoints/checpoints_AUG10/bert_model_fold_1.h5", map_location="cpu"))
   print("ready to run...................")
   app.run(debug=True, port=5001, host="10.1.3.94")
   print("ending........................")