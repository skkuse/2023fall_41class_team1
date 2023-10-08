from fastapi import FastAPI, HTTPException
from fastapi.routing import APIRoute
from middleware_config import add_middleware
from pydantic import BaseModel
from typing import Dict

from java_executor import execute_java_code
from system_info import get_system_info
from carbon_footprint import get_carbon_footprint

app = FastAPI()

add_middleware(app)

class JavaCode(BaseModel):
    java_code: Dict[str, str] 

@app.get("/")
def test():
  return {"status": 200, "message": "hello from server"}


@app.post("/execute_java_code/")
async def execute_code(payload: JavaCode):
  try:
    java_execution_result = execute_java_code(payload.java_code)
    system_info = get_system_info()
    
    # 시간(hour)으로 변환해야됨
    runtime = java_execution_result['runtime']

    carbon_footprint = get_carbon_footprint(java_execution_result, system_info)
    print(java_execution_result["output"])
    if java_execution_result.get("status") == "Success":
      return {
          "status": "Success",
          "output": java_execution_result["output"],
          "runtime" : java_execution_result['runtime'],
          "server_info": system_info
      }
    else:
        return java_execution_result

  except Exception as e:
    raise HTTPException(status_code=500, detail=str(e))
