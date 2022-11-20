import "./AboutProject.css";

function AboutProject() {
    return (
        <section className="about-project section" id='about-project' >
            <h2 className="about-project__title section__title">О проекте</h2>
            <ul className="about-project__info">
                <li>
                    <h3 className="about-project__info-title">Дипломный проект включал 5 этапов</h3>
                    <p className="about-project__info-description">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </li>
                <li>
                    <h3 className="about-project__info-title">На выполнение диплома ушло 5 недель</h3>
                    <p className="about-project__info-description">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </li>
            </ul>
            <ul className="about-project__duration">
                <li>
                    <p className="about-project__duration-week about-project__duration-week_backend">1 неделя</p>
                    <p className="about-project__duration-description">Back-end</p>
                </li>
                <li>
                    <p className="about-project__duration-week">4 недели</p>
                    <p className="about-project__duration-description">Front-end</p>
                </li>
            </ul>
        </section>
    );
}

export default AboutProject;