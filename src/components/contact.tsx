"use client";

import React from 'react';
import Image from 'next/image';
import styles from '@/app/styles/Contact.module.scss';

const Contact: React.FC = () => {
  return (
    <div className={styles.contact}>
      <div className={styles.section}>
        <h2>Contact Me</h2>
        <p>If you have any questions or just want to say hello, feel free to reach out to me using the form below or through my social media profiles.</p>
        <form className={styles.contactForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={5} required></textarea>
          </div>
          <button type="submit" className={styles.submitButton}>Send Message</button>
        </form>
        <div className={styles.socialLinks}>
          <h3>Connect with me</h3>
          <div className={styles.icons}>
            <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer">
              <Image src="/github.svg" alt="GitHub" width={40} height={40} className={styles.icon} />
            </a>
            <a href="https://www.linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">
              <Image src="/linkedin.svg" alt="LinkedIn" width={40} height={40} className={styles.icon} />
            </a>
            <a href="https://twitter.com/your-username" target="_blank" rel="noopener noreferrer">
              <Image src="/twitter.svg" alt="Twitter" width={40} height={40} className={styles.icon} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
