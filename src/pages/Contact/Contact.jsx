import React, { useState } from 'react';
import styles from './Contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    subject: '',
    email: '',
    body: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Fullt navn må være minst 3 tegn';
    }
    if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Emne må være minst 3 tegn';
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Epost er ugyldig';
    }
    if (formData.body.trim().length < 3) {
      newErrors.body = 'Melding må være minst 3 tegn';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    console.log(formData);
    setFormData({ fullName: '', subject: '', email: '', body: '' });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Kontakt</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="fullName" className={styles.label}>
            Fullt navn:
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={styles.input}
            required
            minLength="3"
          />
          {errors.fullName && <p className={styles.error}>{errors.fullName}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="subject" className={styles.label}>
            Emne:
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={styles.input}
            required
            minLength="3"
          />
          {errors.subject && <p className={styles.error}>{errors.subject}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Epost:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            required
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="body" className={styles.label}>
            Melding:
          </label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            className={styles.textarea}
            required
            minLength="3"
          ></textarea>
          {errors.body && <p className={styles.error}>{errors.body}</p>}
        </div>
        <button type="submit" className={styles.btn}>
          Send
        </button>
      </form>
    </div>
  );
};

export default Contact;
