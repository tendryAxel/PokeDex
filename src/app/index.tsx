import {
  FlatList,
  Image,
  ImageStyle,
  ListRenderItem,
  ListRenderItemInfo,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { Screen, Text } from "@/components"
import { isRTL } from "@/i18n"
import { ThemedStyle } from "@/theme"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"
import { useAppTheme } from "@/utils/useAppTheme"
import { FC, useContext } from "react"
import { MainContext } from "@/services/MainProvider"
import { Pokemon } from "pokeapi-js-wrapper"

const welcomeLogo = require("../../assets/images/logo.png")
const welcomeFace = require("../../assets/images/welcome-face.png")

export default function WelcomeScreen() {
  const { theme, themed } = useAppTheme()

  const {
    pokemons
  } = useContext(MainContext)

  return (
    <Screen safeAreaEdges={["top"]} contentContainerStyle={themed($container)}>
      <View style={themed($topContainer)}>
        <Image style={themed($welcomeLogo)} source={welcomeLogo} resizeMode="contain" />
        <Text
          testID="welcome-heading"
          style={themed($welcomeHeading)}
          tx="welcomeScreen:readyForLaunch"
          preset="heading"
        />
        <Text tx="welcomeScreen:exciting" preset="subheading" />
        <Image
          style={$welcomeFace}
          source={welcomeFace}
          resizeMode="contain"
          tintColor={theme.isDark ? theme.colors.palette.neutral900 : undefined}
        />
      </View>
      <View style={themed($ListContainer)}>
        <FlatList data={pokemons} renderItem={i => <PokemonAsListItem pokemon={i.item} />} />
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
          height: 100
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
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
})

const $welcomeLogo: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  height: 88,
  width: "100%",
  marginBottom: spacing.xxl,
})

const $welcomeFace: ImageStyle = {
  height: 169,
  width: 269,
  position: "absolute",
  bottom: -47,
  right: -80,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}

const $welcomeHeading: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})
