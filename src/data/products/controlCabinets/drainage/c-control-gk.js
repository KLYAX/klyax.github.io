export default {
  id: "c-control-gk",
  name: "Control GK",
  // type: "каскадный",
  image: {
    main: {},
  },
  about: {
    description: [
      [
        {
          type: "text",
          data: "Шкаф управления насосами водоотведения.",
        },
        {
          type: "text",
          data:
            "В&nbsp;зависимости от&nbsp;модификации изготавливается для работы в&nbsp;условиях, регламентированных для климатического исполнения УХЛ4, УХЛ1 по&nbsp;ГОСТ 15150-69.",
        },
      ],
      [
        {
          type: "list",
          data: [
            "Соответствие TP&nbsp;TC&nbsp;004/2011 &laquo;О&nbsp;безопасности низковольтного оборудования&raquo;;",
            "Соответствие ТР&nbsp;ТС&nbsp;020/2011 &laquo;Электромагнитная совместимость технических средств&raquo;;",
            "Интуитивно понятный интерфейс",
            "Гибкость настройки",
            "Контроль уровня жидкости в&nbsp;резервуаре",
          ],
        },
      ],
    ],
    specifications: [
      {
        name: "Основные функции",
        data: [
          {
            type: "list",
            data: [
              "Контроль уровня воды в&nbsp;резервуаре по&nbsp;гидростатическому датчику уровня либо по&nbsp;поплавкам (настраивается);",
              "Включение насоса с&nbsp;наибольшим временем простоя;",
              "Предотвращение заиливания насосов;",
              "Блокировка насоса при перегреве и/или протекании;",
              "Защита линий и&nbsp;электроустановок от&nbsp;перегрузок и&nbsp;токов короткого замыкания;",
              "Контроль количества пусков насоса за&nbsp;установленный период;",
              "Контроль и&nbsp;формирование аварии гидростатического датчика уровня на&nbsp;обрыв цепи, короткое замыкание цепи и&nbsp;неверного значения уровня;",
              "Контроль количества срабатывания аварии насоса и&nbsp;блокировка при превышении аварий за установленный период;",
              "Формирование аварии &laquo;чередование поплавков&raquo;;",
              "Формирование журнала аварий и&nbsp;событий;",
              "Диспетчеризация сигнала &laquo;Общая авария&raquo;, &laquo;Перелив&raquo; путем сухих контактов (GSM модем - опционально).",
            ],
          },
        ],
      },
      {
        name: "Дополнительные опции",
        data: [
          {
            type: "list",
            data: [
              "Контроль качества сетевого питания и&nbsp;блокировка работы ШУН в&nbsp;случае некачественного питания (АВР&nbsp;&mdash; опционально);",
            ],
          },
        ],
      },
    ],
  },
};
