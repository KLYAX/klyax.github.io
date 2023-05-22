import he from "he";

const Text = ({ children }) => {
  return typeof children === "string" && <>{he.decode(children)}</>;
};

export default Text;
