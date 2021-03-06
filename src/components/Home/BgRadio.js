import React from 'react';
import home_01 from '../../assets/imgs/home_01.jpg';
import home_02 from '../../assets/imgs/home_02.jpg';
import home_03 from '../../assets/imgs/home_03.jpg';
import home_04 from '../../assets/imgs/home_04.jpg';

const bgAry = [
    {key: 'home_01', src: home_01},
    {key: 'home_02', src: home_02},
    {key: 'home_03', src: home_03},
    {key: 'home_04', src: home_04}
]

const BgRadio = () => {
    return (
        <div className="bgSelectBlock">
            {bgAry.map((bgObj, index)=>{
                if(index===0) {
                    return (
                        <label key={bgObj.key} className="label">
                            <input 
                                type="radio"
                                name="bgImg"
                                className="radio"
                                defaultChecked
                            ></input>
                            <picture className="bgBlock">
                                <img alt="" className="bgImg" src={bgObj.src}></img>
                            </picture>
                            <div className="circle"></div>
                        </label>
                    )
                } else {
                    return (
                        <label key={bgObj.key} className="label">
                            <input type="radio" name="bgImg" className="radio"></input>
                            <picture className="bgBlock">
                                <img alt="" className="bgImg" src={bgObj.src}></img>
                            </picture>
                            <div className="circle"></div>
                        </label>
                    )
                }
            })}
        </div>
    )
}

export default BgRadio;