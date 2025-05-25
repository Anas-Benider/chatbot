from fastapi import FastAPI, HTTPException, UploadFile, File
from typing import List
from pydantic import BaseModel
import os
import psycopg2
import traceback
from dotenv import load_dotenv
from PyPDF2 import PdfReader
from langchain.text_splitter import CharacterTextSplitter
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import FAISS
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain
from fastapi.middleware.cors import CORSMiddleware

# Charger les variables d'environnement
load_dotenv()
SUPABASE_HOST = os.getenv("SUPABASE_HOST")
SUPABASE_DB = os.getenv("SUPABASE_DB")
SUPABASE_PORT = os.getenv("SUPABASE_PORT")
SUPABASE_USER = os.getenv("SUPABASE_USER")
SUPABASE_PASSWORD = os.getenv("SUPABASE_PASSWORD")

app = FastAPI()

# Configurer CORS pour permettre les requêtes du frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Modifiez ceci pour les origines spécifiques si nécessaire
    allow_credentials=True,
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)

class Question(BaseModel):
    question: str

def get_pdf_text(pdf_docs: List[UploadFile]):
    text = ""
    try:
        for pdf in pdf_docs:
            pdf_reader = PdfReader(pdf.file)
            for page in pdf_reader.pages:
                text += page.extract_text() or ""
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading PDF files: {e}")
    return text

def get_text_chunks(text):
    try:
        text_splitter = CharacterTextSplitter(
            separator="\n",
            chunk_size=1000,
            chunk_overlap=200,
            length_function=len
        )
        chunks = text_splitter.split_text(text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error splitting text: {e}")
    return chunks

def get_vectorstore(text_chunks):
    try:
        embeddings = OpenAIEmbeddings()
        vectorstore = FAISS.from_texts(texts=text_chunks, embedding=embeddings)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating vector store: {e}")
    return vectorstore

def get_conversation_chain(vectorstore):
    try:
        llm = ChatOpenAI()
        memory = ConversationBufferMemory(memory_key='chat_history', return_messages=True)
        conversation_chain = ConversationalRetrievalChain.from_llm(
            llm=llm,
            retriever=vectorstore.as_retriever(),
            memory=memory
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating conversation chain: {e}")
    return conversation_chain

def get_db_connection():
    try:
        conn = psycopg2.connect(
            host=SUPABASE_HOST,
            dbname=SUPABASE_DB,
            user=SUPABASE_USER,
            password=SUPABASE_PASSWORD,
            port=SUPABASE_PORT
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error connecting to database: {e}")
    return conn

@app.post("/process")
async def process_files(files: List[UploadFile] = File(...)):
    try:
        print("Starting to process files...")
        raw_text = get_pdf_text(files)
        print(f"Extracted text: {raw_text[:500]}")  # Affiche les premiers 500 caractères du texte
        text_chunks = get_text_chunks(raw_text)
        print(f"Number of text chunks: {len(text_chunks)}")
        vectorstore = get_vectorstore(text_chunks)
        print("Vectorstore created successfully")
        app.state.conversation_chain = get_conversation_chain(vectorstore)
        print("Conversation chain initialized successfully")
        return {"message": "Files processed and conversation chain initialized."}
    except HTTPException as http_err:
        print(f"HTTP Exception: {http_err.detail}")
        raise http_err
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=f"Error processing files: {e}")

@app.post("/ask")
async def ask_question(question: Question):
    try:
        response = app.state.conversation_chain.invoke({'question': question.question})
        return {"response": response['chat_history'][-1].content}
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error handling question: {e}")
