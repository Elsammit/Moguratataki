import React, { Component } from 'react';
import "./mogura.css";
import mogura from './image/mogura2.png';
import shibafu from './image/shibafu.png';
import hit from './image/hit_mogura.png';
import clickImg from './image/hammer2.png';
import hammer from './image/hammer.png';
import MadeDialog from './dialog'

export interface Props {
    location?: string;
    StartFlg?: boolean;
    timer?: number;
    result?:number;
    popupstate?:boolean;
}
const TIMER:number = 30;

export default class Mogratataki extends Component<Props, 
    {location: string, StartFlg: boolean, timer: number, result: number, popupstate: boolean}>  {

    intervalId: NodeJS.Timer | null;
    

    constructor (props:Props) {
        super(props);
        this.state = {
            'location':"Mas1",
            'StartFlg':false,
            'timer':TIMER,
            'result':0,
            'popupstate':false,
        };
        this.intervalId = null;
    }

    onClick = (id:string) => {
        if(this.intervalId){
            let element:HTMLTableElement = document.getElementById("tables") as HTMLTableElement;
            element.style.cursor = "url("+ clickImg + "),auto";
            const {location} = this.state;
    
            if(location === id){
                let img = document.getElementById(id) as HTMLImageElement;
                img.src = hit;
                this.setState({result:this.state.result+1});
            }
            setTimeout(
                function () {
                  element.style.cursor = "url("+ hammer + "),auto";
                }, 100);
        }
    }
    
    rand_MoguraUp = () =>{
        const {location} = this.state;

        let img:HTMLImageElement = document.getElementById(location) as HTMLImageElement;
        img.src = shibafu;

        let a:Number = Number(Math.floor( Math.random() * 25))+1 ;

        const IdNum = "Mas" + a;
        this.setState({
            location:IdNum
        })

        let Next_img = document.getElementById(IdNum) as HTMLImageElement;
        Next_img.src = mogura;
    }

    ClickStart = () =>{
        const {StartFlg} = this.state;
        let Flg:boolean = StartFlg;
        if(StartFlg === false){
            this.intervalId = setInterval(()=>{
                this.rand_MoguraUp();
                this.setState({timer:this.state.timer-1});
            }, 1000);
            let buf  = document.getElementById("StButton");
            buf?.setAttribute("disabled", "disabled");
            
            let timeCircle:HTMLElement | null = document.getElementById("circle");
            if(timeCircle != null){ timeCircle.className = "circle-start"; }
            
            setTimeout(()=>{
                this.finish_mogura();
            },30010);
            Flg = true;
        }
        this.setState({StartFlg:Flg});
    }

    finish_mogura = () =>{
        if(this.intervalId){
            clearInterval(this.intervalId);
        }
        let buf: HTMLElement | null = document.getElementById("StButton");
        buf?.removeAttribute("disabled");

        this.intervalId = null;
        this.setState({StartFlg:false});
        this.setState({popupstate:true});
        this.setState({timer:TIMER});
    }
    
    MakeMap = () =>{
        let List = [];
        for(let i=1;i<=5;i++){
            let buf = [];
            for(let j:number = 1;j<=5;j++){
                let num:number = j + (i-1)*5;
                let str:string = "Mas"+num;
                // 列追加
                buf.push(
                    <td><img id={str} src={shibafu} alt="green" onClick={this.onClick.bind(this,str)} /></td>
                );

                let element: HTMLElement | null = document.getElementById(str);
                if(element != null){
                    element.ondragstart = function (){
                        return false;
                    };
                }
            }
            // 行追加
            List.push(<tr>{buf}</tr>);
        }
        return List;        
    }

    updateState = (state:boolean)=>{
        console.log("call back function call");
        this.setState({popupstate:state});
    }

    OpenDialog = () =>{
        const {popupstate} = this.state;
        const{result} = this.state;
        let Msg:string = "score is " + result;
        if(popupstate === true){
            return <MadeDialog closeState={this.updateState.bind(this)} showMsg = {Msg}></MadeDialog>
        }else{
            return <p></p>
        }
    }

    render() {
        return (
        <div className="divCenter">
            <div className="title">
                <u>モグラたたきゲーム</u>
                <input type="button" id="StButton"　className="StButton" value="スタート" onClick={this.ClickStart}></input>
            </div>
            {this.OpenDialog()}
            <div className="mapArea">
                <table id="tables">
                    <tbody>
                        {this.MakeMap()}
                    </tbody>
                </table>

                <div className="subInfo">
                    <div id = "circle" className="circle-stop">
                        <div className='circle-inner'>
                            {this.state.timer}秒
                        </div>
                    </div>
                    <br />
                    スコア:{this.state.result}
                </div>
            </div>
        </div>);
    }
}