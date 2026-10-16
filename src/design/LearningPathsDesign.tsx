import { bindDesign,type DesignOverrides } from "./bindDesign";
const imgCardImage = "/assets/optimized-77388f121e76f3222578.webp";
const imgCardImage1 = "/assets/optimized-f0e299d491fcc7341202.webp";
const imgCardImage2 = "/assets/optimized-db2a2c59debeeb30f9a9.webp";
const imgCardImage3 = "/assets/optimized-cc192c1a00d673a3b03f.webp";
const imgChatGptImage23202616224911 = "/assets/optimized-5d4e9afa022ad4409767.webp";

export default function LearningPathsDesign({ overrides = {} }: { overrides?: DesignOverrides }) {
  return bindDesign(
    <div className="d211" data-node-id="2351:2467" data-name="3">
      <div className="d447" data-node-id="2351:2468">
        <div className="d448" data-node-id="2351:2469">
          <p className="d449" data-node-id="2351:2470">
            ОСВІТНІ ПРОГРАМИ
          </p>
          <p className="d450" data-node-id="2351:2471">
            Що ви хочете опанувати?
          </p>
          <p className="d451" data-node-id="2351:2472">
            Оберіть формат навчання, який відповідає вашим цілям і рівню підготовки.
          </p>
          <div className="d452" data-node-id="2351:2473">
            <div className="d453" data-node-id="2351:2474" data-name="Learning Path / Courses">
              <div className="d56" data-node-id="2351:2475" data-name="Card / Image">
                <img alt="" className="d57" src={imgCardImage} />
              </div>
              <p className="d454" data-node-id="2351:2476">
                Курси
              </p>
              <div className="d59" data-node-id="2351:2477">
                <p className="d60">Повноцінні програми</p>
                <p className="d61">від основ до авторських тортів</p>
              </div>
              <p className="d62" data-node-id="2351:2478">{`Дивитися курси  →`}</p>
            </div>
            <div className="d455" data-node-id="2351:2479" data-name="Learning Path / Lessons and minicourses">
              <div className="d65" data-node-id="2351:2480" data-name="Card / Image">
                <div className="d70">
                  <img alt="" className="d456" src={imgCardImage1} />
                </div>
              </div>
              <p className="d457" data-node-id="2351:2481">
                Мінікурси, та окремі уроки
              </p>
              <p className="d67" data-node-id="2351:2482">{`Дивитися уроки  →`}</p>
              <p className="d68" data-node-id="2351:2483">
                Короткі уроки для швидкого опанування окремих технік і рецептів
              </p>
            </div>
            <div className="d455" data-node-id="2351:2484" data-name="Learning Path / Technology cards">
              <div className="d69" data-node-id="2351:2485" data-name="Card / Image">
                <img alt="" className="d57" src={imgCardImage2} />
              </div>
              <p className="d458" data-node-id="2351:2486">
                Техкарти
              </p>
              <p className="d73" data-node-id="2351:2487">
                Точні рецептури та зрозуміла технологія приготування.
              </p>
              <p className="d67" data-node-id="2351:2488">{`Дивитися уроки  →`}</p>
            </div>
            <div className="d455" data-node-id="2351:2489" data-name="Learning Path / Consultation">
              <div className="d56" data-node-id="2351:2490" data-name="Card / Image">
                <div className="d70">
                  <img alt="" className="d459" src={imgCardImage3} />
                </div>
              </div>
              <p className="d458" data-node-id="2351:2491">
                Консультація
              </p>
              <p className="d74" data-node-id="2351:2492">
                Особиста консультація з Яніною та розбір ваших запитів
              </p>
              <p className="d75" data-node-id="2351:2493">{`Замовити консультацію  →`}</p>
              <p className="d67" data-node-id="2351:2494">{`Дивитися уроки  →`}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="d460" data-node-id="2351:2495">
        <div className="d461">
          <div className="d462" data-name="ChatGPT Image 23 авг. 2026 г., 16_22_49(1) 1">
            <img alt="" className="d43" src={imgChatGptImage23202616224911} />
          </div>
        </div>
      </div>
    </div>
  , overrides);
}

