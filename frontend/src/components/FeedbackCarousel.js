// src/components/FeedbackCarousel.js
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Star } from "lucide-react"; // já usa lucide no projeto
import { listarFeedbacks } from "../services/feedbackService";
import "../styles/feedback.css"; // CSS da seção
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FeedbackCarousel = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    listarFeedbacks()
      .then((r) => setFeedbacks(r.data.feedbacks))
      .catch(console.error);
  }, []);

  // Config slick
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 3, // sempre tenta mostrar 3
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="secao-feedbacks" id="feedbacks">
      <h2>O que dizem sobre nós</h2>

      {feedbacks.length === 0 ? (
        <p>Carregando feedbacks...</p>
      ) : (
        <Slider {...settings} className="slider-feedbacks">
          {feedbacks.map(({ id, nome, texto, estrelas }) => (
            <div className="card-feedback" key={id}>
              <div className="cabecalho-feedback">
                <h3>{nome}</h3>
                <div className="estrelas">
                  {Array.from({ length: estrelas }).map((_, i) => (
                    <Star key={i} size={18} strokeWidth={1.5} fill="#ffd700" />
                  ))}
                </div>
              </div>
              <p className="texto-feedback">“{texto}”</p>
            </div>
          ))}
        </Slider>
      )}
    </section>
  );
};

export default FeedbackCarousel;
