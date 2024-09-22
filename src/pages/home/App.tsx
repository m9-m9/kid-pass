import Button from "../../elements/button/Button";
import useUsrStore from "../../store/useUsrStore";
import sendToRn from "../../utils/sendToRn";

const App: React.FC = () => {
  const usr = useUsrStore((state) => state);

  return (
    <div>
      {usr.name}
      <Button
        label="Home"
        onClick={() => {
          usr.setName("Lee");
        }}
      />

      <Button label="login" onClick={() => sendToRn({ type: "NAV", data: { uri: "auth" } })} />
    </div>
  );
};

export default App;
