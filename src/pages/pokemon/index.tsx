import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { request } from "../../services/api";

import { IPokemon } from "../../interfaces/pokemon";

import { TypeColor } from "../../enums/TypeColor";
// import { TypeColor } from "../../enums/TypeColor";

import {
  AboutPokemon,
  CardPokemon,
  ContentPokemon,
  MainPokemon,
  StatusPokemon,
} from "./styles";
import ProgressBar from "../../components/ProgressBar";

function getNumberPokemon(value: number) {
  const numberPokemon = value.toString();

  const values = [
    "",
    `00${numberPokemon}`,
    `0${numberPokemon}`,
    `${numberPokemon}`,
    `${numberPokemon}`,
  ];

  return values[numberPokemon.length];
}

export default function Pokemon() {
  const { id } = useParams();

  const [pokemon, setPokemon] = useState<IPokemon>();

  useEffect(() => {
    const controller = new AbortController();

    const handleFetchPokemon = async () => {
      const response = await request({
        url: `https://pokeapi.co/api/v2/pokemon/${id}`,
        signal: controller.signal,
      });

      setPokemon(response.data);
    };

    handleFetchPokemon();

    return () => {
      controller.abort();
    };
  }, [id]);

  if (!pokemon) {
    return <p>Pokemon não encontrado</p>;
  }

  if (pokemon) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const color = TypeColor[pokemon.types[0].type.name];

    return (
      <MainPokemon>
        <CardPokemon css={{ $$bgColor: color }}>
          <a href="/" style={{ color: "#fff", fontWeight: "500" }}>
            &#8612; Pokédex
          </a>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "2rem",
            }}
          >
            <img
              title={pokemon.name}
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
              loading="lazy"
              style={{ maxWidth: "200px" }}
            />

            <div style={{ textTransform: "capitalize", color: "#fff" }}>
              <div style={{ marginBottom: "1rem" }}>
                <small style={{ fontWeight: "500" }}>
                  # {getNumberPokemon(+pokemon.id)}
                </small>
                <h2>{pokemon.name}</h2>
              </div>

              {pokemon.types.map((item) => {
                return (
                  <span
                    style={{
                      backgroundColor: "#ffffff40",
                      padding: "0.2rem 0.6rem",
                      borderRadius: "25px",
                      marginRight: "0.5rem",
                    }}
                  >
                    {item.type.name}
                  </span>
                );
              })}
            </div>
          </div>
        </CardPokemon>

        <ContentPokemon>
          <AboutPokemon>
            <div style={{ textAlign: "center" }}>
              <h3>{pokemon.height} hg</h3>
              <small>Height</small>
            </div>

            <div style={{ textAlign: "center" }}>
              <h3>{pokemon.weight} dm</h3>
              <small>Weight</small>
            </div>

            <div style={{ textAlign: "center" }}>
              <h3>{pokemon.base_experience} xp</h3>
              <small>Base experience</small>
            </div>
          </AboutPokemon>

          <StatusPokemon>
            <p style={{ textAlign: "center", marginBottom: "1rem" }}>
              Base status
            </p>

            {pokemon.stats.map((item) => {
              return (
                <ProgressBar
                  name={item.stat.name}
                  value={+item.base_stat}
                  max={300}
                />
              );
            })}
          </StatusPokemon>
        </ContentPokemon>
      </MainPokemon>
    );
  }
}
