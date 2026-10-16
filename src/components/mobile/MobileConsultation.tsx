import { telegram } from '../../data/catalog';
import './mobile-consultation.css';

export function MobileConsultation() {
  return (
    <section
      id="consultation"
      className="section m-consultation"
      aria-labelledby="consultation-title"
    >
      <div className="m-consultation-flower m-consultation-flower-top" aria-hidden="true">
        <img src="/assets/mobile-consultation-floral-top.png" alt="" loading="lazy" />
      </div>
      <div className="m-consultation-flower m-consultation-flower-bottom" aria-hidden="true">
        <img src="/assets/mobile-consultation-floral-bottom.png" alt="" loading="lazy" />
      </div>
      <div className="m-consultation-steps">
        <h2 id="consultation-title">Прості кроки до вашого доступу</h2>
        <p className="m-consultation-description">
          Розберемо ваш запит, знайдемо рішення
          <br />
          та складемо план дій для вашого результату.
        </p>
        <ol>
          {['Оберіть тему', 'Напишіть у Telegram', 'Узгодимо час'].map((label, index) => (
            <li key={label}>
              <span className="m-consultation-number">
                <img src="/assets/mobile-consultation-number.svg" alt="" />
                <span>{index + 1}</span>
              </span>
              <span>{label}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="m-consultation-contact">
        <img
          className="m-consultation-telegram"
          src="/assets/mobile-consultation-telegram.svg"
          alt=""
        />
        <p className="m-consultation-question">
          Є питання?
          <br />
          Напишіть мені у Telegram
        </p>
        <a className="m-consultation-handle" href={telegram} target="_blank" rel="noreferrer">
          @yaninakorinenko
        </a>
        <a className="m-consultation-button" href={telegram} target="_blank" rel="noreferrer">
          Написати
          <img src="/assets/mobile-consultation-arrow.svg" alt="" />
        </a>
      </div>
    </section>
  );
}
