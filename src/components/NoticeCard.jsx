const NoticeCard = ({ notice }) => {
  const { title, summary, date, category, image } = notice;

  return (
    <div className="notice-card">
      <img src={image} alt={title} className="notice-image" />
      <div className="notice-content">
        <h3 className="notice-title">{title}</h3>
        <p className="notice-summary">{summary}</p>
        <p className="notice-date">{date}</p>
        <div className="notice-categories">
          {category.map((cat, index) => (
            <span key={index} className="notice-category">
              {cat}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoticeCard;
