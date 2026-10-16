import { bindDesign,type DesignOverrides } from "./bindDesign";
const imgChatGptImage18202616314231 = "/assets/optimized-54af21a7c590a61248fe.webp";
const imgAboutPortraitMobile = "/assets/optimized-368af5905f15791692ad.webp";
const imgAboutPortraitMobile1 = "/assets/optimized-b7f99631e274e21cd57a.webp";
const imgQuoteOpeningMark = "/assets/21d95b6c-1470-4534-a24d-534e75adf163.svg";

export default function MobileAboutDesign({ overrides = {} }: { overrides?: DesignOverrides }) {
  return bindDesign(
    <div className="mob22" data-node-id="2351:2997" data-name="04 / Mobile About Yanina">
      <div className="mob45" data-node-id="2351:2998" data-name="ChatGPT Image 18 сент. 2026 г., 16_31_42 (3) 1">
        <div className="m-about-flower-rotation"><img alt="" src={imgChatGptImage18202616314231} /></div>
      </div>
      <div className="mob46" data-node-id="2351:2999">
        <div className="mob47" data-node-id="2351:3000" data-name="About / Portrait / Mobile">
          <div className="mob14">
            <img alt="" className="mob48" src={imgAboutPortraitMobile} />
          </div>
        </div>
        <div className="mob49" data-node-id="2351:3001" data-name="About / Portrait / Mobile">
          <div className="mob14">
            <img alt="" className="mob50" src={imgAboutPortraitMobile1} />
          </div>
        </div>
        <p className="mob51" data-node-id="2351:3002">{`Yanina Korinenko  `}</p>
      </div>
      <p className="mob52" data-node-id="2351:3003">
        ПРО МЕНЕ
      </p>
      <div className="mob53" data-node-id="2351:3004">
        <p className="mob54">Яніна Коріненко</p>
      </div>
      <p className="mob55" data-node-id="2351:3005">Мене звати Яніна Коріненко. Кондитерство почалося для мене з бажання створювати торти, які дивують не лише виглядом, а й смаком. За роки роботи я приготувала сотні тортів для різних подій і добре знаю, скільки запитань виникає між «хочу спробувати» та першим тортом, за який справді не соромно.</p>
      <p className="mob56" data-node-id="2351:3006">Тому я створюю власні рецепти й навчаю так, як колись хотіла б навчатися сама: з чіткими пропорціями, поясненням кожного кроку та увагою до дрібниць, від яких залежить результат. Зараз зі мною навчаються і ті, хто вперше пече бісквіт, і кондитери, які вже працюють із замовленнями. Понад 500 учениць пройшли мої курси, а найбільша радість для мене бачити їхні торти, впевненість і власний почерк.</p>
      <div className="mob59" data-node-id="2351:3007">
        <div className="mob60" data-node-id="2351:3008" data-name="Quote / Opening mark">
          <img alt="" className="mob37" src={imgQuoteOpeningMark} />
        </div>
        <p className="mob61" data-node-id="2351:3010">
          Для мене важливо пояснювати складне просто: давати зрозумілу технологію та знання, які можна впевнено повторити, адаптувати й використовувати у власній роботі.»
        </p>
      </div>
    </div>
  , overrides);
}