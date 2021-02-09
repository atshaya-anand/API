from flask import Flask,request,jsonify
from flask_cors import CORS
import random
from utils import *
import math 
import time
#import pyqrcode 
#import png 
#from pyqrcode import QRCode 
#from barcode import *

app = Flask(__name__)
CORS(app)

public = tuple()

class Date:
    def __init__(self, d, m, y,h=0,mi=0,s=0):
        self.day = d
        self.month = m
        self.year = y
        self.hours = h
        self.minutes = mi
        self.seconds = s

# FUNCTION TO CHECK WHETHER THE DATES ARE VALID
def validate_date(date_obj):
  is_valid = 1
  is_leap = 0
  msg = ""
  if date_obj.year>=1800 and date_obj.year<9999 :
    if date_obj.year%4==0 or date_obj.year%100==0 :
      is_leap = 1
    if date_obj.month>=1 and date_obj.month <=12:
      if date_obj.month == 2:
        if is_leap and date_obj.day<=29:
          is_valid = 1
        elif date_obj.day>28:
          is_valid = 0
          msg = "feb has more days in non leap year"
      elif date_obj.month==4 or date_obj.month==6 or date_obj.month==9 or date_obj.month==11:  
          if date_obj.day>30:
            is_valid = 0
            msg = "No of days is more than 30 in the month" + str(date_obj.month)
      elif date_obj.day>31:
        is_valid = 0
        msg = "The number of days is more than 31 in this month" + str(date_obj.month)
    
    else:
      is_valid = 0
      msg = "no such month"
  else:
    is_valid = 0
    msg = "no such year"
  
  return is_valid,msg

# API FOR FINDING DIFF B/W 2 GIVEN DATES
@app.route('/getDateDiff',methods = ['GET'])
def getDifference():
  data = dict(request.args)
  print(data)
  date1 = data['date1']
  date2 = data['date2']
  print(date1,'----',date2)
  date1 = date1.split("T")
  date2 = date2.split("T")
  date_1,time_1 = date1
  date_2,time_2 = date2
  time_1 = time_1.split(":")
  time_2 = time_2.split(":")
  hr_1,min_1 = time_1
  hr_2,min_2 = time_2
  print(hr_1,'----',min_1)
  date_1 = date_1.split("-")
  year_1,month_1,day_1 = date_1
  date_2 = date_2.split("-")
  year_2,month_2,day_2 = date_2
  print(day_1,'----',month_1,'----',year_1)
  date_obj1 = Date(int(day_1),int(month_1),int(year_1),int(hr_1),int(min_1),0)
  date_obj2 = Date(int(day_2),int(month_2),int(year_2),int(hr_2),int(min_2),0)

  is_validD1,msg1 = validate_date(date_obj1)
  is_validD2,msg2 = validate_date(date_obj2)
  is_leap = 0
  if is_validD1 == 0:
      return jsonify({'result':msg1})
  if is_validD2 == 0:
      return jsonify({'result':msg2})
  flag = 0
  is_leap = 0
  if (date_obj1.year > date_obj2.year):
        flag = 1
  elif (date_obj1.year == date_obj2.year) and (date_obj1.month > date_obj2.month):
        flag = 1
  elif (date_obj1.year == date_obj2.year) and (date_obj1.month == date_obj2.month) and (date_obj1.day > date_obj2.day) :
        flag = 1

  if flag == 1:       
          swap = date_obj1
          date_obj1 = date_obj2
          date_obj2 = swap
      
  startYear = date_obj1.year
  february = (startYear % 4 == 0 and startYear % 100 != 0) or (29 if startYear % 400 == 0 else 28)
  daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
 

  yearDiff = date_obj2.year - startYear
  monthDiff = date_obj2.month - date_obj1.month
  if (monthDiff < 0) :
          yearDiff-=1
          monthDiff += 12
      
  dayDiff = date_obj2.day - date_obj1.day
  if (dayDiff < 0) :
          if (monthDiff > 0) :
              monthDiff-=1
          else :
              yearDiff-=1
              monthDiff = 11
          
          dayDiff += daysInMonth[date_obj1.month]
  print(yearDiff , 'Y ' , monthDiff , 'M ' , dayDiff , 'D')
  day_diff = dayDiff
  month_diff = monthDiff
  year_diff = yearDiff
  hours_diff = date_obj2.hours - date_obj1.hours
  minutes_diff = date_obj2.minutes - date_obj1.minutes
  seconds_diff = date_obj2.seconds - date_obj1.seconds
  print(day_diff,month_diff,year_diff,hours_diff,minutes_diff,seconds_diff)
  if seconds_diff<0:
    seconds_diff = 60 + seconds_diff
    minutes_diff -=1
  if minutes_diff<0:
    minutes_diff = 60 + minutes_diff
    hours_diff -=1
  if hours_diff<0:
    hours_diff = 24 + hours_diff
    day_diff -=1
  if day_diff<0:
    month_diff -=1
    if month_diff == -1:
      month_diff = 12
      year_diff = year_diff - 1
      if year_diff%4==0 or year_diff%100==0:
        is_leap = 1
      else:
        is_leap = 0
    if month_diff==4 or month_diff==6 or month_diff==9 or month_diff==11:
      day_diff = 30 - day_diff
    elif month_diff == 2 and is_leap == 1:
      day_diff = 29 - day_diff
    elif month_diff == 2 and is_leap == 0:
      day_diff = 28 - day_diff
    else:
      day_diff = 31 - day_diff
  
  result = str(day_diff)+' days '+str(month_diff)+' months '+str(year_diff)+" years "+str(hours_diff)+' hours '+str(minutes_diff)+' minutes '+str(seconds_diff)+' seconds.'
  print(result)
  return jsonify({'result':result})

# function for union - contains all elements of both set
@app.route('/getUnion',methods = ['GET'])
def union():
    print(request.args)
    data = dict(request.args)
    print(data)
    seta = data['seta']
    setb = data['setb']
    seta = seta.split(',')
    setb = setb.split(',')
    seta = [int(x) for x in seta]
    setb = [int(x) for x in setb]
    seta = set(seta)
    setb = set(setb)
    #print('seta---',seta,'setb---',setb)
    result = set()
    for i in seta:
        result.add(i)
    for i in setb:
        result.add(i)
    return jsonify({'result':list(result)})


# function for intersection - contains only common elements of set
@app.route('/getIntersection',methods = ['GET'])
def intersection():
    data = dict(request.args)
    seta = data['seta']
    setb = data['setb']
    seta = seta.split(',')
    setb = setb.split(',')
    seta = [int(x) for x in seta]
    setb = [int(x) for x in setb]
    seta = set(seta)
    setb = set(setb)
    result = set()
    for i in seta:
        if i in setb:
          result.add(i)
    return jsonify({'result':list(result)})

# function for minus - contains elements which are not in another set
@app.route('/getMinus',methods = ['GET'])
def minus():
    data = dict(request.args)
    seta = data['seta']
    setb = data['setb']
    seta = seta.split(',')
    setb = setb.split(',')
    seta = [int(x) for x in seta]
    setb = [int(x) for x in setb]
    seta = set(seta)
    setb = set(setb)
    result = set()
    for i in seta:
        if i not in setb:
            result.add(i)
    return jsonify({'result':list(result)})

@app.route('/getTranspose',methods = ['GET'])
def transpose():
  data = dict(request.args)
  print(data)
  rows = int(data['row'])
  cols = int(data['col'])
  mat = data['mat']
  strnL = mat.split(",")
  count = 0
  matrixA = []
  for i in range(rows):
    temp = []
    for j in range(rows):
      temp.append(int(strnL[count]))
      count+=1
    matrixA.append(temp)
  print(rows,'----',cols,'----',matrixA)
  result = [[0 for x in range(rows)] for y in range(cols)]
  res = ''  
  for i in range(cols): 
    for j in range(rows): 
      result[i][j] = matrixA[j][i] 
      res = res + str(result[i][j]) + ' '
    res = res + '<br/>'
  #print("Transpose",type(res))
  return jsonify({'result':res})


# function to find lower diagonal elements
@app.route('/getLowerDiagonal',methods = ['GET'])
def lower_diagonal():
    data = dict(request.args)
    print(data)
    rows = int(data['row'])
    cols = int(data['col'])
    mat = data['mat']
    strnL = mat.split(",")
    count = 0
    matrixA = []
    for i in range(rows):
      temp = []
      for j in range(rows):
        temp.append(int(strnL[count]))
        count+=1
      matrixA.append(temp)
    print(rows,'----',cols,'----',matrixA)
    lower_left = []
    lower_right = []
    if rows == cols:
      for i in range(rows):
        for j in range(cols):
          if j<i:
            lower_left.append(matrixA[i][j])
          if j>=1 and i+j > cols-1:
            lower_right.append(matrixA[i][j])

    print("Left-lower:",lower_left,"\nRight-lower:",lower_right)
    res = "Lower Left Elements: "+str(lower_left)+"<br/>Lower Right Elements: "+str(lower_right)
    return jsonify({'result':res})


# function to find upper diagonal elements
@app.route('/getUpperDiagonal',methods = ['GET'])
def upper_diagonal():
    data = dict(request.args)
    print(data)
    rows = int(data['row'])
    cols = int(data['col'])
    mat = data['mat']
    strnL = mat.split(",")
    count = 0
    matrixA = []
    for i in range(rows):
      temp = []
      for j in range(rows):
        temp.append(int(strnL[count]))
        count+=1
      matrixA.append(temp)
    print(rows,'----',cols,'----',matrixA)
    upper_left = []
    upper_right = []
    if rows == cols:
      for i in range(rows):
        for j in range(cols):
          if j>i:
            upper_right.append(matrixA[i][j])
          if j<=1 and i+j < cols-1:
            upper_left.append(matrixA[i][j])
          
    print("Left-upper:",upper_left,"\nRight-upper:",upper_right)
    res = "Upper Left Elements: "+str(upper_left)+"<br/>Upper Right Elements: "+str(upper_right)
    return jsonify({'result':res})


ones = ('Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine')

twos = ('Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen')

tens = ('Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety', 'Hundred')

suffixes = ('', 'Thousand', 'Million', 'Billion')

def process(number, index):
    
    if number=='0':
        return 'Zero'
    
    length = len(number)
    
    if(length > 3):
        return False
    
    number = number.zfill(3)
    words = ''
 
    hdigit = int(number[0])
    tdigit = int(number[1])
    odigit = int(number[2])
    
    words += '' if number[0] == '0' else ones[hdigit]
    words += ' Hundred ' if not words == '' else ''
    
    if(tdigit > 1):
        words += tens[tdigit - 2]
        words += ' '
        words += ones[odigit]
    
    elif(tdigit == 1):
        words += twos[(int(tdigit + odigit) % 10) - 1]
        
    elif(tdigit == 0):
        words += ones[odigit]

    if(words.endswith('Zero')):
        words = words[:-len('Zero')]
    else:
        words += ' '
     
    if(not len(words) == 0):    
        words += suffixes[index]
        
    return words

@app.route('/getWord',methods = ['GET'])  
def getWords():
    data = dict(request.args)
    print(data)
    number = int(data['fig'])
    length = len(str(number))
    
    if length>12:
        return 'This program supports upto 12 digit numbers.'
    
    count = length // 3 if length % 3 == 0 else length // 3 + 1
    copy = count
    words = []
 
    for i in range(length - 1, -1, -3):
        words.append(process(str(number)[0 if i - 2 < 0 else i - 2 : i + 1], copy - count))
        count -= 1

    final_words = ''
    for s in reversed(words):
        temp = s + ' '
        final_words += temp
    print(final_words)
    return jsonify({'result':final_words})


def gcd(a, b):
    while b != 0:
        a, b = b, a % b
    return a

'''
Euclid's extended algorithm for finding the multiplicative inverse of two numbers
'''
def multiplicative_inverse(e, phi):
    d = 0
    x1 = 0
    x2 = 1
    y1 = 1
    temp_phi = phi
    
    while e > 0:
        temp1 = temp_phi/e
        temp2 = temp_phi - temp1 * e
        temp_phi = e
        e = temp2
        
        x = x2- temp1* x1
        y = d - temp1 * y1
        
        x2 = x1
        x1 = x
        d = y1
        y1 = y
    
        if temp_phi == 1:
            print(d+phi,"edrfghjkl")
            return d + phi

'''
Tests to see if a number is prime.
'''
def is_prime(num):
    if num == 2:
        return True
    if num < 2 or num % 2 == 0:
        return False
    for n in range(3, int(num**0.5)+2, 2):
        if num % n == 0:
            return False
    return True

def egcd(e,r):
    while(r!=0):
        e,r=r,e%r
    return e
def eugcd(e,r):
    for i in range(1,r):
        while(e!=0):
            a,b=r//e,r%e
            if(b!=0):
                print("%d = %d*(%d) + %d"%(r,a,e,b))
            r=e
            e=b
    return e,r
def eea(a,b):
    if(a%b==0):
        return(b,0,1)
    else:
        gcd,s,t = eea(b,a%b)
        s = s-((a//b) * t)
        print("%d = %d*(%d) + (%d)*(%d)"%(gcd,a,t,s,b))
        return(gcd,t,s)
 
#Multiplicative Inverse
def mult_inv(e,r):
    gcd,s,_=eea(e,r)
    if(gcd!=1):
        return None
    else:
        if(s<0):
            print("s=%d. Since %d is less than 0, s = s(modr), i.e., s=%d."%(s,s,s%r))
        elif(s>0):
            print("s=%d."%(s))
        return s%r
def generate_keypair(p, q):
    if not (is_prime(p) and is_prime(q)):
        raise ValueError('Both numbers must be prime.')
    elif p == q:
        raise ValueError('p and q cannot be equal')
    #n = pq
    n = p * q

    #Phi is the totient of n
    phi = (p-1) * (q-1)

    #Choose an integer e such that e and phi(n) are coprime
    
    for i in range(1,1000):
      if(egcd(i,phi)==1):
          e=i
    e = random.randrange(1, phi)
    #e,r = eugcd(e,phi)
    #d = mult_inv(e,r)
    #print("few",d)
    #Use Euclid's Algorithm to verify that e and phi(n) are comprime
    g = gcd(e, phi)
    while g != 1:
        e = random.randrange(1, phi)
        g = gcd(e, phi)

    #Use Extended Euclid's Algorithm to generate the private key
    d = mult_inv(e, phi)
    print(d)
    #Return public and private keypair
    #Public key is (e, n) and private key is (d, n)
    return ((e, n), (d, n))

def encrypt(pk, plaintext):
    #Unpack the key into it's components
    print(pk)
    key, n = pk
    #Convert each letter in the plaintext to numbers based on the character using a^b mod m
    print(key)
    cipher = [(ord(char) ** key) % n for char in plaintext]
    #Return the array of bytes
    return cipher

def decrypt(pk, ciphertext):
    #Unpack the key into its components
    key, n = pk
    print(type(key),type(n))
    #Generate the plaintext based on the ciphertext and key using a^b mod m
    plain = [chr((char ** key) % n) for char in ciphertext]
    #Return the array of bytes as a string
    return ''.join(plain)

@app.route('/getEncrypt',methods = ['GET'])
def getEncrypt():
  data = dict(request.args)
  print(data)
  msg = data['msg']
  public, private = generate_keypair(17, 19)
  encrypted_msg = encrypt(private, msg)
  encrypted_msg = ' '.join(map(lambda x: str(x), encrypted_msg))
  print(public, private,encrypted_msg)
  encrypted_msg = "Encrypted msg is "+encrypted_msg + " and key is "+str(public)
  print(encrypted_msg)
  return jsonify({'result':encrypted_msg})

@app.route('/getDecrypt',methods = ['GET'])
def getDecrypt():
  data = dict(request.args)
  #print('------>',public)
  msg = data['msg']
  key = data['key']
  key = key[1:-1]
  key = key.split(',')

  key = [int(x) for x in key]
  key = tuple(key)
  msg = msg.split(" ")
  msg = [int(i) for i in msg] 
  print(key,msg)
  decrypted_msg = decrypt(key, msg)
  print(decrypted_msg)
  return jsonify({'result':decrypted_msg})

@app.route('/getCheckSum',methods = ['GET'])
def getCheckSum():
  data = dict(request.args)
  text = data["text"]
  return jsonify({'result':md5sum(str.encode(text))})
  
val={}
val["seed"] = time.perf_counter()
def rnd():
  val["seed"] = ( val["seed"]*9301+49297 ) % 233280; 
  return val["seed"]/ (233280.0)
def rand(number):
    return math.ceil( rnd () * number )

def generateOTPAlphaNum(OtpSize) : 
  
    # Declare a string variable   
    # which stores all string  
    string1 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    OTP = "" 
    length = len(string1) 
    for i in range(OtpSize) : 
        OTP += string1[math.floor(rand(length))-1] 
  
    return OTP 

def generateOTPAlpha(OtpSize) : 
  
    # Declare a string variable   
    # which stores all string  
    string1 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    OTP = "" 
    length = len(string1) 
    for i in range(OtpSize) : 
        OTP += string1[math.floor(rand(length))-1]  
  
    return OTP 

def generateOTPNum(OtpSize) : 
  
    # Declare a string variable   
    # which stores all string  
    string1 = '0123456789'
    OTP = "" 
    length = len(string1) 
    for i in range(OtpSize) : 
        OTP += string1[math.floor(rand(length))-1]  
  
    return OTP 

@app.route('/getBarCode',methods = ['GET'])
def getBarCode():
  data = dict(request.args)
  text = data["text"]
  
  code128_image(text).save("img.jpg")

  return jsonify({'result':"../Python/img.jpg"})

@app.route('/getQRCode',methods = ['GET'])
def getQRCode():
  data = dict(request.args)
  text = data["text"]
  # Generate QR code 
  url = pyqrcode.create(text) 
  
  # Create and save the svg file naming "myqr.svg" 
  url.svg("myqr.svg", scale = 8) 
  
  # Create and save the png file naming "myqr.png" 
  url.png('myqr.png', scale = 6) 
  return jsonify({'result':"../Python/myqr.png"})

@app.route('/generateOTPAlphaNum',methods = ['GET'])
def generateOTPAlphaNumRoute():
  data = dict(request.args)
  OtpSize = int(data["text"])
  return jsonify({'result':generateOTPAlphaNum(OtpSize)})

@app.route('/generateOTPNum',methods = ['GET'])
def generateOTPNumRoute():
  data = dict(request.args)
  OtpSize = int(data["text"])
  return jsonify({'result':generateOTPNum(OtpSize)})

@app.route('/generateOTPAlpha',methods = ['GET'])
def generateOTPAlphaRoute():
  data = dict(request.args)
  OtpSize = int(data["text"])
  return jsonify({'result':generateOTPAlpha(OtpSize)})

if __name__ == '__main__':
	app.run(debug = True)