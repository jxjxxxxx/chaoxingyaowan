//得到年月日
const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}


const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const formatString = s => {
  var date = new Date(s)
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return month + '月' + day + '日'
} 

const formatAcString = s => {
  var date = new Date(s);
  let show_day = new Array('周日', '周一', '周二', '周三', '周四', '周五', '周六');
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const a = date.getDay()
  const week = show_day[a];
  const hour = date.getHours();
  const min = date.getMinutes();
  if(min != 0){
    return month + '月' + day + '日'+ ' ' + week + ' ' + hour + ':' + min
  }else{
    return month + '月' + day + '日'+ ' ' + week + ' ' + hour + ':' + min + '0'
  }
  
} 

module.exports = {
  formatDate,
  formatString,
  formatAcString
}
