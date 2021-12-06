import React from 'react';
import "./LevelSet.css";

export interface Props {
    closeState?:any;
    showMsg?:string;
    level?:any;
    initlevel?:any;
    radio?:number;
}

const ISCANCEL:number = 0;
const ISDECISION:number = 1;
const ISHARD:number = 0;
const ISNORMAL:number = 1;
const ISEASY:number = 2;

export default class LevelSet extends React.Component<Props, {radio: number}> {
    constructor (props:Props) {
        super(props);
        this.state = {
            'radio':this.props.initlevel,
        };
    }

    getLevel = (type:number) => {
        if(type === ISDECISION){
            const {radio} = this.state;
            console.log("radio:" + radio);
            this.props.level(radio);
        }else{
            this.props.level(this.props.initlevel);
        }
    }

    render() {
        return (
        <div>
            <div className="overlay">   
                <div className="content">
                    <p className='finsMsg'>難易度設定</p>
                    <div className="listbox">
                        <input type="radio" id="high" name="level" checked={this.state.radio === 0}
                            onChange={() => this.setState({radio:ISHARD})}/>
                        <label htmlFor="high">難しい</label>
                        <input type="radio" id="middle" name="level" checked={this.state.radio === 1}
                            onChange={() => this.setState({radio:ISNORMAL})}/>
                        <label htmlFor="middle">普通</label>
                        <input type="radio" id="low" name="level" checked={this.state.radio === 2}
                            onChange={() => this.setState({radio:ISEASY})}/>
                        <label htmlFor="low">易しい</label>
                    </div>
                    <p>
                        <button className='closeBtn' onClick={this.getLevel.bind(this,ISDECISION)}>決定</button>
                        <button className='closeBtn' onClick={this.getLevel.bind(this,ISCANCEL)}>キャンセル</button>
                    </p>
                
                </div>
            </div>
        </div>
    )}
}