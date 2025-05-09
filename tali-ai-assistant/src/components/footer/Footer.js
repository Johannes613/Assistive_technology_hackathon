import React from 'react'
import "./Footer.css"
import logo from "../../images/10039.svg"

export default function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="row pt-2 ">
        <div className="col-sm-6 col-md-4 col-lg-3 text-center text-sm-start d-flex flex-column gap-2 mt-3 justify-content-center ">
          <div className="cont align-self-center mx-auto">
          <img className='footer-logo mt-4' src={logo} alt="" />
          <p className='lower-text'>Lorem ipsum dolor sit ar adipisicing elit.olestias animi ex aliquid saepe illum cum plorem Lorem ipsum dolor sit amet consectetur.</p>

          </div>
         
        </div>
        <div className="col-sm-6 col-md-4 col-lg-3 text-center text-sm-start mt-3 align-items-center text-start d-flex flex-column gap-2  justify-content-center ">
          <div className="cont  align-self-center">
          <h4 className='mb-2 fw-semibold'>Company</h4>
          <p className='fw-medium'>Linked In</p>
          <p className='fw-medium'>Instagram</p>
          <p className='fw-medium'>Facebook</p>
          <p className='fw-medium'>Telegram</p>
          </div>
          
        </div>
        <div className="col-sm-6 col-md-4 col-lg-3 text-center text-sm-start align-items-center text-start d-flex flex-column gap-2 mt-3  justify-content-center ">
          <div className="cont  align-self-center">
          <h4 className='mb-2 fw-semibold'>Quick Links</h4>
          <p className='fw-medium'>Home</p>
          <p className='fw-medium'>Shopping</p>
          <p className='fw-medium'>Testimonials</p>
          <p className='fw-medium'>Cart</p>
          </div>
          
        </div>
        <div className="col-sm-6 col-md-4 col-lg-3 text-center text-sm-start align-items-center text-start d-flex flex-column gap-2 mt-3 ">
          <div className="cont ps-2 align-self-center mt-4 mt-lg-2">
          <h4 className='mb-2 fw-semibold'>Get In Touch</h4>
          <p  className='m-0 mb-2 p-0 fw-medium'>+971 548723623</p>
          <p className='m-0 p-0 fw-medium'>tali712@gmail.com</p>

          </div>
          
        </div>

        </div>
       
      </div>
        


    </div>
  )
}
