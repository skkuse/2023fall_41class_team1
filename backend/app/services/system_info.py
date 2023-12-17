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
        "Processor_name": cpu_name,
        "Physical_CPU_cores": cpu_core_num,
        "Total_CPU_cores_including_logical": cpu_logical,
        "Maximum_CPU_frequency": cpu_freq,
        "Total_memory": memory_info.total / GIGA,
        "Available_memory": memory_info.available / GIGA,
        "City": g.city,
        "State": g.state,
        "Country": g.country
    }
