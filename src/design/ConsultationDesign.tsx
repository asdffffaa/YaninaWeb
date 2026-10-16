import { bindDesign,type DesignOverrides } from "./bindDesign";
const imgChatGptImage23202617000011 = "/assets/optimized-6c06470c15e886c7014c.webp";
const imgChatGptImage23202617000012 = "/assets/optimized-d1a819e821bffbbed7f2.webp";
const imgStepsDivider1 = "/assets/1718db30-8620-4b69-b16c-22c08d0aeac4.svg";
const imgStep1NumberCircle = "/assets/ff116c78-796f-4b70-888d-f54e4461f2c9.svg";
const imgFrame1000003377 = "/assets/3fa6c16f-3b68-4258-8511-d983e6945023.svg";
const imgTelegramArrow = "/assets/79c3c847-3e1b-4fe2-a80f-30f5647511da.svg";

export default function ConsultationDesign({ overrides = {} }: { overrides?: DesignOverrides }) {
  return bindDesign(
    <div className="d211" data-node-id="2351:2057" data-name="9">
      <div className="d212" data-node-id="2351:2058" data-name="Consultation / Steps">
        <p className="d213" data-node-id="2351:2059">
          Прості кроки до вашого доступу
        </p>
        <div className="d214" data-node-id="2351:2060">
          <p className="d215">Розберемо ваш запит, знайдемо рішення</p>
          <p className="d216">та складемо план дій для вашого результату.</p>
        </div>
        <div className="d217" data-node-id="2351:2061" data-name="Steps / Divider 1">
          <div className="d218">
            <img alt="" className="d48" src={imgStepsDivider1} />
          </div>
        </div>
        <div className="d219" data-node-id="2351:2062" data-name="Steps / Divider 2">
          <div className="d218">
            <img alt="" className="d48" src={imgStepsDivider1} />
          </div>
        </div>
        <div className="d220" data-node-id="2351:2063">
          <div className="d221" data-node-id="2351:2064">
            <div className="d222" data-node-id="2351:2065">
              <div className="d223" data-node-id="2351:2066" data-name="Step 1 / Number Circle">
                <img alt="" className="d17" src={imgStep1NumberCircle} />
              </div>
              <p className="d224" data-node-id="2351:2067">
                1
              </p>
            </div>
            <p className="d225" data-node-id="2351:2068">
              –
            </p>
            <p className="d226" data-node-id="2351:2069">
              Оберіть тему
            </p>
          </div>
          <div className="d227" data-node-id="2351:2070">
            <div className="d228" data-node-id="2351:2071">
              <div className="d223" data-node-id="2351:2072" data-name="Step 2 / Number Circle">
                <img alt="" className="d17" src={imgStep1NumberCircle} />
              </div>
              <p className="d229" data-node-id="2351:2073">
                2
              </p>
            </div>
            <p className="d230" data-node-id="2351:2074">
              –
            </p>
            <p className="d226" data-node-id="2351:2075">
              Напишіть у Telegram
            </p>
          </div>
          <div className="d231" data-node-id="2351:2076">
            <div className="d232" data-node-id="2351:2077">
              <div className="d223" data-node-id="2351:2078" data-name="Step 3 / Number Circle">
                <img alt="" className="d17" src={imgStep1NumberCircle} />
              </div>
              <p className="d229" data-node-id="2351:2079">
                3
              </p>
            </div>
            <p className="d233" data-node-id="2351:2080">
              –
            </p>
            <p className="d226" data-node-id="2351:2081">
              Узгодимо час
            </p>
          </div>
        </div>
      </div>
      <div className="d234" data-node-id="2351:2082" data-name="Consultation / Telegram Card">
        <div className="d235" data-node-id="2351:2083">
          <img alt="" className="d17" src={imgFrame1000003377} />
        </div>
        <div className="d236" data-node-id="2351:2087">
          <p className="d237">{`Є питання? `}</p>
          <p className="d6">Напишіть мені у Telegram</p>
        </div>
        <p className="d238" data-node-id="2351:2088">
          @yaninakorinenko
        </p>
        <div className="d239" data-node-id="2351:2089" data-name="Telegram / Button">
          <p className="d240" data-node-id="2351:2090">
            Написати
          </p>
          <div className="d241" data-node-id="2351:2091" data-name="Telegram / Arrow">
            <img alt="" className="d17" src={imgTelegramArrow} />
          </div>
        </div>
      </div>
      <div className="d242" data-node-id="2351:2093" data-name="ChatGPT Image 23 авг. 2026 г., 17_00_00(1) 1">
        <img alt="" className="d53" src={imgChatGptImage23202617000011} />
      </div>
      <div className="d243" data-node-id="2351:2094">
        <div className="-scale-y-100 flex-none rotate-180">
          <div className="d244" data-name="ChatGPT Image 23 авг. 2026 г., 17_00_00(1) 2">
            <img alt="" className="d53" src={imgChatGptImage23202617000012} />
          </div>
        </div>
      </div>
    </div>
  , overrides);
}

