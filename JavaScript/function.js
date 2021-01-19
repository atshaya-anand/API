function dateDiff(date1, date2) {
    console.log(date1,'-------',date2);
    date1 = date1.split("T");
    date2 = date2.split("T");
    console.log(date1,'-------',date2);
    var date_1 = date1[0];
    var time_1 = date1[1];
    var date_2 = date2[0];
    var time_2 = date2[1];
    time_1 = time_1.split(":");
    time_2 = time_2.split(":");
    var hr_1 = time_1[0];
    var min_1 = time_1[1];
    var hr_2 = time_2[0];
    var min_2 = time_2[1];
    date_1 = date_1.split("-");
    var year_1 = date_1[0];
    var month_1 = date_1[1];
    var day_1 = date_1[2];
    date_2 = date_2.split("-");
    var year_2 = date_2[0];
    var month_2 = date_2[1];
    var day_2 = date_2[2];
    console.log(day_1,month_1,year_1,hr_1,min_1,'--------',day_2,month_2,year_2,hr_2,min_2);

    var startDate = new Date();
    startDate.setFullYear(year_1);
    startDate.setDate(day_1);
    startDate.setMonth(month_1);
    startDate.setHours(hr_1);
    startDate.setMinutes(hr_2);
    startDate.setSeconds("0");
    
    var endDate = new Date();
    endDate.setFullYear(year_2);
    endDate.setDate(day_2);
    endDate.setMonth(month_2);
    endDate.setHours(hr_2);
    endDate.setMinutes(min_2);
    endDate.setSeconds("0");
    console.log(startDate,endDate)
    if (startDate > endDate) {
        var swap = startDate;
        startDate = endDate;
        endDate = swap;
    }
    var startYear = startDate.getFullYear();
    var february = (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0 ? 29 : 28;
    var daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    var yearDiff = endDate.getFullYear() - startYear;
    var monthDiff = endDate.getMonth() - startDate.getMonth();
    if (monthDiff < 0) {
        yearDiff--;
        monthDiff += 12;
    }
    var dayDiff = endDate.getDate() - startDate.getDate();
    if (dayDiff < 0) {
        if (monthDiff > 0) {
            monthDiff--;
        } else {
            yearDiff--;
            monthDiff = 11;
        }
        dayDiff += daysInMonth[startDate.getMonth()];
    }

   console.log(yearDiff + 'Y ' + monthDiff + 'M ' + dayDiff + 'D');
    day_diff = dayDiff;
    month_diff = monthDiff;
    year_diff = yearDiff;
    hours_diff = endDate.getHours() - startDate.getHours();
    minutes_diff = endDate.getMinutes() - startDate.getMinutes();
    seconds_diff = endDate.getSeconds() - startDate.getSeconds();
    console.log (day_diff, month_diff, year_diff, hours_diff, minutes_diff, seconds_diff);  
    if (seconds_diff < 0) {
        seconds_diff = 60 + seconds_diff;
        minutes_diff -= 1;
        console.log("1")
    }
    if (minutes_diff < 0) {
        minutes_diff = 60 + minutes_diff;
        hours_diff -= 1;
        console.log("2")
    }
    if (hours_diff < 0) {
        hours_diff = 24 + hours_diff;
        day_diff -= 1;
        console.log("3")
    }
    if (day_diff < 0) {
        month_diff -= 1;
        console.log("4")
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

    var result = day_diff+' days '+month_diff+' months '+year_diff+" years "+hours_diff+' hours '+minutes_diff+' minutes '+seconds_diff+' seconds.'
    return result; 
}

const getSetUnion = async () => {
    var seta = [1, 2, 3, 4, 5, 6];
    var setb = [3, 4, 11, 20];
    var result = [];
    for (var i = 0; i < seta.length; i++) {
        result.push(seta[i]);
    }
    for (var i = 0; i < setb.length; i++) {
        if(setb[i] in result){
            continue;
        }else
        result.push(setb[i]);
    }
    return result;
}

const getSetIntersection = async () => {
    var seta = [1, 2, 3, 4, 5, 6];
    var setb = [3, 4, 11, 20];
    var result = [];
    for (var i = 0; i < seta.length; i++) {
        if(setb.indexOf(seta[i]) != -1){
            result.push(seta[i]);
        }
    }
    return result;
}

const getSetDiff = async () => {
    var seta = [1, 2, 3, 4, 5, 6];
    var setb = [3, 4, 11, 20];
    var result = [];
    for (var i = 0; i < seta.length; i++) {
        //console.log(setb.indexOf(seta[i]),seta[i],"check");
        if(setb.indexOf(seta[i]) == -1){
            console.log(seta[i]);
            continue;
        }else{
            result.push(seta[i]);
        }
    }
    return result;
}

const getWord = async()=>{
    ones = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine']

    twos = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen']

    tens = ['Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety', 'Hundred']

    suffixes = ['', 'Thousand', 'Million', 'Billion']
}

module.exports = { dateDiff,
                   getSetUnion,
                   getSetIntersection,
                   getSetDiff,
                   getWord };