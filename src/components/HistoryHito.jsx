import React from "react";

const HistoryHito = ({ 
  title, 
  date, 
  description, 
  subsections = [] // array de { img, alt, title, shortDesc }
}) => {
  return (
    <section className="history-hito">
      <h3>{title} <span className="hito-date">{date}</span></h3>
      <p className="hito-description">{description}</p>

      <div className="hito-subsections">
        {subsections.map(({ img, alt, title, shortDesc }, i) => (
          <div className="hito-subsection" key={i}>
            <img src={img} alt={alt} />
            <h4>{title}</h4>
            <p>{shortDesc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HistoryHito;
