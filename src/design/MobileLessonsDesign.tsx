import { bindDesign,type DesignOverrides } from "./bindDesign";
const imgPlayCircle = "/assets/0b0c95a5-dd38-4129-88e9-0de7749fd182.svg";
const img07MobileLessonsMiniCourses = "/assets/optimized-fbdeeb7187ccd96e3dd0.webp";
const imgCourseImage = "/assets/optimized-ad55a0b0be48d913f413.webp";
const imgCourseImage1 = "/assets/662c7171-ee96-4446-90bb-2b11312209dd.png";
const imgCourseImage2 = "/assets/89e3a88e-3088-4b91-9eb0-b10b764bf861.png";
const imgCourseImage3 = "/assets/b13e3659-b178-4e48-be5a-4b9b94bffc1f.png";
const imgCourseImage4 = "/assets/1ca0977f-3b31-497d-aa35-6668ed637c68.png";
const imgPlayTriangle = "/assets/1866b3fa-2bca-4d6d-bd7d-d818654c13a3.svg";
const imgArrowRight = "/assets/5d5db47b-0b44-470b-8b1f-fecf7b90e251.svg";
const imgButtonArrowCircle = "/assets/52a5114e-9291-472f-921b-d471cb13eaf5.svg";
const imgArrowRight1 = "/assets/34045ca2-869c-48ed-9545-e2d86c255f00.svg";

function VuesaxLinearPlayCircle({ className }: { className?: string }) {
  return (
    <div className={className || "mob149"} data-node-id="933:11300" data-name="vuesax/linear/play-circle">
      <div className="mob113" data-node-id="933:11301" data-name="vuesax/linear/play-circle">
        <div className="mob114" data-node-id="933:11302" data-name="play-circle">
          <img alt="" className="mob37" src={imgPlayCircle} />
        </div>
      </div>
    </div>
  );
}

export default function MobileLessonsDesign({ overrides = {} }: { overrides?: DesignOverrides }) {
  return bindDesign(
    <div className="mob22" data-node-id="2351:3119" data-name="07 / Mobile Lessons & Mini Courses">
      <div aria-hidden className="mob150">
        <img alt="" className="mob151" src={img07MobileLessonsMiniCourses} />
        <div className="mob152" />
      </div>
      <p className="mob153" data-node-id="2351:3120">
        МІНІКУРСИ ТА ОКРЕМІ УРОКИ
      </p>
      <div className="mob154" data-node-id="2351:3121">
        <p className="mob155">Одна навичка або десерт —</p>
        <p className="mob156">у вашому темпі</p>
      </div>
      <p className="mob157" data-node-id="2351:3122">
        Системне навчання: від бази до власного стабільного результату.
      </p>
      <div className="mob158" data-node-id="2351:3123" data-name="Lessons / Carousel Viewport / Mobile">
        <div className="mob159" data-node-id="2351:3124" data-name="Lessons / Carousel Track / Mobile">
          <div className="mob160" data-node-id="2351:3125" data-name="Lesson Card 1 / Mobile">
            <div className="mob161" data-node-id="2351:3126" data-name="Course image">
              <div className="mob162">
                <img alt="" className="mob163" src={imgCourseImage} />
              </div>
            </div>
            <div className="mob164" data-node-id="2351:3127" style={{ backgroundImage: "linear-gradient(152.83501550428429deg, rgb(110, 9, 33) 6.8966%, rgb(168, 19, 51) 51.724%, rgb(120, 8, 36) 93.103%)" }} data-name="Type badge">
              <p className="mob165" data-node-id="2351:3128">
                УРОК / МІНІКУРС
              </p>
            </div>
            <div className="mob166" data-node-id="2351:3129">
              <p className="mob167">Вирівнювання</p>
              <p className="mob168">торта</p>
            </div>
            <div className="mob169" data-node-id="2351:3130">
              <p className="mob170">Рівні боки, чіткий край і</p>
              <p className="mob171">стабільне покриття кремом.</p>
            </div>
            <div className="mob172" data-node-id="2351:3131">
              <div className="-rotate-90 flex-none">
                <div className="mob173" data-name="Play triangle">
                  <div className="mob174">
                    <img alt="" className="mob64" src={imgPlayTriangle} />
                  </div>
                </div>
              </div>
            </div>
            <p className="mob175" data-node-id="2351:3132">
              ОНЛАЙН • ДОСТУП ОДРАЗУ
            </p>
            <VuesaxLinearPlayCircle className="mob176" />
            <div className="mob177" data-node-id="2351:3134" data-name="Courses / Details / Mobile">
              <div className="mob178" data-node-id="2351:3135" data-name="Courses / Details pill" />
              <p className="mob179" data-node-id="2351:3136">{`ДЕТАЛІ УРОКУ  `}</p>
              <div className="mob180" data-node-id="2351:3137" data-name="vuesax/linear/arrow-right">
                <div className="mob181" data-node-id="2351:3138" data-name="arrow-right">
                  <img alt="" className="mob37" src={imgArrowRight} />
                </div>
              </div>
            </div>
          </div>
          <div className="mob182" data-node-id="2351:3142" data-name="Lesson Card 2 / Mobile">
            <div className="mob161" data-node-id="2351:3143" data-name="Course image">
              <img alt="" className="mob183" src={imgCourseImage1} />
            </div>
            <div className="mob164" data-node-id="2351:3144" style={{ backgroundImage: "linear-gradient(152.83501550428429deg, rgb(110, 9, 33) 6.8966%, rgb(168, 19, 51) 51.724%, rgb(120, 8, 36) 93.103%)" }} data-name="Type badge">
              <p className="mob165" data-node-id="2351:3145">
                УРОК / МІНІКУРС
              </p>
            </div>
            <p className="mob184" data-node-id="2351:3146">
              Мусові десерти
            </p>
            <div className="mob169" data-node-id="2351:3147">
              <p className="mob170">Стабільна текстура,</p>
              <p className="mob171">глазур і сучасна подача.</p>
            </div>
            <p className="mob175" data-node-id="2351:3148">
              ОНЛАЙН • ДОСТУП ОДРАЗУ
            </p>
            <div className="mob185" data-node-id="2351:3149" data-name="Details button">
              <p className="mob186" data-node-id="2351:3150">
                ДЕТАЛІ УРОКУ
              </p>
              <div className="mob187" data-node-id="2351:3151" data-name="Button arrow circle">
                <img alt="" className="mob37" src={imgButtonArrowCircle} />
              </div>
              <div className="mob188" data-node-id="2351:3152" data-name="Arrow right">
                <img alt="" className="mob37" src={imgArrowRight1} />
              </div>
            </div>
            <VuesaxLinearPlayCircle className="mob176" />
          </div>
          <div className="mob189" data-node-id="2351:3155" data-name="Lesson Card 3 / Mobile">
            <div className="mob161" data-node-id="2351:3156" data-name="Course image">
              <img alt="" className="mob183" src={imgCourseImage2} />
            </div>
            <div className="mob164" data-node-id="2351:3157" style={{ backgroundImage: "linear-gradient(152.83501550428429deg, rgb(110, 9, 33) 6.8966%, rgb(168, 19, 51) 51.724%, rgb(120, 8, 36) 93.103%)" }} data-name="Type badge">
              <p className="mob165" data-node-id="2351:3158">
                УРОК / МІНІКУРС
              </p>
            </div>
            <p className="mob190" data-node-id="2351:3159">
              Ескімо
            </p>
            <div className="mob191" data-node-id="2351:3160">
              <p className="mob170">Начинки, глазурування</p>
              <p className="mob171">та акуратний декор.</p>
            </div>
            <div className="mob172" data-node-id="2351:3161">
              <div className="-rotate-90 flex-none">
                <div className="mob173" data-name="Play triangle">
                  <div className="mob174">
                    <img alt="" className="mob64" src={imgPlayTriangle} />
                  </div>
                </div>
              </div>
            </div>
            <p className="mob175" data-node-id="2351:3162">
              ОНЛАЙН • ДОСТУП ОДРАЗУ
            </p>
            <div className="mob185" data-node-id="2351:3163" data-name="Details button">
              <p className="mob186" data-node-id="2351:3164">
                ДЕТАЛІ УРОКУ
              </p>
              <div className="mob187" data-node-id="2351:3165" data-name="Button arrow circle">
                <img alt="" className="mob37" src={imgButtonArrowCircle} />
              </div>
              <div className="mob188" data-node-id="2351:3166" data-name="Arrow right">
                <img alt="" className="mob37" src={imgArrowRight1} />
              </div>
            </div>
            <VuesaxLinearPlayCircle className="mob176" />
          </div>
          <div className="mob189" data-node-id="2351:3169" data-name="Lesson Card 4 / Mobile">
            <div className="mob161" data-node-id="2351:3170" data-name="Course image">
              <img alt="" className="mob183" src={imgCourseImage3} />
            </div>
            <div className="mob164" data-node-id="2351:3171" style={{ backgroundImage: "linear-gradient(152.83501550428429deg, rgb(110, 9, 33) 6.8966%, rgb(168, 19, 51) 51.724%, rgb(120, 8, 36) 93.103%)" }} data-name="Type badge">
              <p className="mob165" data-node-id="2351:3172">
                УРОК / МІНІКУРС
              </p>
            </div>
            <p className="mob190" data-node-id="2351:3173">
              Кейк-попси
            </p>
            <div className="mob191" data-node-id="2351:3174">
              <p className="mob170">Ідеальна форма,</p>
              <p className="mob171">покриття й оформлення.</p>
            </div>
            <div className="mob172" data-node-id="2351:3175">
              <div className="-rotate-90 flex-none">
                <div className="mob173" data-name="Play triangle">
                  <div className="mob174">
                    <img alt="" className="mob64" src={imgPlayTriangle} />
                  </div>
                </div>
              </div>
            </div>
            <p className="mob175" data-node-id="2351:3176">
              ОНЛАЙН • ДОСТУП ОДРАЗУ
            </p>
            <div className="mob185" data-node-id="2351:3177" data-name="Details button">
              <p className="mob186" data-node-id="2351:3178">
                ДЕТАЛІ УРОКУ
              </p>
              <div className="mob187" data-node-id="2351:3179" data-name="Button arrow circle">
                <img alt="" className="mob37" src={imgButtonArrowCircle} />
              </div>
              <div className="mob188" data-node-id="2351:3180" data-name="Arrow right">
                <img alt="" className="mob37" src={imgArrowRight1} />
              </div>
            </div>
            <VuesaxLinearPlayCircle className="mob176" />
          </div>
          <div className="mob189" data-node-id="2351:3183" data-name="Lesson Card 5 / Mobile">
            <div className="mob161" data-node-id="2351:3184" data-name="Course image">
              <img alt="" className="mob183" src={imgCourseImage4} />
            </div>
            <div className="mob164" data-node-id="2351:3185" style={{ backgroundImage: "linear-gradient(152.83501550428429deg, rgb(110, 9, 33) 6.8966%, rgb(168, 19, 51) 51.724%, rgb(120, 8, 36) 93.103%)" }} data-name="Type badge">
              <p className="mob192" data-node-id="2351:3186">
                УРОК / МІНІКУРС
              </p>
            </div>
            <div className="mob193" data-node-id="2351:3187">
              <p className="mob167">Тістечко</p>
              <p className="mob168">«Картопля»</p>
            </div>
            <div className="mob194" data-node-id="2351:3188">
              <p className="mob170">Насичений смак і</p>
              <p className="mob171">правильна текстура.</p>
            </div>
            <div className="mob172" data-node-id="2351:3189">
              <div className="-rotate-90 flex-none">
                <div className="mob173" data-name="Play triangle">
                  <div className="mob174">
                    <img alt="" className="mob64" src={imgPlayTriangle} />
                  </div>
                </div>
              </div>
            </div>
            <p className="mob195" data-node-id="2351:3190">
              ОНЛАЙН • ДОСТУП ОДРАЗУ
            </p>
            <div className="mob196" data-node-id="2351:3191" data-name="Details button">
              <p className="mob197" data-node-id="2351:3192" style={{ backgroundImage: "linear-gradient(171.73170999752574deg, rgb(110, 9, 33) 6.8966%, rgb(168, 19, 51) 51.724%, rgb(120, 8, 36) 93.103%)" }}>
                ДЕТАЛІ УРОКУ
              </p>
              <div className="mob198" data-node-id="2351:3193" data-name="Button arrow circle">
                <img alt="" className="mob37" src={imgButtonArrowCircle} />
              </div>
              <div className="mob199" data-node-id="2351:3194" data-name="Arrow right">
                <img alt="" className="mob37" src={imgArrowRight1} />
              </div>
            </div>
            <VuesaxLinearPlayCircle className="mob176" />
          </div>
        </div>
      </div>
      <div className="mob200" data-node-id="2351:3197" data-name="Lessons / Carousel controls / Mobile">
        <div className="mob201" data-node-id="2351:3198" data-name="Courses / Progress track" />
        <div className="mob202" data-node-id="2351:3199" data-name="Courses / Progress active" />
        <p className="mob203" data-node-id="2351:3200">
          <span className="mob145">{`01 `}</span>
          <span className="mob204">/ 03</span>
        </p>
      </div>
    </div>
  , overrides);
}