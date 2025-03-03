import { useLocalSearchParams } from "expo-router"
import { Text } from "@/components"
import { useContext, useEffect, useState } from "react"
import { MainContext } from "@/services/MainProvider"
import { Pokemon } from "pokeapi-js-wrapper"
import { FlatList, Image, View } from "react-native"

export default () => {
  const local = useLocalSearchParams<{ name: string }>()
  const { pokemonInfoByName } = useContext(MainContext)

  const [pokemon, setPokemon] = useState<Pokemon>()

  useEffect(() => {
    setPokemon(pokemonInfoByName(local.name))
  }, [])

  if (!pokemon) return <Text>{local.name}</Text>

  return (
    <View style={{ flex: 1 }}>
      <Text text={`Id: ${pokemon.id}`} />
      <Text text={pokemon.name} />
      <Image
        source={{
          uri: pokemon.sprites.other.showdown.front_default || "",
          width: 300,
          height: 400,
        }}
      />
      <FlatList
        data={pokemon.stats}
        renderItem={(i) => (
          <View>
            <Text text={`${i.item.stat.name}: ${i.item.base_stat}`} />
          </View>
        )}
      />
    </View>
  )
}
