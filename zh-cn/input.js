var title;
var goal_year;
var goal_month;
var goal_date;
var goal_hour;
var goal_minute;
var goal_second;
var repeat_time;
var repeat_unit;
var date_type;
var if_add;
var if_end;
var end_year;
var end_month;
var end_date;

function skip(){
  if (!judge()) return false;
  if (goal_hour == '') goal_hour = 0;
  if (goal_minute == '') goal_minute = 0;
  if (goal_second == '') goal_second = 0;
  location.assign(encodeURI('./main.html?title=' + title + '&year=' + goal_year + '&month=' + goal_month + '&date=' + goal_date + '&hour=' + goal_hour + '&minute=' + goal_minute + '&second=' + goal_second + '&repeat_time=' + repeat_time + '&repeat_unit=' + repeat_unit + '&date_type=' + date_type + '&if_add=' + if_add + '&if_end=' + if_end + '&end_year=' + end_year + '&end_month=' + end_month + '&end_date=' + end_date));
}

function judge(){
  var goal = new Date();
  goal.setFullYear(goal_year, goal_month - 1, goal_date);
  goal.setHours(goal_hour, goal_minute, goal_second);
  if (!(goal instanceof Date && !isNaN(goal.getTime())) || goal_year < 1 || goal_month < 1 || goal_date < 1 || goal_hour < 0 || goal_minute < 0 || goal_second < 0 || (date_type == 'solar' && goal_month > 12) || (date_type == 'lunar' && goal_month > 13) || goal_date > 31 || goal_hour > 23 || goal_minute > 59 || goal_second > 59) {
    alert('时间日期格式不合法！');
    return false;
  } else if (title.length > 10) {
    alert('目标内容过长！');
    return false;
  } else if (isNaN(repeat_time)) {
    alert('重复格式错误！');
    return false;
  }
  if (if_end === 0) return true;
  goal.setFullYear(end_year, end_month - 1, end_date);
  if (!(goal instanceof Date && !isNaN(goal.getTime())) || end_year < 1 || end_month < 1 || end_date < 1 || (date_type == 'solar' && end_month > 12) || (date_type == 'lunar' && end_month > 13) || end_date > 31) {
    alert('结束日期格式不合法！');
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
  } else repeat_time = repeat_unit = 0;
  var radios = document.getElementsByName("type");
  if (radios[0].checked) date_type = 'solar';
  else date_type = 'lunar';
  if_add = Number(document.getElementById("if_add").checked);
  if_end = Number(document.getElementById("if_end").checked);
  if (document.getElementById("if_end").checked) {
    end_year = document.getElementById("end_year").value;
    end_month = document.getElementById("end_month").value;
    end_date = document.getElementById("end_date").value;
  } else end_year = end_month = end_date = 0;
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
            if (word.length <= 15) {
              title = word[0];
              goal_year = parseInt(word[1]);
              goal_month = parseInt(word[2]);
              goal_date = parseInt(word[3]);
              goal_hour = (word.length > 4) ? parseInt(word[4]) : 0;
              goal_minute = (word.length > 4) ? parseInt(word[5]) : 0;
              goal_second = (word.length > 4) ? parseInt(word[6]) : 0;
              repeat_time = (word.length > 7) ? parseInt(word[7]) : 0;
              repeat_unit = (word.length > 7) ? word[8] : 'day';
              date_type = (word.length > 9) ? word[9] : 'solar';
              if_add = (word.length > 9) ? parseInt(word[10]) : 0;
              if_end = (word.length > 9) ? parseInt(word[11]) : 0;
              end_year = (word.length > 9) ? parseInt(word[12]) : 0;
              end_month = (word.length > 9) ? parseInt(word[13]) : 0;
              end_date = (word.length > 9) ? parseInt(word[14]) : 0;
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
document.getElementById('if_end').checked = false;
document.getElementById('end_year').disabled = true;
document.getElementById('end_month').disabled = true;
document.getElementById('end_date').disabled = true;
document.getElementById('if_repeat').addEventListener('click', function() {
  if (this.checked == false) {
    document.getElementById('repeat_time').disabled = true;
    document.getElementById('repeat_unit').disabled = true;
  } else {
    document.getElementById('repeat_time').disabled = false;
    document.getElementById('repeat_unit').disabled = false;
  }
});
document.getElementById('if_end').addEventListener('click', function() {
  if (this.checked == false) {
    document.getElementById('end_year').disabled = true;
    document.getElementById('end_month').disabled = true;
    document.getElementById('end_date').disabled = true;
  } else {
    document.getElementById('end_year').disabled = false;
    document.getElementById('end_month').disabled = false;
    document.getElementById('end_date').disabled = false;
  }
});