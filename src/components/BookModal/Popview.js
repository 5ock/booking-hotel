import React from 'react';
import './BookModal.scss'

// icon
import Success from '../../assets/icons/success.svg'
import Error from '../../assets/icons/error.svg'

const Popview = ({status, sentences, toggleModal}) => {
    const title = (status === 'Loading') ? '請稍後' : (status === 'Success') ? '預約成功' : '預約失敗';
    const statusIcon = () => {
        if(status === 'Success') return <img src={Success} alt="" />
        if(status === 'Error') return <img src={Error} alt="" />
        return (<>
            <div className='popviewcircle popviewcircleOne' />
            <div className='popviewcircle popviewcircleTwo' />
            <div className='popviewcircle popviewcircleThree' />
        </>)
    }
    return (
        <div className="bookModalBg">
            <div className="popviewContainer">
                {status !== 'Loading' && <div onClick={toggleModal} className="closeWhiteButton"></div>}
                <div className="popviewIcon">{statusIcon()}</div>
                <h2 className='popviewTitle'>{title}</h2>
                <div className="sentenceContainer">
                    {
                        sentences.length > 0 && sentences.map((sentence)=>{
                            return <p className="text" key={sentence}>{sentence}</p>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Popview;