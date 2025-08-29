function myAsyncFunction(){
  let p = new Promise(function(resolve, reject){
    setTimeout(()=>resolve("Hello"), 1000);
    console.log("Hi");
  });
  return p;
}

async function main(){
  const value = await myAsyncFunction();
  console.log(value);
}

main();