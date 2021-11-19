import React, { Component } from 'react';
import "./mogura.css";
import mogura from './image/mogura2.png';
import shibafu from './image/shibafu.png';
import hit from './image/hit_mogura.png';
import clickImg from './image/hammer2.png';
import hammer from './image/hammer.png';

export interface Props {
    location?: string;
    StartFlg?: boolean;
    timer?: number;
    result?:number;
}



export default class Mogratataki extends Component<Props, 
    {location: string, StartFlg: boolean, timer: number, result: number}>  {

    constructor (props:Props) {
        super(props);
        this.state = {
            'location':"Mas1",
            'StartFlg':false,
            'timer':0,
            'result':0,
        };
    }

    private intervalId: any;

    onClick = (id:any) => {
        let element:any = document.getElementById("tables");
        element.style.cursor = "url("+ clickImg + "),auto";
        const {location} = this.state;

        if(location === id){
            var img:any = document.getElementById(id);
            img.src = hit;
            this.setState({result:this.state.result+1});
        }
        setTimeout(
            function () {
              element.style.cursor = "url("+ hammer + "),auto";
            }, 
            100
          );
    }
    
    rand_MoguraUp = () =>{
        const {location} = this.state;

        var img:any = document.getElementById(location);
        img.src = shibafu;

        var a = Math.floor( Math.random() * 25)+1 ;

        const IdNum = "Mas" + a;
        this.setState({
            location:IdNum
        })

        var Next_img:any = document.getElementById(IdNum);
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
            let buf = document.getElementById("StButton") as HTMLInputElement;
            buf.setAttribute("disabled", "disabled");
            buf.style.backgroundColor = "gray";
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
        let buf = document.getElementById("StButton") as HTMLInputElement;

        buf.removeAttribute("disabled");
        buf.style.backgroundColor = "#24d";
    }
    
    MakeMap = () =>{
        var List = [];
        for(var i=1;i<=5;i++){
            var buf = [];
            for(var j=1;j<=5;j++){
                var num = j + (i-1)*5;
                var str = "Mas"+num;
                // 列追加
                buf.push(
                    <td><img id={str} src={shibafu} alt="green" onClick={this.onClick.bind(this,str)} /></td>
                );
            }
            // 行追加
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