from fastapi import FastAPI, HTTPException, Depends, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer
import pdfplumber
from docx import Document
import pandas as pd
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
from typing import List
import json
from pydantic import BaseModel
import os
from langchain.llms import HuggingFaceHub
from langchain.chains import RetrievalQA
from langchain.vectorstores import FAISS
from langchain.embeddings import HuggingFaceEmbeddings

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()

# Initialize models
model = SentenceTransformer('all-MiniLM-L6-v2')
llm = HuggingFaceHub(
    repo_id="mistralai/Mistral-7B-Instruct-v0.1",
    model_kwargs={"temperature": 0.7, "max_length": 512}
)

# Initialize FAISS index
dimension = 384  # Dimension of the embeddings
index = faiss.IndexFlatL2(dimension)

class DocumentChunk(BaseModel):
    content: str
    embedding: List[float]
    metadata: dict

def extract_text_from_pdf(file: UploadFile) -> str:
    with pdfplumber.open(file.file) as pdf:
        text = ""
        for page in pdf.pages:
            text += page.extract_text() or ""
    return text

def extract_text_from_docx(file: UploadFile) -> str:
    doc = Document(file.file)
    return "\n".join([paragraph.text for paragraph in doc.paragraphs])

def extract_text_from_excel(file: UploadFile) -> str:
    df = pd.read_excel(file.file)
    return df.to_string()

def process_document(file: UploadFile) -> str:
    content_type = file.content_type
    if content_type == "application/pdf":
        return extract_text_from_pdf(file)
    elif content_type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return extract_text_from_docx(file)
    elif content_type in ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]:
        return extract_text_from_excel(file)
    else:
        raise HTTPException(status_code=400, detail="Unsupported file type")

@app.post("/api/process")
async def process_document_endpoint(
    file: UploadFile = File(...),
    token: str = Depends(security)
):
    try:
        # Verify token and get user
        # TODO: Implement token verification
        
        # Process document
        text = process_document(file)
        
        # Split into chunks
        chunks = [text[i:i+1000] for i in range(0, len(text), 1000)]
        
        # Generate embeddings
        embeddings = model.encode(chunks)
        
        # Add to FAISS index
        index.add(np.array(embeddings).astype('float32'))
        
        # Save document chunks
        document_chunks = [
            DocumentChunk(
                content=chunk,
                embedding=embedding.tolist(),
                metadata={"filename": file.filename}
            )
            for chunk, embedding in zip(chunks, embeddings)
        ]
        
        # Save to database
        # TODO: Implement database storage
        
        return {"message": "Document processed successfully", "chunks": len(chunks)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/query")
async def query_documents(
    query: str,
    token: str = Depends(security)
):
    try:
        # Verify token and get user
        # TODO: Implement token verification
        
        # Generate query embedding
        query_embedding = model.encode([query])[0]
        
        # Search in FAISS
        k = 5  # Number of nearest neighbors
        distances, indices = index.search(np.array([query_embedding]).astype('float32'), k)
        
        # Get relevant chunks
        # TODO: Retrieve chunks from database using indices
        
        # Create RAG chain
        vectorstore = FAISS.from_texts(
            ["Retrieved chunks here"],  # TODO: Replace with actual chunks
            HuggingFaceEmbeddings()
        )
        
        qa_chain = RetrievalQA.from_chain_type(
            llm=llm,
            chain_type="stuff",
            retriever=vectorstore.as_retriever()
        )
        
        # Generate response
        response = qa_chain.run(query)
        
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 