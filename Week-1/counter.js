function counter(count){
  let count1 = count;

    setInterval(function(){
    console.log(count1);
    count1--;
    if (count1 === 0) {
      clearInterval(timer); // stop when done
    }
  },1000);
  
}

counter(30);