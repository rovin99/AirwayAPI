function compareDate(timeStr1,timeStr2){
    var d1=new Date(timeStr1);
    var d2=new Date(timeStr2);
    return d1.getTime() > d2.getTime();
}

module.exports = compareDate;