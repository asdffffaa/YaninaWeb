import { bindDesign,type DesignOverrides } from "./bindDesign";
const imgHeroYaninaCakeAndTools1 = "/assets/optimized-ca562a7a7f5344e49da8.webp";
const imgHeroYaninaCakeAndTools = "/assets/4d4bae63-90a7-4dad-a8ed-629a314def35.svg";

export default function HeroDesign({ overrides = {} }: { overrides?: DesignOverrides }) {
  return bindDesign(
    <div className="d440" data-node-id="2351:2444" data-name="2">
      <div className="d441" data-node-id="2351:2445" data-name="Hero / Copy">
        <p className="d25" data-node-id="2351:2446">
          КОНДИТЕР • ВИКЛАДАЧ • АВТОР КУРСІВ
        </p>
        <div className="d26" data-node-id="2351:2447">
          <p className="d27">Сучасні торти —</p>
          <p className="d27">від базових знань до</p>
          <p className="d28">професійного результату</p>
        </div>
        <div className="d29" data-node-id="2351:2448">
          <p className="d30">Навчаю технологіям, які працюють.</p>
          <p className="d30">Допомагаю створювати стабільно смачні та</p>
          <p className="d31">візуально досконалі торти.</p>
        </div>
        <div className="d32" data-node-id="2351:2449" data-name="Hero / Actions">
          <div className="d442" data-node-id="2351:2450" data-name="CTA / Обрати курс">
            <p className="d34" data-node-id="2351:2451">
              Обрати курс
            </p>
          </div>
          <div className="d443" data-node-id="2351:2452" data-name="CTA / Технологічні карти">
            <p className="d36" data-node-id="2351:2453">
              Переглянути техкарти
            </p>
          </div>
        </div>
      </div>
      <div className="d444" data-node-id="2351:2454" data-name="Hero / Metrics">
        <div className="d38" data-node-id="2351:2455" data-name="Metric / 6+">
          <p className="d39" data-node-id="2351:2456">
            6+
          </p>
          <p className="d40" data-node-id="2351:2457">
            років досвіду
          </p>
        </div>
        <div className="d38" data-node-id="2351:2458" data-name="Metric / 500+">
          <p className="d39" data-node-id="2351:2459">
            500+
          </p>
          <p className="d40" data-node-id="2351:2460">
            учнів
          </p>
        </div>
        <div className="d38" data-node-id="2351:2461" data-name="Metric / 1000+">
          <p className="d39" data-node-id="2351:2462">
            1000+
          </p>
          <p className="d40" data-node-id="2351:2463">
            продажів
          </p>
        </div>
      </div>
      <div className="d445" data-node-id="2351:2464" data-name="Mask group">
        <div className="d446" data-node-id="2351:2466" style={{ maskImage: `url("${imgHeroYaninaCakeAndTools}")` }} data-name="Hero / Yanina, cake and tools">
          <img alt="" className="d416" src={imgHeroYaninaCakeAndTools1} />
        </div>
      </div>
    </div>
  , overrides, true);
}


