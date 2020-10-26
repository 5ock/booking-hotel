import React, {useState} from 'react';
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
    // const [bgImg, setBgImg] = useState();
    return (
        <div className="bgSelectBlock">
            {bgAry.map((bgAry, index)=>{
                if(index==0) {
                    return (
                        <label key={bgAry.key} className="label">
                            <input 
                                type="radio"
                                name="bgImg"
                                className="radio"
                                defaultChecked
                            ></input>
                            <picture className="bgBlock">
                                <img className="bgImg" src={bgAry.src}></img>
                            </picture>
                            <div className="circle"></div>
                        </label>
                    )
                } else {
                    return (
                        <label key={bgAry.key} className="label">
                            <input type="radio" name="bgImg" className="radio"></input>
                            <picture className="bgBlock">
                                <img className="bgImg" src={bgAry.src}></img>
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