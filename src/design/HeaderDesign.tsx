import { bindDesign,type DesignOverrides } from "./bindDesign";
const imgVuesaxLinearBag2 = "/assets/d96851cb-85a6-45e0-9cd0-7298243b0821.svg";
const imgFrame1000003431 = "/assets/7dc895f4-b31d-4d6a-be79-ca436024ab09.svg";

export default function HeaderDesign({ overrides = {} }: { overrides?: DesignOverrides }) {
  return bindDesign(
    <div className="d463" data-node-id="2351:2496" data-name="1">
      <div className="d2" data-node-id="2351:2497" data-name="Logo / Yanina Korinenko">
        <p className="d3" data-node-id="2351:2498">
          YANINA
        </p>
        <p className="d4" data-node-id="2351:2499">
          <span className="d5">KO</span>
          <span className="d6">RINENKO</span>
        </p>
      </div>
      <div className="d203" data-node-id="2351:2500" data-name="Navigation">
        <p className="d204" data-node-id="2351:2501">
          Головна
        </p>
        <p className="d205" data-node-id="2351:2502">
          Про мене
        </p>
        <p className="d205" data-node-id="2351:2503">
          Курси
        </p>
        <p className="d205" data-node-id="2351:2504">
          Техкарти
        </p>
        <p className="d206" data-node-id="2351:2505">
          Консультація
        </p>
      </div>
      <div className="d10" data-node-id="2351:2506" data-name="Header / Actions">
        <div className="d11" data-node-id="2351:2507" data-name="CTA / Header / Обрати курс">
          <p className="d207" data-node-id="2351:2508">
            Обрати курс
          </p>
        </div>
      </div>
      <div className="d208" data-node-id="2352:4613">
        <div className="d209" data-node-id="2352:4614" data-name="vuesax/linear/bag-2">
          <div className="d19" data-node-id="2352:4615" data-name="vuesax/linear/bag-2">
            <img alt="" className="d17" src={imgVuesaxLinearBag2} />
          </div>
        </div>
        <div className="d210" data-node-id="2352:4622">
          <img alt="" className="d17" src={imgFrame1000003431} />
        </div>
      </div>
    </div>
  , overrides, true);
}


