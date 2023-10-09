import { useNavigate } from "react-router-dom";

function HandleNavigate(url: string) {
  const navigate = useNavigate();

  const prefixo = "https://pokeapi.co/api/v2/";
  const get_url = url.replace(prefixo, "");

  console.log(get_url);

  navigate(get_url);
}

export default HandleNavigate;
