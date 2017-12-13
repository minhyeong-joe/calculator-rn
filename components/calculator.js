import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import { Header, Body, Section, Footer, Display, ButtonContainer, MyButton, Operator, SystemButton } from './reusable';
import PerformCalc from './performCalc';

export default class Calculator extends Component {
  constructor(props){
    super(props);
    this.state = {
      display: [],
      value: [],
      result: '',
      refreshDisplay: false,
    };
  }

  displayDigit(n) {
    if (this.state.display.length <= 50 && this.state.display[this.state.display.length-1] != '%') {
      if (this.state.value[0]==0 && this.state.value[1]!='.'){
        if (n != 0) {
          let displayArray = this.state.display;
          displayArray.pop();
          this.setState({
            display: displayArray,
            value: [n],
            refreshDisplay: true,
          });
        }
      } else {
        this.setState({
          value: [...this.state.value, n],
          refreshDisplay: true,
        });
      }
    };
  }

  clearAll() {
    this.setState({
      display: [],
      value: [],
      result: '',
      refreshDisplay: false,
    });
  }

  delete() {
    let displayArray = this.state.display;
    let deletedValue = displayArray.pop();
    let valueArray = this.state.value;
    if (valueArray != []){
      valueArray.pop();
    }
    if (displayArray[displayArray.length-1] == '.' || displayArray[displayArray.length-1] == ')') {
      displayArray.pop();
      valueArray.pop();
    }
    if (deletedValue == '÷' || deletedValue == 'x' || deletedValue == '+' || deletedValue == '-') {
      let divIndex = displayArray.indexOf('÷');
      let multIndex = displayArray.indexOf('x');
      let plusIndex = displayArray.indexOf('+');
      let minusIndex = displayArray.indexOf('-');
      let opIndex = Math.max(divIndex, multIndex, plusIndex, minusIndex);
      valueArray = displayArray.slice(opIndex+1);
    }
    this.setState({
      display: displayArray,
      value: valueArray,
    });
  }

  negate() {
    const valueArray = this.state.value;
    const displayArray = this.state.display;
    if (valueArray.indexOf('(-') == -1) {
      valueArray.unshift('(-');
      let divIndex = displayArray.lastIndexOf('÷');
      let multIndex = displayArray.lastIndexOf('x');
      let plusIndex = displayArray.lastIndexOf('+');
      let minusIndex = displayArray.lastIndexOf('-');
      let opIndex = Math.max(divIndex, multIndex, plusIndex, minusIndex);
      displayArray.splice(opIndex+1, 0, '(-');
    } else {
      valueArray.shift();
      let divIndex = displayArray.lastIndexOf('÷');
      let multIndex = displayArray.lastIndexOf('x');
      let plusIndex = displayArray.lastIndexOf('+');
      let minusIndex = displayArray.lastIndexOf('-');
      let opIndex = Math.max(divIndex, multIndex, plusIndex, minusIndex);
      displayArray.splice(opIndex+1, 1);
    }
    this.setState({
      display: displayArray,
      value: valueArray
    });
  }

  addDot() {
    if (this.state.value.indexOf('.') == -1) {
      this.setState({
        display: [...this.state.display, '.'],
        value: [...this.state.value, '.']
      });
    }
  }

  percent() {
    const valueArray = this.state.value;
    const displayArray = this.state.display;
    if (valueArray.indexOf('%') == -1 && valueArray.length >= 1) {
      valueArray.push('%');
      displayArray.push('%');
    } else {
      valueArray.pop();
      displayArray.pop();
    }
    this.setState({
      value: valueArray,
      display: displayArray,
    });
  }

  displayOperator(op) {
    if (this.state.display[this.state.display.length-1] != '÷' &&
        this.state.display[this.state.display.length-1] != 'x' &&
        this.state.display[this.state.display.length-1] != '+' &&
        this.state.display[this.state.display.length-1] != '-' &&
        this.state.display.length >= 1) {
          if (this.state.value.indexOf('(-') != -1){
            this.setState({
              display: [...this.state.display, ')', op],
              value: [],
            });
          } else {
            this.setState({
              display: [...this.state.display, op],
              value: [],
            });
          }
    } else if(this.state.display.length >= 1) {
      const displayArray = this.state.display;
      displayArray.splice(displayArray.length-1, 1, op);
      this.setState({
        display: displayArray,
        value: [],
      });
    }
  }

  componentDidUpdate() {
    // console.log('display: '+this.state.display);
    // console.log('value: '+this.state.value);
    if (this.state.refreshDisplay){
      let valueArray = this.state.value;
      let displayArray = this.state.display;
      let updateDisplay = displayArray.concat(valueArray[valueArray.length-1]);
      this.setState({
        display: updateDisplay,
        refreshDisplay: false,
      });
    }

    const result = PerformCalc(this.state.display);
    if (this.state.result != result) {
      this.setState({
        result: result
      });
    }
  }

  onEqualPress() {
    if (this.state.display[this.state.display.length-1] != '÷' &&
        this.state.display[this.state.display.length-1] != 'x' &&
        this.state.display[this.state.display.length-1] != '+' &&
        this.state.display[this.state.display.length-1] != '-' &&
        this.state.result != undefined) {
          const resultArray = this.state.result.toString().split('');
          this.setState({
            display: resultArray,
            result: '',
            value: resultArray,
          })
        }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Header>Calculator</Header>
          <Body>
            <Section>
              <Display display={this.state.display} subDisplay={this.state.result}/>
            </Section>
            <ButtonContainer>
              <SystemButton action={this.delete.bind(this)}>DEL</SystemButton>
              <MyButton action={this.displayDigit.bind(this, 7)}>7</MyButton>
              <MyButton action={this.displayDigit.bind(this, 4)}>4</MyButton>
              <MyButton action={this.displayDigit.bind(this, 1)}>1</MyButton>
              <SystemButton action={this.negate.bind(this)}>±</SystemButton>
              <SystemButton action={this.clearAll.bind(this)}>AC</SystemButton>
              <MyButton action={this.displayDigit.bind(this, 8)}>8</MyButton>
              <MyButton action={this.displayDigit.bind(this, 5)}>5</MyButton>
              <MyButton action={this.displayDigit.bind(this, 2)}>2</MyButton>
              <MyButton action={this.displayDigit.bind(this, 0)}>0</MyButton>
              <SystemButton action={this.percent.bind(this)}>%</SystemButton>
              <MyButton action={this.displayDigit.bind(this, 9)}>9</MyButton>
              <MyButton action={this.displayDigit.bind(this, 6)}>6</MyButton>
              <MyButton action={this.displayDigit.bind(this, 3)}>3</MyButton>
              <SystemButton action={this.addDot.bind(this)}>.</SystemButton>
              <Operator action={this.displayOperator.bind(this, '÷')}>÷</Operator>
              <Operator action={this.displayOperator.bind(this, 'x')}>×</Operator>
              <Operator action={this.displayOperator.bind(this, '-')}>-</Operator>
              <Operator action={this.displayOperator.bind(this, '+')}>+</Operator>
              <Operator action={this.onEqualPress.bind(this)}>=</Operator>
            </ButtonContainer>
          </Body>
        </View>
        <Footer />
      </View>
    );
  }
};
