import React from 'react';
import "../styles/_contact.scss";
import { motion } from "framer-motion";
import { sendEmail } from "@/actions/sendEmail";

const Contact: React.FC = () => {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        await sendEmail(formData);
    };

    return (
        <motion.section
            className='contact-section'
            id="contact"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
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
                onSubmit={handleSubmit}
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
                    maxLength={5000}
                    name='message'
                />
                <button type='submit'>
                    Submit{" "}
                </button>
            </form>
        </motion.section>
    );
};

export default Contact;
