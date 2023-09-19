const requestPromise = require('request-promise');
const cheerio = require('cheerio');
const json2csv = require('json2csv').Parser;
const fs = require('fs');
const express = require('express');
const app = express();
const port = process.env.PORT || 3008;
const cors = require('cors');


const scholarshipUrl = "https://scholarships.gov.in/";
let scholarshipData = [];
let disabledata=[];
let empowerment=[];
let merit=[];
let highereducation=[];
app.use(cors());

(async () => {
  try {
    const response = await requestPromise({
      uri: scholarshipUrl,
      headers: {
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US,en;q=0.9"
      },
      gzip: true
    });

    const $ = cheerio.load(response);

    // Extract scholarship data
    

    // Example: Extracting name, closing date, and other details for rows 1 to 3
    for (let i = 1; i <= 3; i++) {
      const name = $(`#ministryofMinorityAffairs > div > table > tbody > tr:nth-child(${i}) > td:nth-child(1)`).text().trim().toLowerCase();
      const closing = $(`#ministryofMinorityAffairs > div > table > tbody > tr:nth-child(${i}) > td:nth-child(2) > font`).text().trim();
      const Averification = $(`#ministryofMinorityAffairs > div > table > tbody > tr:nth-child(${i}) > td:nth-child(3) > font`).text().trim();
      const iverification = $(`#ministryofMinorityAffairs > div > table > tbody > tr:nth-child(${i}) > td:nth-child(4) > font`).text().trim();
      const dnoverification = $(`#ministryofMinorityAffairs > div > table > tbody > tr:nth-child(${i}) > td:nth-child(5) > font`).text().trim();
      const guideline = $(`#ministryofMinorityAffairs > div > table > tbody > tr:nth-child(${i}) > td:nth-child(6)`).text().trim();

      const obj = {
        name,
        closing,
        Averification,
        iverification,
        dnoverification,
      
      };

      scholarshipData.push(obj);
    }
    for(let i=1;i<=3;i++)
    {
      const name=$(`#departmentofEmpowermentofPersonswithDisabilities > div > table > tbody > tr:nth-child(${i}) > td:nth-child(1)`).text().trim().toLowerCase();
      const closing=$(`#departmentofEmpowermentofPersonswithDisabilities > div > table > tbody > tr:nth-child(${i}) > td:nth-child(2)`).text().trim();
      const Averification=$(`#departmentofEmpowermentofPersonswithDisabilities > div > table > tbody > tr:nth-child(${i}) > td:nth-child(3)`).text().trim();
      const iverification=$(`#departmentofEmpowermentofPersonswithDisabilities > div > table > tbody > tr:nth-child(${i}) > td:nth-child(4)`).text().trim();
      const dnoverification=$(`#departmentofEmpowermentofPersonswithDisabilities > div > table > tbody > tr:nth-child(${i}) > td:nth-child(5)`).text().trim();
      const obj={
        name,
        closing,
        Averification,
        iverification,
        dnoverification
      }
      disabledata.push(obj);
    }
    
    for(let i=1;i<=2;i++)
    {
      const name=$(`#mosje > div > table > tbody > tr:nth-child(${i}) > td:nth-child(1)`).text().trim().toLowerCase();
      const closing=$(`#mosje > div > table > tbody > tr:nth-child(${i}) > td:nth-child(2)`).text().trim();
      const Averification=$(`#mosje > div > table > tbody > tr:nth-child(${i}) > td:nth-child(3)`).text().trim();
      const iverification=$(`#mosje > div > table > tbody > tr:nth-child(${i}) > td:nth-child(4)`).text().trim();
      const dnoverification=$(`#mosje > div > table > tbody > tr:nth-child(${i}) > td:nth-child(5)`).text().trim();
      const obj={
        name,
        closing,
        Averification,
        iverification,
        dnoverification
      }
      empowerment.push(obj);
    }
    
    for(let i=1;i<=1;i++)
    {
      const name=$(` #dosel  > div > table > tbody > tr:nth-child(${i}) > td:nth-child(1)`).text().trim().toLowerCase();
      const closing=$(` #dosel  > div > table > tbody > tr:nth-child(${i}) > td:nth-child(2)`).text().trim();
      const Averification=$(` #dosel  > div > table > tbody > tr:nth-child(${i}) > td:nth-child(3)`).text().trim();
      const iverification=$(` #dosel  > div > table > tbody > tr:nth-child(${i}) > td:nth-child(4)`).text().trim();
      const dnoverification=$(` #dosel  > div > table > tbody > tr:nth-child(${i}) > td:nth-child(5)`).text().trim();
      const obj={
        name,
        closing,
        Averification,
        iverification,
        dnoverification
      }
      merit.push(obj);
    }
    
    for(let i=1;i<=1;i++)
    {
      const name=$(` #dohe  > div > table > tbody > tr:nth-child(${i}) > td:nth-child(1)`).text().trim().toLowerCase();
      const closing=$(` #dohe  > div > table > tbody > tr:nth-child(${i}) > td:nth-child(2)`).text().trim();
      const Averification=$(` #dohe  > div > table > tbody > tr:nth-child(${i}) > td:nth-child(3)`).text().trim();
      const iverification=$(`#dohe  > div > table > tbody > tr:nth-child(${i}) > td:nth-child(4)`).text().trim();
      const dnoverification=$(` #dohe  > div > table > tbody > tr:nth-child(${i}) > td:nth-child(5)`).text().trim();
      const obj={
        name,
        closing,
        Averification,
        iverification,
        dnoverification
      }
      highereducation.push(obj);
    }
    
  


    // Convert scholarshipData to CSV
    const csvData = new json2csv().parse(scholarshipData);

    // Write CSV data to a file
    fs.writeFileSync('./scholarships.csv', csvData, 'utf-8');

    console.log('Data scraped and saved to scholarships.csv');
  } catch (error) {
    console.error('Error:', error);
  }
})();

app.get('/api/scholarships', (req, res) => {
    res.send(scholarshipData);
   
  });
  app.get('/api/scholarships/disable', (req, res) => {
    res.send(disabledata);
   
  });
  app.get('/api/scholarships/empowerment', (req, res) => {
    res.send(empowerment);
   
  });
  app.get('/api/scholarships/merit', (req, res) => {
    res.send(merit);
   
  });
  app.get('/api/scholarships/highereducation', (req, res) => {
    res.send(highereducation);
   
  });

  

  app.listen(port, () => {
    console.log(`API is running on port ${port}`);
  });

