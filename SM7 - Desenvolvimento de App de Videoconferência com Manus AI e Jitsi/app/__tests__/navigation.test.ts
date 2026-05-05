import { describe, it, expect } from "vitest";
import { PlantAnalyzer } from "../../lib/plant-analyzer";
import { VideoConferenceManager } from "../../lib/video-conference";

describe("PlantCare Live - Core Functionality", () => {
  describe("Plant Analyzer", () => {
    it("should analyze an image and return a diagnosis", async () => {
      const result = await PlantAnalyzer.analyzeImage("test-image-uri");

      expect(result).toBeDefined();
      expect(result.issue).toBeDefined();
      expect(result.confidence).toBeGreaterThan(0);
      expect(result.confidence).toBeLessThanOrEqual(1);
      expect(["low", "medium", "high"]).toContain(result.severity);
    });

    it("should generate a diagnosis from analysis result", async () => {
      const result = await PlantAnalyzer.analyzeImage("test-image-uri");
      const diagnosis = PlantAnalyzer.generateDiagnosis(result);

      expect(diagnosis).toBeDefined();
      expect(diagnosis.issue).toBeDefined();
      expect(diagnosis.description).toBeDefined();
      expect(diagnosis.recommendations).toBeInstanceOf(Array);
      expect(diagnosis.healthScore).toBeGreaterThanOrEqual(0);
      expect(diagnosis.healthScore).toBeLessThanOrEqual(100);
    });

    it("should return recommendations array with proper structure", async () => {
      const result = await PlantAnalyzer.analyzeImage("test-image-uri");
      const diagnosis = PlantAnalyzer.generateDiagnosis(result);

      expect(diagnosis.recommendations.length).toBeGreaterThan(0);
      diagnosis.recommendations.forEach((rec) => {
        expect(rec.icon).toBeDefined();
        expect(typeof rec.icon).toBe("string");
        expect(rec.title).toBeDefined();
        expect(typeof rec.title).toBe("string");
        expect(rec.description).toBeDefined();
        expect(typeof rec.description).toBe("string");
      });
    });

    it("should handle different issue types", async () => {
      const result1 = await PlantAnalyzer.analyzeImage("test-1");
      const result2 = await PlantAnalyzer.analyzeImage("test-2");

      expect(result1.issue).toBeDefined();
      expect(result2.issue).toBeDefined();
      expect(["Folha Seca", "Folha Amarelada", "Possível Praga"]).toContain(
        result1.issue
      );
      expect(["Folha Seca", "Folha Amarelada", "Possível Praga"]).toContain(
        result2.issue
      );
    });
  });

  describe("Video Conference Manager", () => {
    it("should generate room names with correct format", () => {
      const roomName1 = VideoConferenceManager.generateRoomName("user-123");
      const roomName2 = VideoConferenceManager.generateRoomName("user-456");

      expect(roomName1).toMatch(/^plantcare-user-123-/);
      expect(roomName2).toMatch(/^plantcare-user-456-/);
      expect(roomName1).not.toBe(roomName2);
    });

    it("should build a valid Jitsi URL", () => {
      const url = VideoConferenceManager.buildJitsiUrl({
        roomName: "test-room",
        displayName: "Test User",
      });

      expect(url).toContain("meet.jit.si");
      expect(url).toContain("test-room");
      expect(url).toContain("displayName");
    });

    it("should build URL with custom server", () => {
      const url = VideoConferenceManager.buildJitsiUrl({
        roomName: "test-room",
        displayName: "Test User",
        serverUrl: "https://custom.server.com",
      });

      expect(url).toContain("custom.server.com");
      expect(url).toContain("test-room");
    });

    it("should get valid conference options", () => {
      const options = VideoConferenceManager.getConferenceOptions({
        roomName: "test-room",
        displayName: "Test User",
      });

      expect(options.room).toBe("test-room");
      expect(options.userInfo.displayName).toBe("Test User");
      expect(options.configOverwrite).toBeDefined();
      expect(options.interfaceConfigOverwrite).toBeDefined();
    });

    it("should have correct config overwrite settings", () => {
      const options = VideoConferenceManager.getConferenceOptions({
        roomName: "test",
        displayName: "User",
      });

      expect(options.configOverwrite.disableAudioLevels).toBe(true);
      expect(options.configOverwrite.enableLipSync).toBe(true);
    });

    it("should have correct interface config overwrite settings", () => {
      const options = VideoConferenceManager.getConferenceOptions({
        roomName: "test",
        displayName: "User",
      });

      expect(options.interfaceConfigOverwrite.HIDE_INVITE_BUTTON).toBe(true);
      expect(options.interfaceConfigOverwrite.SHOW_CHROME_EXTENSION_BANNER).toBe(
        false
      );
    });
  });

  describe("Diagnosis Logic", () => {
    it("should generate correct diagnosis for dry leaves", () => {
      const mockResult = {
        issue: "Folha Seca",
        confidence: 0.92,
        severity: "high" as const,
        recommendations: [],
        detectedArea: { x: 0, y: 0, width: 0.3, height: 0.3 },
      };

      const diagnosis = PlantAnalyzer.generateDiagnosis(mockResult);

      expect(diagnosis.issue).toBe("Folhas Secas");
      expect(diagnosis.healthScore).toBe(40);
      expect(diagnosis.recommendations.length).toBeGreaterThan(0);
    });

    it("should generate correct diagnosis for yellow leaves", () => {
      const mockResult = {
        issue: "Folha Amarelada",
        confidence: 0.78,
        severity: "medium" as const,
        recommendations: [],
        detectedArea: { x: 0, y: 0, width: 0.3, height: 0.3 },
      };

      const diagnosis = PlantAnalyzer.generateDiagnosis(mockResult);

      expect(diagnosis.issue).toBe("Folhas Amareladas");
      expect(diagnosis.healthScore).toBe(55);
    });

    it("should generate correct diagnosis for pests", () => {
      const mockResult = {
        issue: "Possível Praga",
        confidence: 0.65,
        severity: "high" as const,
        recommendations: [],
        detectedArea: { x: 0, y: 0, width: 0.3, height: 0.3 },
      };

      const diagnosis = PlantAnalyzer.generateDiagnosis(mockResult);

      expect(diagnosis.issue).toBe("Possível Infestação");
      expect(diagnosis.healthScore).toBe(30);
    });

    it("should generate default diagnosis for unknown issues", () => {
      const mockResult = {
        issue: "Unknown Issue",
        confidence: 0.5,
        severity: "low" as const,
        recommendations: [],
        detectedArea: { x: 0, y: 0, width: 0.3, height: 0.3 },
      };

      const diagnosis = PlantAnalyzer.generateDiagnosis(mockResult);

      expect(diagnosis.issue).toBe("Saúde Geral");
      expect(diagnosis.healthScore).toBe(85);
    });
  });
});
