import { useParams } from "react-router-dom";
import newsData from "../data/newsData";

const CategoryNews = () => {
    const { nombre } = useParams();
    const filteredNews = newsData.filter(news =>
        news.category.includes(nombre)
    );

    return (
        <div className="category-news-container">
            <h2 className="category-news-title">
                Noticias de: {nombre}
            </h2>
            {filteredNews.length > 0 ? (
                <ul className="news-list">
                    {filteredNews.map(news => (
                        <li key={news.id}>
                            <a href={`/noticias/${news.id}`} className="news-link">
                                {news.title}
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No se encontraron noticias en esta categoría.</p>
            )}
        </div>
    );
};

export default CategoryNews;
