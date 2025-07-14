var goal = new Date();
var href = decodeURI(location.href);
var title = href.substr(href.indexOf('title=') + 6, href.indexOf('&year=') - href.indexOf('title=') - 6);
var goal_year = parseInt(href.substr(href.indexOf('year=') + 5, href.indexOf('&month=') - href.indexOf('year=') - 5));
var goal_month = parseInt(href.substr(href.indexOf('month=') + 6, href.indexOf('&date=') - href.indexOf('month=') - 6));
var goal_date = parseInt(href.substr(href.indexOf('date=') + 5, href.indexOf('&hour=') - href.indexOf('date=') - 5));
var goal_hour = parseInt(href.substr(href.indexOf('hour=') + 5, href.indexOf('&minute=') - href.indexOf('hour=') - 5));
var goal_minute = parseInt(href.substr(href.indexOf('minute=') + 7, href.indexOf('&second=') - href.indexOf('minute=') - 7));
var goal_second = parseInt(href.substr(href.indexOf('second=') + 7));
goal.setFullYear(goal_year, goal_month - 1, goal_date);
goal.setHours(goal_hour, goal_minute, goal_second);
var count = 0;

function font_size() {
  var width = document.getElementById("calendar").offsetWidth;
  var num = document.getElementById("number").innerText.length;
  var size = Math.min(width / num, 300);
  document.getElementById("number").style.fontSize = size + 'px';
}

function refresh() {
  var now = new Date();
  var value = parseInt((goal - now) / 86400000);
  const days = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  if (value > 0 || value == 0 && goal_date != now.getDate) {
    document.getElementById("title_text").innerHTML = title + ' 还有';
    document.getElementById("title").style.backgroundColor = "blue";
    document.getElementById("number").innerHTML = value;
    document.getElementById("explain_text").innerHTML = '目标日：' + goal_year + ' 年 ' + goal_month + ' 月 ' + goal_date + ' 日  ' + days[goal.getDay()];
  } else if (value < 0 || value == 0 && goal_date != now.getDate) {
    document.getElementById("title_text").innerHTML = title + ' 已经';
    document.getElementById("title").style.backgroundColor = "orange";
    document.getElementById("number").innerHTML = -value;
    document.getElementById("explain_text").innerHTML = '起始日：' + goal_year + ' 年 ' + goal_month + ' 月 ' + goal_date + ' 日  ' + days[goal.getDay()];
  } else {
    document.getElementById("title_text").innerHTML = title + ' 就是今天';
    document.getElementById("title").style.backgroundColor = "red";
    document.getElementById("number").innerHTML = value;
    document.getElementById("explain_text").innerHTML = '目标日：' + goal_year + ' 年 ' + goal_month + ' 月 ' + goal_date + ' 日  ' + days[goal.getDay()];
  }
  document.getElementById("unit").innerHTML = '天';
  document.getElementById("explain_text_time").innerHTML = String(goal_hour).padStart(2,'0') + ':' + String(goal_minute).padStart(2,'0') + ':' + String(goal_second).padStart(2,'0');
  count = 0;
  font_size();
}

function change() {
  if (confirm('确定更换吗？当前未保存的内容将全部丢失。')) {
    location.assign('./input.html');
  }
  return false;
}

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
function format() {
  count = (count + 1) % 5;
  if (count == 0) {
    setTimeout(() => {
      var now = new Date();
      var value = parseInt((goal - now) / 86400000);
      document.getElementById("number").innerHTML = (value >= 0) ? value : -value;
      document.getElementById("unit").innerHTML = '天';
      font_size();
    }, 500);    
  } else if (count == 1) {
    var now = new Date();
    var value1 = parseInt((goal - now) / 31536000000);
    var value2 = parseInt((goal - now) / 86400000 % 2592000000 / 30);
    var value3 = parseInt((goal - now) / 86400000 - value1 * 365 - value2 * 30);
    value1 = (value1 >= 0) ? value1 : -value1;
    value2 = (value2 >= 0) ? value2 : -value2;
    value3 = (value3 >= 0) ? value3 : -value3;
    document.getElementById("number").innerHTML = value1 + '年' + value2 + '个月' + value3 + '天';
    document.getElementById("unit").innerHTML = '';
  } else if (count == 2) {
    var now = new Date();
    var value1 = parseInt((goal - now) / 2592000000);
    var value2 = parseInt((goal - now) / 86400000 - value1 * 30);
    value1 = (value1 >= 0) ? value1 : -value1;
    value2 = (value2 >= 0) ? value2 : -value2;
    document.getElementById("number").innerHTML = value1 + '个月' + value2 + '天';
    document.getElementById("unit").innerHTML = '';
  } else if (count == 3) {
    var now = new Date();
    var value = parseInt((goal - now) / 604800000);
    document.getElementById("number").innerHTML = (value >= 0) ? value : -value;
    document.getElementById("unit").innerHTML = '周';
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

function save() {
  var text = title + '\n' + goal_year + '\n' + goal_month + '\n' + goal_date + '\n' + goal_hour + '\n' + goal_minute + '\n' + goal_second;
  var blob = new Blob([text], {type: 'text/plain'});
  var downloadLink = document.createElement('a');
  downloadLink.setAttribute('href', window.URL.createObjectURL(blob));
  downloadLink.setAttribute('download', title + '.cdd');
  downloadLink.click();
}

refresh();