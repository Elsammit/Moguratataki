import React from 'react';
import "./StartCount.css";

export interface Props {
    closeState?:any;
    initCount?:number;
}

export default class StartCount extends React.Component<Props, {status: number, closeState: any}> {
    constructor (props:Props) {
        super(props);
        this.state = {
            'status':Number(this.props.initCount),
            'closeState':true,
        };
        //this.Counting = this.Counting.bind(this);
        this.Counting();
    }

    componentDidMount = () => {
        window.onload =() => {
           this.Counting();
         };
     }

     CloseDialog = () => {
        this.props.closeState(false);
    }

    Counting = () => {
        setInterval(()=>{
            const {status} = this.state;
            this.setState({status:status - 1});
        }, 1000);
    }

    DoThreeCount = () =>{
        let timeCircle:HTMLElement | null = document.getElementById("st-circle");
        timeCircle?.classList.remove("st-circle-start");
        timeCircle?.classList.add("st-circle-start");
        const {status} = this.state;
        let tags:any = <p></p>;
        if(status > 0){
            tags = this.CountStart(status);
        }else if(status === 0){
            tags = this.StartState();
        }else{
            this.setState({status:3});
            this.CloseDialog();
        }
        return(tags);
    }

    CountStart = (timerNum:number) =>{
        return(
        <div id = "st-circle" className="st-circle-start">
            <div className='st-circle-inner'>
                {timerNum}秒
            </div>
        </div>);
    }

    StartState = () => {
        return(
            <div>Start</div>
        );
    }

    render() {
        return (
        <div>
            <div className="overlay">
                <div className="Startcontent">
                    {this.DoThreeCount()}
                </div>                
            </div>
        </div>
    )}
}