var goal = new Date();
var title = prompt("请输入目标内容");
var goal_year = prompt("请输入目标年",2025);
var goal_month = prompt("请输入目标月",1);
var goal_date = prompt("请输入目标日",1);
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
  if (value > 0) {
    document.getElementById("title_text").innerHTML = title + ' 还剩';
    document.getElementById("title").style.backgroundColor = "blue";
    document.getElementById("number").innerHTML = value;
  } else if (value < 0) {
    document.getElementById("title_text").innerHTML = title + ' 已经';
    document.getElementById("title").style.backgroundColor = "orange";
    document.getElementById("number").innerHTML = -value;
  } else {
    document.getElementById("title_text").innerHTML = '现在是 ' + title;
    document.getElementById("title").style.backgroundColor = "red";
    document.getElementById("number").innerHTML = value;
  }
  document.getElementById("explain_text").innerHTML = '目标日：' + goal_year + ' 年 ' + goal_month + ' 月 ' + goal_date + ' 日';
  document.getElementById("unit").innerHTML = '天';
  count = 0;
  font_size();
}

function change() {
  if (confirm('确定更换吗？当前未保存的内容将全部丢失。')) {
    location.reload();
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

function open() {
  document.getElementById("open_file").click();
}

refresh();