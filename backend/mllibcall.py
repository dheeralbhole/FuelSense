import pandas as pd
import numpy as np
from scipy import stats
from sklearn import model_selection
from sklearn.ensemble import RandomForestRegressor
import pickle
import json


class CallRandomForest:
    @classmethod
    def get_rfresponse(self, input_dict):
        # This method will update the ML training csv with user input parameter
        # Then feed that as a input to the Random forest ML algorithm for prediction

        cal_dtype = {"distance": "float32",
                     "speed": "int16",
                     "temp_inside": "float32",
                     "temp_outside": "float32",
                     "gas_type": "int16",
                     "AC": "int16",
                     "rain": "int16",
                     "sun": "int16",
                     "consume": "float32"}

        # Read input data from CSV file and copy the columns to data1 for processing
        data = pd.read_csv("processed_data.csv", dtype=cal_dtype)
        data1 = data
        temp = input_dict['param_list']
        temp = temp.replace('[', '')
        temp = temp.replace(']', '')
        arr = temp.split(",")
        # try:
        for x in arr:
            if ((x == 'distance' and input_dict['model'] == 'distcons') or (x == 'speed' and input_dict['model'] == 'speedcons') or (x == 'temp_outside' and input_dict['model'] == 'tempcons')):
                return {"status": 400, "message": f"To compute for model {input_dict['model']} ,paramter {x} should not be selected "}

        for x in arr:
            if (x == "speed" or x == "gas_type" or x == "AC" or x == "rain" or x == "sun"):
                data1[x] = [int(input_dict[x]) for y in data['distance']]
            else:
                data1[x] = [float(input_dict[(x)]) for y in data['distance']]

        loaded_model = pickle.load(open("final_model.sav", 'rb'))
        result = loaded_model.predict(data1.iloc[:, :-1])
        cols = ["y"]
        new_data = pd.DataFrame(data=result, columns=cols)
        if (input_dict['model'] == 'distcons'):
            new_data['x'] = data['distance']
        elif (input_dict['model'] == 'speedcons'):
            new_data['x'] = data['speed']
        else:
            new_data['x'] = data['temp_inside']
        # except:
            # return {"status": 500, "message": "Unable to compute"}

        y = new_data['y'].tolist()
        x = new_data['x'].tolist()
        y_org = data['consume'].tolist()
        return {"status": 201, "x": x, "y": y, "y_org": y_org}
