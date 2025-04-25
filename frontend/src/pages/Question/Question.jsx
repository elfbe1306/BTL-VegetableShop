import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './ContactPage.css';

function ContactPage() {
  const [selected, setSelected] = useState(null);

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
    <div>
      <Header />
      <div className='Wrapper'>
        <div className='LeftCol'>
          <div className='Text'>Welcome, Let’s Talk About Our Ecobazar</div>

          <div className='accordion'>
            {data.map((item, i) => (
              <div className={`item ${selected === i ? 'active' : ''}`} key={i}>
                <div className='ItemHeader' onClick={() => toggle(i)}>
                  <div className='ItemTitle'>{item.title}</div>
                  <span className='Icon'>{selected === i ? '-' : '+'}</span>
                </div>
                <div className='Content'>{item.content}</div>
              </div>
            ))}
          </div>


        </div>
        <div className='RightCol'>
          <img src="src/assets/images/ContactImage.png" alt="img" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ContactPage;