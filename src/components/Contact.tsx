import React from 'react';
import "../styles/_contact.scss"
import { useState } from 'react';

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

    const [formData, setFormData] = useState<FormData>({senderEmail:'', message: ''})

    return (
        <section id="contact" className="contact-section">
            <h1>Contact me</h1>
            <p className="contact-description">
                Please contact me directly at{" "}
                <a className='email-link' href="mailto:josuejero@hotmail.com">
                    josuejero@hotmail.com
                </a>
                {" "} or through this form.
            </p>

            <form className='contact-form'>
                <input
                    className='input-field'
                    name="senderEmail"
                    type="email"
                    required
                    maxLength={500}
                    placeholder='Your email'
                />
            </form>
        </section>
    )
};

export default Contact;
