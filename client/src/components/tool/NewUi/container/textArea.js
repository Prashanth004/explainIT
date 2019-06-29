import React, { Component } from 'react';
import '../../../css/ProfileForm.css';

export default class componentName extends Component {
    constructor(props){
        super(props)

        this.OnInput = this.OnInput.bind(this);
    }
    componentDidMount(){
        this.OnInput();
        var tx = document.getElementsByTagName('textarea');;
        for (var i = 0; i < tx.length; i++) {
            tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
            tx[i].addEventListener("input", this.OnInput, false);
        }
    }
    OnInput(){
        this.textArea.style.height = 'auto';
        this.textArea.style.height = (this.textArea.scrollHeight) + 'px';
    }
  render() {
    const {textvalue,changeFunction,inputClass} = this.props;
    // const rows = (this.props.textvalue.length===0)?"1":""
    return (
      <div>
        <textarea
        rows = "auto"
        ref={a => this.textArea = a}
         value={textvalue}
        onChange={changeFunction}
         className={inputClass}  />
      </div>)
  }
}