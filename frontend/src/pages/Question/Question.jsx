import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './Question.module.css';
import apiService from '../../api';

function Question() {
  const [selected, setSelected] = useState(null);
  const [question, setQuestion] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response1 = await apiService.FetchQuestion();
      setReviews(response1);
    }
    fetchData();
  }, [])

  const data = [
    {
      title: 'In elementum est a ante sodales iaculis.',
      content:
        'Morbi porttitor ligula in nunc varius sagittis. Proin dui nisi, laoreet ut tempor ac, cursus vitae eros. Cras quis ultricies elit. Proin ac lectus arcu. Maecenas aliquet vel tellus at accumsan. Donec a eros non massa vulputate ornare. Vivamus ornare commodo ante, at commodo felis congue vitae.',
    },
    {
      title: 'Etiam lobortis massa eu nibh tempor elementum.',
      content: 'hhh',
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

  const toggle = (i) => {
    if (selected === i)
      return setSelected(null)
    setSelected(i)
  };

  return (
    <div className={styles.container}>
      {/* <Header /> */}
      <div className={styles.Wrapper}>
        <div className={styles.LeftCol}>
          <div className={styles.Text}>Welcome, Let’s Talk About Our Ecobazar</div>

          <div className={styles.accordion}>
            {data.map((item, i) => (
              <div className={`${styles.item} ${selected === i ? styles.active : ''}`} key={i}>
                <div className={styles.ItemHeader} onClick={() => toggle(i)}>
                  <div className={styles.ItemTitle}>{item.title}</div>
                  <span className={styles.Icon}>{selected === i ? '-' : '+'}</span>
                </div>
                <div className={styles.Content}>{item.content}</div>
              </div>
            ))}
          </div>


        </div>
        <div className={styles.RightCol}>
          <img src="src/assets/images/ContactImage.png" alt="img" />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Question;