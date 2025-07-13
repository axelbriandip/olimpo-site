import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faQuoteRight } from '@fortawesome/free-solid-svg-icons';



const Testimonials = () => {
  const testimonials = [
    {
      message: "Olimpo nos dio una experiencia increíble este año. Nos sentimos valorados como parte de una gran familia.",
      name: "Camila Fernández",
      role: "Madre de jugador",
    },
    {
      message: "El trabajo con los chicos es impecable. Ser parte del club fue una decisión más que acertada.",
      name: "Lucas Méndez",
      role: "Director Técnico Sub-13",
    },
    {
      message: "Gran organización, respeto y compromiso con los valores del deporte. Muy recomendables.",
      name: "Nicolás Vargas",
      role: "Delegado de otra institución",
    },
  ];

  return (
    <section className="testimonials-modern">
      
      <h2 className="testimonials-title">Testimonios</h2>
      <p className="testimonials-description">Lo que dicen quienes forman parte de nuestra comunidad.</p>
      <div className="testimonials-grid">
        {testimonials.map((testimonial, index) => (
          <div className="testimonial-card-modern" key={index}>
            <FontAwesomeIcon icon={faQuoteRight} className='icon-comment'/>
            {/* <FontAwesomeIcon icon={faComment} className='icon-comment'/> */}
            <p className="testimonial-message">“{testimonial.message}”</p>
            <div className="testimonial-author">
              <span className="testimonial-name">{testimonial.name}</span>
              <span className="testimonial-role">{testimonial.role}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
