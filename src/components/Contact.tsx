import React from 'react';
import "../styles/_contact.scss"
import {FormEvent, useState } from 'react';
import {motion} from "framer-motion"
import {sendEmail} from "@/actions/sendEmail"


interface FormData{
    senderEmail: string
    message: string
}
const Contact: React.FC = () => {
    // return (
    //     <section className="ContactSection">
    //         <h2>Contact Us</h2>
    //         <p>Feel free to get in touch with us.</p>
    //         <form>
    //             <div className="form-group">
    //                 <label htmlFor="name">Name</label>
    //                 <input type="text" id="name" name="name" />
    //             </div>
    //             <div className="form-group">
    //                 <label htmlFor="email">Email</label>
    //                 <input type="email" id="email" name="email" />
    //             </div>
    //             <div className="form-group">
    //                 <label htmlFor="message">Message</label>
    //                 <textarea id="message" name="message" rows={4}></textarea>
    //             </div>
    //             <button type="submit">Submit</button>
    //         </form>
    //     </section>
    // );


    

    return (
        <motion.section className='contact-section' 
        id="contact"
        initial={{
            opacity:0,
        }}
        whileInView={{
            opacity:1,
        }}
        transition={{
            duration:1,
        }}>
            <h1>Contact me</h1>
            <p className='contact-description'>
                Please contact me directly at{" "}
                <a className='contact-link' href='mailto:josuejero@hotmail.com'>
                    josuejero@hotmail.com
                </a>
                {" "} or through this form.
            </p>

            <form 
                className='contact-form'
                action={async (formData) => {
                    await sendEmail(formData)
                }}
            >
                <input
                    className='contact-input' 
                    type='email' 
                    placeholder='Your email'
                    required
                    maxLength={500}
                    name='senderEmail'
                />
                <textarea
                    className='contact-textarea'
                    placeholder='Your message'
                    required
                    maxLength={500}
                    name='message'
                />
                <button type='submit'>
                    Submit{" "}
                </button>
            </form>
        </motion.section>
    )
};

export default Contact;
