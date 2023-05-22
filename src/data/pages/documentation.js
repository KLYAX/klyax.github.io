import { DOCUMENTS_PATH } from "config/path";
import qualityCertificatesCards from "./about/credentials/cards/quality-certificates";

const documentation = {
  title: "Документация",
  description: "предназначены для повышения (поддержания) значения требуемого параметра ",
  tabs: [
    {
      id: "technical-documentation",
      label: "Техническая документация",
      content: [
        {
          label: "Шкафы управления",
          cards: {
            default: {
              caption: "руководство по эксплуатации",
            },
            data: [
              {
                title: "Control GI",
                file: `${DOCUMENTS_PATH}/products/control-cabinets/water-supply/control-gi-s/manual.pdf`,
              },
              {
                title: "Control GC",
                file: `${DOCUMENTS_PATH}/products/control-cabinets/water-supply/control-gc/manual.pdf`,
              },
              {
                title: "Control GL",
                file: `${DOCUMENTS_PATH}/products/control-cabinets/water-supply/control-gl-status-p/manual.pdf`,
                subtitle: "мультичастотный ОП STATUS-P",
              },
              {
                title: "Control GIE",
                file: `${DOCUMENTS_PATH}/products/control-cabinets/water-supply/control-gie-sfe/manual.pdf`,
              },
              {
                title: "Control GF",
                file: `${DOCUMENTS_PATH}/products/control-cabinets/firefighting/control-gf/manual.pdf`,
              },
              {
                title: "Control GFS",
                file: `${DOCUMENTS_PATH}/products/control-cabinets/firefighting/control-gfs/manual.pdf`,
              },
              {
                title: "Control GK",
                file: `${DOCUMENTS_PATH}/products/control-cabinets/drainage/control-gk/manual.pdf`,
              },
              {
                title: "Control GKS",
                file: `${DOCUMENTS_PATH}/products/control-cabinets/drainage/control-gks/manual.pdf`,
              },
            ],
          },
        },
        // {
        //   label: "Контроллеры управления",
        //   cards: {
        //     default: {
        //       caption: "руководство по эксплуатации",
        //     },
        //     data: [
        //       { title: "Hydro GC", subtitle: "каскадное регулирование" },
        //       { title: "Hydro GI", subtitle: "одночастотное регулирование" },
        //       { title: "Hydro GL", subtitle: "мультичастотное регулирование" },
        //       { title: "Hydro GF", subtitle: "стандартное регулирование" },
        //       { title: "Hydro GIE", subtitle: "регулирование плавным пуском" },
        //       { title: "Hydro GK", subtitle: "поплавковое регулирование" },
        //     ],
        //   },
        // },
      ],
    },
    {
      id: "product-catalog",
      label: "Каталоги продукции",
      content: {
        cards: [
          {
            caption: "насосные станции",
            title: "Hydro G",
            file: `${DOCUMENTS_PATH}/product-catalogues/hydro-g.pdf`,
          },
        ],
      },
    },
    {
      id: "certificates",
      label: "Сертификаты",
      content: {
        cards: qualityCertificatesCards,
      },
    },
  ],
};

export default documentation;
