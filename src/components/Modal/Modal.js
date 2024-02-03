import './Modal.scss'
import React, { useState } from 'react';

const Modal = ({show, setModalShow, confirmAction, leaveAction, accept, refused, title, description, cookieModal, modalBg }) => {

    return (
        <div className={`modalBg  ${show ? 'modal_visible' : 'modal_hidden'}`} onClick={() => { setModalShow(false); leaveAction(); }}>
            <div className={`modal_container  ${cookieModal ? 'cookie_modal' : ''}`}>
                {title &&
                    <h3>{title}</h3>
                }
                {description &&
                    <p>{description}</p>
                }
                {(accept || refused) &&
                    <div className='btn_actions'>
                        {(accept) &&
                            <div className='modal_button buttonAgree' onClick={() => { confirmAction(); setModalShow(false); }}>{accept}</div>
                        }
                        {(refused) &&
                            <div className='modal_button buttonDisagree' onClick={() => { setModalShow(false); leaveAction(); }}>{refused}</div>
                        }
                    </div>
                }
            </div>
        </div>
    );
};

export default Modal;