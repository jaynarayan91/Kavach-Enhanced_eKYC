from PyPDF2 import PdfReader
from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain.text_splitter import RecursiveCharacterTextSplitter
import os
from langchain_google_genai import GoogleGenerativeAIEmbeddings
import google.generativeai as genai
from langchain_community.vectorstores import FAISS
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import PromptTemplate
import json
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))


app = Flask(__name__)
CORS(app)

def get_pdf_text(pdf_docs):
    text=""
    for pdf in pdf_docs:
        pdf_reader= PdfReader(pdf)
        for page in pdf_reader.pages:
            text+= page.extract_text()
    return  text



def get_text_chunks(text):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=10000, chunk_overlap=1000)
    chunks = text_splitter.split_text(text)
    return chunks


def get_vector_store(text_chunks):
    embeddings = GoogleGenerativeAIEmbeddings(model = "models/embedding-001")
    vector_store = FAISS.from_texts(text_chunks, embedding=embeddings)
    vector_store.save_local("faiss_index")


def get_conversational_chain():
    prompt_template = """
    You are Kavach AI built by Team Kavach having members: Prit Shah, Aarchi Dholakia, Vedant Patel and Aarya Gopani. You are built for seamless user experience and solving FAQs of users based on the provided context.
    
    Answer the question as detailed as possible from the provided context, make sure to provide all the details, if the answer is not in
    provided context say something like "This website does not contain information about the topic asked. Do you have any other questions to ask?" (Give topic name in the message), don't provide the wrong answer.\n\n
    Context:\n {context}?\n
    Question: \n{question}\n
    Answer:
    The output should be formatted as a JSON instance that conforms to the JSON schema with three fields question, answer and options.
    Question must contain the question asked by the user. 
	Answer must contain the answer to the question asked and options must contain the questions user can ask next. Give atmost 4 options to ask next to the user related to the document only. Options must be like a phrase or a word to ask.
    Even when the question is not related to the context provide options.
    Remove HTML tags from answer if present.
    """
    model = ChatGoogleGenerativeAI(model="gemini-pro", temperature=1, google_api_key=os.environ["GOOGLE_API_KEY"])

    prompt = PromptTemplate(template = prompt_template, input_variables = ["context", "question"])
    chain = load_qa_chain(model, chain_type="stuff", prompt=prompt)
    return chain



def user_input(user_question):
    embeddings = GoogleGenerativeAIEmbeddings(model = "models/embedding-001")
    
    new_db = FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True)
    docs = new_db.similarity_search(user_question)

    chain = get_conversational_chain()

    
    response = chain.invoke(
        {"input_documents":docs, "question": user_question}
        , return_only_outputs=True)
    print(response)
    response['output_text'].replace('```json\n', '')
    response['output_text'].replace('\n```', '')
    return response['output_text']


@app.route('/getAIResponse/data', methods=['POST'])
def main():
    data = request.json
    user_ques = data.get('ques')
    response = user_input(user_ques)
    return jsonify(response), 200
    

if __name__ == "__main__":
    pdf_docs = ['./files/chatbot_train.pdf']
    raw_text = get_pdf_text(pdf_docs)
    text_chunks = get_text_chunks(raw_text)
    get_vector_store(text_chunks)
    app.run(host='0.0.0.0', port=5001)