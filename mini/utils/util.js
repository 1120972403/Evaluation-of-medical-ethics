var nowTime = function () {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hour = now.getHours()
  var minute = now.getMinutes()
  var second = now.getSeconds()
  var date = year + "/" + month + "/" + day + " " + hour + ":" + minute + ":" + second;
  return date;
}

module.exports = {
  nowTime: nowTime,

}