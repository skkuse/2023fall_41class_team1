import pandas as pd
from constants import KILO, SEC_PER_HOUR

PUE = 1.67
PSF = 1.0

# power_draw_for_cores, usage만 구하면 됨
def get_carbon_footprint(java_execution_result, system_info):
    # 계수들 맞는지 확인하기

    # TDP_per_core=tdp_row['Unnamed: 3'].values[0]
    # TDP_in_watt = float(tdp_row['in Watt'].values[0])
    #print(tdp_row)
    #print(tdp_row['in Watt'].values[0])
    # usage = 1.0 # 뭔지 모르겠음

    # powerNeeded_CPU = PUE_used * n_CPUcores * CPUpower * usageCPU_used
    # PUE_used = 1.67
    # n_CPUcores = ???
    # CPUpower = ???
    # usageCPU_used = ???
    # power_draw_for_cores= TDP_per_core / KILO
    # power_draw_for_memory=system_info['Available memory'] * MEMORY_POWER / KILO
    # energy_needed = runtime * (power_draw_for_cores * usage+  power_draw_for_memory) * PUE * PSF


    
    tdp_data = pd.read_csv('./data/TDP_cpu.csv')
    CI_data = pd.read_csv('./data/CI_aggregated.csv')
    country = system_info['Country']
    carbon_intensity = float((CI_data.query('index == @country')['in gCO2e/kWh']).values[0])
    # CARBON_INTENSITY = 500.0 # 500g? 0.5kg?

    # 제 cpu가 목록에 없어서 임의로 넣어놨습니다
    # processor_name = system_info['Processor name']
    processor_name = 'Core i5-4460'
    tdp_row = tdp_data.query('index == @processor_name')
    TDP_cpu = float(tdp_row['in Watt'].values[0])

    runtime = java_execution_result['runtime'] / SEC_PER_HOUR
    n_cpu_cores = float(tdp_row['Unnamed: 2'].values[0])
    power_needed = PUE * n_cpu_cores * TDP_cpu * 1.0
    energy_needed = runtime * power_needed * PSF / KILO
    carbon_footprint = energy_needed * carbon_intensity
    print("footprint : " + str(carbon_footprint))
    return carbon_footprint


def emission_converter(carbon_emission):
    car_emission_equiv = carbon_emission/141.4
    phone_emission_equiv = carbon_emission /7.4 * 100
    air_conditioner_emission_equiv = carbon_emission / 870
    tree_emission_equiv = carbon_emission/917

    return {"car_emission_equiv":car_emission_equiv,
    "phone_emission_equiv":phone_emission_equiv,
    "air_conditioner_emission_equiv":air_conditioner_emission_equiv,
    "tree_emission_equiv":tree_emission_equiv}