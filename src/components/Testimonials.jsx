// src/components/Testimonials.jsx

import { useEffect } from 'react'; // Importa useEffect para efectos secundarios
import { useDispatch, useSelector } from 'react-redux'; // Importa hooks de Redux para interactuar con el store
import { fetchTestimonials } from '../redux/slices/testimonialSlice'; // Importa la thunk para cargar testimonios
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import '../styles/components/Testimonials.css'; // Asegúrate de que este archivo CSS existe y contiene los estilos

const Testimonials = () => {
  const dispatch = useDispatch();
  // Usa useSelector para extraer el estado relevante del slice de testimonios
  const { testimonials, isLoading, error } = useSelector((state) => state.testimonials);

  useEffect(() => {
    // Despacha la acción asíncrona 'fetchTestimonials' cuando el componente se monta
    // Esto iniciará la petición HTTP a tu backend
    dispatch(fetchTestimonials());
  }, [dispatch]); // La dependencia `dispatch` asegura que el efecto se ejecute solo una vez al montar

  // Manejo de estados de carga, error y sin datos
  if (isLoading) {
    return (
      <section className="testimonials-modern">
        <p>Cargando testimonios...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="testimonials-modern">
        <p>Error al cargar testimonios: {error}</p>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section className="testimonials-modern">
        <p>No hay testimonios disponibles.</p>
      </section>
    );
  }

  // Si hay testimonios, renderízalos
  return (
    <section className="testimonials-modern">
      <h2 className="testimonials-title">Testimonios</h2>
      <p className="testimonials-description">Lo que dicen quienes forman parte de nuestra comunidad.</p>
      <div className="testimonials-grid">
        {testimonials.map((testimonial) => (
          // Usa el ID único del testimonio del backend como `key`
          <div className="testimonial-card-modern" key={testimonial.id}>
            <FontAwesomeIcon icon={faQuoteRight} className='icon-comment' />
            {/* Asegúrate de que los nombres de las propiedades coincidan con tu modelo de backend */}
            <p className="testimonial-message">“{testimonial.text}”</p>
            <div className="testimonial-author">
              <span className="testimonial-name">{testimonial.authorName}</span>
              <span className="testimonial-role">{testimonial.authorRole}</span>
            </div>
            {/* Opcional: Si el testimonio tiene una foto, puedes mostrarla aquí */}
            {/* {testimonial.photo && (
              <img src={testimonial.photo} alt={testimonial.authorName} className="testimonial-photo" />
            )} */}
            {/* Opcional: Si el testimonio tiene un rating, puedes mostrarlo */}
            {/* {testimonial.rating && (
                            <div className="testimonial-rating">
                                {'⭐'.repeat(testimonial.rating)}
                            </div>
                        )} */}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;