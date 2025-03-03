import { useLocalSearchParams } from "expo-router"
import { Text } from "@/components"
import { useContext, useEffect, useState } from "react"
import { MainContext } from "@/services/MainProvider"
import { Pokemon, StatElement } from "pokeapi-js-wrapper"
import { FlatList, Image, View, ViewStyle } from "react-native"
import { ProgressBar, MD3Colors } from "react-native-paper"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"

export default () => {
  const local = useLocalSearchParams<{ name: string }>()
  const { pokemonInfoByName } = useContext(MainContext)
  const { themed } = useAppTheme()

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
      <Text tx="pokemon:stat" />
      <FlatList
        contentContainerStyle={themed($stats)}
        data={pokemon.stats}
        renderItem={(i) => (
          <View>
            <Text text={`${i.item.stat.name}: ${i.item.base_stat}`} />
            <ProgressBar progress={i.item.base_stat / 256} color={statToColor(i.item)} />
          </View>
        )}
      />
    </View>
  )
}

const statToColor = (stat: StatElement) => {
  if (stat.base_stat <= 20) return MD3Colors.error50
  else if (stat.base_stat <= 100) return MD3Colors.neutral50
  return MD3Colors.tertiary10
}

const $stats: ThemedStyle<ViewStyle> = ({ colors }) => ({
  padding: 10,
  margin: 10,
  borderColor: colors.border,
  borderWidth: 1,
  borderRadius: 4,
})
