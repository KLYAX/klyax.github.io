import { IMAGES_PATH, DOCUMENTS_PATH } from "config/path";
const qualityCertificatesPath = `${DOCUMENTS_PATH}/quality-certificates`;

const getFileSrc = (fileName) => `${qualityCertificatesPath}/${fileName}.pdf`;

export default [
  {
    id: "fsk-ru0002-f0009754",
    caption: "сертификат соответствия",
    title: "FSK.RU0002.F0009754",
    preview: `${IMAGES_PATH}/certificate-preview.jpg`,
    file: getFileSrc("fsk-ru0002-f0009754"),
  },
  {
    title: "FSK.RU0002.F0009754",
    caption: "сертификат соответствия (приложение 1)",
    preview: `${IMAGES_PATH}/license-preview.jpg`,
    file: getFileSrc("fsk-ru0002-f0009754-attachment-1"),
  },
  {
    caption:
      "разрешение на использование знака соответствия системы сертификации Федеральная Система Качества",
    preview: `${IMAGES_PATH}/license-preview.jpg`,
    file: getFileSrc("federal-quality-system-permission"),
  },
  {
    title: "FSK.RU.EXP.00009754-1 Еременко Е.М.",
    caption: "сертификат соответствия аудитора",
    preview: `${IMAGES_PATH}/license-preview.jpg`,
    file: getFileSrc("fsk-ru0002-f0009754-1"),
  },
  {
    title: "FSK.RU.EXP.00009754-2 Тарасенко К.В.",
    caption: "сертификат соответствия аудитора",
    preview: `${IMAGES_PATH}/license-preview.jpg`,
    file: getFileSrc("fsk-ru0002-f0009754-2"),
  },
  {
    title: "FSK.RU.EXP.00009754-3 Гуценко М.В.",
    caption: "сертификат соответствия аудитора",
    preview: `${IMAGES_PATH}/license-preview.jpg`,
    file: getFileSrc("fsk-ru0002-f0009754-3"),
  },
  {
    title: "FSK.RU.EXP.00009754-4 Кобищанов В.Ю.",
    caption: "сертификат соответствия аудитора",
    preview: `${IMAGES_PATH}/license-preview.jpg`,
    file: getFileSrc("fsk-ru0002-f0009754-4"),
  },
  {
    title: "Система менеджмента качества Iso 9001-2015",
    preview: `${IMAGES_PATH}/license-preview.jpg`,
    caption: "сертификат соответствия аудитора",
    file: getFileSrc("iso-9001-2015"),
  },
  {
    caption: "декларация о соответствии евразийского экономического союза",
    title: "Hydro GK",
    subtitle: "насосная станция",
    file: getFileSrc("declaration-of-conformity-hydro-gk"),
  },
  {
    caption: "декларация о соответствии евразийского экономического союза",
    title: "Hydro G",
    subtitle: "насосная станция",
    file: getFileSrc("declaration-of-conformity-hydro-g"),
  },
  {
    caption: "сертификат соответствия евразийского экономического союза",
    title: "Control GF",
    subtitle: "шкаф управления",
    file: getFileSrc("certificate-of-conformity-control-gf"),
  },
  {
    caption: "сертификат соответствия евразийского экономического союза",
    title: "Control G",
    subtitle: "шкаф управления",
    file: getFileSrc("certificate-of-conformity-control-g"),
  },
  {
    caption: "сертификат соответствия",
    title: "Control G",
    subtitle: "шкаф управления",
    file: getFileSrc("certificate-of-conformity-control-g"),
  },
  {
    caption: "сертификат соответствия",
    title: "TANK G",
    subtitle: "изделия стеклопластиковые",
    file: getFileSrc("certificate-of-conformity-tank-g"),
  },
  {
    caption: "сертификат соответствия",
    title: "Hydro G",
    subtitle: "насосная установка",
    file: getFileSrc("certificate-of-conformity-hydro-g"),
  },
  {
    caption: "сертификат соответствия",
    title: "Hydro GF",
    subtitle: "насосная установка",
    file: getFileSrc("certificate-of-conformity-hydro-gf"),
  },
  {
    caption: "сертификат соответствия",
    title: "Сейсмичность",
    file: getFileSrc("certificate-of-conformity-seismicity"),
  },
  {
    caption: "протокол испытаний",
    title: "Control G",
    subtitle: "шкафы управления",
    file: getFileSrc("test-report-control-g"),
  },
  {
    caption: "санитарно-эпидемиологическое заключение",
    title: "Hydro G",
    file: getFileSrc("sanitary-and-epidemiological-conclusion-hydro-g"),
  },
];

// const qualityCertificates = [
//   {
//     caption: "декларация о соответствии",
//     title: "Hydro GK",
//     file: "/documents/quality-certificates/declarations-of-conformity-hydro-gk.pdf",
//   },
//   {
//     caption: "декларация о соответствии",
//     title: "Hydro G",
//     file: "/documents/quality-certificates/declarations-of-conformity-hydro-g.pdf",
//   },
//   // {
//   //   caption: "сертификат соответствия",
//   //   title: "Control gf",
//   //   file: "/documents/quality-certificates/certificate-of-conformity-control-gf.pdf",
//   // },
//   {
//     caption: "сертификат соответствия",
//     title: "hydro g",
//     file: "/documents/quality-certificates/certificate-of-conformity-hydro-g.pdf",
//   },
//   {
//     caption: "сертификат соответствия",
//     title: "hydro gf",
//     subtitle: "пожарная насосная станция",
//     file: "/documents/quality-certificates/certificate-of-conformity-hydro-gf.pdf",
//   },
//   {
//     caption: "сертификат соответствия",
//     title: "TANK G",
//     file: "/documents/quality-certificates/certificate-of-conformity-tank-g.pdf",
//   },
//   {
//     caption: "сертификат соответствия",
//     title: "Control g",
//     subtitle: "пожарная насосная станция",
//     file: "/documents/quality-certificates/certificate-of-conformity-control-g.pdf",
//   },
// ];

// export default qualityCertificates;
