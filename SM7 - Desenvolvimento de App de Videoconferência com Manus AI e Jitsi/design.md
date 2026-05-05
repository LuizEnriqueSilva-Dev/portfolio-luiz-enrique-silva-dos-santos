# Design do PlantCare Live

## Orientação e Uso

O aplicativo é otimizado para **orientação vertical (portrait)** e **uso com uma mão**, seguindo as diretrizes de design do iOS (Apple Human Interface Guidelines).

## Paleta de Cores

| Elemento | Cor | Uso |
|----------|-----|-----|
| **Primary** | `#2E7D32` (Verde Escuro) | Botões principais, destaques |
| **Secondary** | `#4CAF50` (Verde Médio) | Elementos secundários, sucesso |
| **Tertiary** | `#81C784` (Verde Claro) | Backgrounds suaves, destaque de IA |
| **Background** | `#FFFFFF` / `#151718` (Dark) | Fundo das telas |
| **Surface** | `#F5F5F5` / `#1E2022` (Dark) | Cards, superfícies elevadas |
| **Foreground** | `#11181C` / `#ECEDEE` (Dark) | Texto principal |
| **Muted** | `#687076` / `#9BA1A6` (Dark) | Texto secundário |

## Telas Principais

### 1. **Home Screen** (Tela Inicial)
**Objetivo:** Exibir histórico de plantas analisadas e iniciar nova consulta.

**Componentes:**
- Header com título "PlantCare Live"
- Botão destacado "Iniciar Consulta" (verde primário)
- Seção "Histórico de Análises" com lista de plantas
- Cada item do histórico mostra: nome da planta, data, status (ícone)

**Layout:**
```
┌─────────────────────────┐
│  PlantCare Live         │ (Header)
├─────────────────────────┤
│                         │
│  [Iniciar Consulta]     │ (CTA Button)
│                         │
├─────────────────────────┤
│ Histórico de Análises   │ (Section Title)
├─────────────────────────┤
│ 🌱 Samambaia            │
│    Folha Seca - 04/05   │
├─────────────────────────┤
│ 🌿 Suculenta            │
│    Saudável - 03/05     │
└─────────────────────────┘
```

### 2. **Call Screen** (Tela de Consulta)
**Objetivo:** Exibir vídeo da chamada, overlay de IA e controles.

**Componentes:**
- Área de vídeo principal (fullscreen)
- Overlay de IA com detecções em tempo real
- Cards flutuantes com recomendações
- Barra de controle inferior (Mute, Câmera, Sair)

**Layout:**
```
┌─────────────────────────┐
│                         │
│   [Vídeo da Chamada]    │ (Jitsi/Video Area)
│                         │
│  ┌─────────────────┐    │
│  │ Status IA: Ativo│    │ (AI Status Card)
│  │ Detecção: Folha │    │
│  └─────────────────┘    │
│                         │
├─────────────────────────┤
│ [Mute] [Câmera] [Sair]  │ (Control Bar)
└─────────────────────────┘
```

### 3. **Recommendations Screen** (Recomendações)
**Objetivo:** Exibir diagnóstico e sugestões de cuidado.

**Componentes:**
- Imagem/preview da planta analisada
- Diagnóstico principal (título + descrição)
- Lista de recomendações em cards
- Botão "Salvar no Histórico"

**Layout:**
```
┌─────────────────────────┐
│   [Imagem da Planta]    │
├─────────────────────────┤
│ Folhas Secas            │ (Diagnosis Title)
│ Sua planta está com     │ (Description)
│ sede ou em ambiente     │
│ muito seco.             │
├─────────────────────────┤
│ 💧 Regar nas próximas   │ (Recommendation Card)
│    24h                  │
├─────────────────────────┤
│ ☀️  Mover para local    │ (Recommendation Card)
│    com mais luz         │
├─────────────────────────┤
│ [Salvar no Histórico]   │ (Action Button)
└─────────────────────────┘
```

### 4. **History Detail Screen** (Detalhes do Histórico)
**Objetivo:** Exibir detalhes de uma consulta anterior.

**Componentes:**
- Data e hora da consulta
- Diagnóstico realizado
- Recomendações aplicadas
- Botão para iniciar nova consulta

## Fluxos Principais

### Fluxo 1: Iniciar Consulta
1. Usuário clica em "Iniciar Consulta" na Home
2. App abre a tela de Consulta com vídeo ativo
3. Câmera começa a capturar frames para análise de IA
4. Recomendações aparecem em tempo real

### Fluxo 2: Visualizar Histórico
1. Usuário clica em um item do histórico na Home
2. App exibe detalhes da consulta anterior
3. Usuário pode iniciar uma nova consulta a partir dali

## Componentes Reutilizáveis

- **RecommendationCard:** Exibe uma recomendação com ícone e texto
- **PlantHistoryItem:** Item do histórico com nome, data e status
- **AIStatusOverlay:** Card flutuante com status da IA
- **ControlBar:** Barra de controles (Mute, Câmera, Sair)

## Tipografia

| Elemento | Tamanho | Peso |
|----------|---------|------|
| Títulos de Tela | 28px | Bold (700) |
| Subtítulos | 18px | SemiBold (600) |
| Corpo de Texto | 16px | Regular (400) |
| Texto Pequeno | 12px | Regular (400) |

## Espaçamento

- **Padding Padrão:** 16dp
- **Gap entre Elementos:** 8-12dp
- **Margem de Cards:** 4dp (vertical)
