from pydantic import BaseModel
from typing import Optional,Dict

class JavaCode(BaseModel):
    java_code: Dict[str, str]

class BaseResponseModel(BaseModel):
    status: str
    detail: Optional[str] = None

class SuccessResponseModel(BaseResponseModel):
    output: str
    runtime: float
    carbon_emission: float
    carbonEmissionMetrics: Dict[str, float]

class ErrorResponseModel(BaseResponseModel):
    pass