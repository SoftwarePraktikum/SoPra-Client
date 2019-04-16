import React from "react";
import "./field.css";
import styled from "styled-components";
import fig_pl1 from "../../views/images/figure_player1.png";



class Field extends React.Component {
    constructor(){
        super();
        this.state = {
            isSelected: false
        };
    }

    render() {
        if (!this.state.isSelected) {
            return (
                <div onClick={() => this.setState({isSelected: true})} className={"Field"}>
                </div>
            );
        }else {
            return (
                <div onClick={() => this.setState({isSelected: true})} className={"Field"}>
                    <img src={fig_pl1}/>
                </div>
            );
        }
    }

}
export default Field;