var goal = new Date();
var href = decodeURI(location.href);
var title = href.substr(href.indexOf('title=') + 6, href.indexOf('&year=') - href.indexOf('title=') - 6);
var goal_year = parseInt(href.substr(href.indexOf('year=') + 5, href.indexOf('&month=') - href.indexOf('year=') - 5));
var goal_month = parseInt(href.substr(href.indexOf('month=') + 6, href.indexOf('&date=') - href.indexOf('month=') - 5));
var goal_date = parseInt(href.substr(href.indexOf('date=') + 5));
goal.setFullYear(goal_year, goal_month - 1, goal_date);
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
  if (value > 0) {
    document.getElementById("title_text").innerHTML = title + ' 还有';
    document.getElementById("title").style.backgroundColor = "blue";
    document.getElementById("number").innerHTML = value;
    document.getElementById("explain_text").innerHTML = '目标日：' + goal_year + ' 年 ' + goal_month + ' 月 ' + goal_date + ' 日  ' + days[goal.getDay()];
  } else if (value < 0) {
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
  count = 0;
  font_size();
}

function change() {
  if (confirm('确定更换吗？当前未保存的内容将全部丢失。')) {
    location.assign('./input.html');
  }
  return false;
}

function format() {
  count = (count + 1) % 4;
  if (count == 0) {
    var now = new Date();
    var value = parseInt((goal - now) / 86400000);
    document.getElementById("number").innerHTML = (value >= 0) ? value : -value;
    document.getElementById("unit").innerHTML = '天';
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
  }
  font_size();
}

function save() {
  var text = title + '\n' + goal_year + '\n' + goal_month + '\n' + goal_date;
  var blob = new Blob([text], {type: 'text/plain'});
  var downloadLink = document.createElement('a');
  downloadLink.setAttribute('href', window.URL.createObjectURL(blob));
  downloadLink.setAttribute('download', title + '.cdd');
  downloadLink.click();
}

refresh();