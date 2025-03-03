import {
  FlatList,
  Image,
  ImageStyle,
  ListRenderItem,
  ListRenderItemInfo,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { Screen, Text } from "@/components"
import { isRTL } from "@/i18n"
import { ThemedStyle } from "@/theme"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"
import { useAppTheme } from "@/utils/useAppTheme"
import { FC, useContext, useState } from "react"
import { MainContext } from "@/services/MainProvider"
import { Pokemon } from "pokeapi-js-wrapper"

const welcomeFace = require("../../assets/images/welcome-face.png")

export default function WelcomeScreen() {
  const { themed } = useAppTheme()
  const [nameToSearch, setNameToSearch] = useState<string>("")

  const { pokemons, nextPokemons } = useContext(MainContext)

  return (
    <Screen safeAreaEdges={["top"]} contentContainerStyle={themed($container)}>
      <View style={themed($topContainer)}>
        <Text tx="search:placeholder" preset="subheading" />
        <TextInput
          onChangeText={setNameToSearch}
          value={nameToSearch}
          placeholder="Search..."
          style={themed($searchInput)}
        />
      </View>
      <FlatList
        contentContainerStyle={themed($ListContainer)}
        data={pokemons.filter(
          (p) =>
            p.name.trim().toLowerCase().includes(nameToSearch) ||
            nameToSearch.trim().toLowerCase().includes(p.name),
        )}
        onEndReached={nextPokemons}
        numColumns={2}
        renderItem={(i) => <PokemonAsListItem pokemon={i.item} />}
      />
    </Screen>
  )
}

const PokemonAsListItem: FC<{ pokemon: Pokemon }> = ({ pokemon }) => {
  const { theme, themed } = useAppTheme()

  return (
    <View style={themed($pokemonAsListItem)}>
      <Image
        source={{
          uri: pokemon.sprites.other.showdown.front_default || welcomeFace,
          height: 150,
          width: 140,
        }}
        tintColor={theme.isDark ? theme.colors.palette.neutral900 : undefined}
      />
      <Text text={pokemon.name} />
    </View>
  )
}

const $ListContainer: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.background,
  alignItems: "center",
})

const $container: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  backgroundColor: colors.background,
})

const $topContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexShrink: 1,
  height: 100,
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
})

const $pokemonAsListItem: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  height: 200,
  justifyContent: "center",
  margin: spacing.md,
  padding: spacing.md,
  borderColor: colors.palette.neutral900,
  borderRadius: spacing.md,
  borderWidth: 1,
})

const $searchInput: ThemedStyle<TextStyle> = ({ colors }) => ({
  borderColor: colors.palette.neutral900,
  borderWidth: 1,
  borderRadius: 20,
  margin: 10,
  padding: 10,
})
