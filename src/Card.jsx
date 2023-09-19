import React from 'react';
import './Card.css'

export default function Card({ scholer }) {
  if (!scholer) {
    return <div>Loading...</div>; // Handle the case when scholer is undefined
  }

  return (
    <div className='card'>
      <table>
        <tbody>
          <tr>
            <td> {scholer.name}</td>
            <td> {scholer.closing}</td>
            <td>Applicaton_verification <br /> {scholer.Averification}</td>
            <td>institute_verification <br /> {scholer.iverification}</td>
            <td>dno_verification <br /> {scholer.dnoverification}</td>
            <td> <a href="https://scholarships.gov.in/" target='_blank'>click</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

