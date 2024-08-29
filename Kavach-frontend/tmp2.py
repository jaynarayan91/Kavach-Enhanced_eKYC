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
import io

def pan_read_data(text):
    name = None
    fname = None
    dob = None
    pan = None
    nameline = []
    dobline = []
    panline = []
    text0 = []
    text1 = []
    text2 = []
    lines = text.split('\n')
    for lin in lines:
        s = lin.strip()
        s = lin.replace('\n','')
        s = s.rstrip()
        s = s.lstrip()
        text1.append(s)
    text1 = list(filter(None, text1))
    lineno = 0
    for wordline in text1:
        xx = wordline.split('\n')
        if ([w for w in xx if re.search('(INCOMETAXDEPARWENT|INCOME|TAX|GOW|GOVT|GOVERNMENT|OVERNMENT|VERNMENT|DEPARTMENT|EPARTMENT|PARTMENT|ARTMENT|INDIA|NDIA)$', w)]):
            text1 = list(text1)
            lineno = text1.index(wordline)
            break
    text0 = text1[lineno+1:]
    try:
    # Cleaning first names
        name = text0[0]
        name = name.rstrip()
        name = name.lstrip()
        name = name.replace("8", "B")
        name = name.replace("0", "D")
        name = name.replace("6", "G")
        name = name.replace("1", "I")
        name = re.sub('[^a-zA-Z] +', ' ', name)
    # Cleaning Father's name
        fname = text0[1]
        fname = fname.rstrip()
        fname = fname.lstrip()
        fname = fname.replace("8", "S")
        fname = fname.replace("0", "O")
        fname = fname.replace("6", "G")
        fname = fname.replace("1", "I")
        fname = fname.replace("\"", "A")
        fname = re.sub('[^a-zA-Z] +', ' ', fname)
    # Cleaning DOB
        dob = text0[2][:10]
        dob = dob.rstrip()
        dob = dob.lstrip()
        dob = dob.replace('l', '/')
        dob = dob.replace('L', '/')
        dob = dob.replace('I', '/')
        dob = dob.replace('i', '/')
        dob = dob.replace('|', '/')
        dob = dob.replace('\"', '/1')
        dob = dob.replace(" ", "")
    # Cleaning PAN Card details
        text0 = findword(text1, '(Pormanam|Number|umber|Account|ccount|count|Permanent|ermanent|manent|wumm)$')
        panline = text0[0]
        pan = panline.rstrip()
        pan = pan.lstrip()
        pan = pan.replace(" ", "")
        pan = pan.replace("\"", "")
        pan = pan.replace(";", "")
        pan = pan.replace("%", "L")
    except:
        pass
    data = {}
    # data['Name'] = name
    # data['Father Name'] = fname
    # data['Date of Birth'] = dob
    data['PAN'] = pan
    data['ID Type'] = "PAN"
    return data

def findword(textlist, wordstring):
    lineno = -1
    for wordline in textlist:
        xx = wordline.split( )
        if ([w for w in xx if re.search(wordstring, w)]):
            lineno = textlist.index(wordline)
            textlist = textlist[lineno+1:]
            return textlist
    return textlist


class Aadhar_OCR:
    def __init__(self, img_path):
        self.user_aadhar_no = str()
        self.user_gender = str()
        self.user_dob = str()
        self.user_name = str()

        self.img_name = img_path
    
    def extract_data(self):
        # Reading the image, extracting text from it, and storing the text into a list.
        img = cv2.imread(self.img_name)
        text = pytesseract.image_to_string(img)
        all_text_list = re.split(r'[\n]', text)
        
        # Process the text list to remove all whitespace elements in the list.
        text_list = list()
        for i in all_text_list:
            if re.match(r'^(\s)+$', i) or i=='':
                continue
            else:
                text_list.append(i)

        # Extracting all the necessary details from the pruned text list.
        # 1) Aadhar Card No.
        aadhar_no_pat = r'^[0-9]{4}\s[0-9]{4}\s[0-9]{4}$'
        for i in text_list:
            if re.match(aadhar_no_pat, i):
                self.user_aadhar_no = i
            else:
                continue

        # 2) Gender
        aadhar_male_pat = r'(Male|MALE|male)$'
        aadhar_female_pat = r'[(Female)(FEMALE)(female)]$'
        for i in text_list:
            if re.search(aadhar_male_pat, i):
                self.user_gender = 'MALE'
            elif re.search(aadhar_female_pat, i):
                self.user_gender = 'FEMALE'
            else:
                continue

        # 3) DOB
        aadhar_dob_pat = r'(Year|Birth|irth|YoB|YOB:|DOB:|DOB)'
        date_ele = str()
        index = -1
        dob_idx = -1
        for idx, i in enumerate(text_list):
            if re.search(aadhar_dob_pat, i):
                index = re.search(aadhar_dob_pat, i).span()[1]
                date_ele = i
                dob_idx = idx
            else:
                continue

        date_str=''
        for i in date_ele[index:]:
            if re.match(r'\d', i):
                date_str = date_str+i
            elif re.match(r'/', i):
                date_str = date_str+i
            else:
                continue
        self.user_dob = date_str

        # 4) Name
        self.user_name = text_list[dob_idx-1]
        
        return {
            "Aadhar No" : self.user_aadhar_no,
            "Gender" : self.user_gender,
            "DOB" : self.user_dob,
            "Name" : self.user_name
        }