from fastapi import FastAPI
from pydantic import BaseModel
from chatbot import get_bot_response
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://fund-spark-wbv7.vercel.app", "http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    query: str

@app.post("/chat/")
def chat(msg: Message):
    reply = get_bot_response(msg.query)
    return {"response": reply}
