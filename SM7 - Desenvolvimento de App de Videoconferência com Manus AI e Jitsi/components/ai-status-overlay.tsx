import { View, Text } from "react-native";
import { useColors } from "@/hooks/use-colors";

interface AIStatusOverlayProps {
  isActive: boolean;
  detection: string;
  confidence?: number;
}

export function AIStatusOverlay({ isActive, detection, confidence }: AIStatusOverlayProps) {
  const colors = useColors();

  return (
    <View
      style={{
        position: "absolute",
        top: 20,
        right: 16,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        borderRadius: 12,
        padding: 12,
        minWidth: 160,
        borderWidth: 1,
        borderColor: isActive ? "#4CAF50" : colors.border,
      }}
    >
      <Text
        style={{
          fontSize: 12,
          color: isActive ? "#4CAF50" : "#EF4444",
          fontWeight: "600",
          marginBottom: 4,
        }}
      >
        {isActive ? "✓" : "✕"} Status IA: {isActive ? "Ativo" : "Inativo"}
      </Text>
      <Text style={{ fontSize: 11, color: colors.muted, marginBottom: 4 }}>
        Detecção: {detection}
      </Text>
      {confidence !== undefined && (
        <Text style={{ fontSize: 10, color: colors.muted }}>
          Confiança: {(confidence * 100).toFixed(0)}%
        </Text>
      )}
    </View>
  );
}
