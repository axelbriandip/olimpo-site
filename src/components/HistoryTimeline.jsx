import React from 'react';

const HistoryTimeline = ({ events }) => {
  return (
    <section className="timeline-container">
      <div className="timeline">
        {events.map((event, i) => (
          <article key={event.id || i} className="timeline-event"> {/* Usar event.id para key si existe, si no, i */}
            <div className="timeline-marker">
              <span className="timeline-number">{i + 1}</span>
              <div className="timeline-line"></div>
            </div>
            <div className="timeline-content">
              <h3 className="event-title">{event.title}</h3>
              <time className="event-date">{event.date}</time>
              <p className="event.description">{event.description}</p>
              {event.subsections && event.subsections.length > 0 && ( // Verificar si hay subsecciones y si tiene elementos
                <div className="event-subsections">
                  {event.subsections.map((sub, idx) => (
                    <div key={sub.id || idx} className="subsection"> {/* Usar sub.id para key si existe, si no, idx */}
                      <img src={sub.img} alt={sub.title} />
                      <div>
                        <h4>{sub.title}</h4>
                        <p>{sub.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
        {/* Este artículo de "Y lo mejor está por venir" se mantiene fijo al final */}
        <article className="timeline-event timeline-continues">
          <div className="timeline-marker">
            <span className="timeline-number">...</span>
          </div>
          <div className="timeline-content">
            <h3 className="event-title">Y lo mejor está por venir</h3>
            <p className="event-description">
              Próximamente, más hitos y recuerdos que forman nuestra identidad.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default HistoryTimeline;