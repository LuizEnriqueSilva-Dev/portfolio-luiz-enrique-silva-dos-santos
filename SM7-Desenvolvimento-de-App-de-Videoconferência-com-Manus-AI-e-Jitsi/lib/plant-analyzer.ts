/**
 * Plant Analyzer Utility
 * Handles AI-based plant health analysis using image recognition
 */

export interface PlantAnalysisResult {
  issue: string;
  confidence: number;
  severity: "low" | "medium" | "high";
  recommendations: string[];
  detectedArea?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface PlantDiagnosis {
  plantName: string;
  issue: string;
  description: string;
  recommendations: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  healthScore: number;
}

export class PlantAnalyzer {
  /**
   * Analyze plant image and return diagnosis
   * In production, this would call an ML Kit or external API
   */
  static async analyzeImage(imageUri: string): Promise<PlantAnalysisResult> {
    // Simulated analysis - in production, integrate with ML Kit or cloud API
    return new Promise((resolve) => {
      setTimeout(() => {
        const issues = [
          {
            issue: "Folha Seca",
            confidence: 0.92,
            severity: "high" as const,
            recommendations: [
              "Regar a planta nas próximas 24h",
              "Mover para local com mais luz",
              "Aumentar umidade do ambiente",
            ],
          },
          {
            issue: "Folha Amarelada",
            confidence: 0.78,
            severity: "medium" as const,
            recommendations: [
              "Verificar umidade do solo",
              "Reduzir frequência de rega",
              "Adicionar fertilizante",
            ],
          },
          {
            issue: "Possível Praga",
            confidence: 0.65,
            severity: "high" as const,
            recommendations: [
              "Isolar a planta de outras",
              "Aplicar inseticida natural",
              "Inspecionar folhas regularmente",
            ],
          },
        ];

        const randomIssue = issues[Math.floor(Math.random() * issues.length)];
        resolve({
          ...randomIssue,
          detectedArea: {
            x: Math.random() * 0.5,
            y: Math.random() * 0.5,
            width: 0.3,
            height: 0.3,
          },
        });
      }, 1500);
    });
  }

  /**
   * Convert analysis result to user-friendly diagnosis
   */
  static generateDiagnosis(analysis: PlantAnalysisResult): PlantDiagnosis {
    const diagnosticsMap: Record<string, PlantDiagnosis> = {
      "Folha Seca": {
        plantName: "Planta",
        issue: "Folhas Secas",
        description: "Sua planta está com sede ou em ambiente muito seco.",
        recommendations: [
          {
            icon: "💧",
            title: "Regar a planta",
            description: "Regar nas próximas 24h com água em temperatura ambiente",
          },
          {
            icon: "☀️",
            title: "Aumentar luminosidade",
            description: "Mover para local com mais luz indireta",
          },
          {
            icon: "🌡️",
            title: "Verificar umidade",
            description: "Usar um higrômetro para monitorar a umidade do solo",
          },
        ],
        healthScore: 40,
      },
      "Folha Amarelada": {
        plantName: "Planta",
        issue: "Folhas Amareladas",
        description: "Pode ser excesso de água ou falta de nutrientes.",
        recommendations: [
          {
            icon: "💧",
            title: "Reduzir rega",
            description: "Deixar o solo secar um pouco entre regas",
          },
          {
            icon: "🥗",
            title: "Adicionar fertilizante",
            description: "Usar fertilizante balanceado uma vez por mês",
          },
          {
            icon: "✂️",
            title: "Remover folhas mortas",
            description: "Podar as folhas amareladas para estimular novo crescimento",
          },
        ],
        healthScore: 55,
      },
      "Possível Praga": {
        plantName: "Planta",
        issue: "Possível Infestação",
        description: "Foram detectados possíveis sinais de pragas na planta.",
        recommendations: [
          {
            icon: "🚫",
            title: "Isolar a planta",
            description: "Afastar de outras plantas para evitar contaminação",
          },
          {
            icon: "🧴",
            title: "Aplicar inseticida",
            description: "Usar inseticida natural ou neem oil",
          },
          {
            icon: "🔍",
            title: "Monitorar regularmente",
            description: "Inspecionar folhas a cada 2-3 dias",
          },
        ],
        healthScore: 30,
      },
    };

    return (
      diagnosticsMap[analysis.issue] || {
        plantName: "Planta",
        issue: "Saúde Geral",
        description: "A planta parece estar em bom estado.",
        recommendations: [
          {
            icon: "☀️",
            title: "Manter luz indireta",
            description: "Manter em local com luz indireta e bem ventilado",
          },
          {
            icon: "💧",
            title: "Regar regularmente",
            description: "Manter o solo levemente úmido",
          },
          {
            icon: "🌱",
            title: "Fertilizar mensalmente",
            description: "Usar fertilizante balanceado uma vez por mês",
          },
        ],
        healthScore: 85,
      }
    );
  }
}
