import { Cards, DocCard, List, RawHtml } from "..";
import Text from "../Text";

const Content = ({ type, data }) => {
  switch (type) {
    case "text": {
      return Array.isArray(data) ? (
        <>
          {data.map((text, i) => (
            <p key={i}>{<Text>{text}</Text>}</p>
          ))}
        </>
      ) : (
        <p>
          <Text>{data}</Text>
        </p>
      );
    }

    case "list": {
      return (
        <List marked items={data}>
          {(text) => <Text>{text}</Text>}
        </List>
      );
      // <ul>
      //   {data.map((li, i) => (
      //     <li key={i}>{<Text data={li} />}</li>
      //   ))}
      // </ul>
    }

    case "html": {
      return <RawHtml>{data}</RawHtml>;
    }

    case "cards": {
      return (
        <Cards>
          {data.map((card, i) => {
            if (card.type === "documentation") {
              return <DocCard key={i} {...card.data} className="col-6" />;
            }

            return null;
          })}
        </Cards>
      );
    }

    default:
      return null;
  }
};

export default Content;
