import psutil
import geocoder

giga = 1024*1024*1024

def get_system_info():
    cpu_info = psutil.cpu_count(logical=False)
    cpu_logical = psutil.cpu_count(logical=True)
    cpu_freq = psutil.cpu_freq().max
    memory_info = psutil.virtual_memory()

    g = geocoder.ip('me')

    return {
        "Physical CPU cores": cpu_info,
        "Total CPU cores (including logical)": cpu_logical,
        "Maximum CPU frequency": cpu_freq,
        "Total memory": str(memory_info.total / giga) + "GB",
        "Available memory": str(memory_info.available / giga) + "GB",
        "City": g.city,
        "State": g.state,
        "Country": g.country
    }
