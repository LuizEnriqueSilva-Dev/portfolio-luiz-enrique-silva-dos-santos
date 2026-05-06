# PlantCare Live - Aplicativo Móvel

Um aplicativo React Native desenvolvido com Expo que oferece consultoria botânica em tempo real com análise de plantas por inteligência artificial, videoconferência integrada e recomendações personalizadas de cuidado.

# Link de Pré-Visualização: https://manus.im/app-preview/8fRxWN7B9ZvECBoUiMJnAe?sessionId=fbnbQ2ZXdYB9GD2fa6lr73
# QR-Code: 
<img width="218" height="216" alt="Captura de tela 2026-05-04 224812" src="https://github.com/user-attachments/assets/5037952c-a9aa-4b2d-88fa-e2b587fa4a3d" />
 
# Visão Geral

PlantCare Live permite que usuários fotografem suas plantas e recebam diagnósticos instantâneos sobre problemas de saúde, como folhas secas, amareladas ou possível infestação de pragas. O aplicativo integra videoconferência para consultas com especialistas e utiliza análise de imagem com inteligência artificial para fornecer recomendações precisas e acionáveis.

# 🌱 Proposta de Valor

O PlantCare Live é um aplicativo de consultoria botânica em tempo real que combina videoconferência com inteligência artificial para ajudar usuários a identificar problemas em plantas de forma rápida e prática. Através da câmera, especialistas ou a IA analisam a planta ao vivo e indicam ações como poda, rega ou cuidados necessários diretamente na tela, oferecendo uma experiência interativa e acessível sem precisar sair de casa.
## Tecnologias Utilizadas

O projeto é construído com as seguintes tecnologias principais:

| Tecnologia | Versão | Propósito |
|-----------|--------|----------|
| **React Native** | 0.81 | Framework mobile multiplataforma |
| **Expo** | 54 | Plataforma de desenvolvimento e build |
| **TypeScript** | 5.9 | Tipagem estática e segurança |
| **Jetpack Compose** | 1.5 | UI reativa com Tailwind CSS (NativeWind) |
| **Expo Router** | 6 | Navegação entre telas |
| **AsyncStorage** | 2.2 | Armazenamento local de dados |
| **React Query** | 5.90 | Gerenciamento de estado e cache |

## Funcionalidades Principais

### 1. **Tela Inicial (Home)**
Exibe um histórico de plantas analisadas anteriormente com opção para iniciar uma nova consulta. Cada item mostra o nome da planta, diagnóstico e data da análise.

### 2. **Consulta em Tempo Real (Call Screen)**
Interface de videoconferência com overlay de análise de IA. Inclui controles para ativar/desativar microfone, câmera e encerrar a chamada. Um card flutuante mostra o status da detecção de IA em tempo real.

### 3. **Análise de Plantas (Plant Analyzer)**
Módulo de inteligência artificial que analisa imagens de plantas e detecta problemas como folhas secas, amareladas ou possível presença de pragas. Retorna um diagnóstico com recomendações específicas.

### 4. **Histórico de Consultas**
Armazena todas as consultas realizadas localmente com detalhes completos, incluindo diagnóstico, recomendações e data. Usuários podem acessar histórico anterior a qualquer momento.

### 5. **Sistema de Recomendações**
Fornece sugestões personalizadas baseadas no diagnóstico, como regar a planta, aumentar luminosidade ou aplicar tratamentos específicos.

## Estrutura do Projeto

```
plantcare-live-mobile/
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx          # Configuração de abas
│   │   └── index.tsx            # Tela inicial (Home)
│   ├── call/
│   │   └── index.tsx            # Tela de videoconferência
│   ├── history/
│   │   └── [id].tsx             # Detalhes de consulta anterior
│   ├── _layout.tsx              # Layout raiz
│   └── oauth/
│       └── callback.tsx         # Callback OAuth
├── components/
│   ├── screen-container.tsx     # Wrapper com SafeArea
│   ├── recommendation-card.tsx  # Card de recomendação
│   ├── ai-status-overlay.tsx    # Overlay de status da IA
│   ├── haptic-tab.tsx           # Tab com feedback háptico
│   ├── themed-view.tsx          # View com tema
│   └── ui/
│       └── icon-symbol.tsx      # Mapeamento de ícones
├── lib/
│   ├── video-conference.ts      # Gerenciador de videoconferência
│   ├── plant-analyzer.ts        # Análise de plantas com IA
│   ├── consultation-history.ts  # Histórico local de consultas
│   ├── trpc.ts                  # Cliente tRPC
│   ├── utils.ts                 # Funções utilitárias
│   ├── theme-provider.tsx       # Provedor de tema
│   └── _core/
│       ├── theme.ts             # Configuração de cores
│       ├── manus-runtime.ts     # Runtime do Manus
│       └── nativewind-pressable.ts
├── hooks/
│   ├── use-colors.ts            # Hook para cores do tema
│   ├── use-color-scheme.ts      # Hook para detectar modo claro/escuro
│   └── use-auth.ts              # Hook para autenticação
├── constants/
│   └── theme.ts                 # Constantes de tema
├── assets/
│   ├── images/
│   │   ├── icon.png             # Ícone do app
│   │   ├── splash-icon.png      # Ícone da splash screen
│   │   ├── favicon.png          # Favicon web
│   │   ├── android-icon-foreground.png
│   │   ├── android-icon-background.png
│   │   └── android-icon-monochrome.png
│   └── fonts/
├── design.md                    # Documentação de design
├── todo.md                      # Lista de tarefas
├── app.config.ts                # Configuração Expo
├── tailwind.config.js           # Configuração Tailwind
├── theme.config.js              # Paleta de cores
├── package.json                 # Dependências
├── tsconfig.json                # Configuração TypeScript
└── README.md                    # Este arquivo
```

## Como Começar

### Pré-requisitos

Certifique-se de ter instalado:

- **Node.js** 18+ e **npm** ou **pnpm**
- **Expo CLI**: `npm install -g expo-cli`
- **Expo Go** (aplicativo mobile para iOS ou Android)

### Instalação

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repositorio>
   cd plantcare-live-mobile
   ```

2. **Instale as dependências:**
   ```bash
   pnpm install
   # ou
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   pnpm dev
   # ou
   npm run dev
   ```

4. **Abra no Expo Go:**
   - Escaneie o código QR exibido no terminal com o Expo Go
   - Ou acesse `http://localhost:8081` no navegador

### Build para Produção

#### Android (APK)

```bash
eas build --platform android --profile preview
```

#### iOS

```bash
eas build --platform ios --profile preview
```

Para builds de produção, use o perfil `production` em vez de `preview`.

## Uso do Aplicativo

### Iniciar uma Consulta

1. Na tela inicial, clique no botão "🎥 Iniciar Consulta"
2. A tela de videoconferência abrirá com a câmera ativa
3. O módulo de IA começará a analisar automaticamente
4. Um card flutuante mostrará o status da detecção

### Visualizar Histórico

1. Na tela inicial, role para baixo até "Histórico de Análises"
2. Clique em qualquer item para ver detalhes completos
3. Veja o diagnóstico e recomendações anteriores
4. Inicie uma nova consulta a partir da tela de detalhes

### Controles da Chamada

- **🎤 Mute**: Ativa/desativa o microfone
- **📷 Câmera**: Alterna entre câmera frontal e traseira
- **📞 Sair**: Encerra a chamada e retorna à tela inicial

## Configuração de Cores (Tema)

O aplicativo utiliza uma paleta de cores verde focada em botânica:

| Cor | Valor | Uso |
|-----|-------|-----|
| **Primary** | `#2E7D32` | Botões principais, destaques |
| **Secondary** | `#4CAF50` | Elementos secundários, sucesso |
| **Tertiary** | `#81C784` | Backgrounds suaves |
| **Background** | `#FFFFFF` / `#151718` | Fundo das telas |
| **Surface** | `#F5F5F5` / `#1E2022` | Cards e superfícies |
| **Foreground** | `#11181C` / `#ECEDEE` | Texto principal |
| **Muted** | `#687076` / `#9BA1A6` | Texto secundário |

As cores são definidas em `theme.config.js` e aplicadas automaticamente em modo claro e escuro.

## Análise de Plantas com IA

O módulo `PlantAnalyzer` utiliza análise de imagem para detectar problemas em plantas. Atualmente, suporta detecção de:

- **Folhas Secas**: Indica falta de água ou ambiente muito seco
- **Folhas Amareladas**: Pode indicar excesso de água ou falta de nutrientes
- **Possível Praga**: Detecta possíveis sinais de infestação

Cada detecção retorna um diagnóstico com recomendações específicas de cuidado.

## Armazenamento Local

O aplicativo utiliza `AsyncStorage` para armazenar consultas localmente. Os dados são persistidos automaticamente e podem ser acessados mesmo sem conexão com a internet.

Para limpar o histórico:
```typescript
import { ConsultationHistory } from "@/lib/consultation-history";
await ConsultationHistory.clearAll();
```

## Desenvolvimento

### Adicionar uma Nova Tela

1. Crie um novo arquivo em `app/nova-tela/index.tsx`
2. Use o componente `ScreenContainer` para SafeArea
3. Importe `useColors()` para acessar as cores do tema
4. Adicione a rota em `app/_layout.tsx` se necessário

### Adicionar um Novo Componente

1. Crie o arquivo em `components/novo-componente.tsx`
2. Exporte como função React
3. Use Tailwind classes ou `useColors()` para estilos

### Estilização

O projeto utiliza **NativeWind** (Tailwind CSS para React Native). Use classes Tailwind diretamente:

```tsx
<View className="flex-1 items-center justify-center p-4">
  <Text className="text-2xl font-bold text-foreground">
    Olá!
  </Text>
</View>
```

## Troubleshooting

### Erro: "Metro error: SyntaxError"
- Verifique se não há erros de sintaxe nos arquivos TypeScript
- Limpe o cache: `expo start --clear`

### Câmera não funciona
- Certifique-se de que as permissões foram concedidas no dispositivo
- Verifique `app.json` para configuração de permissões

### Histórico não persiste
- Verifique se `AsyncStorage` está funcionando corretamente
- Limpe o armazenamento do app e tente novamente

## Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## Suporte

Para reportar bugs ou solicitar funcionalidades, abra uma issue no repositório. Para suporte técnico, consulte a documentação do Expo em [https://docs.expo.dev](https://docs.expo.dev).

## Roadmap

- [ ] Integração com Jitsi Meet para videoconferência real
- [ ] Autenticação de usuários com Firebase
- [ ] Sincronização de histórico na nuvem
- [ ] Notificações push para lembretes de cuidado
- [ ] Compartilhamento de diagnósticos
- [ ] Modo offline completo
- [ ] Suporte a múltiplos idiomas


