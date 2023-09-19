import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './scholer.css';
import Card from './Card';

function ScholarshipList() {
  const [scholarships, setScholarships] = useState([]);
  const [disableScholarships, setDisableScholarships] = useState([]);
  const [empowerment,setEmpowerment]=useState([]);
  const [merit,setmerit]=useState([]);
  const [highereducation,sethighereducation]=useState([]);

  const getdata1 = async () => {
    try {
      const response = await Axios.get('http://localhost:3008/api/scholarships');
      setScholarships(response.data);
    } catch (error) {
      console.error('Error fetching scholarship data:', error);
    }
  };

  const getdata2 = async () => {
    try {
      const response = await Axios.get('http://localhost:3008/api/scholarships/disable');
      setDisableScholarships(response.data);
    } catch (error) {
      console.error('Error fetching disability scholarship data:', error);
    }
  };
  const getdata3 = async () => {
    try {
      const response = await Axios.get('http://localhost:3008/api/scholarships/empowerment');
       setEmpowerment(response.data);
    } catch (error) {
      console.error('Error fetching disability scholarship data:', error);
    }
  };
  const getdata4 = async () => {
    try {
      const response = await Axios.get('http://localhost:3008/api/scholarships/merit');
       setmerit(response.data);
    } catch (error) {
      console.error('Error fetching disability scholarship data:', error);
    }
  };
  const getdata5 = async () => {
    try {
      const response = await Axios.get('http://localhost:3008/api/scholarships/highereducation');
       sethighereducation(response.data);
    } catch (error) {
      console.error('Error fetching disability scholarship data:', error);
    }
  };
  

  useEffect(() => {
    getdata1(); // Fetch data from the first endpoint
    getdata2();
    getdata3();
    getdata4();
    getdata5(); // Fetch data from the second endpoint
  }, []);

  const normalScholarships = scholarships.map((scholar, index) => (
    <Card scholer={scholar} key={index} />
  ));

  const disabilityScholarships = disableScholarships.map((scholar, index) => (
    <Card scholer={scholar} key={index} />
  ));
  const empowermentsholer = empowerment.map((scholar, index) => (
    <Card scholer={scholar} key={index} />
  ));
  const meritscholer = merit.map((scholar, index) => (
    <Card scholer={scholar} key={index} />
  ));
  const higherscholer = highereducation.map((scholar, index) => (
    <Card scholer={scholar} key={index} />
  ));

  return (
    <div className='money'>
      <h1>Scholarships</h1>
      <h2>Ministry of Minority Affairs</h2>
      {normalScholarships}
      <h2>Department of Empowerment of Persons with Disabilities</h2>
      {disabilityScholarships}
      <h2>Ministry of Social Justice & Empowerment</h2>
      {empowermentsholer}
      <h2>Department of School Education & Literacy</h2>
      {meritscholer}
      <h2>Department of Higher Education</h2>
      {higherscholer}
    </div>
  );
}

export default ScholarshipList;
