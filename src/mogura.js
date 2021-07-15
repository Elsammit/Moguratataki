import React, { Component } from 'react';
import "./mogura.css";
import mogura from './image/mogura2.png';
import shibafu from './image/shibafu.png';
import hit from './image/hit_mogura.png';

export default class Mogratataki extends Component  {

    constructor (props) {
        super(props);
        this.state = {
            location:"Mas1",
            StartFlg:false,
            result:0
        };
    }

    onClick = (id) => {
        const {location} = this.state;

        if(location === id){
            var img = document.getElementById(id);
            img.src = hit;
        }
    }
    
    rand_MoguraUp = () =>{
        const {location} = this.state;

        var img = document.getElementById(location);
        img.src = shibafu;

        var a = Math.floor( Math.random() * 25)+1 ;
        console.log(a);

        const IdNum = "Mas" + a;
        this.setState({
            location:IdNum
        })

        var Next_img = document.getElementById(IdNum);
        Next_img.src = mogura;
    }

    ClickStart = () =>{
        const {StartFlg} = this.state;
        console.log("flg is "+ StartFlg);
        var Flg = StartFlg;
        if(StartFlg === false){
            this.intervalId = setInterval(()=>{
                this.rand_MoguraUp();
            }, 1000);
            document.getElementById("StButton").setAttribute("disabled", "disabled");
            document.getElementById("StButton").style.backgroundColor = "gray";
            setTimeout(()=>{
                this.finish_mogura();
            },30000);
            Flg = true;
        }
        this.setState({
            StartFlg:Flg
        });
    }

    finish_mogura = () =>{
        clearInterval(this.intervalId);
        document.getElementById("StButton").removeAttribute("disabled");
        document.getElementById("StButton").style.backgroundColor = "#24d";
    }
    
    render() {
        
        return (<div className="divCenter">
            <label className="title">
                <u>モグラたたきゲーム</u>
            </label>
            <input type="button" id="StButton"　className="StButton" value="スタート" onClick={this.ClickStart}></input>
            <label id="timer"></label>
            <table>
                <tbody>
                    <tr>
                        <td><img id="Mas1" src={shibafu} alt="green" onClick={() => this.onClick("Mas1" )} /></td>
                        <td><img id="Mas2" src={shibafu} alt="green" onClick={() => this.onClick("Mas2" )} /></td>
                        <td><img id="Mas3" src={shibafu} alt="green"  onClick={() => this.onClick("Mas3" )} /></td>
                        <td><img id="Mas4" src={shibafu} alt="green"  onClick={() => this.onClick("Mas4" )} /></td>
                        <td><img id="Mas5" src={shibafu} alt="green"  onClick={() => this.onClick("Mas5" )} /></td>
                    </tr>
                    <tr>
                        <td><img id="Mas6" src={shibafu} alt="green"  onClick={() => this.onClick("Mas6" )} /></td>
                        <td><img id="Mas7" src={shibafu} alt="green"  onClick={() => this.onClick("Mas7" )} /></td>
                        <td><img id="Mas8" src={shibafu} alt="green"  onClick={() => this.onClick("Mas8" )} /></td>
                        <td><img id="Mas9" src={shibafu} alt="green"  onClick={() => this.onClick("Mas9" )} /></td>
                        <td><img id="Mas10" src={shibafu} alt="green"  onClick={() => this.onClick("Mas10" )} /></td>
                    </tr>
                    <tr>
                        <td><img id="Mas11" src={shibafu} alt="green"  onClick={() => this.onClick("Mas11" )} /></td>
                        <td><img id="Mas12" src={shibafu} alt="green"  onClick={() => this.onClick("Mas12" )} /></td>
                        <td><img id="Mas13" src={shibafu} alt="green"  onClick={() => this.onClick("Mas13" )} /></td>
                        <td><img id="Mas14" src={shibafu} alt="green"  onClick={() => this.onClick("Mas14" )} /></td>
                        <td><img id="Mas15" src={shibafu} alt="green"  onClick={() => this.onClick("Mas15" )} /></td>
                    </tr>
                    <tr>
                        <td><img id="Mas16" src={shibafu} alt="green"  onClick={() => this.onClick("Mas16" )} /></td>
                        <td><img id="Mas17" src={shibafu} alt="green"  onClick={() => this.onClick("Mas17" )} /></td>
                        <td><img id="Mas18" src={shibafu} alt="green"  onClick={() => this.onClick("Mas18" )} /></td>
                        <td><img id="Mas19" src={shibafu} alt="green"  onClick={() => this.onClick("Mas19" )} /></td>
                        <td><img id="Mas20" src={shibafu} alt="green"  onClick={() => this.onClick("Mas20" )} /></td>
                    </tr>
                    <tr>
                        <td><img id="Mas21" src={shibafu} alt="green"  onClick={() => this.onClick("Mas21" )} /></td>
                        <td><img id="Mas22" src={shibafu} alt="green"  onClick={() => this.onClick("Mas22" )} /></td>
                        <td><img id="Mas23" src={shibafu} alt="green"  onClick={() => this.onClick("Mas23" )} /></td>
                        <td><img id="Mas24" src={shibafu} alt="green"  onClick={() => this.onClick("Mas24" )} /></td>
                        <td><img id="Mas25" src={shibafu} alt="green"  onClick={() => this.onClick("Mas25" )} /></td>
                    </tr>
                </tbody>
            </table>
            </div>
        );
    }
  }