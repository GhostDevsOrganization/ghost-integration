from fastapi import FastAPI
import ollama
import uvicorn

app = FastAPI()

@app.get("/")
async def root():
    return {"status": "running"}

@app.post("/task")
async def process_task(task: dict):
    response = ollama.chat(
        model="llama3.2:3b",
        messages=[{"role": "user", "content": task.get("description", "Hello")}]
    )
    return {"result": response["message"]["content"]}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
