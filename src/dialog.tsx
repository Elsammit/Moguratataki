import React from 'react';
import "./dialog.css";

export interface Props {
    closeState?:any;
    showMsg?:string;
}

export default class MadeDialog extends React.Component<Props> {
    OpenDialog = () => {
        this.setState({
            showDialg:true,
        });
    }

    CloseDialog = () => {
        this.setState({
            showDialg:false,
        });
        this.props.closeState(false);
    }

    render() {
        return (
        <div>
            <div className="overlay">   
                <div className="content">
                    <p className='finsMsg'>"Game Finish!!"</p>
                    <p className='finsMsg'>{this.props.showMsg}</p>
                    <p><button className='closeBtn' onClick={this.CloseDialog}>close</button></p>
                </div>
            </div>
        </div>
    )}
}