var now = new Date();

var goal = new Date();
var title = prompt("请输入目标内容");
var goal_year = prompt("请输入目标年",2025);
var goal_month = prompt("请输入目标月",1);
var goal_date = prompt("请输入目标日",1);
goal.setFullYear(goal_year,goal_month-1,goal_date);

var value = parseInt((goal - now) / 86400000);

if (value > 0) {
  document.getElementById("title_text").innerHTML = '距离 ' + title + ' 还剩';
  document.getElementById("title").style.backgroundColor = "blue";
  document.getElementById("number").innerHTML = value;
  document.getElementById("explain_text").innerHTML = '至 ' + goal_year + ' 年 ' + goal_month + ' 月 ' + goal_date + ' 日止';
} else if (value < 0) {
  document.getElementById("title_text").innerHTML = '距离 ' + title + ' 已经';
  document.getElementById("title").style.backgroundColor = "orange";
  document.getElementById("number").innerHTML = -value;
  document.getElementById("explain_text").innerHTML = '自 ' + goal_year + ' 年 ' + goal_month + ' 月 ' + goal_date + ' 日起';
}