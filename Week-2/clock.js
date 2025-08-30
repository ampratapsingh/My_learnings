
function getTime(){

  const now = new Date();

  let hours24 = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  //24-hr format
  hours24 = hours24 < 10 ? "0" + hours24 : hours24; 
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  const time24 = `${hours24}:${minutes}:${seconds}`;

  //12-hr format
  let hours12 = now.getHours();
  let ampm = hours12 > 12 ? "PM" : "AM";
  hours12 = hours12 % 12 || 12;
  hours12 = hours12 < 10 ? "0" + hours12 : hours12;
  const time12 = `${hours12}:${minutes}:${seconds} ${ampm}`;
  
  return {time12, time24};
}

setInterval(()=>{
  const {time12, time24} = getTime();
  console.log(time12);
  console.log(time24);
},1000);



