import { useLocalSearchParams } from "expo-router"
import { Text } from "@/components"

export default () => {
  const local = useLocalSearchParams<{ name: string }>()

  return <Text>{local.name}</Text>
}
