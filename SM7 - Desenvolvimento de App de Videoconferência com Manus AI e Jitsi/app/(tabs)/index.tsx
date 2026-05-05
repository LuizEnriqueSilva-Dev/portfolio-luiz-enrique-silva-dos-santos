import { ScrollView, Text, View, TouchableOpacity, FlatList, Alert } from "react-native";
import { useRouter, Stack } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useEffect, useState } from "react";
import { ConsultationHistory, Consultation } from "@/lib/consultation-history";

interface PlantHistory {
  id: string;
  name: string;
  diagnosis: string;
  date: string;
  icon: string;
}

export default function HomeScreen() {
  const router = useRouter();
  const colors = useColors();
  const [historyItems, setHistoryItems] = useState<PlantHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar histórico ao montar o componente
  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      setIsLoading(true);
      const consultations = await ConsultationHistory.getAll();
      
      // Converter para formato de exibição
      const items = consultations.slice(0, 10).map((c) => ({
        id: c.id,
        name: c.plantName,
        diagnosis: c.diagnosis,
        date: c.date,
        icon: c.icon,
      }));
      
      setHistoryItems(items);
    } catch (error) {
      console.error("Erro ao carregar histórico:", error);
      Alert.alert("Erro", "Não foi possível carregar o histórico");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartConsultation = () => {
    try {
      // Navegar para a tela de consulta
      router.push("/call");
    } catch (error) {
      console.error("Erro ao iniciar consulta:", error);
      Alert.alert("Erro", "Não foi possível iniciar a consulta");
    }
  };

  const handleHistoryItemPress = (id: string) => {
    try {
      // Navegar para detalhes do histórico
      router.push(`/history/${id}`);
    } catch (error) {
      console.error("Erro ao abrir histórico:", error);
      Alert.alert("Erro", "Não foi possível abrir o histórico");
    }
  };

  const renderHistoryItem = ({ item }: { item: PlantHistory }) => (
    <TouchableOpacity
      onPress={() => handleHistoryItemPress(item.id)}
      activeOpacity={0.7}
      style={{
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: 12,
        padding: 12,
        marginBottom: 8,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <Text style={{ fontSize: 24 }}>{item.icon}</Text>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: "600", color: colors.foreground }}>
            {item.name}
          </Text>
          <Text style={{ fontSize: 12, color: colors.muted, marginTop: 4 }}>
            {item.diagnosis} • {item.date}
          </Text>
        </View>
        <Text style={{ fontSize: 16, color: colors.muted }}>›</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScreenContainer className="bg-background">
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ gap: 24, paddingHorizontal: 16, paddingVertical: 16 }}>
            {/* Header */}
            <View style={{ gap: 8 }}>
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: "700",
                  color: colors.foreground,
                }}
              >
                PlantCare Live
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: colors.muted,
                }}
              >
                Consultoria botânica em tempo real
              </Text>
            </View>

            {/* CTA Button */}
            <TouchableOpacity
              onPress={handleStartConsultation}
              activeOpacity={0.8}
              style={{
                backgroundColor: colors.primary,
                paddingVertical: 16,
                borderRadius: 12,
                alignItems: "center",
                justifyContent: "center",
                shadowColor: colors.primary,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "#FFFFFF",
                }}
              >
                🎥 Iniciar Consulta
              </Text>
            </TouchableOpacity>

            {/* History Section */}
            <View style={{ gap: 12 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: colors.foreground,
                }}
              >
                Histórico de Análises
              </Text>

              {isLoading ? (
                <View style={{ alignItems: "center", paddingVertical: 20 }}>
                  <Text style={{ color: colors.muted }}>Carregando...</Text>
                </View>
              ) : historyItems.length > 0 ? (
                <FlatList
                  data={historyItems}
                  renderItem={renderHistoryItem}
                  keyExtractor={(item) => item.id}
                  scrollEnabled={false}
                />
              ) : (
                <View
                  style={{
                    backgroundColor: colors.surface,
                    borderRadius: 12,
                    padding: 16,
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <Text style={{ fontSize: 24 }}>🌱</Text>
                  <Text style={{ color: colors.muted, textAlign: "center" }}>
                    Nenhuma consulta realizada ainda. Inicie uma consulta para começar!
                  </Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </ScreenContainer>
    </>
  );
}
