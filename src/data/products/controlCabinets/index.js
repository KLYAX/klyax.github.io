import waterSupply from "./waterSupply";
import firefighting from "./firefighting";
import drainage from "./drainage";
import { IMAGES_PATH } from "config/path";
import { AppColor } from "config";

const controlCabinets = {
  id: "control-cabinets",
  name: "Шкафы управления",
  // color: AppColor.DARK_RED,
  image: {
    home: {},
  },
  pageContent: {
    product: {
      advantages: {
        title: "Преимущества\nнаших шкафов",
        slides: [
          {
            label: "Безопасность",
            content: {
              body: [
                "Соответствие всем нормам пожарной безопасности",
                "Состояние выполняемых работ подтверждено сертификатом СДС РЭР и\u00a0соответствует системе менеджмента качества",
              ],
              footer: "ГОСТ 51321.1-2017",
            },
          },
          {
            label: "Гарантия",
            content: {
              body: [
                "гарантия работоспособности шкафов управления и\u00a0соответствия требованиям технических условий при соблюдении условий транспортировки, хранения, монтажа и\u00a0эксплуатации, указанных в\u00a0настоящем паспорте и\u00a0руководстве по\u00a0эксплуатации",
                "Гарантийный ремонт выполняет предприятие-изготовитель или другое предприятие, имеющее договор с предприятием-изготовителем на выполнение данных работ.",
              ],
              footer: "Гарантия 3 года",
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
        title: "Шкафы серии Control G",
        description: [
          "предназначены для повышения (поддержания) значения требуемого параметра (давления, температуры) посредством управления группой насосов в\u00a0системах",
          [
            "водоподготовки",
            "орошения (ирригации)",
            "пожаротушения",
            "горячее и\u00a0холодное водоснабжение",
            "водоотведения",
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
              label: "Control GC",
              data: [40, 60, 20, 0, 40, 0],
            },
            {
              label: "Control GI",
              data: [40, 20, 20, 40, 40, 40],
            },
            {
              label: "Control GL",
              data: [20, 80, 60, 80, 80, 20],
            },
            {
              label: "Control GF",
              data: [80, 60, 20, 40, 40, 60],
            },
            {
              label: "Control GK",
              data: [40, 20, 20, 40, 40, 40],
            },
            {
              label: "Control GKS",
              data: [20, 0, 0, 80, 80, 40],
            },
          ],
        },
      },
      gallery: [{}, {}, {}, {}, {}],
    },
  },
  navThumbnail: {
    image: {
      src: `${IMAGES_PATH}/products/control-cabinets/nav-thumbnail-1.jpg`,
      alt: "",
    },
  },
  subcategories: [waterSupply, firefighting, drainage],
};

export default controlCabinets;
