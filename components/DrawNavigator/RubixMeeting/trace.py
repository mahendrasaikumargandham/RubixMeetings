# !pip install folium
# !pip install geocoder

import geocoder
import webbrowser
ip = geocoder.ip("161.185.160.93")
print(ip.city)
print(ip.latlng)

import requests
# def genratehtmlink(lat,lng):
# ip = [lat, lng]
location = ip.latlng
import folium
import re
import requests
import json
import urllib
# import urllib2

# def createHtml(location):
map = folium.Map(location=location, zoom_start=10)
folium.CircleMarker(location=location, radius=50, color="red").add_to(map)
folium.Marker(location).add_to(map)

print(map)
filename = "map.html"

# webUrl = urllib.request.urlopen(filename)
webUrl = re.search("^http://.+\.bin$", filename)
# webUrl = urllib2.urlopen("https://www.youtube.com/user/guru99com")
print(webUrl)
map.save(filename)

# from flask import Flask, request, jsonify
# from flask_cors import CORS


# app = Flask(__name__)
# cors = CORS(app)
# @app.route("/recei", methods=["POST"])
# #Create the receiver API POST endpoint:
# def openBrowse(filename):
#     webbrowser.open('file://' + os.path.realpath(filename))

    
# #{"openBrowse" : (False, filename), "cretaehtml": (False, [lat, long])}
# def postME():
#     data = request.get_json()
#     data = jsonify(data)
#     gotjson = data.json

#     if gotjson["openBrowse"][0] == True:
#         openBrowse(gotjson["openBrowse"][1])
#     if gotjson["createHtml"] == True:
#         createHtml(gotjson["openBrowse"][1])
   
#     returnjson = {}
#     returnjson['Abusive_YesOrNo'] = -1

#     response = app.response_class(
#             response=json.dumps(returnjson),
#             status=200,
#             mimetype='application/json'
#         )

#     # return response

# if __name__ == "__main__": 
# #    model = Bert_Text_OCR(num_labels=2, config=BertConfig.from_pretrained('bert-base-uncased'))
# #    model.load_state_dict(torch.load("/Users/mahendra/Documents/Mobile/RubixMeetings/components/AbusiveAnalizer/Python/ALLcheckpoints/checpoints_AUG10/bert_model_fold_1.h5", map_location="cpu"))
#    print("ready to run...................")
#    app.run(debug=True, port=5001, host="192.168.137.47")
#    print("ending........................")