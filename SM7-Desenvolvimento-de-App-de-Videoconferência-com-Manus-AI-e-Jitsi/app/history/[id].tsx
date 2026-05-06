import { ScrollView, Text, View, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useEffect, useState } from "react";
import { ConsultationHistory, Consultation } from "@/lib/consultation-history";
import { RecommendationCard } from "@/components/recommendation-card";

export default function HistoryDetailScreen() {
  const router = useRouter();
  const colors = useColors();
  const { id } = useLocalSearchParams();
  
  const [consultation, setConsultation] = useState<Consultation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadConsultation();
  }, [id]);

  const loadConsultation = async () => {
    try {
      setIsLoading(true);
      if (typeof id === "string") {
        const data = await ConsultationHistory.getById(id);
        if (data) {
          setConsultation(data);
        } else {
          Alert.alert("Erro", "Consulta não encontrada");
          router.back();
        }
      }
    } catch (error) {
      console.error("Erro ao carregar consulta:", error);
      Alert.alert("Erro", "Não foi possível carregar a consulta");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartNewConsultation = () => {
    try {
      router.push("/call");
    } catch (error) {
      console.error("Erro ao iniciar nova consulta:", error);
      Alert.alert("Erro", "Não foi possível iniciar a consulta");
    }
  };

  const handleDeleteConsultation = async () => {
    Alert.alert(
      "Deletar Consulta",
      "Tem certeza que deseja deletar esta consulta?",
      [
        { text: "Cancelar", onPress: () => {} },
        {
          text: "Deletar",
          onPress: async () => {
            try {
              if (typeof id === "string") {
                await ConsultationHistory.deleteById(id);
                Alert.alert("Sucesso", "Consulta deletada!");
                router.back();
              }
            } catch (error) {
              console.error("Erro ao deletar:", error);
              Alert.alert("Erro", "Não foi possível deletar a consulta");
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <ScreenContainer className="bg-background">
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ color: colors.muted }}>Carregando...</Text>
        </View>
      </ScreenContainer>
    );
  }

  if (!consultation) {
    return (
      <ScreenContainer className="bg-background">
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ color: colors.muted }}>Consulta não encontrada</Text>
        </View>
      </ScreenContainer>
    );
  }

  // Calcular barra de saúde
  const healthPercentage = Math.min(consultation.healthScore, 100);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScreenContainer className="bg-background">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ gap: 20, paddingHorizontal: 16, paddingVertical: 16 }}>
            {/* Header */}
            <View style={{ gap: 8 }}>
              <TouchableOpacity 
                onPress={() => router.back()}
                style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
              >
                <Text style={{ fontSize: 16, color: colors.primary }}>←</Text>
                <Text style={{ fontSize: 16, color: colors.primary }}>Voltar</Text>
              </TouchableOpacity>
            </View>

            {/* Plant Info Card */}
            <View
              style={{
                backgroundColor: colors.surface,
                borderRadius: 16,
                padding: 16,
                alignItems: "center",
                gap: 12,
              }}
            >
              <Text style={{ fontSize: 48 }}>{consultation.icon}</Text>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "700",
                  color: colors.foreground,
                }}
              >
                {consultation.plantName}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: colors.muted,
                }}
              >
                {consultation.date}
              </Text>

              {/* Health Score Bar */}
              <View style={{ width: "100%", gap: 8, marginTop: 8 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 12, fontWeight: "600", color: colors.foreground }}>
                    Saúde da Planta
                  </Text>
                  <Text style={{ fontSize: 12, color: colors.primary, fontWeight: "600" }}>
                    {consultation.healthScore}%
                  </Text>
                </View>
                <View
                  style={{
                    height: 8,
                    backgroundColor: colors.border,
                    borderRadius: 4,
                    overflow: "hidden",
                  }}
                >
                  <View
                    style={{
                      height: "100%",
                      width: `${healthPercentage}%`,
                      backgroundColor:
                        healthPercentage > 70
                          ? "#4CAF50"
                          : healthPercentage > 40
                          ? "#F59E0B"
                          : "#EF4444",
                    }}
                  />
                </View>
              </View>
            </View>

            {/* Diagnosis Section */}
            <View style={{ gap: 8 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: colors.foreground,
                }}
              >
                {consultation.diagnosis}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: colors.muted,
                  lineHeight: 20,
                }}
              >
                {consultation.description}
              </Text>
            </View>

            {/* Recommendations */}
            <View style={{ gap: 12 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: colors.foreground,
                }}
              >
                Recomendações
              </Text>

              {consultation.recommendations.map((rec, index) => (
                <RecommendationCard
                  key={index}
                  icon={rec.icon}
                  title={rec.title}
                  description={rec.description}
                />
              ))}
            </View>

            {/* Action Buttons */}
            <View style={{ gap: 8, marginTop: 12 }}>
              <TouchableOpacity
                onPress={handleStartNewConsultation}
                activeOpacity={0.8}
                style={{
                  backgroundColor: colors.primary,
                  paddingVertical: 14,
                  borderRadius: 12,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#FFFFFF",
                  }}
                >
                  🔄 Iniciar Nova Consulta
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleDeleteConsultation}
                activeOpacity={0.8}
                style={{
                  backgroundColor: "transparent",
                  borderWidth: 1,
                  borderColor: "#EF4444",
                  paddingVertical: 14,
                  borderRadius: 12,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#EF4444",
                  }}
                >
                  🗑️ Deletar Consulta
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ScreenContainer>
    </>
  );
}
