from pydantic import BaseModel
from typing import Dict

class JavaCode(BaseModel):
    java_code: Dict[str, str]