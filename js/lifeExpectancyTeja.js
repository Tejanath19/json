let log4js = require('log4js');
let logger = log4js.getLogger();
const readline = require('readline');
const fs = require('fs');
const obj = {};
module.exports = function convert(startYear)
{
  if(typeof startYear === 'string') {
   return '';
 }

  if(typeof startYear !== 'number' || isNaN(startYear))
 {
       throw new Error('Not a number');
 }

const rl = readline.createInterface({
 input: fs.createReadStream('Indicators.csv')
});
    let arr = [];
    rl.on('line', function(line)
    {
     let arrline = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
     if(arrline[1] === 'KHM' || arrline[1] === 'AGO'
      || arrline[1] === 'DEU' || arrline[1] === 'MYS' || arrline[1] === 'BTN')
      {
        if(arrline[3] === 'SP.DYN.LE00.FE.IN')
        {
           obj['CountryName'] = arrline[0];
            obj['Female'] = arrline[5];
            obj['Year'] = arrline[4];
        }
        if(arrline[3] === 'SP.DYN.LE00.MA.IN')
        {
            obj['Male'] = arrline[5];
            arr.push(obj);
        }
      }
    });
rl.on('close', () => {
  let objjson=JSON.stringify(arr, null, 4);
 fs.writeFile('../outputdata/outputLifrExpectanctTejanath.json', objjson);
 logger.debug(objjson);
});
 return 'JSON written successfully';
 };

