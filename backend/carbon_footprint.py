
def get_carbon_footprint(runtime, power_draw_for_cores, usage, power_draw_for_memory):
    # 계수들 맞는지 확인하기
    PUE = 1.67
    PSF = 1
    carbon_intensity = 500

    energy_needed = runtime * (power_draw_for_cores * usage +  power_draw_for_memory) * PUE * PSF
    carbon_footprint = energy_needed * carbon_intensity

    return carbon_footprint