import credentials from "./credentials";

const about = {
  lead: {
    title: "О компании",
    description:
      "работаем с\u00a02007 года на\u00a0рынке поставок насосного оборудования и\u00a0шкафов управления",
  },
  advantages: {
    title: "Наши\nпреимущества",
    subtitle: "Больше, чем просто цифры",
    slides: [
      {
        label: "Безопасность",
        content: {
          body: [
            "Соблюдение всех стандартов качества",
            "Состояние выполняемых работ подтверждено сертификатом СДС РЭР и\u00a0соответствует системе менеджмента качества",
          ],
          footer: ["ГОСТ ISO 9001-2011", "ISO 9000-2008"],
        },
      },
      {
        label: "Подход к\u00a0клиенту",
        content: {
          body: [
            "Компания \u00abGlobe\u00a0IT\u00bb на\u00a0рынке с\u00a02007 года за\u00a0это время нами накоплен большой опыт проектирования и\u00a0производства насосных станций, шкафов управления, блок-контейнеров и\u00a0контроллеров.",
            "К\u00a0каждому заказчику у\u00a0нас индивидуальных подход, учитывающий все требования и\u00a0условия.",
          ],
          footer: "опыт работы 14 лет",
        },
      },
      {
        label: "Процесс",
        content: {
          body: [
            "Каждому этапу процесса сборки конструкций мы\u00a0уделяем особое внимание. Процесс сборки включает в\u00a0себя:",
            ["Проектирование", "Сборка шкафов управления", "Сборка станций", "Тестирование"],
          ],
        },
      },
    ],
  },
  credentials: credentials,
  partners: {
    title: "Наши партнёры",
    description: "спасибо всем партнёрам за\u00a0то, что помогаете нам стать лучше",
    logos: [
      { file: { name: "danfoss" } },
      { file: { name: "grundfos" } },
      { file: { name: "lowara" } },
      { file: { name: "saer" } },
      { file: { name: "wilo" } },
      { file: { name: "schneider-electric" } },
      { file: { name: "ksb" } },
      { file: { name: "siemens" } },
      { file: { name: "ebara" } },
      { file: { name: "valtec" } },
      { file: { name: "cnp" } },
      { file: { name: "dkc" } },
      { file: { name: "genebre" } },
      { file: { name: "calpeda" } },
      { file: { name: "enolgas" } },
    ],
  },
  manufacture: {
    title: "Наше\nпроизводство",
    description: [
      "предназначены для повышения (поддержания) значения требуемого параметра (давления, температуры) посредством управления группой насосов в\nсистемах",
      [
        "водоподготовки",
        "орошения (ирригации)",
        "пожаротушения",
        "горячее и холодное водоснабжение",
        "водоотведения",
      ],
    ],
    gallery: [{}, {}, {}, {}, {}, {}],
  },
};

export default about;
