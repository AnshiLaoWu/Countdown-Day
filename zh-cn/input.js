var title;
var goal_year;
var goal_month;
var goal_date;

function skip(){
  if (!judge()) return false;
  location.assign(encodeURI('./main.html?title=' + title + '&year=' + goal_year + '&month=' + goal_month + '&date=' + goal_date));
}

function judge(){
  var goal = new Date();
  goal.setFullYear(goal_year, goal_month - 1, goal_date);
  if (!(goal instanceof Date && !isNaN(goal.getTime())) || goal_year < 1 || goal_month < 1 || goal_date < 1 || goal_month > 12 || goal_date > 31) {
    alert('日期格式不合法！');
    return false;
  } else if (title.length > 10) {
    alert('目标内容过长！');
    return false;
  }
  return true;
}

function submit(){  
  title = document.getElementById("title").value;
  goal_year = document.getElementById("year").value;
  goal_month = document.getElementById("month").value;
  goal_date = document.getElementById("date").value;
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
            if (word.length <= 4) {
              title = word[0];
              goal_year = parseInt(word[1]);
              goal_month = parseInt(word[2]);
              goal_date = parseInt(word[3]);
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