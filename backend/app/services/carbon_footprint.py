import pandas as pd
from constants import KILO, SEC_PER_HOUR, MEMORY_POWER, PUE, PSF, USAGE

def get_carbon_footprint(java_execution_result, system_info):

    '''
    carbon footprint = energy needed x carbon intensity
    energy needed = runtime x (power draw for cores x usage + power draw for memory) x PUE x PSF

    power draw for cores: 
        computing cores depends on the model and number of cores.

    power draw for memory:
        size of memroy available.

    usage: 
        real core usage (default is 1).
    
    PUE:
        Power Usage Effectiveness (constant).

    PSF:
        Pragmatic Scaling Factor (constant).
    '''

    
    tdp_data = pd.read_csv('./data/TDP_cpu.csv')
    CI_data = pd.read_csv('./data/CI_aggregated.csv')

    # h
    runtime = java_execution_result['runtime'] / SEC_PER_HOUR

    processor_name = system_info['Processor name']
    tdp_row = tdp_data.query('index == @processor_name')
    if tdp_row.empty:
        processor_name = 'Core i5-4460'
        tdp_row = tdp_data.query('index == @processor_name')
    
    tdp_cpu = float(tdp_row['in Watt'].values[0])
    n_cpu_cores = float(tdp_row['Unnamed: 2'].values[0])

    # W
    power_needed_cores = n_cpu_cores * tdp_cpu

    # GB * W/GB = W
    power_draw_for_memory = system_info['Available memory'] * MEMORY_POWER

    # gCO2/kWh
    country = system_info['Country']
    carbon_intensity = float((CI_data.query('index == @country')['in gCO2e/kWh']).values[0])

    # kWh
    energy_needed = runtime * (power_needed_cores * USAGE + power_draw_for_memory) * PUE * PSF / KILO
    # kWh * gCO2/kWh
    carbon_footprint = energy_needed * carbon_intensity
    
    # gCO2
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