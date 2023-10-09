/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { IPokemon, IPokemons } from "../../interfaces/pokemon";

import { request } from "../../services/api";

import { TypeColor } from "../../enums/TypeColor";

import {
  NavbarDashboard,
  MainDashboard,
  TooltipDashboard,
  ButtonDashboard,
  FlexboxDashboard,
  CardDashboard,
  ImageDashboard,
  SpanDashboard,
} from "./styles";

export default function Dashboard() {
  const navigate = useNavigate();

  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");

  const [pokemonData, setPokemonData] = useState<IPokemon[]>([]);

  const [loading, setLoading] = useState(true);

  const [prevUrl, setPrevUrl] = useState("");
  const [nextUrl, setNextUrl] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const handleFetchPokemon = (response: []) => {
      const pokemons = response.map(async (pokemon: IPokemons) => {
        const result = await request({
          url: pokemon.url,
          signal: controller.signal,
        });

        return result.data;
      });

      Promise.all(pokemons).then((results) => setPokemonData(results));
    };

    const handleFetchListPokemon = async () => {
      try {
        const response = await request({
          url: url,
          signal: controller.signal,
        });

        setPrevUrl(response.data.previous);
        setNextUrl(response.data.next);

        handleFetchPokemon(response.data.results);
      } catch (error) {
        return;
      }
    };

    setLoading(true);
    handleFetchListPokemon();
    setLoading(false);

    return () => {
      controller.abort();
    };
  }, [url]);

  return (
    <MainDashboard>
      <NavbarDashboard>
        <h1>Pokédex</h1>
      </NavbarDashboard>

      <FlexboxDashboard>
        {pokemonData.map((value: IPokemon) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const color = TypeColor[value.types[0].type.name];

          return (
            <CardDashboard
              key={value.id}
              onClick={() => navigate(`/pokemon/${value.id}`)}
              css={{ $$bgColor: color }}
            >
              <div style={{ textTransform: "capitalize", color: "white" }}>
                <h4 style={{ marginBottom: "1rem" }}>{value.name}</h4>

                {value.types.map((item) => {
                  return (
                    <div style={{ marginBottom: "0.5rem" }}>
                      <SpanDashboard>{item.type.name}</SpanDashboard>
                    </div>
                  );
                })}
              </div>

              <div>
                <i className="logo"></i>
                <ImageDashboard
                  title={value.name}
                  src={value.sprites.other["official-artwork"].front_default}
                  width="96"
                  height="96"
                  loading="lazy"
                />
              </div>
            </CardDashboard>
          );
        })}
      </FlexboxDashboard>

      <TooltipDashboard>
        <ButtonDashboard onClick={() => setUrl(prevUrl)} disabled={!prevUrl}>
          &lsaquo;
        </ButtonDashboard>

        <ButtonDashboard onClick={() => setUrl(nextUrl)} disabled={!nextUrl}>
          &rsaquo;
        </ButtonDashboard>
      </TooltipDashboard>
    </MainDashboard>
  );
}
