from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import pytesseract
import cv2
import numpy as np
import sys
import re
import os
from PIL import Image
import ftfy
import tmp2  
import io
from tmp2 import Aadhar_OCR

# pytesseract.pytesseract.tesseract_cmd = 'C:/Program Files/Tesseract-OCR/tesseract.exe'
pytesseract.pytesseract.tesseract_cmd = 'C:/Program Files (x86)/Tesseract-OCR/tesseract.exe'
app = Flask(__name__)
CORS(app)


@app.route('/uploadAadhaar', methods=['POST'])
def upload_file():
    UPLOAD_FOLDER = 'uploads'
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    if 'formData' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['formData']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    try:
        a = Aadhar_OCR(file_path)
        aadharData = a.extract_data()

        response = {
            'message': "File Uploaded Successfully",
            'file_path': file_path,
            'aadhar': aadharData
        }

        return jsonify(response), 200
    finally:
        if os.path.exists(file_path):
            os.remove(file_path)
        if os.path.exists(UPLOAD_FOLDER) and not os.listdir(UPLOAD_FOLDER):
            os.rmdir(UPLOAD_FOLDER)

@app.route('/uploadPAN', methods=['POST'])
def upload_PAN_file():

    UPLOAD_FOLDER = 'uploads'
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    if 'formPANData' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['formPANData']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)
    try:
        img = cv2.imread(file_path)
        text = pytesseract.image_to_string(Image.open(file_path), lang = 'eng')


        text_output = open('output.txt', 'w', encoding='utf-8')
        text_output.write(text)
        text_output.close()

        text = ftfy.fix_text(text)
        text = ftfy.fix_encoding(text)

        file = open('output.txt', 'r', encoding='utf-8')
        text = file.read()
        data = tmp2.pan_read_data(text)
        print(data)
        try:
            to_unicode = unicode
        except NameError:
            to_unicode = str
        with io.open('info.json', 'w', encoding='utf-8') as outfile:
            data = json.dumps(data, indent=4, sort_keys=True, separators=(',', ': '), ensure_ascii=False)
            outfile.write(to_unicode(data))

        with open('info.json', encoding = 'utf-8') as data:
            data_loaded = json.load(data)
        return jsonify({"message": "File Uploaded Successfully!", "file_path": file_path, "pan": data_loaded}), 200
    finally:
        if os.path.exists(file_path):
            os.remove(file_path)
        if os.path.exists(UPLOAD_FOLDER) and not os.listdir(UPLOAD_FOLDER):
            os.rmdir(UPLOAD_FOLDER)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)