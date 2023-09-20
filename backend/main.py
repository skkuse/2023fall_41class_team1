from fastapi import FastAPI, Request
from fastapi.routing import APIRoute
from middleware_config import add_middleware

app = FastAPI()

add_middleware(app)

@app.get("/")
def test():
  return {"status":200, "message":"hello from server"}