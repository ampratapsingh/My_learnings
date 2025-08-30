const fs = require('fs');

fs.readFile('./filecleaner.txt', 'utf-8', (err, data) => {
  if(err){
    console.log(err);
    return;
  }
  console.log("uncleaned data:", data);

  const cleanedData = data.replace(/\s+/g, " ").trim();
  console.log("cleaned data:", cleanedData);
})