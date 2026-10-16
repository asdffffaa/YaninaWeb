import { bindDesign,type DesignOverrides } from "./bindDesign";
const imgPlayCircle = "/assets/08ef139e-0494-42bd-94f9-302042633d08.svg";
const img7 = "/assets/optimized-46cc4c11ec9f0582cbf9.webp";
const imgCourseImage = "/assets/optimized-ad55a0b0be48d913f413.webp";
const imgCourseImage1 = "/assets/optimized-ab26dd3c7cd020fac14c.webp";
const imgCourseImage2 = "/assets/optimized-a9fe1ec18be4f53426d4.webp";
const imgCourseImage3 = "/assets/optimized-1704de86611a0a13dc61.webp";
const imgPlayTriangle = "/assets/1866b3fa-2bca-4d6d-bd7d-d818654c13a3.svg";
const imgButtonArrowCircle = "/assets/323b5696-83f1-419e-bed1-6f83977cdd62.svg";
const imgArrowRight = "/assets/34045ca2-869c-48ed-9545-e2d86c255f00.svg";
const imgArrowCircleLeft = "/assets/cc8323fe-6ca5-4bba-8ea3-619565e4ccf5.svg";

function VuesaxLinearPlayCircle({ className }: { className?: string }) {
  return (
    <div className={className || "d313"} data-node-id="933:11300" data-name="vuesax/linear/play-circle">
      <div className="d281" data-node-id="933:11301" data-name="vuesax/linear/play-circle">
        <div className="d282" data-node-id="933:11302" data-name="play-circle">
          <img alt="" className="d17" src={imgPlayCircle} />
        </div>
      </div>
    </div>
  );
}

export default function MiniCoursesDesign({ overrides = {} }: { overrides?: DesignOverrides }) {
  return bindDesign(
    <div className="d211" data-node-id="2351:2197" data-name="7">
      <img alt="" className="d43" src={img7} />
      <p className="d314" data-node-id="2351:2198">
        МІНІКУРСИ ТА ОКРЕМІ УРОКИ
      </p>
      <div className="d315" data-node-id="2351:2199" data-name="Mini-course carousel viewport">
        <div className="d264" data-node-id="2351:2200" data-name="Lesson Card 1">
          <div className="d265" data-node-id="2351:2201" data-name="Course image">
            <div className="d316">
              <img alt="" className="d317" src={imgCourseImage} />
            </div>
          </div>
          <div className="d318" data-node-id="2351:2202">
            <p className="d319">Вирівнювання</p>
            <p className="d320">торта</p>
          </div>
          <div className="d321" data-node-id="2351:2203">
            <p className="d269">Рівні боки, чіткий край і</p>
            <p className="d270">стабільне покриття кремом.</p>
          </div>
          <div className="d290" data-node-id="2351:2204">
            <div className="-rotate-90 flex-none">
              <div className="d272" data-name="Play triangle">
                <div className="d273">
                  <img alt="" className="d48" src={imgPlayTriangle} />
                </div>
              </div>
            </div>
          </div>
          <div className="d274" data-node-id="2351:2205" data-name="Details button">
            <p className="d322" data-node-id="2351:2206">
              ДЕТАЛІ УРОКУ
            </p>
            <div className="d276" data-node-id="2351:2207" data-name="Button arrow circle">
              <img alt="" className="d17" src={imgButtonArrowCircle} />
            </div>
            <div className="d277" data-node-id="2351:2208" data-name="Arrow right">
              <img alt="" className="d17" src={imgArrowRight} />
            </div>
          </div>
          <div className="d323" data-node-id="2351:2210">
            <p className="d279" data-node-id="2351:2211">
              ОНЛАЙН • ДОСТУП ОДРАЗУ
            </p>
            <VuesaxLinearPlayCircle className="d324" />
          </div>
        </div>
        <div className="d287" data-node-id="2351:2213" data-name="Lesson Card 2">
          <div className="d265" data-node-id="2351:2214" data-name="Course image">
            <img alt="" className="d266" src={imgCourseImage1} />
          </div>
          <p className="d325" data-node-id="2351:2215">
            Мусові десерти
          </p>
          <div className="d289" data-node-id="2351:2216">
            <p className="d269">Стабільна текстура,</p>
            <p className="d270">глазур і сучасна подача.</p>
          </div>
          <p className="d326" data-node-id="2351:2217">
            ОНЛАЙН • ДОСТУП ОДРАЗУ
          </p>
          <div className="d274" data-node-id="2351:2218" data-name="Details button">
            <p className="d322" data-node-id="2351:2219">
              ДЕТАЛІ УРОКУ
            </p>
            <div className="d276" data-node-id="2351:2220" data-name="Button arrow circle">
              <img alt="" className="d17" src={imgButtonArrowCircle} />
            </div>
            <div className="d277" data-node-id="2351:2221" data-name="Arrow right">
              <img alt="" className="d17" src={imgArrowRight} />
            </div>
          </div>
          <VuesaxLinearPlayCircle className="d292" />
        </div>
        <div className="d293" data-node-id="2351:2224" data-name="Lesson Card 3">
          <div className="d265" data-node-id="2351:2225" data-name="Course image">
            <img alt="" className="d266" src={imgCourseImage2} />
          </div>
          <p className="d327" data-node-id="2351:2226">
            Ескімо
          </p>
          <div className="d289" data-node-id="2351:2227">
            <p className="d269">Начинки, глазурування</p>
            <p className="d270">та акуратний декор.</p>
          </div>
          <div className="d290" data-node-id="2351:2228">
            <div className="-rotate-90 flex-none">
              <div className="d272" data-name="Play triangle">
                <div className="d273">
                  <img alt="" className="d48" src={imgPlayTriangle} />
                </div>
              </div>
            </div>
          </div>
          <p className="d326" data-node-id="2351:2229">
            ОНЛАЙН • ДОСТУП ОДРАЗУ
          </p>
          <div className="d274" data-node-id="2351:2230" data-name="Details button">
            <p className="d322" data-node-id="2351:2231">
              ДЕТАЛІ УРОКУ
            </p>
            <div className="d276" data-node-id="2351:2232" data-name="Button arrow circle">
              <img alt="" className="d17" src={imgButtonArrowCircle} />
            </div>
            <div className="d277" data-node-id="2351:2233" data-name="Arrow right">
              <img alt="" className="d17" src={imgArrowRight} />
            </div>
          </div>
          <VuesaxLinearPlayCircle className="d292" />
        </div>
        <div className="d296" data-node-id="2351:2236" data-name="Lesson Card 4">
          <div className="d265" data-node-id="2351:2237" data-name="Course image">
            <img alt="" className="d266" src={imgCourseImage3} />
          </div>
          <p className="d327" data-node-id="2351:2238">
            Кейк-попси
          </p>
          <div className="d289" data-node-id="2351:2239">
            <p className="d269">Ідеальна форма,</p>
            <p className="d270">покриття й оформлення.</p>
          </div>
          <div className="d290" data-node-id="2351:2240">
            <div className="-rotate-90 flex-none">
              <div className="d272" data-name="Play triangle">
                <div className="d273">
                  <img alt="" className="d48" src={imgPlayTriangle} />
                </div>
              </div>
            </div>
          </div>
          <p className="d326" data-node-id="2351:2241">
            ОНЛАЙН • ДОСТУП ОДРАЗУ
          </p>
          <div className="d274" data-node-id="2351:2242" data-name="Details button">
            <p className="d322" data-node-id="2351:2243">
              ДЕТАЛІ УРОКУ
            </p>
            <div className="d276" data-node-id="2351:2244" data-name="Button arrow circle">
              <img alt="" className="d17" src={imgButtonArrowCircle} />
            </div>
            <div className="d277" data-node-id="2351:2245" data-name="Arrow right">
              <img alt="" className="d17" src={imgArrowRight} />
            </div>
          </div>
          <VuesaxLinearPlayCircle className="d292" />
        </div>
        <div className="d328" data-node-id="2354:4729" data-name="Lesson Card 5">
          <div className="d265" data-node-id="2354:4730" data-name="Course image">
            <img alt="" className="d266" src={imgCourseImage3} />
          </div>
          <p className="d327" data-node-id="2354:4731">
            Кейк-попси
          </p>
          <div className="d289" data-node-id="2354:4732">
            <p className="d269">Ідеальна форма,</p>
            <p className="d270">покриття й оформлення.</p>
          </div>
          <div className="d290" data-node-id="2354:4733">
            <div className="-rotate-90 flex-none">
              <div className="d272" data-name="Play triangle">
                <div className="d273">
                  <img alt="" className="d48" src={imgPlayTriangle} />
                </div>
              </div>
            </div>
          </div>
          <p className="d326" data-node-id="2354:4734">
            ОНЛАЙН • ДОСТУП ОДРАЗУ
          </p>
          <div className="d274" data-node-id="2354:4735" data-name="Details button">
            <p className="d322" data-node-id="2354:4736">
              ДЕТАЛІ УРОКУ
            </p>
            <div className="d276" data-node-id="2354:4737" data-name="Button arrow circle">
              <img alt="" className="d17" src={imgButtonArrowCircle} />
            </div>
            <div className="d277" data-node-id="2354:4738" data-name="Arrow right">
              <img alt="" className="d17" src={imgArrowRight} />
            </div>
          </div>
          <VuesaxLinearPlayCircle className="d292" />
        </div>
      </div>
      <div className="d329" data-node-id="2351:2262">
        <p className="d247">Одна навичка або десерт —</p>
        <p className="d248">у вашому темпі</p>
      </div>
      <p className="d330" data-node-id="2351:2263">
        Оберіть конкретну тему, техніку або десерт і опановуйте її у зручному темпі без необхідності проходити великий курс.
      </p>
      <div className="d331" data-node-id="2351:2264" data-name="vuesax/bold/arrow-circle-left">
        <div className="d332" data-node-id="2351:2265" data-name="arrow-circle-left">
          <img alt="" className="d17" src={imgArrowCircleLeft} />
        </div>
      </div>
      <div className="d333" data-node-id="2351:2268" style={{ containerType: "size" }} data-name="vuesax/bold/arrow-circle-left">
        <div className="d334" data-node-id="2351:2269" style={{ containerType: "size" }}>
          <div className="d312">
            <div className="d211" data-name="arrow-circle-left">
              <img alt="" className="d17" src={imgArrowCircleLeft} />
            </div>
          </div>
        </div>
      </div>
      <div className="d335" data-node-id="2351:2272" data-name="Courses / Carousel controls">
        <div className="d336" data-node-id="2351:2273" data-name="Courses / Progress track" />
        <div className="d337" data-node-id="2351:2274" data-name="Courses / Progress active" />
        <div className="d338" data-node-id="2351:2275">
          <p className="d339" data-node-id="2351:2276">
            <span className="d199">01</span>
            <span className="d340">{` / 03`}</span>
          </p>
        </div>
      </div>
    </div>
  , overrides);
}

