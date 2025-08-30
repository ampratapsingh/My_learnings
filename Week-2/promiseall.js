
function wait1(t1){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, t1*1000);
  })
}

function wait2(t2){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, t2*1000);
  })
}

function wait3(t3){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, t3*1000);
  })
}


function calculateTime(t1, t2, t3){
  let start = new Date().getTime();
  return Promise.all([wait1(t1), wait2(t2), wait3(t3)]).then(() => {
    return new Date().getTime() - start;
  })
}

calculateTime(1, 2, 3).then((time) => {
  console.log(time);
})