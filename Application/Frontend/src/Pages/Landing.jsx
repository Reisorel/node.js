import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Landing() {
  const navigate = useNavigate();

  const goToIndex = () => {
    navigate("/index");
  };

  const goToCredits = () => {
    navigate("/credits");
  };

  return (
    <div>
      <h1>This is the landing !</h1>
        <Button text="Index" onClick={goToIndex} />
        <Button text="Credits" onClick={goToCredits}/>
    </div>
  );
}
