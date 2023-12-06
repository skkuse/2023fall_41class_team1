import psutil
import geocoder
import cpuinfo

from constants import GIGA


def get_system_info():
    cpu_name = cpuinfo.get_cpu_info()['brand_raw']
    cpu_core_num = cpuinfo.get_cpu_info()['count']
    cpu_logical = psutil.cpu_count(logical=True)
    try:
        cpu_freq = psutil.cpu_freq().max
    except Exception as e:
        cpu_freq = "-"

    memory_info = psutil.virtual_memory()

    g = geocoder.ip('me')

    return {
        "Processor name": cpu_name,
        "Physical CPU cores": cpu_core_num,
        "Total CPU cores (including logical)": cpu_logical,
        "Maximum CPU frequency": cpu_freq,
        "Total memory": (memory_info.total / GIGA),
        "Available memory": (memory_info.available / GIGA),
        "City": g.city,
        "State": g.state,
        "Country": g.country
    }
