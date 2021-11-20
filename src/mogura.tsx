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

    
    intervalId: NodeJS.Timer | null;

    constructor (props:Props) {
        super(props);
        this.state = {
            'location':"Mas1",
            'StartFlg':false,
            'timer':0,
            'result':0,
        };
        this.intervalId = null;
    }

    onClick = (id:string) => {
        if(this.intervalId){
            let element:HTMLTableElement = document.getElementById("tables") as HTMLTableElement;
            element.style.cursor = "url("+ clickImg + "),auto";
            const {location} = this.state;
    
            if(location === id){
                var img:HTMLImageElement = document.getElementById(id) as HTMLImageElement;
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

    }
    
    rand_MoguraUp = () =>{
        const {location} = this.state;

        var img:HTMLImageElement = document.getElementById(location) as HTMLImageElement;
        img.src = shibafu;

        var a = Math.floor( Math.random() * 25)+1 ;

        const IdNum = "Mas" + a;
        this.setState({
            location:IdNum
        })

        var Next_img:HTMLImageElement = document.getElementById(IdNum) as HTMLImageElement;
        Next_img.src = mogura;
    }

    ClickStart = () =>{
        const {StartFlg} = this.state;
        var Flg = StartFlg;
        console.log("click Start StartFlg:" + StartFlg + "Flg:" + Flg);
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
            },31000);
            Flg = true;
        }
        this.setState({
            StartFlg:Flg
        });
    }

    finish_mogura = () =>{
        if(this.intervalId){
            clearInterval(this.intervalId);
        }
        let buf = document.getElementById("StButton") as HTMLInputElement;

        buf.removeAttribute("disabled");
        buf.style.backgroundColor = "#24d";

        this.intervalId = null;
        this.setState({StartFlg:false});
        alert("Finish Mogura Tataki");
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

                let element:HTMLImageElement = document.getElementById(str) as HTMLImageElement;
                if(element){
                    element.ondragstart = function (){
                        console.log("ドラッグ操作を開始した");
                        return false;
                    };
                }


            }
            // 行追加
            List.push(<tr>{buf}</tr>);
        }
        return List;        
    }

    render() {
        return (<div className="divCenter">
            <div>
                <label className="title">
                    <u>モグラたたきゲーム</u>
                </label>
                <input type="button" id="StButton"　className="StButton" value="スタート" onClick={this.ClickStart}></input>
                <label id="timer"></label>
            </div>
            <div className="mapArea">
                <table id="tables">
                    <tbody>
                        {this.MakeMap()}
                    </tbody>
                </table>

                <div className="subInfo">
                    時間:{this.state.timer}  
                    <br />
                    スコア:{this.state.result}
                </div>
            </div>
        </div>
        );
    }
  }