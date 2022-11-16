const dob = document.querySelector("#dob");
const buttonShow = document.querySelector("#show-button");
const outputMessage = document.querySelector("#output-message");



function reverseString(str) {
    var charList = str.split('');
    var reversedList = charList.reverse();
    var reversedStr = reversedList.join('');

    return reversedStr;
};

function checkPalindrome(str) {
    const reversed = reverseString(str);
    return str === reversed;
};

function dateNumToStr(inputDate) {
    var dateStr = { day: '', month: '', year: ''};
    // console.log(inputDate);
    if(inputDate.day < 10) {
        dateStr.day = '0' + inputDate.day;
    } else {
        dateStr.day = inputDate.day.toString();
    }

    if(inputDate.month < 10) {
        dateStr.month = "0" + inputDate.month;
    } else {
        dateStr.month = inputDate.month.toString();
    }

    dateStr.year = inputDate.year.toString();

    return dateStr;
};

function getDateAllFormat (dateObject) {
    var dateStr = dateNumToStr(dateObject);

    const ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    const mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    const yyyymmdd = dateStr.year + dateStr.month + dateStr.day; 
    const ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    const mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    const yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
    
    const formatList = [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
    //console.log(formatList)
    return formatList;
};

function checkPalindromeAllDateFormat(dateObject) {
    const dateAllFormatList = getDateAllFormat(dateObject);
    const checkPalindromeArray = [];
    // var isPalindrome = false;
    for(let dateStr of dateAllFormatList) {
        var isPalindrome = false;
        if(checkPalindrome(dateStr)) {
            isPalindrome = true;
        }
        checkPalindromeArray.push(isPalindrome);    
    }
    // return isPalindrome;
    // console.log(checkPalindromeArray);
    return checkPalindromeArray.some(element => element);
};


function getNextDate(dateInput) {
    var day = dateInput.day + 1;
    var month = dateInput.month;
    var year = dateInput.year;

    daysOfMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    function isLeapYear(year) {
        if(year % 400 == 0) {
            return true;
        } else if (year % 100 == 0) {
            return false;
        } else if (year % 4 == 0) {
            return true;
        } else {
            return false
        }
    };

    function firstDayOfMonth() {
        day = 1;
        month++;
    }
    
    if(month === 2) {        
        if(isLeapYear(year)){
            if(day > 29){
                firstDayOfMonth();
            }
        } else {
            if(day > 28) {
                firstDayOfMonth();
            }
        }
    } else {
        if (day > daysOfMonths[month -1]) {
            firstDayOfMonth();
        }
    }

    if(month > 12) {
        day = 1;
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    };
}

function getNextPalindrome(dateObject) {
    var count = 0;
    var nextDate = getNextDate(dateObject);

    while(true) {
        count++
        var isPalindrome = checkPalindromeAllDateFormat(nextDate);
        if(isPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate)
    }
    return [count, nextDate];
}

function showMessage(isPalindrome, dateObject) {
    if(isPalindrome) {
        outputMessage.innerText = 'Your Birthday is a Palindrome date!!';
    } else {
        const [count, nextDate] = getNextPalindrome(dateObject)
        console.log(count, nextDate);
        outputMessage.innerText = `Your Birthday is not a Palindrome date. 
        Next palindrome date is ${count} days from your birthday at ${nextDate.day}-${nextDate.month}-${nextDate.year}.`;
    }
}




const dateStr = { day: 12,
              month: 2,
              year: 2021};

function clickHandler() {
    var bdayStr = dob.value;

    if(bdayStr !== '') {
        var dateList = bdayStr.split('-');
        var dateObject = {
            day: Number(dateList[2]),
            month: Number(dateList[1]),
            year: Number(dateList[0])
        };
        // console.log(dateObject);
        var isPalindrome = checkPalindromeAllDateFormat(dateObject);
        // console.log(isPalindrome);
        showMessage(isPalindrome, dateObject);

    } else {
        outputMessage.innerText = "Enter valid Birthday."
    }
}




buttonShow.addEventListener("click", clickHandler);