import React, { Component } from 'react';
import "./mogura.css";
import mogura from './image/mogura2.png';
import shibafu from './image/shibafu.png';
import hit from './image/hit_mogura.png';
import clickImg from './image/hammer2.png';
import hammer from './image/hammer.png';
import ngImg from './image/numa_hamaru_woman.png';
import batuMark from './image/mark_batsu.png';
import MadeDialog from './dialog'
import LevelSet from './LevelSet'

type AppearSt = {
    image: string;
    type:number;
}

export interface Props {
    location?: string;
    StartFlg?: boolean;
    timer?: number;
    result?:number;
    popupstate?:boolean;
    clickCount?:number;
    freqClock?:number;
    levelState?:boolean;
}
const TIMER:number = 30;

export default class Mogratataki extends Component<Props, 
    {location: string, StartFlg: boolean, timer: number, 
        result: number, popupstate: boolean, clickCount:number, freqClock:number, levelState:boolean}>  {

    intervalId: NodeJS.Timer | null;
    intervalId2: NodeJS.Timer | null;
    m_appearSt:AppearSt;
    isClicked: boolean;
    Lv:number;
    
    constructor (props:Props) {
        super(props);
        this.state = {
            'location':"Mas1",
            'StartFlg':false,
            'timer':TIMER,
            'result':0,
            'popupstate':false,
            'clickCount':0,
            'freqClock':1000,
            'levelState':false,
        };
        this.intervalId = null;
        this.intervalId2 = null;
        this.m_appearSt = {image:"",type:0};
        this.isClicked = false;
        this.Lv = 1;
    }

    onClick = (id:string) => {
        if(this.intervalId){
            let element:HTMLTableElement = document.getElementById("tables") as HTMLTableElement;
            element.style.cursor = "url("+ clickImg + "),auto";
            const {location} = this.state;

            if(location === id){
                let img = document.getElementById(id) as HTMLImageElement;
                this.isClicked = true;
                if(this.m_appearSt.type === 0){
                    img.src = hit;
                    const {clickCount} = this.state;
                    let point: number = clickCount*10;
                    if(clickCount === 0){
                        point += 1;
                    }
                    
                    this.setState({result:this.state.result+point});
                    this.setState({clickCount:this.state.clickCount + 1});   
                }else{
                    img.src = batuMark;
                    this.setState({result:this.state.result - 10});
                    this.setState({clickCount:0});                 
                }
            }
            setTimeout(
                function () {
                  element.style.cursor = "url("+ hammer + "),auto";
                }, 100);
        }
    }
    
    rand_MoguraUp = () =>{
        const {location} = this.state;

        if(this.isClicked === false && this.m_appearSt.type === 0){
            this.setState({clickCount:0});
        }
        this.isClicked = false;

        let img:HTMLImageElement = document.getElementById(location) as HTMLImageElement;
        img.src = shibafu;

        let a:Number = Number(Math.floor( Math.random() * 25))+1 ;

        const IdNum = "Mas" + a;
        this.setState({
            location:IdNum
        })

        let Next_img = document.getElementById(IdNum) as HTMLImageElement;

        let b:Number = Number(Math.floor( Math.random() * 10));
        if(b > 2){   
            this.m_appearSt.image = mogura;
            this.m_appearSt.type = 0;
        }else{
            this.m_appearSt.image = ngImg;
            this.m_appearSt.type = 1;
        }
        Next_img.src = this.m_appearSt.image;
    }

    ClickStart = () =>{
        this.setState({result:0});

        const {StartFlg} = this.state;
        
        let Flg:boolean = StartFlg;
        if(StartFlg === false){
            this.intervalId = setInterval(()=>{
                this.rand_MoguraUp();
            }, this.state.freqClock);

            this.intervalId2 = setInterval(()=>{
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
        if(this.intervalId2){
            clearInterval(this.intervalId2);
        }
        
        let buf: HTMLElement | null = document.getElementById("StButton");
        buf?.removeAttribute("disabled");

        this.intervalId = null;
        this.setState({StartFlg:false});
        this.setState({popupstate:true});
        this.setState({timer:TIMER});

        let timeCircle:HTMLElement | null = document.getElementById("circle");
        if(timeCircle != null){ timeCircle.className = "circle-stop "; }
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

    updateLevel = (state:number) =>{
        console.log("call back Level function call");
        this.setState({levelState:false});
        let clock = 1000;
        if(state === 0){
            clock = 500;
        }else if(state === 1){
            clock = 1000;
        }else{
            clock = 1500;
        }
        this.Lv = state;
        this.setState({freqClock:clock});
    }

    OpenLevelDialog = () =>{
        const {levelState} = this.state;
        const{result} = this.state;
        let Msg:string = "score is " + result;
        if(levelState === true){
            return <LevelSet level={this.updateLevel.bind(this)} initlevel={this.Lv} showMsg = {Msg}></LevelSet>
        }else{
            return <p></p>
        }
    }

    ClickLevelDialog = () =>{
        this.setState({levelState:true});
    }

    render() {
        return (
        <div className="divCenter">
            <div className="title">
                <u>モグラたたきゲーム</u>
                <input type="button" id="StButton"　className="StButton" value="スタート" onClick={this.ClickStart}></input>
                <input type="button" id="LvButton"　className="LvButton" value="難易度設定" onClick={this.ClickLevelDialog}></input>
            </div>
            {this.OpenDialog()}
            {this.OpenLevelDialog()}
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