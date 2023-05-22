import waterSupply from "./waterSupply";
import firefighting from "./firefighting";
import drainage from "./drainage";
import { ChartBarLvl } from "components/pages/Product/UseCases/UseCasesStatisticChartBar";
import { IMAGES_PATH } from "config/path";
import { AppColor } from "config";

export const subcategory = {
  [waterSupply.id]: waterSupply,
  [firefighting.id]: firefighting,
  [drainage.id]: drainage,
};

const pumpingStations = {
  id: "pumping-stations",
  name: "Насосные станции",
  color: AppColor.BODY,
  pageContent: {
    product: {
      advantages: {
        title: "Преимущества\nнаших насосных станций",
        slides: [
          {
            label: "Безопасность",
            content: {
              body: [
                "Насосные станции относятся к\u00a01-ой категории надежности по\u00a0надежности действия, электроснабжения и\u00a0обеспеченности водоснабжения (СНиП 2.04.02-84).",
                "Все оборудование и\u00a0приборы должны иметь сертификат безопасности.",
              ],
              footer: "ГОСТ 1.2-2009",
            },
          },
          {
            label: "Гарантия",
            content: {
              body: [
                "На\u00a0все насосы и\u00a0насосное оборудование устанавливается гарантийный срок.",
                "Если в\u00a0течение гарантийного срока эксплуатации насос вышел из\u00a0строя по\u00a0вине Изготовителя, предоставляется бесплатный гарантийный ремонт насоса согласно условиям и\u00a0порядку гарантийного обслуживания насосов.",
              ],
              footer: "Гарантия 1 год",
            },
          },
          {
            label: "Детали",
            content: {
              body: [
                "Работаем только с\u00a0проверенными поставщиками",
                "детали для сборки насосных станций и\u00a0шкафов управления отвечают всем стандартам качества и\u00a0безопасности",
              ],
              footer: "Гарантия 1 год",
            },
          },
        ],
      },
      useCases: {
        title: "Насосные станции Hydro\u00a0G",
        description: [
          "Насосные станции Hydro G\u00a0включают в\u00a0себя насосы GRUNDFOS, всасывающий и\u00a0напорный трубопроводы из\u00a0нержавеющей стали, вентили и\u00a0обратные клапаны, шкаф управления Control\u00a0G, датчики давления и\u00a0манометры",
          [
            "системы орошения",
            "пожаротушение",
            "повышения (поддержания) давления в\u00a0системах холодного и\u00a0горячего водоснабжения",
          ],
        ],
        table: {
          head: [
            "Administrative buildings",
            "Industrial buildings",
            "Residential buildings",
            "Sewerage systems",
            "Water intake and drainage systems",
            "Circular pumping stations",
          ],
          body: [
            {
              label: "Hydro GC",
              data: [
                ChartBarLvl.Unacceptable,
                ChartBarLvl.Well,
                ChartBarLvl.Good,
                ChartBarLvl.Acceptable,
                ChartBarLvl.Good,
                ChartBarLvl.Unacceptable,
              ],
            },
            {
              label: "Hydro GI",
              data: [
                ChartBarLvl.Good,
                ChartBarLvl.Acceptable,
                ChartBarLvl.Unacceptable,
                ChartBarLvl.Acceptable,
                ChartBarLvl.Good,
                ChartBarLvl.Good,
              ],
            },
            {
              label: "Hydro GL",
              data: [
                ChartBarLvl.Acceptable,
                ChartBarLvl.Excellent,
                ChartBarLvl.Well,
                ChartBarLvl.Excellent,
                ChartBarLvl.Well,
                ChartBarLvl.Good,
              ],
            },
            {
              label: "Hydro GF",
              data: [
                ChartBarLvl.Well,
                ChartBarLvl.Good,
                ChartBarLvl.Acceptable,
                ChartBarLvl.Good,
                ChartBarLvl.Good,
                ChartBarLvl.Well,
              ],
            },
            {
              label: "Hydro GFS",
              data: [
                ChartBarLvl.Good,
                ChartBarLvl.Unacceptable,
                ChartBarLvl.Acceptable,
                ChartBarLvl.Good,
                ChartBarLvl.Good,
                ChartBarLvl.Good,
              ],
            },
            {
              label: "Hydro GFY",
              data: [
                ChartBarLvl.Acceptable,
                ChartBarLvl.Acceptable,
                ChartBarLvl.Unacceptable,
                ChartBarLvl.Well,
                ChartBarLvl.Excellent,
                ChartBarLvl.Well,
              ],
            },
            {
              label: "Hydro GK",
              data: [
                ChartBarLvl.Acceptable,
                ChartBarLvl.Well,
                ChartBarLvl.Good,
                ChartBarLvl.Excellent,
                ChartBarLvl.Good,
                ChartBarLvl.Acceptable,
              ],
            },
            {
              label: "Hydro GKS",
              data: [
                ChartBarLvl.Acceptable,
                ChartBarLvl.Excellent,
                ChartBarLvl.Excellent,
                ChartBarLvl.Well,
                ChartBarLvl.Excellent,
                ChartBarLvl.Good,
              ],
            },
          ],
        },
      },
      gallery: [{}, {}, {}, {}, {}],
    },
  },
  navThumbnail: {
    image: {
      src: `${IMAGES_PATH}/products/pumping-stations/nav-thumbnail-1.jpg`,
      alt: "",
    },
  },
  subcategories: [waterSupply, firefighting, drainage],
};

export default pumpingStations;
