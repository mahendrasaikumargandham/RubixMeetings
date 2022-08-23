from pyexpat import model
from gym import make
import torch
import torch.nn as nn
import torch.optim as optim

import torch
import torch.nn as nn
import torch.nn.functional as F
from transformers import BertModel
import torch.optim as optim
import numpy as np

import os,sys,re

import numpy as np
import pandas as pd
from sklearn.model_selection import KFold
from sklearn.metrics import accuracy_score, f1_score, precision_score, recall_score
from sklearn.preprocessing import LabelEncoder
from sklearn.utils import class_weight
from sklearn.model_selection import StratifiedKFold
from transformers import BertConfig
from transformers import BertTokenizer
from tensorflow.keras.utils import to_categorical

import statistics
import time
import copy
from tqdm import tqdm
from sklearn.model_selection import train_test_split

import argparse
from argparse import ArgumentParser

import socket
import sys
import threading
import random
import json

from flask import Flask, request, jsonify
from flask_cors import CORS


torch.manual_seed(42)
max_len = 100
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased',do_lower_case=True, add_special_tokens=True, max_length=max_len, pad_to_max_length=True)

class Bert_Text_OCR(nn.Module):
  
    def __init__(self, num_labels, config=None, device=torch.device("cpu")):
        super(Bert_Text_OCR, self).__init__()
        self.bert_text = BertModel.from_pretrained('bert-base-uncased', config=config)
        self.bn = nn.BatchNorm1d(768, momentum=0.99)
        self.dense1 = nn.Linear(in_features=768, out_features=192) #Add ReLu in forward loop
        self.dropout = nn.Dropout(p=0.2)
        self.dense2 = nn.Linear(in_features=192, out_features=num_labels) #Add softmax in forward loop
        self.device = device
        
    def forward(self, inputs, attention_mask=None, labels=None):

        text_input_ids_in = inputs[:,0,:].long().to(self.device)
        text_input_masks_in = inputs[:,1,:].long().to(self.device)
        
        text_embedding_layer = self.bert_text(text_input_ids_in, attention_mask=text_input_masks_in)[0]
        text_cls_token = text_embedding_layer[:,0,:]

        p = text_cls_token.sum(dim = 0)
        p = p.view(-1, p.size()[0])
        p = p/text_cls_token.size()[0]

        X = self.bn(text_cls_token)

        p = X.sum(dim = 0)
        p = p.view(-1, p.size()[0])

        X = F.relu(self.dense1(p))
        X = self.dropout(X)
       
        X = F.log_softmax(self.dense2(X), dim=1)
         
        return X

class Dataset(torch.utils.data.Dataset):
  # 'Characterizes a dataset for PyTorch'
    def __init__(self, text_input, text_mask):

     
        self.text_input = text_input
        self.text_mask = text_mask


    def __getitem__(self, index):
        'Generates one sample of data'
        # Select sample
        X = np.vstack((self.text_input[index], self.text_mask[index]))

        return X

def model_pred(inputs):

    output =model(inputs)
    torch.max(output, 1)
    _, preds = torch.max(output, 1)

    return preds
    
def preprocess(new_data):

    train_text_input_ids = np.copy(new_data[:,0:max_len])
    train_text_attention_mask = np.copy(new_data[:,max_len:2*max_len])

    l=[]
    for i in range(train_text_attention_mask.shape[0]):
        p=[]
        p.append(train_text_input_ids[i])
        p.append(train_text_attention_mask[i])
        l.append(p)
    my_X = np.array(l)
    new_X_tensor = torch.from_numpy(my_X)

    return new_X_tensor #inputs



def make_bert_input(data, max_len=100):

    # For every sentence...
    input_ids = []
    attention_masks = []
    token_ids = []
    for sent in data:
        encoded_dict = tokenizer.encode_plus(
                            sent,                      # Sentence to encode.
                            add_special_tokens = True, # Add '[CLS]' and '[SEP]'
                            truncation=True,
                            max_length = max_len,           # Pad & truncate all sentences.
                            pad_to_max_length = True,
                            return_attention_mask = True,   # Construct attn. masks.
                            return_token_type_ids = True,
                    )

        # Add the encoded sentence to the list.    
        input_ids.append(encoded_dict['input_ids'])

        # And its attention mask (simply differentiates padding from non-padding).
        attention_masks.append(encoded_dict['attention_mask'])

        token_ids.append(encoded_dict['token_type_ids'])

    input_ids = np.asarray(input_ids, dtype='int32')
    attention_masks = np.asarray(attention_masks, dtype='int32')
    token_ids = np.asarray(token_ids, dtype='int32')

    new_data = np.concatenate((input_ids, attention_masks), axis = 1)
    new_data = np.concatenate((new_data, token_ids), axis=1)

    return new_data


def input_taken(text):
        return text #self.encoded_input



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
    make_Bert_input = make_bert_input(text)
    process_inputs = preprocess(make_Bert_input)
    predict = model(process_inputs)
    _, preds = torch.max(predict, 1)
    print("pred",preds)
    pred = 'Abusive' if preds.item()==1 else 'no_abusive'

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
   model = Bert_Text_OCR(num_labels=2, config=BertConfig.from_pretrained('bert-base-uncased'))
   model.load_state_dict(torch.load("/Users/mahendra/Documents/Mobile/RubixMeetings/components/AbusiveAnalizer/Python/ALLcheckpoints/checpoints_AUG10/bert_model_fold_1.h5", map_location="cpu"))
   print("ready to run...................")
   app.run(debug=True, port=5001, host="192.168.43.248")
   print("running........................")