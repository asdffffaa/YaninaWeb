import { bindDesign,type DesignOverrides } from "./bindDesign";
const imgChatGptImage1820261703461 = "/assets/optimized-e17a220e81aef580a36e.webp";
const imgLine106 = "/assets/cd535e8f-21eb-4f00-aa35-fe3e53fe0723.svg";
const imgLine107 = "/assets/0b9ef16f-a9f9-405d-9dbd-96c95b5a1b10.svg";

export default function MobileDividerDesign({ overrides = {} }: { overrides?: DesignOverrides }) {
  return bindDesign(
    <div className="mob22" data-node-id="2351:3011">
      <div className="mob62" data-node-id="2351:3012">
        <div className="mob63">
          <img alt="" className="mob64" src={imgLine106} />
        </div>
      </div>
      <div className="mob65" data-node-id="2351:3013">
        <div className="mob63">
          <img alt="" className="mob64" src={imgLine107} />
        </div>
      </div>
      <div className="mob66" data-node-id="2351:3014" data-name="ChatGPT Image 18 сент. 2026 г., 17_03_46 1">
        <img alt="" className="mob26" src={imgChatGptImage1820261703461} />
      </div>
    </div>
  , overrides);
}