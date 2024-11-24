import Button from "../../../elements/button/Button";
import useAuthSocial from "../useAuthSocial";

const App: React.FC = () => {
  const { user, handleLogin } = useAuthSocial();
  console.log(user);
  return (
    <div>
      회원가입
      <input />
      <input />
      <Button label="구글" onClick={() => handleLogin("google", true)} />
      <Button label="카카오" onClick={() => handleLogin("kakao", true)} />
    </div>
  );
};

export default App;
