import { bindDesign,type DesignOverrides } from "./bindDesign";
const imgChatGptImage232026203412111 = "/assets/optimized-bce6e6bd14f247f9f49b.webp";
const imgStepIcon = "/assets/d276a0ac-23b4-406e-8fc1-0cf5d8b09627.svg";
const imgStepIcon1 = "/assets/steps-payment-clear.svg";
const imgStepIcon2 = "/assets/2bd9aa98-0f5e-423c-b945-e822d293ace9.svg";
const imgStepIcon3 = "/assets/694d4f38-5fe3-49fb-8966-6512c7fa7c2a.svg";
const imgFrame1000003543 = "/assets/80801bc7-eeee-4cea-807d-5784ae0e15b0.svg";

export default function StepsDesign({ overrides = {} }: { overrides?: DesignOverrides }) {
  return bindDesign(
    <div className="d211" data-node-id="2351:2668" data-name="55">
      <p className="d593" data-node-id="2351:2669">
        ЯК ЦЕ ПРАЦЮЄ
      </p>
      <div className="d594" data-node-id="2351:2670">
        <p className="d595">Від вибору до навчання —</p>
        <p className="d596">кілька простих кроків</p>
      </div>
      <p className="d597" data-node-id="2351:2671">
        Усе просто: обираєте формат, оплачуєте й одразу починаєте навчання.
      </p>
      <div className="d598" data-node-id="2351:2672">
        <div className="d599" data-node-id="2351:2673" data-name="Step Card 01">
          <p className="d600" data-node-id="2351:2674" style={{ backgroundImage: "linear-gradient(124.76957167467118deg, rgb(110, 9, 33) 6.8966%, rgb(168, 19, 51) 51.724%, rgb(120, 8, 36) 93.103%)" }}>
            01
          </p>
          <div className="d601" data-node-id="2351:2675" data-name="Step icon">
            <img alt="" className="d17" src={imgStepIcon} />
          </div>
          <p className="d602" data-node-id="2351:2679">
            Оберіть продукт
          </p>
          <div className="d603" data-node-id="2351:2680">
            <p className="d604">Курс, мінікурс або</p>
            <p className="d605">окрема техкарта.</p>
          </div>
        </div>
        <div className="d599" data-node-id="2351:2681" data-name="Step Card 02">
          <p className="d606" data-node-id="2351:2682" style={{ backgroundImage: "linear-gradient(116.5356617453552deg, rgb(110, 9, 33) 6.8966%, rgb(168, 19, 51) 51.724%, rgb(120, 8, 36) 93.103%)" }}>
            02
          </p>
          <div className="d607" data-node-id="2351:2683" data-name="Step icon">
            <img alt="" className="d17" src={imgStepIcon1} />
          </div>
          <p className="d608" data-node-id="2351:2686">
            Оплатіть
          </p>
          <div className="d609" data-node-id="2351:2687">
            <p className="d604">Повністю або частинами —</p>
            <p className="d605">як вам зручно.</p>
          </div>
        </div>
        <div className="d610" data-node-id="2351:2688" data-name="Step Card 03">
          <p className="d606" data-node-id="2351:2689" style={{ backgroundImage: "linear-gradient(115.97439450681411deg, rgb(110, 9, 33) 6.8966%, rgb(168, 19, 51) 51.724%, rgb(120, 8, 36) 93.103%)" }}>
            03
          </p>
          <div className="d611" data-node-id="2351:2690" data-name="Step icon">
            <img alt="" className="d17" src={imgStepIcon2} />
          </div>
          <p className="d608" data-node-id="2351:2698">
            Отримайте доступ
          </p>
          <div className="d609" data-node-id="2351:2699">
            <p className="d604">Матеріали та інструкції</p>
            <p className="d605">надходять одразу.</p>
          </div>
        </div>
        <div className="d599" data-node-id="2351:2700" data-name="Step Card 04">
          <p className="d606" data-node-id="2351:2701" style={{ backgroundImage: "linear-gradient(117.0914912523033deg, rgb(110, 9, 33) 6.8966%, rgb(168, 19, 51) 51.724%, rgb(120, 8, 36) 93.103%)" }}>
            04
          </p>
          <div className="d607" data-node-id="2351:2702" data-name="Step icon">
            <img alt="" className="d17" src={imgStepIcon3} />
          </div>
          <p className="d608" data-node-id="2351:2706">
            Навчайтеся
          </p>
          <div className="d609" data-node-id="2351:2707">
            <p className="d604">Проходьте уроки</p>
            <p className="d605">у власному темпі.</p>
          </div>
        </div>
      </div>
      <p className="d612" data-node-id="2351:2708">{`Курс — Telegram   •   Техкарта — email/кабінет   •   Консультація — бронювання й спосіб зв’язку`}</p>
      <div className="d613" data-node-id="2351:2709">
        <img alt="" className="d17" src={imgFrame1000003543} />
      </div>
      <div className="d614" data-node-id="2351:2717">
        <div className="d103">
          <div className="d104" data-name="ChatGPT Image 23 авг. 2026 г., 20_34_12 (1)(1) 1">
            <img alt="" className="d53" src={imgChatGptImage232026203412111} />
          </div>
        </div>
      </div>
    </div>
  , overrides);
}

