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
  print(type(date_obj.year))
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


@app.route('/getDateDifference',methods = ['GET'])
def getDifference(date_obj1,date_obj2):
  is_validD1,msg1 = validate_date(date_obj1)
  is_validD2,msg2 = validate_date(date_obj2)
  is_leap = 0
  if is_validD1 == 0:
      return msg1
  if is_validD2 == 0:
      return msg2
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
  return

# function for union - contains all elements of both set
@app.route('/getUnion',methods = ['GET'])
def union():
    data = dict(request.args)
    seta = data['seta']
    setb = data['setb']
    seta = seta.split(',')
    setb = setb.split(',')
    seta = [int(x) for x in seta]
    setb = [int(x) for x in setb]
    seta = set(seta)
    setb = set(setb)
    print('seta---',seta,'setb---',setb)
    result = set()
    for i in seta:
        result.add(i)
    for i in setb:
        result.add(i)
    return jsonify({'result':list(result)})


# function for intersection - contains only common elements of set
@app.route('/getIntersection',methods = ['GET'])
def intersection():
    result = set()
    for i in seta:
        if i in setb:
          result.add(i)
    return result


# function for minus - contains elements which are not in another set
@app.route('/getMinus',methods = ['GET'])
def minus(seta , setb):
    result = set()
    for i in seta:
        if i not in setb:
            result.add(i)
    return result



if __name__ == '__main__':
	app.run(debug = True)