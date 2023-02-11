import React, { Component } from 'react';
import './DashBoardCard.css';
const DashBoardCard=(props)=>{
    const{profile,card_title}=props;
    return(
        <>
        <div className='card_mian_wrapper'>
            <div className='image_wrapper'>
                <img src={profile} alt="profile Image"/>
            </div>
            <div className='text_era'>
                <h4>{card_title}</h4>
            </div>
        </div>
        
        </>
    )
}
export default DashBoardCard