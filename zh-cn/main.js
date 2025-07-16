// 解析URL
var goal = new Date();
var href = decodeURI(location.href);
var title = href.substr(href.indexOf('title=') + 6, href.indexOf('&year=') - href.indexOf('title=') - 6);
var goal_year = parseInt(href.substr(href.indexOf('year=') + 5, href.indexOf('&month=') - href.indexOf('year=') - 5));
var goal_month = parseInt(href.substr(href.indexOf('month=') + 6, href.indexOf('&date=') - href.indexOf('month=') - 6));
var goal_date = parseInt(href.substr(href.indexOf('date=') + 5, href.indexOf('&hour=') - href.indexOf('date=') - 5));
var goal_hour = parseInt(href.substr(href.indexOf('hour=') + 5, href.indexOf('&minute=') - href.indexOf('hour=') - 5));
var goal_minute = parseInt(href.substr(href.indexOf('minute=') + 7, href.indexOf('&second=') - href.indexOf('minute=') - 7));
var goal_second = parseInt(href.substr(href.indexOf('second=') + 7, href.indexOf('&repeat_time=') - href.indexOf('minute=') - 7));
var repeat_time = parseInt(href.substr(href.indexOf('repeat_time=') + 12, href.indexOf('&repeat_unit=') - href.indexOf('repeat_time=') - 12));
var repeat_unit = href.substr(href.indexOf('repeat_unit=') + 12, href.indexOf('&if_add=') - href.indexOf('repeat_unit=') - 12);
var date_type = href.substr(href.indexOf('date_type=') + 10, href.indexOf('&if_add=') - href.indexOf('date_type=') - 10);
var if_add = parseInt(href.substr(href.indexOf('if_add=') + 7, href.indexOf('&if_end=') - href.indexOf('if_add=') - 7));
var if_end = parseInt(href.substr(href.indexOf('if_end=') + 7, href.indexOf('&end_year=') - href.indexOf('if_end=') - 7));
var end_year = parseInt(href.substr(href.indexOf('end_year=') + 9, href.indexOf('&end_month=') - href.indexOf('end_year=') - 9));
var end_month = parseInt(href.substr(href.indexOf('end_month=') + 10, href.indexOf('&end_date=') - href.indexOf('end_month=') - 10));
var end_date = parseInt(href.substr(href.indexOf('end_date=') + 9));
var end_temp;
// 农历转换
function getLeapMonth(lunarYear) {
  var index = lunarYear - 1900;
  return lunarInfo[index] & 0xf;
}
if (date_type == 'lunar') {
  var leap_month = getLeapMonth(goal_year);
  var ifLeap = false;
  if (leap_month > 0 && goal_month > leap_month) goal_month -= 1;
  if (goal_month === leap_month) ifLeap = true;
  goal.setFullYear(goal_year, goal_month - 1, goal_date);  
  var cc = new CalendarConverter();
  var solar = cc.lunar2solar(goal, ifLeap);
  var lunar_year = solar.cYear + solar.lunarYear + '年(' + solar.lYear + ')';
  var lunar_month = solar.lunarMonth + '月';
  var lunar_date = solar.lunarDay;
  goal_year = solar.sYear;
  goal_month = solar.sMonth;
  goal_date = solar.sDay + 1;
  var leap_month = getLeapMonth(end_year);
  var ifLeap = false;
  if (leap_month > 0 && end_month > end_month) end_month -= 1;
  if (end_month === leap_month) ifLeap = true;
  goal.setFullYear(end_year, end_month - 1, end_date);  
  var cc = new CalendarConverter();
  var solar = cc.lunar2solar(goal, ifLeap);
  var lunar_end_year = solar.cYear + solar.lunarYear + '年(' + solar.lYear + ')';
  var lunar_end_month = solar.lunarMonth + '月';
  var lunar_end_date = solar.lunarDay;
  end_year = solar.sYear;
  end_month = solar.sMonth;
  end_date = solar.sDay + 1;
}
// 其它初始设置
goal.setFullYear(goal_year, goal_month - 1, goal_date);
goal.setHours(goal_hour, goal_minute, goal_second);
var end = new Date();
end.setFullYear(end_year, end_month - 1, end_date);
var count = 0;

// 自动设置字体大小
function font_size() {
  var width = document.getElementById("calendar").offsetWidth;
  var num = document.getElementById("number").innerText.length;
  var size = Math.min(width / num, 300);
  document.getElementById("number").style.fontSize = size + 'px';
}

// 刷新时间
function refresh() {
  var now = new Date();
  if (goal_year == now.getFullYear() && goal_month == now.getMonth() + 1 && goal_date == now.getDate());
  else if (repeat_unit == 'year') {
    for (; goal < now; goal_year += repeat_time) goal.setFullYear(goal_year, goal_month - 1, goal_date);
    goal_year -= repeat_time;
    goal.setFullYear(goal_year, goal_month - 1, goal_date);
  } else if (repeat_unit == 'month') {
    for (; goal < now; goal_month += repeat_time) goal.setFullYear(goal_year, goal_month - 1, goal_date);
    goal_month -= repeat_time;
    goal.setFullYear(goal_year, goal_month - 1, goal_date);
  } else if (repeat_unit == 'week') {
    for (; goal < now; goal_date += repeat_time * 7) goal.setFullYear(goal_year, goal_month - 1, goal_date);
    goal_date -= repeat_time * 7;
    goal.setFullYear(goal_year, goal_month - 1, goal_date);
  } else if (repeat_unit == 'day') {
    for (; goal < now; goal_date += repeat_time) goal.setFullYear(goal_year, goal_month - 1, goal_date);
    goal_date -= repeat_time;
    goal.setFullYear(goal_year, goal_month - 1, goal_date);
  }
  var value = parseInt((goal - now) / 86400000);
  var end_value = parseInt((now - end) / 86400000);
  const days = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  if (if_end === 1 && end_value >= 0) {
    document.getElementById("title_text").innerHTML = title + ' 共';
    document.getElementById("title").style.backgroundColor = "orange";
    document.getElementById("number").innerHTML = parseInt((end - goal) / 86400000);
    if (date_type == 'lunar') document.getElementById("explain_text").innerHTML = lunar_year + ' ' + lunar_month + ' ' + lunar_date + '  ' + days[goal.getDay()] + ' ~ ' + lunar_end_year + ' ' + lunar_end_month + ' ' + lunar_end_date + '  ' + days[end.getDay()];
    else document.getElementById("explain_text").innerHTML = goal_year + ' 年 ' + goal_month + ' 月 ' + goal_date + ' 日  ' + days[goal.getDay()] + ' ~ ' + end_year + ' 年 ' + end_month + ' 月 ' + end_date + ' 日  ' + days[end.getDay()];
    end_temp = goal;
    goal = end;
  } else if (value <= 0 && if_add === 1) {
    document.getElementById("title_text").innerHTML = title + ' 第';
    document.getElementById("title").style.backgroundColor = "orange";
    document.getElementById("number").innerHTML = -value + 1;
    if (date_type == 'lunar') document.getElementById("explain_text").innerHTML = '起始日：' + lunar_year + ' ' + lunar_month + ' ' + lunar_date + '  ' + days[goal.getDay()];
    else document.getElementById("explain_text").innerHTML = '起始日：' + goal_year + ' 年 ' + goal_month + ' 月 ' + goal_date + ' 日  ' + days[goal.getDay()];
  } else if (value > 0 || value == 0 && goal_date != now.getDate()) {
    document.getElementById("title_text").innerHTML = title + ' 还有';
    document.getElementById("title").style.backgroundColor = "blue";
    document.getElementById("number").innerHTML = (value == 0) ? 1 : value;
    if (date_type == 'lunar') document.getElementById("explain_text").innerHTML = '目标日：' + lunar_year + ' ' + lunar_month + ' ' + lunar_date + '  ' + days[goal.getDay()];
    else document.getElementById("explain_text").innerHTML = '目标日：' + goal_year + ' 年 ' + goal_month + ' 月 ' + goal_date + ' 日  ' + days[goal.getDay()];
  } else if (value < 0 || value == 0 && goal_date != now.getDate()) {
    document.getElementById("title_text").innerHTML = title + ' 已经';
    document.getElementById("title").style.backgroundColor = "orange";
    document.getElementById("number").innerHTML = (value == 0) ? 1 : -value;
    if (date_type == 'lunar') document.getElementById("explain_text").innerHTML = '起始日：' + lunar_year + ' ' + lunar_month + ' ' + lunar_date + '  ' + days[goal.getDay()];
    else document.getElementById("explain_text").innerHTML = '起始日：' + goal_year + ' 年 ' + goal_month + ' 月 ' + goal_date + ' 日  ' + days[goal.getDay()];
  } else {
    document.getElementById("title_text").innerHTML = title + ' 就是今天';
    document.getElementById("title").style.backgroundColor = "red";
    document.getElementById("number").innerHTML = value;
    if (date_type == 'lunar') document.getElementById("explain_text").innerHTML = '目标日：' + lunar_year + ' ' + lunar_month + ' ' + lunar_date + '  ' + days[goal.getDay()];
    else document.getElementById("explain_text").innerHTML = '目标日：' + goal_year + ' 年 ' + goal_month + ' 月 ' + goal_date + ' 日  ' + days[goal.getDay()];
  }
  document.getElementById("unit").innerHTML = '天';
  document.getElementById("explain_text_time").innerHTML = String(goal_hour).padStart(2,'0') + ':' + String(goal_minute).padStart(2,'0') + ':' + String(goal_second).padStart(2,'0');
  if (if_end === 1 && end_value >= 0) document.getElementById("explain_text_time").innerHTML = '';
  count = 0;
  font_size();
}

// 返回输入页面
function change() {
  if (confirm('确定更换吗？当前未保存的内容将全部丢失。')) {
    location.assign('./input.html');
  }
  return false;
}

// 更新具体时间
function refresh_second() {
  var timer = window.setInterval(function() {
    if(count != 4) window.clearInterval(timer);
    var now = new Date();
    var value1 = parseInt((goal - now) / 86400000);
    var value2 = parseInt(((goal - now) - value1 * 86400000) / 3600000);
    var value3 = parseInt(((goal - now) - value1 * 86400000 - value2 * 3600000) / 60000);
    var value4 = parseInt(((goal - now) - value1 * 86400000 - value2 * 3600000 - value3 * 60000) / 1000);
    value1 = (value1 >= 0) ? value1 : -value1;
    value2 = (value2 >= 0) ? value2 : -value2;
    value3 = (value3 >= 0) ? value3 : -value3;
    value4 = (value4 >= 0) ? value4 : -value4;
    value2 = String(value2).padStart(2,'0');
    value3 = String(value3).padStart(2,'0');
    value4 = String(value4).padStart(2,'0');
    document.getElementById("number").innerHTML = value1 + '天 ' + value2 + ':' + value3 + ':' + value4;
  })
}
// 更换格式
function format() {
  count = (if_end === 1) ? (count + 1) % 4 : (count + 1) % 5;
  if (count == 0) {
    setTimeout(() => {
      var now = (if_end === 1) ? end_temp : new Date();
      var value = parseInt((goal - now) / 86400000);
      value = (value >= 0) ? value : -value;
      document.getElementById("number").innerHTML = (value == 0) ? 1 : value;
      document.getElementById("unit").innerHTML = '天';
      font_size();
    }, 500);
  } else if (count == 1) {
    var now = (if_end === 1) ? end_temp : new Date();
    var value1 = parseInt((goal - now) / 31536000000);
    var value2 = parseInt(((goal - now) / 86400000 - value1 * 365) / 30);
    var value3 = parseInt((goal - now) / 86400000 - value1 * 365 - value2 * 30);
    value1 = (value1 >= 0) ? value1 : -value1;
    value2 = (value2 >= 0) ? value2 : -value2;
    value3 = (value3 >= 0) ? value3 : -value3;
    if (value1 === 0) {
      format();
      return;
    }
    document.getElementById("number").innerHTML = value1 + '年' + value2 + '个月' + value3 + '天';
    document.getElementById("unit").innerHTML = '';
  } else if (count == 2) {
    var now = (if_end === 1) ? end_temp : new Date();
    var value1 = parseInt((goal - now) / 2592000000);
    var value2 = parseInt((goal - now) / 86400000 - value1 * 30);
    value1 = (value1 >= 0) ? value1 : -value1;
    value2 = (value2 >= 0) ? value2 : -value2;
    if (value1 === 0) {
      format();
      return;
    }
    document.getElementById("number").innerHTML = value1 + '个月' + value2 + '天';
    document.getElementById("unit").innerHTML = '';
  } else if (count == 3) {
    var now = (if_end === 1) ? end_temp : new Date();
    var value1 = parseInt((goal - now) / 604800000);
    var value2 = parseInt((goal - now) / 86400000 - value1 * 7);
    value1 = (value1 >= 0) ? value1 : -value1;
    value2 = (value2 >= 0) ? value2 : -value2;
    if (value1 === 0) {
      format();
      return;
    }
    document.getElementById("number").innerHTML = value1 + '周' + (value2 > 0 ? (value2 + '天') : '');
    document.getElementById("unit").innerHTML = '';
  } else if (count == 4) {
    var now = new Date();
    var value1 = parseInt((goal - now) / 86400000);
    var value2 = parseInt(((goal - now) - value1 * 86400000) / 3600000);
    var value3 = parseInt(((goal - now) - value1 * 86400000 - value2 * 3600000) / 60000);
    var value4 = parseInt(((goal - now) - value1 * 86400000 - value2 * 3600000 - value3 * 60000) / 1000);
    value1 = (value1 >= 0) ? value1 : -value1;
    value2 = (value2 >= 0) ? value2 : -value2;
    value3 = (value3 >= 0) ? value3 : -value3;
    value4 = (value4 >= 0) ? value4 : -value4;
    value2 = String(value2).padStart(2,'0');
    value3 = String(value3).padStart(2,'0');
    value4 = String(value4).padStart(2,'0');
    document.getElementById("number").innerHTML = value1 + '天 ' + value2 + ':' + value3 + ':' + value4;
    document.getElementById("unit").innerHTML = '';
    refresh_second();
  }
  font_size();
}

// 保存到文件
function save() {
  var text;
  if (date_type == 'lunar') {
    var cc = new CalendarConverter();
    if (if_end === 1) {
      end = goal;
      goal = end_temp;
    }
    var lunar = cc.solar2lunar(goal);
    goal_year = lunar.lYear;
    goal_month = lunar.lMonth;
    goal_date = lunar.lDay;
    var lunar = cc.solar2lunar(end);
    end_year = lunar.lYear;
    end_month = lunar.lMonth;
    end_date = lunar.lDay;
  }
  text = title + '\n' + goal_year + '\n' + goal_month + '\n' + goal_date + '\n' + goal_hour + '\n' + goal_minute + '\n' + goal_second + '\n' + repeat_time + '\n' + repeat_unit + '\n' + date_type + '\n' + if_add + '\n' + if_end + '\n' + end_year + '\n' + end_month + '\n' + end_date;
  var blob = new Blob([text], {type: 'text/plain'});
  var downloadLink = document.createElement('a');
  downloadLink.setAttribute('href', window.URL.createObjectURL(blob));
  downloadLink.setAttribute('download', title + '.cdd');
  downloadLink.click();
}

refresh();