var title;
var goal_year;
var goal_month;
var goal_date;
var goal_hour;
var goal_minute;
var goal_second;
var repeat_time;
var repeat_unit;

function skip(){
  if (!judge()) return false;
  if (goal_hour == '') goal_hour = 0;
  if (goal_minute == '') goal_minute = 0;
  if (goal_second == '') goal_second = 0;
  location.assign(encodeURI('./main.html?title=' + title + '&year=' + goal_year + '&month=' + goal_month + '&date=' + goal_date + '&hour=' + goal_hour + '&minute=' + goal_minute + '&second=' + goal_second + '&repeat_time=' + repeat_time + '&repeat_unit=' + repeat_unit));
}

function judge(){
  var goal = new Date();
  goal.setFullYear(goal_year, goal_month - 1, goal_date);
  goal.setHours(goal_hour, goal_minute, goal_second);
  if (!(goal instanceof Date && !isNaN(goal.getTime())) || goal_year < 1 || goal_month < 1 || goal_date < 1 || goal_hour < 0 || goal_minute < 0 || goal_second < 0 || goal_month > 12 || goal_date > 31 || goal_hour > 23 || goal_minute > 59 || goal_second > 59) {
    alert('时间日期格式不合法！');
    return false;
  } else if (title.length > 10) {
    alert('目标内容过长！');
    return false;
  } else if (isNaN(repeat_time)) {
    alert('重复格式错误！');
    return false;
  }
  return true;
}

function submit(){  
  title = document.getElementById("title").value;
  goal_year = document.getElementById("year").value;
  goal_month = document.getElementById("month").value;
  goal_date = document.getElementById("date").value;
  goal_hour = document.getElementById("hour").value;
  goal_minute = document.getElementById("minute").value;
  goal_second = document.getElementById("second").value;
  if (document.getElementById("if_repeat").checked) {
    repeat_time = document.getElementById("repeat_time").value;
    repeat_unit = document.getElementById("repeat_unit").value;
  } else {
    repeat_time = repeat_unit = 0;
  }
  skip();
}

document.getElementById("open").onclick = function () {
  document.getElementById("open_file").click();
};
document.getElementById('open_file').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            var text = e.target.result;
            var word = text.split('\n');
            if (word.length <= 7) {
              title = word[0];
              goal_year = parseInt(word[1]);
              goal_month = parseInt(word[2]);
              goal_date = parseInt(word[3]);
              goal_hour = (word.length > 4) ? parseInt(word[4]) : 0;
              goal_minute = (word.length > 4) ? parseInt(word[5]) : 0;
              goal_second = (word.length > 4) ? parseInt(word[6]) : 0;
              skip();
            } else {
              alert('请选择一个.cdd格式的文件。');
            }
        };
        reader.readAsText(file);
    } else {
        alert('请选择一个.cdd格式的文件。');
    }
});

document.getElementById('if_repeat').checked = false;
document.getElementById('repeat_time').disabled = true;
document.getElementById('repeat_unit').disabled = true;
document.getElementById('if_repeat').addEventListener('click', function() {
  if (this.checked == false) {
    document.getElementById('repeat_time').disabled = true;
    document.getElementById('repeat_unit').disabled = true;
  } else {
    document.getElementById('repeat_time').disabled = false;
    document.getElementById('repeat_unit').disabled = false;
  }
});