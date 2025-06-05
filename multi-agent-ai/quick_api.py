from fastapi import FastAPI
import ollama
import uvicorn

app = FastAPI()

@app.get("/")
async def root():
    return {"status": "Multi-Agent AI System Running"}

@app.post("/chat")
async def chat(message: dict):
    response = ollama.chat(
        model="llama3.2:3b",
        messages=[{"role": "user", "content": message.get("text", "Hello")}]
    )
    return {"response": response["message"]["content"]}

if __name__ == "__main__":
    print("Starting API on http://localhost:8000")
    uvicorn.run(app, host="0.0.0.0", port=8000)
