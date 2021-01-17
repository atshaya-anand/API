from flask import Flask,request,jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

class Date:
    def __init__(self, d, m, y,h=0,mi=0,s=0):
        self.day = d
        self.month = m
        self.year = y
        self.hours = h
        self.minutes = mi
        self.seconds = s

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
  if date_obj2.day < date_obj1.day:
    if date_obj2.month == 3:
      if (date_obj2.year%4 == 0 and date_obj2.year%100 == 0) or date_obj2.year%400 == 0:
        is_leap = 1
        date_obj2.day +=29
      else:
        date_obj2.day +=28
    elif date_obj2.month==5 or date_obj2.month==7 or date_obj2.month==10 or date_obj2.month==12:
      date_obj2.day+=30
    else:
      date_obj2.day+=31
    date_obj2.month = date_obj2.month - 1
  if date_obj2.month < date_obj1.month:
    date_obj2.month +=12
    date_obj2.year -=1
  day_diff = date_obj2.day - date_obj1.day
  month_diff = date_obj2.month - date_obj1.month
  year_diff = date_obj2.year - date_obj1.year
  hours_diff = date_obj2.hours - date_obj1.hours
  minutes_diff = date_obj2.minutes - date_obj1.minutes
  seconds_diff = date_obj2.seconds - date_obj1.seconds
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
    
  print(day_diff,month_diff,year_diff,hours_diff,minutes_diff,seconds_diff)
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

if __name__ == '__main__':
	app.run(debug = True)