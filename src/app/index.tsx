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

  const { pokemons } = useContext(MainContext)

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
      <View style={themed($ListContainer)}>
        <FlatList
          data={pokemons.filter(
            (p) =>
              p.name.trim().toLowerCase().includes(nameToSearch) ||
              nameToSearch.trim().toLowerCase().includes(p.name),
          )}
          renderItem={(i) => <PokemonAsListItem pokemon={i.item} />}
        />
      </View>
    </Screen>
  )
}

const PokemonAsListItem: FC<{ pokemon: Pokemon }> = ({ pokemon }) => {
  const { theme } = useAppTheme()

  return (
    <View>
      <Image
        source={{
          uri: pokemon.sprites.other.showdown.front_default || welcomeFace,
          height: 100,
        }}
        height={100}
        tintColor={theme.isDark ? theme.colors.palette.neutral900 : undefined}
      />
      <Text>{pokemon.name}</Text>
    </View>
  )
}

const $ListContainer: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  backgroundColor: colors.background,
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

const $searchInput: ThemedStyle<TextStyle> = ({ colors }) => ({
  borderColor: colors.palette.neutral900,
  borderWidth: 1,
  borderRadius: 20,
  margin: 10,
  padding: 10,
})
