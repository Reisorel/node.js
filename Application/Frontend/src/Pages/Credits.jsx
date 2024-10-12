import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Credits() {

  const navigate = useNavigate();

  const goToLanding = () => {
    navigate("/");
  };

  return (
    <div>
      <h1>These are the marvelous credits !</h1>
      <Button text ="Landing" onClick={goToLanding}/>
    </div>
  )
}
