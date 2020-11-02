import React from 'react';

const BgRadio = ({imageUrls}) => {
    
    return (
        <div className="roomBgSelect">
            {imageUrls.map((path, index)=>{
                if(index===0) {
                    return (
                        <label key={index} className="label">
                            <input 
                                type="radio"
                                name="roombgImg"
                                className="roomRadio"
                                defaultChecked
                            ></input>
                            <picture className="roombgBlock">
                                <img alt="" className="roombgImg" src={path}></img>
                            </picture>
                            <div className="roomCicle"></div>
                        </label>
                    )
                } else {
                    return (
                        <label key={index} className="label">
                            <input type="radio" name="roombgImg" className="roomRadio"></input>
                            <picture className="roombgBlock">
                                <img alt="" className="roombgImg" src={path}></img>
                            </picture>
                            <div className="roomCicle"></div>
                        </label>
                    )
                }
            })}
        </div>
    )
}

export default BgRadio;