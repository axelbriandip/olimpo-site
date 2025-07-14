import { Link } from "react-router-dom";

const NoticeCard = ({ notice }) => {
  const { title, summary, date, category, image, id } = notice;

  return (
    <div className="notice-card">
      <img src={image} alt={title} className="notice-image" />
      <div className="notice-content">
        <h3 className="notice-title">{title}</h3>
        <p className="notice-summary">{summary}</p>
        <p className="notice-date">{date}</p>
        <div className="notice-categories">
          {category.map((cat, index) => (
            <span key={index} className="notice-category">{cat}</span>
          ))}
        </div>
        <Link to={`/notices/${id}`}>
          {/* <button className="text-sm bg-blue-900 text-white px-3 py-1 rounded mt-2">Ver más</button> */}
          <button className="notice-button">Ver más</button>
        </Link>
      </div>
    </div>
  );
};

export default NoticeCard;
