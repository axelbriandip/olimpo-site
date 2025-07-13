
export default function NoticeCard({ title, date, image, summary, category }) {
  return (
    <div className="news-card">
      <img src={image} alt={title} className="news-image" />
      <div className="news-content">
        <p className="news-date">{new Date(date).toLocaleDateString()}</p>
        <h2 className="news-card-title">{title}</h2>
        <p className="news-summary">{summary}</p>
        <span className="news-category">{category}</span>
      </div>
    </div>
  );
}
