import { View, Text } from "react-native";
import { useColors } from "@/hooks/use-colors";

interface RecommendationCardProps {
  icon: string;
  title: string;
  description: string;
}

export function RecommendationCard({ icon, title, description }: RecommendationCardProps) {
  const colors = useColors();

  return (
    <View
      style={{
        backgroundColor: colors.surface,
        borderRadius: 12,
        padding: 12,
        borderLeftWidth: 4,
        borderLeftColor: colors.primary,
        gap: 4,
      }}
    >
      <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
        <Text style={{ fontSize: 20 }}>{icon}</Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "600",
            color: colors.foreground,
            flex: 1,
          }}
        >
          {title}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 12,
          color: colors.muted,
          marginLeft: 28,
          lineHeight: 16,
        }}
      >
        {description}
      </Text>
    </View>
  );
}
