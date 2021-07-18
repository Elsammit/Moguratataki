import React, { Component } from 'react';
import "./mogura.css";
import mogura from './image/mogura2.png';
import shibafu from './image/shibafu.png';
import hit from './image/hit_mogura.png';
import clickImg from './image/hammer2.png';

export default class Mogratataki extends Component  {

    constructor (props) {
        super(props);
        this.state = {
            location:"Mas1",
            StartFlg:false,
            timer:0,
            result:0
        };
    }

    onClick = (id) => {
        let element = document.getElementById("tables");
        //element.style.cursor = "url('http://wiki-devel.sugarlabs.org/images/e/e2/Arrow.cur'), auto";
        element.style.cursor = "url({clickImg}),auto";
        //element.style.cursor = "pointer";
        const {location} = this.state;

        if(location === id){
            var img = document.getElementById(id);
            img.src = hit;
            this.setState({result:this.state.result+1});
        }
    }
    
    rand_MoguraUp = () =>{
        const {location} = this.state;

        var img = document.getElementById(location);
        img.src = shibafu;

        var a = Math.floor( Math.random() * 25)+1 ;

        const IdNum = "Mas" + a;
        this.setState({
            location:IdNum
        })

        var Next_img = document.getElementById(IdNum);
        Next_img.src = mogura;
    }

    ClickStart = () =>{
        const {StartFlg} = this.state;
        var Flg = StartFlg;
        if(StartFlg === false){
            this.intervalId = setInterval(()=>{
                this.rand_MoguraUp();
                this.setState({timer:this.state.timer+1});
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
    
    MakeMap = () =>{
        var List = [];
        for(var i=1;i<=5;i++){
            var buf = [];
            for(var j=1;j<=5;j++){
                var num = j + (i-1)*5;
                var str = "Mas"+num;
                buf.push(
                    <td><img id={str} src={shibafu} alt="green" onClick={this.onClick.bind(this,str)} /></td>
                );
            }
            List.push(<tr>{buf}</tr>);
        }
        return List;        
    }

    render() {
        return (<div className="divCenter">
            <label className="title">
                <u>モグラたたきゲーム</u>
            </label>
            <input type="button" id="StButton"　className="StButton" value="スタート" onClick={this.ClickStart}></input>
            <label id="timer"></label>
            <div>
                時間:{this.state.timer}  
                スコア:{this.state.result}
            </div>
            <table id="tables">
                <tbody>
                    {this.MakeMap()}
                </tbody>
            </table>
            </div>
        );
    }
  }