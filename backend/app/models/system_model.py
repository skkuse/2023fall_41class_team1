from pydantic import BaseModel

class SystemInfo(BaseModel):
    Processor_name: str
    Physical_CPU_cores: int
    Total_CPU_cores_including_logical: int
    Maximum_CPU_frequency: float
    Total_memory: float
    Available_memory: float
    City: str
    State: str
    Country: str