import { useState, useEffect, useCallback } from 'react';

export type DiscordStatus = 'online' | 'idle' | 'dnd' | 'offline';

export interface LanyardActivity {
  id: string;
  name: string;
  type: number;
  state?: string;
  details?: string;
  timestamps?: { start?: number; end?: number };
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
  metadata?: Record<string, unknown>;
}

export interface LanyardSpotify {
  album_art: string;
  album_art_url?: string; // Lanyard returns album_art_url
  album: string;
  artist: string;
  song: string;
  timestamps: { start: number; end: number };
}

export interface LanyardData {
  discord_user: {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
    global_name?: string;
    display_name?: string;
  };
  discord_status: DiscordStatus;
  activities: LanyardActivity[];
  spotify?: LanyardSpotify | null;
  listening_to_spotify?: boolean;
  kv?: Record<string, string>;
}

interface LanyardResponse {
  success: boolean;
  data?: LanyardData;
}

const LANYARD_WS = 'wss://api.lanyard.rest/socket';
const LANYARD_REST = 'https://api.lanyard.rest/v1/users';

export function useLanyard(userId: string) {
  const [data, setData] = useState<LanyardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRest = useCallback(async () => {
    if (!userId || userId === 'YOUR_DISCORD_USER_ID') {
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`${LANYARD_REST}/${userId}`);
      const json: LanyardResponse = await res.json();
      if (json.success && json.data) {
        setData(json.data);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to fetch');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (!userId || userId === 'YOUR_DISCORD_USER_ID') {
      setLoading(false);
      return;
    }

    let ws: WebSocket;
    let heartbeat: ReturnType<typeof setInterval>;

    const connect = () => {
      ws = new WebSocket(LANYARD_WS);

      ws.onopen = () => {
        ws.send(JSON.stringify({ op: 2, d: { subscribe_to_id: userId } }));
      };

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          if (msg.op === 0 && msg.d) {
            setData(msg.d);
          }
        } catch {
          // ignore parse errors
        }
      };

      ws.onclose = () => {
        clearInterval(heartbeat);
        setTimeout(connect, 5000);
      };

      ws.onerror = () => {
        fetchRest();
      };

      heartbeat = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ op: 3 }));
        }
      }, 30000);
    };

    connect();
    fetchRest();

    return () => {
      if (ws?.readyState === WebSocket.OPEN) ws.close();
      clearInterval(heartbeat);
    };
  }, [userId, fetchRest]);

  return { data, loading, error };
}
