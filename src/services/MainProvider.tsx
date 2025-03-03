import { createContext, FC, PropsWithChildren, useEffect, useState } from "react"
import { useList } from "@uidotdev/usehooks"
import { pokedex } from "@/services/pokemon/api"
import { NamedAPIResourceList, Pokemon } from "pokeapi-js-wrapper"

export type MainContextType = {
  pokemons: Pokemon[]
  nextPokemons: () => void
  pokemonInfoByName: (name: string) => Pokemon
}

export const MainContext = createContext<MainContextType>({} as MainContextType)

export const MainProvider: FC<PropsWithChildren> = ({ children }) => {
  const [pokemons, modifyPokemons] = useList<Pokemon>()
  const [pokedexStat, setPokedexStat] = useState<NamedAPIResourceList>()

  const nextPokemons = () => {
    pokedex.getPokemonsList({ limit: 20, offset: pokemons.length }).then(setPokedexStat)
  }

  const pokemonInfoByName = (name: string) => {
    return pokemons.filter((p) => p.name === name)[0]
  }

  useEffect(() => {
    pokedex.getPokemonsList({ limit: 20, offset: 0 }).then(setPokedexStat)
  }, [])

  useEffect(() => {
    if (pokedexStat) {
      pokedexStat.results.forEach((v) => {
        if (pokemons.filter((p) => p.name === v.name).length === 0) {
          pokedex.getPokemonByName(v.name).then(modifyPokemons.push)
        }
      })
    }
  }, [pokedexStat])

  return (
    <MainContext.Provider
      value={{
        pokemons,
        nextPokemons,
        pokemonInfoByName,
      }}
    >
      {children}
    </MainContext.Provider>
  )
}
