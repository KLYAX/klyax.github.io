import { DOCUMENTS_PATH } from "config/path";

const getFileSrc = (fileName, ext = "pdf") =>
  `${DOCUMENTS_PATH}/certificates-and-gratitude/${fileName}.${ext}`;

export default [
  {
    caption: "грамота",
    title: "Годового план и GRUNDFOS",
    file: getFileSrc("annual-plan-and-grundfos"),
  },
  {
    caption: "благодарность",
    title: "Якутскэнерго",
    file: getFileSrc("letter-of-thanks-from-yakutskenergo"),
  },
  // {
  //   caption: "статья",
  //   title: "Глоток воды для мирного атома",
  //   file: "/documents/certificates-and-gratitude/article-a-drink-of-water-for-a-peaceful-atom.pdf",
  // },
];
