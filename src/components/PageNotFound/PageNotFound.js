import "./PageNotFound.css";
import { Link } from "react-router-dom";
function PageNotFound() {
    return (
        <main>
            <section className="page-not-found">
                <p className="page-not-found__number">404</p>
                <p className="page-not-found__text">Страница не найдена</p>
                <Link to="/" className="page-not-found__button">Назад</Link>
            </section>
        </main>
    );
}

export default PageNotFound;