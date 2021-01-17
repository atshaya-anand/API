class Date{
    constructor(d, m, y,h=0,mi=0,s=0){
        this.day = d
        this.month = m
        this.year = y
        this.hours = h
        this.minutes = mi
        this.seconds = s
    }
}

function validate_date(date_obj) {
    console.log(date_obj.month);
    var is_valid = 1;
    var is_leap = 0;
    var msg = "";
    //print(type(date_obj.year))
    if (date_obj.year >= 1800 && date_obj.year < 9999) {
        if (date_obj.year % 4 == 0 || date_obj.year % 100 == 0) {
            is_leap = 1;
        }
        if (date_obj.month >= 1 && date_obj.month <= 12) {
            if (date_obj.month == 2) {
                if (is_leap && date_obj.day <= 29) {
                    is_valid = 1;
                }
                else if (date_obj.day > 28) {
                    is_valid = 0;
                    msg = "feb has more days in non leap year";
                }
            }
            else if (date_obj.month == 4 || date_obj.month == 6 || date_obj.month == 9 || date_obj.month == 11) {
                if (date_obj.day > 30) {
                    is_valid = 0;
                    msg = "No of days is more than 30 in the month " + date_obj.month;
                }
            }
            else if (date_obj.day > 31) {
                is_valid = 0;
                msg = "The number of days is more than 31 in this month " + date_obj.month;
            }
        }
        else {
            is_valid = 0;
            msg = "no such month";
        }
    }
    else {
        is_valid = 0;
        msg = "no such year";
    }
    console.log(is_valid,msg);
    var result = {};
    result['valid'] = is_valid;
    result['msg'] = msg;
    return(result);
}

const getDateDifference = async () => {
    var date_obj1 = new Date(30, 4, 1999, 0, 0, 0);
    var date_obj2 = new Date(17, 4, 1999, 0, 0, 0);
    console.log(date_obj1.day,'----',date_obj1.month,'------',date_obj2);
    var is_validD1, msg1; 
    var res = validate_date(date_obj1);
    is_validD1 = res['valid'];
    msg1 = res['msg'];
    console.log(is_validD1,'-----',msg1);
    var is_validD2, msg2; 
    var ress = validate_date(date_obj2);
    is_validD2 = ress['valid'];
    msg2 = ress['msg'];
    console.log(is_validD2,'-----',msg2);
    var is_leap = 0;
    if (is_validD1 == 0) {
        return msg1;
    }
    if (is_validD2 == 0) {
        return msg2;
    }
    if (date_obj2.day < date_obj1.day) {
        if (date_obj2.month == 3) {
            if ((date_obj2.year % 4 == 0 && date_obj2.year % 100 == 0) || (date_obj2.year % 400 == 0)) {
                is_leap = 1;
                date_obj2.day += 29;
            }
            else {
                date_obj2.day += 28;
            }
        }
    }
    else if (date_obj2.month == 5 || date_obj2.month == 7 || date_obj2.month == 10 || date_obj2.month == 12) {
        date_obj2.day += 30;
    }
    else {
        date_obj2.day += 31;
    }
    date_obj2.month = date_obj2.month - 1;
    if (date_obj2.month < date_obj1.month) {
        date_obj2.month += 12;
        date_obj2.year -= 1;
    }
    day_diff = date_obj2.day - date_obj1.day;
    month_diff = date_obj2.month - date_obj1.month;
    year_diff = date_obj2.year - date_obj1.year;
    hours_diff = date_obj2.hours - date_obj1.hours;
    minutes_diff = date_obj2.minutes - date_obj1.minutes;
    seconds_diff = date_obj2.seconds - date_obj1.seconds;
    if (seconds_diff < 0) {
        seconds_diff = 60 + seconds_diff;
        minutes_diff -= 1;
    }
    if (minutes_diff < 0) {
        minutes_diff = 60 + minutes_diff;
        hours_diff -= 1;
    }
    if (hours_diff < 0) {
        hours_diff = 24 + hours_diff;
        day_diff -= 1;
    }
    if (day_diff < 0) {
        month_diff -= 1;
        if (month_diff == -1) {
            month_diff = 12;
            year_diff = year_diff - 1;
            if (year_diff % 4 == 0 || year_diff % 100 == 0)
                is_leap = 1;
            else
                is_leap = 0;
        }
        if (month_diff == 4 || month_diff == 6 || month_diff == 9 || month_diff == 11)
            day_diff = 30 - day_diff;
        else if (month_diff == 2 && is_leap == 1)
            day_diff = 29 - day_diff;
        else if (month_diff == 2 && is_leap == 0)
            day_diff = 28 - day_diff;
        else
            day_diff = 31 - day_diff;
    }

    console.log (day_diff, month_diff, year_diff, hours_diff, minutes_diff, seconds_diff);
} 

module.exports = { getDateDifference };