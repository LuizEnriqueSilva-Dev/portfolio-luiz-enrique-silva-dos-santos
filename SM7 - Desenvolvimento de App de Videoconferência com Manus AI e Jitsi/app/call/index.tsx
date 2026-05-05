import { View, Text, TouchableOpacity, Dimensions, Alert, ScrollView } from "react-native";
import { useRouter, Stack } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useState, useEffect } from "react";
import { AIStatusOverlay } from "@/components/ai-status-overlay";
import { RecommendationCard } from "@/components/recommendation-card";
import { PlantAnalyzer, PlantDiagnosis } from "@/lib/plant-analyzer";
import { ConsultationHistory } from "@/lib/consultation-history";

export default function CallScreen() {
  const router = useRouter();
  const colors = useColors();
  
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState<PlantDiagnosis | null>(null);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  // Iniciar análise de IA ao montar
  useEffect(() => {
    startAIAnalysis();
  }, []);

  // Timer para duração da chamada
  useEffect(() => {
    const interval = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const startAIAnalysis = async () => {
    try {
      setIsAnalyzing(true);
      
      // Simular captura de imagem e análise
      const result = await PlantAnalyzer.analyzeImage("camera://frame");
      const plantDiagnosis = PlantAnalyzer.generateDiagnosis(result);
      
      setDiagnosis(plantDiagnosis);
      setShowRecommendations(true);
      
      // Mostrar notificação
      Alert.alert("Análise Concluída", `Detectado: ${result.issue}`);
    } catch (error) {
      console.error("Erro na análise:", error);
      Alert.alert("Erro", "Não foi possível analisar a imagem");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleHangUp = async () => {
    try {
      // Salvar consulta no histórico
      if (diagnosis) {
        const consultation = {
          id: ConsultationHistory.generateId(),
          plantName: diagnosis.plantName,
          icon: "🌱",
          diagnosis: diagnosis.issue,
          description: diagnosis.description,
          recommendations: diagnosis.recommendations,
          healthScore: diagnosis.healthScore,
          date: new Date().toLocaleDateString("pt-BR"),
          timestamp: Date.now(),
        };

        await ConsultationHistory.saveConsultation(consultation);
        Alert.alert("Sucesso", "Consulta salva no histórico!");
      }

      router.back();
    } catch (error) {
      console.error("Erro ao salvar consulta:", error);
      Alert.alert("Erro", "Não foi possível salvar a consulta");
    }
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleCameraToggle = () => {
    setIsCameraOff(!isCameraOff);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScreenContainer
        className="bg-black"
        edges={["top", "bottom", "left", "right"]}
        containerClassName="bg-black"
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#000",
            justifyContent: "space-between",
          }}
        >
          {/* Video Area */}
          <View
            style={{
              flex: 1,
              backgroundColor: "#1a1a1a",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <Text style={{ color: colors.muted, fontSize: 16, marginBottom: 12 }}>
              🎥 Câmera Ativa
            </Text>
            <Text style={{ color: colors.muted, fontSize: 14, marginBottom: 20 }}>
              Duração: {formatDuration(callDuration)}
            </Text>

            {isAnalyzing && (
              <View style={{ alignItems: "center", gap: 8 }}>
                <Text style={{ color: "#4CAF50", fontSize: 14 }}>
                  🔄 Analisando planta...
                </Text>
              </View>
            )}

            {/* AI Status Overlay */}
            <AIStatusOverlay
              isActive={!isAnalyzing}
              detection={diagnosis ? diagnosis.issue : "Aguardando..."}
              confidence={0.85}
            />

            {/* Recommendations Panel */}
            {showRecommendations && diagnosis && (
              <View
                style={{
                  position: "absolute",
                  bottom: 80,
                  left: 16,
                  right: 16,
                  backgroundColor: "rgba(0, 0, 0, 0.9)",
                  borderRadius: 12,
                  padding: 12,
                  maxHeight: 150,
                }}
              >
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: "#4CAF50",
                      marginBottom: 8,
                    }}
                  >
                    📋 {diagnosis.issue}
                  </Text>
                  <Text style={{ fontSize: 12, color: colors.muted, lineHeight: 16 }}>
                    {diagnosis.description}
                  </Text>
                </ScrollView>
              </View>
            )}
          </View>

          {/* Control Bar */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              paddingVertical: 16,
              paddingHorizontal: 16,
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              borderTopWidth: 1,
              borderTopColor: colors.border,
            }}
          >
            {/* Mute Button */}
            <TouchableOpacity
              onPress={handleMute}
              activeOpacity={0.7}
              style={{
                backgroundColor: isMuted ? "#EF4444" : colors.surface,
                width: 56,
                height: 56,
                borderRadius: 28,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20 }}>{isMuted ? "🔇" : "🎤"}</Text>
            </TouchableOpacity>

            {/* Camera Toggle Button */}
            <TouchableOpacity
              onPress={handleCameraToggle}
              activeOpacity={0.7}
              style={{
                backgroundColor: isCameraOff ? "#EF4444" : colors.surface,
                width: 56,
                height: 56,
                borderRadius: 28,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20 }}>{isCameraOff ? "📵" : "📷"}</Text>
            </TouchableOpacity>

            {/* Hang Up Button */}
            <TouchableOpacity
              onPress={handleHangUp}
              activeOpacity={0.7}
              style={{
                backgroundColor: "#EF4444",
                width: 56,
                height: 56,
                borderRadius: 28,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20 }}>📞</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScreenContainer>
    </>
  );
}
