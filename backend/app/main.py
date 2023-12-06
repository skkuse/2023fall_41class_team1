from fastapi import FastAPI
from app.middleware_config import add_middleware

from app.models.java_code import JavaCode

from app.services.java_executor import execute_java_code
from app.services.system_info import get_system_info
from app.services.carbon_footprint import get_carbon_footprint, emission_converter

import re

app = FastAPI()

add_middleware(app)

system_info = get_system_info()


@app.get("/")
def test():
  return {"status": 200, "message": "hello from server"}


@app.post("/execute_java_code/")
async def execute_code(payload: JavaCode):

  try:
    java_execution_result = execute_java_code(payload.java_code)
    if java_execution_result.get('status') != 'Success':
      return {
          "status": java_execution_result.get('status'),
          "detail": java_execution_result["error"]
      }

    carbon_emission = get_carbon_footprint(java_execution_result, system_info)
    carbonEmissionMetrics = emission_converter(carbon_emission)
    if java_execution_result.get("status") == "Success":
      return {
          "status": "Success",
          "output": java_execution_result["output"],
          "runtime": java_execution_result['runtime'],
          "carbon_emission": carbon_emission,
          "carbonEmissionMetrics": carbonEmissionMetrics
      }
  except Exception as e:
    return {"status": "Failed", "detail": str(e)}


@app.get("/get_system_info/")
async def get_system_info():
  return system_info
