import { bindDesign,type DesignOverrides } from "./bindDesign";
const imgHeroYaninaCakeAndToolsMobile = "/assets/optimized-316ca86fe971765347c9.webp";

export default function MobileHeroDesign({ overrides = {} }: { overrides?: DesignOverrides }) {
  return bindDesign(
    <div className="mob0" data-node-id="2351:2967" data-name="02 / Mobile Hero">
      <p className="mob1" data-node-id="2351:2968">
        КОНДИТЕР • ВИКЛАДАЧ • АВТОР КУРСІВ
      </p>
      <div className="mob2" data-node-id="2351:2969">
        <p className="mob3">Сучасні торти —</p>
        <p className="mob3">від базових знань до</p>
        <p className="mob4">професійного результату</p>
      </div>
      <div className="mob5" data-node-id="2351:2970">
        <p className="mob6">Навчаю технологіям, які працюють.</p>
        <p className="mob6">Допомагаю створювати стабільно смачні та</p>
        <p className="mob7">візуально досконалі торти.</p>
      </div>
      <div className="mob8" data-node-id="2351:2971" data-name="Hero / Actions / Mobile">
        <div className="mob9" data-node-id="2351:2972" data-name="CTA / Обрати курс">
          <p className="mob10" data-node-id="2351:2973">
            Обрати курс
          </p>
        </div>
        <div className="mob11" data-node-id="2351:2974" data-name="CTA / Технологічні карти">
          <p className="mob12" data-node-id="2351:2975">
            Переглянути техкарти
          </p>
        </div>
      </div>
      <div className="mob13" data-node-id="2351:2976" data-name="Hero / Yanina, cake and tools / Mobile">
        <div className="mob14">
          <img alt="" className="mob15" src={imgHeroYaninaCakeAndToolsMobile} />
        </div>
      </div>
      <div className="mob16" data-node-id="2351:2977" data-name="Hero / Metrics / Mobile">
        <div className="mob17" data-node-id="2351:2978" data-name="Metric / 6+">
          <p className="mob18" data-node-id="2351:2979">
            6+
          </p>
          <p className="mob19" data-node-id="2351:2980">
            років досвіду
          </p>
        </div>
        <div className="mob20" data-node-id="2351:2981" data-name="Metric / 500+">
          <p className="mob18" data-node-id="2351:2982">
            500+
          </p>
          <p className="mob19" data-node-id="2351:2983">
            учнів
          </p>
        </div>
        <div className="mob21" data-node-id="2351:2984" data-name="Metric / 1000+">
          <p className="mob18" data-node-id="2351:2985">
            1000+
          </p>
          <p className="mob19" data-node-id="2351:2986">
            продажів
          </p>
        </div>
      </div>
    </div>
  , overrides, true);
}
