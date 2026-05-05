/**
 * Consultation History Utility
 * Manages local storage of plant consultations using AsyncStorage
 */

import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Consultation {
  id: string;
  plantName: string;
  icon: string;
  diagnosis: string;
  description: string;
  recommendations: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  healthScore: number;
  date: string;
  timestamp: number;
}

const STORAGE_KEY = "@plantcare_consultations";

export class ConsultationHistory {
  /**
   * Save a new consultation to local storage
   */
  static async saveConsultation(consultation: Consultation): Promise<void> {
    try {
      const existing = await this.getAll();
      const updated = [consultation, ...existing];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error("Error saving consultation:", error);
      throw error;
    }
  }

  /**
   * Get all consultations from local storage
   */
  static async getAll(): Promise<Consultation[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error retrieving consultations:", error);
      return [];
    }
  }

  /**
   * Get a specific consultation by ID
   */
  static async getById(id: string): Promise<Consultation | null> {
    try {
      const all = await this.getAll();
      return all.find((c) => c.id === id) || null;
    } catch (error) {
      console.error("Error retrieving consultation:", error);
      return null;
    }
  }

  /**
   * Delete a consultation by ID
   */
  static async deleteById(id: string): Promise<void> {
    try {
      const all = await this.getAll();
      const filtered = all.filter((c) => c.id !== id);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error("Error deleting consultation:", error);
      throw error;
    }
  }

  /**
   * Clear all consultations
   */
  static async clearAll(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Error clearing consultations:", error);
      throw error;
    }
  }

  /**
   * Generate a unique consultation ID
   */
  static generateId(): string {
    return `consultation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
