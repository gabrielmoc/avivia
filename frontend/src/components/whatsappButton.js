import React, { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import './whatsappButton.css';

const WhatsAppButton = () => {
  const [margemBottom, setMargemBottom] = useState(40); // margem inicial

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight;
      const footer = document.querySelector('footer');
      if (!footer) return;

      const footerTop = footer.getBoundingClientRect().top + window.scrollY;
      const overlap = scrollY > footerTop;

      setMargemBottom(overlap ? (scrollY - footerTop) + 40 : 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <a
      href="https://api.whatsapp.com/message/RWOGXBD4ZXASP1?autoload=1&app_absent=0"
      className="whatsapp-float"
      style={{ bottom: `${margemBottom}px` }}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Converse conosco no WhatsApp"
    >
      <FaWhatsapp className="whatsapp-icon" />
    </a>
  );
};

export default WhatsAppButton;
