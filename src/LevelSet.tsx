import React from 'react';
import "./LevelSet.css";

export interface Props {
    closeState?:any;
    showMsg?:string;
    level?:any;
    initlevel?:any;
    radio?:number;
}

export default class LevelSet extends React.Component<Props, {radio: number}> {
    constructor (props:Props) {
        super(props);
        this.state = {
            'radio':this.props.initlevel,
        };
        
    }

    getLevel = (type:number) => {
        if(type == 1){
            const {radio} = this.state;
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
                            onChange={() => this.setState({radio:0})}/>
                        <label htmlFor="high">難しい</label>
                        <input type="radio" id="middle" name="level" checked={this.state.radio === 1}
                            onChange={() => this.setState({radio:1})}/>
                        <label htmlFor="middle">普通</label>
                        <input type="radio" id="low" name="level" checked={this.state.radio === 2}
                            onChange={() => this.setState({radio:2})}/>
                        <label htmlFor="low">易しい</label>
                    </div>
                    <p>
                        <button className='closeBtn' onClick={this.getLevel.bind(this,1)}>決定</button>
                        <button className='closeBtn' onClick={this.getLevel.bind(this,0)}>キャンセル</button>
                    </p>
                
                </div>
            </div>
        </div>
    )}
}