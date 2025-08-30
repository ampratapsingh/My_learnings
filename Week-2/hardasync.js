function sleep(ms){
  return new Promise((resolve) => {
    let start = new Date().getTime();
    while(new Date().getTime() - start < ms){

    }
    resolve();
  })
}

const pd = sleep(7000);
console.log(pd);
console.log("Hello");




