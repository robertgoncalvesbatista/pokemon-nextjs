export interface IRow {
  name: string;
  url: string;
}

export interface IGeneration {
  id: number;
  name: string;
  names: Array<IRow>;
  abilities: Array<IRow>;
  main_region: IRow;
  moves: Array<IRow>;
  pokemon_species: Array<IRow>;
  types: Array<IRow>;
  version_groups: Array<IRow>;
}
