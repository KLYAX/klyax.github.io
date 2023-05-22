import licensesCards from "./cards/licenses";
import qualityCertificatesCards from "./cards/quality-certificates";
import certificatesAndGratitude from "./cards/certificates-and-gratitude";

const credentials = {
  tabs: [
    {
      label: "Лицензии",
      cards: licensesCards,
    },
    {
      label: "Сертификаты качества",
      cards: qualityCertificatesCards,
    },
    {
      label: "Грамоты-благодарности",
      cards: certificatesAndGratitude,
    },
  ],
};

export default credentials;
