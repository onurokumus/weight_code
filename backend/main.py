from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import pandas as pd
import numpy as np
import datetime


app = Flask(__name__)
CORS(app)

@app.route('/set_weight', methods=['POST'])
@cross_origin()
def set_data():
    try:
        # Assuming you're sending JSON data, use request.get_json()
        data = request.get_json()

        weightData = pd.read_csv('weights.csv')
        userData   = pd.read_csv('userInfo.csv')

        # Access the data using keys
        username = data.get('username')
        password = data.get('password')
        weight = float(data.get('weight'))

        username = username.capitalize()

        print(data)
        
        if check_user(username, password, userData):
            set_weight(username, weight, weightData)

        # Respond with a JSON response
        response_data = {'message': 'Data received successfully'}
        return jsonify(response_data), 200
    except Exception as e:
        # Handle any exceptions or errors here
        return jsonify({'error': str(e)}), 500

def set_weight(username, weight, weightData):
    current_date = datetime.date.today()
    formatted_date = current_date.strftime("%d.%m.%Y")

    # check if user column exists in weight data
    if not username in weightData.columns:
        num_rows = weightData.shape[0]
        new_column = [np.nan for i in range(num_rows)]
        weightData[username] = new_column
    
    dateExist = False
    # check if date row exists
    for i, value in enumerate(weightData['Date']):
        if value == formatted_date:
            weightData.at[i, username] = weight
            print('date row exists: ', value)
            dateExist = True
            break
    if not dateExist:
        newRow = {'Date': formatted_date, username: weight}
        newRowDF = pd.DataFrame([newRow])
        weightData = pd.concat([weightData, newRowDF], ignore_index=True)
        print('new row added: ', value)
    
    weightData.to_csv('weights.csv', index=False)

def check_user(username, password, userData):

    userIndex = -1
    # check if user exist and pass is correct
    for i, value in enumerate(userData['username']):
        if value == username:
            userIndex = i
            if password == str(userData.loc[i, 'password']):
                print('correct pass: ', value)
                return True
            else:
                print('wrong pass: ', value)
                return False
    
    # add user if not exists
    if userIndex == -1:
        newRow = {'username': username, 'password': password}
        newRowDF = pd.DataFrame([newRow])
        userData = pd.concat([userData, newRowDF], ignore_index=True)
        print('new user added: ', username)
        
        userData.to_csv('userInfo.csv', index=False)
        return True
    

@app.route('/get_table_data', methods=['GET'])
@cross_origin()
def get_table_data():
    weightData = pd.read_csv('weights.csv')
    json_data = weightData.to_json(orient='records')

    return json_data

@app.route('/get_plot_data', methods=['GET'])
@cross_origin()
def get_plot_data():
    weightData = pd.read_csv('weights.csv')
    json_data = weightData.to_json(orient='columns')

    return json_data

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)