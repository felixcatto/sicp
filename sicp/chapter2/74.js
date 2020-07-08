import departmentAsia from 'departmentAsia';
import departmentEurope from 'departmentEurope';
import departmentAmerica from 'departmentAmerica';

/*
  departmentAsia = {
    getRecord: (file, employeeName) => Record || null,
    getSalary: (Record) => salary,
  };
  departmentAsiaRecord = {
    department: 'departmentAsia',
    name: '',
    salary: '',
    adress: '', 
  }

  departmentEurope = {
    getRecord: f,
    getSalary: f,
  };
  departmentEuropeRecord = {
    department: 'departmentEurope',
    fullname: '',
    employeeSalary: '',
    liveAdress: '',
  }

  file === [records]

  когда компания поглощает новую корпорацию departmentAmerica, все что нужно
  сделать - реализовать 2 геттера (getRecord, getSalary) и при создании нового файла
  помечать его `file.department = departmentAmerica`
*/

const table = {
  departmentAsia,
  departmentEurope,
  departmentAmerica,
};

const getRecord = (file, employeeName) => {
  const record = table[file.department]['getRecord'](file, employeeName);
  return record;
};

const getSalary = record => {
  const salary = table[record.department]['getSalary'](record);
  return salary;
};

const findEmployeeRecord = (files, employeeName) => {
  const record = files.find(file => getRecord(file, employeeName));
  return record;
};
