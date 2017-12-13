import React from 'react';

const PerformCalc = (arr) => {
  if (arr[arr.length-1] != '÷' &&
      arr[arr.length-1] != 'x' &&
      arr[arr.length-1] != '+' &&
      arr[arr.length-1] != '-') {
    arrExp = arr.map((item,index) => {
      if (item == '÷') {
        return '/';
      }
      if (item == 'x') {
        return '*';
      }
      if (item == '%') {
        return '/100';
      }
      if (item == '(-') {
        return '-';
      }
      if (item ==')') {
        return '';
      }
      else {
        return item;
      }
    });
    for (let i = 0; i < arrExp.length; i++) {
      if (arrExp[i] == '-' && arrExp[i-1] == '-') {
        arrExp.splice(i-1, 2, '+');
      }
    }
    console.log(arrExp);
    if(!isNaN(arrExp[arrExp.length-1])) {
      const sValue = arrExp.join('');
      const result = eval(sValue);
      console.log(result);
      return result;
    }
  }
};

export default PerformCalc;
