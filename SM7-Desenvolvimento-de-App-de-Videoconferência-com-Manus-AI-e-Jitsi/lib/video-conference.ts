/**
 * Video Conference Utility
 * Handles Jitsi Meet integration for PlantCare Live
 */

export interface ConferenceConfig {
  roomName: string;
  displayName: string;
  serverUrl?: string;
  jwt?: string;
}

export class VideoConferenceManager {
  private static readonly DEFAULT_SERVER = "https://meet.jit.si";

  /**
   * Generate a unique room name for the consultation
   */
  static generateRoomName(userId: string): string {
    const timestamp = Date.now().toString(36);
    return `plantcare-${userId}-${timestamp}`;
  }

  /**
   * Build Jitsi Meet URL for web-based integration
   */
  static buildJitsiUrl(config: ConferenceConfig): string {
    const server = config.serverUrl || this.DEFAULT_SERVER;
    const params = new URLSearchParams({
      displayName: config.displayName,
      email: config.displayName,
    });

    if (config.jwt) {
      params.append("jwt", config.jwt);
    }

    return `${server}/${config.roomName}?${params.toString()}`;
  }

  /**
   * Get conference options for Jitsi SDK
   */
  static getConferenceOptions(config: ConferenceConfig) {
    return {
      room: config.roomName,
      userInfo: {
        displayName: config.displayName,
      },
      configOverwrite: {
        disableAudioLevels: true,
        enableLipSync: true,
      },
      interfaceConfigOverwrite: {
        HIDE_INVITE_BUTTON: true,
        SHOW_CHROME_EXTENSION_BANNER: false,
      },
    };
  }
}
