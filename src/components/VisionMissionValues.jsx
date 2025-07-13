const VisionMissionValues = () => {
  return (
  <>    
    <h2 className="vmv-title">Nuestra Identidad</h2>
    <p className="vmv-description">Explora nuestra razón de ser, la visión que nos impulsa hacia el futuro y los valores que compartimos día a día.</p>
    <section className="vmv-section">
      <div className="vmv-card">
        <div className="vmv-bg mission"></div>
        <div className="vmv-content">
          <div className="vmv-icon">🤝</div>
          <h3>Misión</h3>
          <p>
            Promover el deporte como herramienta de inclusión, educación y desarrollo personal en un entorno seguro y accesible.
          </p>
        </div>
      </div>
      <div className="vmv-card">
        <div className="vmv-bg vision"></div>
        <div className="vmv-content">
          <div className="vmv-icon">🎯</div>
          <h3>Visión</h3>
          <p>
            Ser un referente regional en formación deportiva y social, acompañando a las personas en su crecimiento integral.
          </p>
        </div>
      </div>
      <div className="vmv-card">
        <div className="vmv-bg values"></div>
        <div className="vmv-content">
          <div className="vmv-icon">💙</div>
          <h3>Valores</h3>
          <p>
            Nos guiamos por la empatía, el esfuerzo compartido, el respeto mutuo y el orgullo de pertenecer a nuestra comunidad.
          </p>
        </div>
      </div>
    </section>
</>
  );
};
export default VisionMissionValues;