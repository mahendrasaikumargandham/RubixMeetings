from better_profanity import profanity
import json
from flask import Flask, request, jsonify
from flask_cors import CORS

def findProfanity(text):
    return profanity.contains_profanity(text)
print("abusive" if findProfanity("aw! please stop chat, i will kill you all") else "no_abusive")



app = Flask(__name__)
cors = CORS(app)
@app.route("/receiver", methods=["POST"])
#Create the receiver API POST endpoint:
def postME():
    data = request.get_json()
    data = jsonify(data)
    gotjson = data.json


    

    # print('gotjson',gotjson)
    # print('type of gotjosn', type(gotjson))
    rcvdData =  gotjson['text']
    print('rcvdData', rcvdData)

    text = rcvdData
    # make_Bert_input = make_bert_input(text)
    # process_inputs = preprocess(make_Bert_input)
    # predict = model(process_inputs)
    # _, preds = torch.max(predict, 1)
    # print("pred",preds)
    print("tex......", text)
    pred = 'Abusive' if findProfanity(text) else 'no_abusive'
    print("pred......", pred)
    returnjson = {}
    returnjson['Abusive_YesOrNo']=pred
    # l=[]
    # print('returnnjsommmm', returnjson)
    # l.append(returnjson)
    # print('lllllllllllllllllllll' , l)
    # print('prediction sending', pred)
    data.json['text']=pred
    # print("data.json['text']",data.json['text'])
    
    # print(type(data), 'type of fata')

    # print('datajson returning', data.json)
    response = app.response_class(
            response=json.dumps(returnjson),
            status=200,
            mimetype='application/json'
        )

    return response

if __name__ == "__main__": 
#    model = Bert_Text_OCR(num_labels=2, config=BertConfig.from_pretrained('bert-base-uncased'))
#    model.load_state_dict(torch.load("/Users/mahendra/Documents/Mobile/RubixMeetings/components/AbusiveAnalizer/Python/ALLcheckpoints/checpoints_AUG10/bert_model_fold_1.h5", map_location="cpu"))
   print("ready to run...................")
   app.run(debug=True, port=5001, host="192.168.50.248")
   print("ending........................")