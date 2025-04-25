import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './ContactPage.module.css';

function ContactPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  const data = [
    {
      title: 'In elementum est a ante sodales iaculis.',
      content:
        'Morbi porttitor ligula in nunc varius sagittis. Proin dui nisi, laoreet ut tempor ac, cursus vitae eros. Cras quis ultricies elit. Proin ac lectus arcu. Maecenas aliquet vel tellus at accumsan. Donec a eros non massa vulputate ornare. Vivamus ornare commodo ante, at commodo felis congue vitae.',
    },
    {
      title: 'Etiam lobortis massa eu nibh tempor elementum.',
      content: '',
    },
    {
      title: 'In elementum est a ante sodales iaculis.',
      content: '',
    },
    {
      title: 'Aenean quis quam nec lacus semper dignissim.',
      content: '',
    },
    {
      title: 'Nulla tincidunt eros id tempus accumsan.',
      content: '',
    },
  ];

  const toggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div>
      <Header />
      <div className={styles.Wrapper}>
        <div className={styles.LeftCol}>
          <div className={styles.Text}>Welcome, Let’s Talk About Our Ecobazar</div>

          <div className={styles.accordion}>
            {data.map((item, index) => {
              const isOpen = index === activeIndex;
              return (
                <div
                  key={index}
                  className={`${styles.accordionItem} ${isOpen ? styles.active : ''}`}
                >
                  <button
                    className={styles.accordionHeader}
                    onClick={() => toggle(index)}
                  >
                    <span className={styles.title}>{item.title}</span>
                    <span className={styles.icon}>+</span>
                  </button>
                  {isOpen && item.content && (
                    <div className={styles.accordionBody}>
                      {item.content}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.RightCol}>
          <img src="src/assets/images/ContactImage.png" alt="img" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ContactPage;
