export default {
  id: "zap-sib-neftekhim",
  name: "ЗапСибНефтехим",
  location: "г. Тобольск",
  year: 2020,

  page: {
    facility: {
      about: [
        {
          title: "В&nbsp;рамках работы по&nbsp;проекту мы&nbsp;выполнили",
          content: [
            {
              type: "html",
              data: `
                <ul>
                  <li>Проектирование, разработка и&nbsp;испытание насосной установки;</li>
                  <li>Поставка оборудования транспортной компанией по&nbsp;адресу заказчика;</li>
                  <li>Монтаж и&nbsp;пуско-наладка насосной установки.</li>
                </ul>
              `,
            },
          ],
          image: {
            file: "facility-about.jpg",
          },
        },
        {
          title: "О&nbsp;заказчике",
          content: [
            {
              type: "html",
              data: `
                <p>ООО &laquo;ЗапСибНефтехим&raquo;&nbsp;&mdash; предприятие по&nbsp;переработке углеводородного сырья и&nbsp;выпуску полимеров, входящее в&nbsp;состав СИБУРа.</p>
                <p>Производственные мощности &laquo;ЗапСибНефтехим&raquo; включают в&nbsp;себя центральную газофракционирующую установку по&nbsp;переработке широкой фракции легких углеводородов мощностью 8&nbsp;млн тонн в&nbsp;год, производство мономеров для выработки сжиженных углеводородных газов, бутадиена, изобутилена, а&nbsp;также метил-трет-бутилового эфира; производство полимеров для выработки полипропилена мощностью 500 тыс тонн в&nbsp;год; производство электротеплопарогенерации мощностью 665&nbsp;МВт по&nbsp;электрической энергии и&nbsp;2&nbsp;585&nbsp;МВт по&nbsp;тепловой энергии.</p>
              `,
            },
          ],
        },
      ],
      gallery: [{}, {}, {}],
    },
  },
};
