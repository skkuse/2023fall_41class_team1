import requests, json
import pandas as pd
import csv

ITER = 10
URL = "http://localhost:8000/execute_java_code/"

code_list = pd.read_csv("code_list.csv", encoding = 'utf-8')

for code_idx in range(len(code_list)):
    bf_time_sum = 0
    bf_time_avg = 0
    bf_carbon_sum = 0
    bf_carbon_avg = 0
    af_time_sum = 0
    af_time_avg = 0
    af_carbon_sum = 0
    af_carbon_avg = 0
    bf_code = code_list.iloc[code_idx, 0]
    af_code = code_list.iloc[code_idx, 1]
    for i in range(ITER + 1):
        
        response = requests.post(URL, json={'java_code' : {'code1':bf_code}})

        # 첫번째껀 버림
        if i == 0:
            continue
        
        bf_time_sum += response.json()['runtime']
        bf_carbon_sum += response.json()['carbon_emission']
    bf_time_avg = bf_time_sum / ITER
    bf_carbon_avg = bf_carbon_sum / ITER  

    for i in range(ITER + 1):
        
        response = requests.post(URL, json={'java_code' : {'code1':af_code}})

        # 첫번째껀 버림
        if i == 0:
            continue
        
        af_time_sum += response.json()['runtime']
        af_carbon_sum += response.json()['carbon_emission']
    af_time_avg = af_time_sum / ITER
    af_carbon_avg = af_carbon_sum / ITER  


    print("---" + str(code_idx + 1) + "번째 코드---")
    print("Average runtime(before) : " + str(bf_time_avg))
    print("Average carbon emission(before) : " + str(bf_carbon_avg))
    print("Average runtime(after) : " + str(af_time_avg))
    print("Average carbon emission(after) : " + str(af_carbon_avg))
