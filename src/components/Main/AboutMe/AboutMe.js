import "./AboutMe.css";
import foto from "../../../images/about_me_foto.jpeg";

function AboutMe() {
    return (
        <section className="about-me section" id="about-me">
            <h2 className="about-project__title section__title">Студент</h2>
            <div className="about-me__info">
                <div className="about-me__description">
                    <p className="about-me__name">Роман</p>
                    <p className="about-me__profession">Фронтенд-разработчик, 28 лет</p>
                    <p className="about-me__text">
                        Родился и вырос в маленьком городке Кумертау, Республика Башкортостан. На данный момент проживаю в Оренбурге. В 2018 году закончил медицинский колледж по специальности "Лечебное дело".
                        Проработав на скорой помощи, понял, что нужно что-то менять в жизни. Так пришел к своей юношеской мечте - веб-разработке.
                        На данный момент работаю в компании Ozon - специалистом по поддержке партнеров. Хочу поскорее дописать диплом и приступить к поиску работы в направлении веб-разработчик, так как у меня есть огромное желание развиваться в этой специальности.
                    </p>
                    <ul className="about-me__list">
                        <li>
                            <a className="about-me__link" href="https://t.me/abramhard" target="_blank" rel="noreferrer">Telegram</a>
                        </li>
                        <li>
                            <a className="about-me__link" href="https://github.com/abramhard" target="_blank" rel="noreferrer">Github</a>
                        </li>
                    </ul>
                </div>
                <img className="about-me__foto" src={foto} alt="Аватар" />
            </div>
        </section>
    );
}

export default AboutMe;