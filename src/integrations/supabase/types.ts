export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      ai_suggestions: {
        Row: {
          confidence_score: number | null
          created_at: string | null
          id: string
          is_applied: boolean | null
          original_content: string | null
          post_id: string | null
          suggested_content: string
          suggestion_type: Database["public"]["Enums"]["suggestion_type"]
          user_id: string
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string | null
          id?: string
          is_applied?: boolean | null
          original_content?: string | null
          post_id?: string | null
          suggested_content: string
          suggestion_type: Database["public"]["Enums"]["suggestion_type"]
          user_id: string
        }
        Update: {
          confidence_score?: number | null
          created_at?: string | null
          id?: string
          is_applied?: boolean | null
          original_content?: string | null
          post_id?: string | null
          suggested_content?: string
          suggestion_type?: Database["public"]["Enums"]["suggestion_type"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_suggestions_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          content: string
          created_at: string | null
          id: string
          platform_id: string
          post_id: string | null
          status: string | null
          target_criteria: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          platform_id: string
          post_id?: string | null
          status?: string | null
          target_criteria?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          platform_id?: string
          post_id?: string | null
          status?: string | null
          target_criteria?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_platform_id_fkey"
            columns: ["platform_id"]
            isOneToOne: false
            referencedRelation: "platforms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      dashboard_settings: {
        Row: {
          created_at: string | null
          id: string
          layout_config: Json | null
          updated_at: string | null
          user_id: string
          widget_config: Json | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          layout_config?: Json | null
          updated_at?: string | null
          user_id: string
          widget_config?: Json | null
        }
        Update: {
          created_at?: string | null
          id?: string
          layout_config?: Json | null
          updated_at?: string | null
          user_id?: string
          widget_config?: Json | null
        }
        Relationships: []
      }
      platforms: {
        Row: {
          auth_details: Json | null
          created_at: string | null
          id: string
          is_active: boolean | null
          name: string
        }
        Insert: {
          auth_details?: Json | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name: string
        }
        Update: {
          auth_details?: Json | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
        }
        Relationships: []
      }
      post_analytics: {
        Row: {
          clicks: number | null
          comments: number | null
          engagement_rate: number | null
          id: string
          impressions: number | null
          last_updated: string | null
          likes: number | null
          platform: string
          post_id: string
          reach: number | null
          saves: number | null
          shares: number | null
        }
        Insert: {
          clicks?: number | null
          comments?: number | null
          engagement_rate?: number | null
          id?: string
          impressions?: number | null
          last_updated?: string | null
          likes?: number | null
          platform: string
          post_id: string
          reach?: number | null
          saves?: number | null
          shares?: number | null
        }
        Update: {
          clicks?: number | null
          comments?: number | null
          engagement_rate?: number | null
          id?: string
          impressions?: number | null
          last_updated?: string | null
          likes?: number | null
          platform?: string
          post_id?: string
          reach?: number | null
          saves?: number | null
          shares?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "post_analytics_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          ai_optimized: boolean | null
          clicks: number | null
          content: string
          created_at: string | null
          engagement_score: number | null
          id: string
          impressions: number | null
          media_urls: string[] | null
          platform_id: string
          reach: number | null
          schedule: string | null
          status: Database["public"]["Enums"]["post_status"]
          team_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          ai_optimized?: boolean | null
          clicks?: number | null
          content: string
          created_at?: string | null
          engagement_score?: number | null
          id?: string
          impressions?: number | null
          media_urls?: string[] | null
          platform_id: string
          reach?: number | null
          schedule?: string | null
          status?: Database["public"]["Enums"]["post_status"]
          team_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          ai_optimized?: boolean | null
          clicks?: number | null
          content?: string
          created_at?: string | null
          engagement_score?: number | null
          id?: string
          impressions?: number | null
          media_urls?: string[] | null
          platform_id?: string
          reach?: number | null
          schedule?: string | null
          status?: Database["public"]["Enums"]["post_status"]
          team_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_platform_id_fkey"
            columns: ["platform_id"]
            isOneToOne: false
            referencedRelation: "platforms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      team_members: {
        Row: {
          id: string
          invited_by: string
          joined_at: string | null
          role: Database["public"]["Enums"]["team_role"]
          team_id: string
          user_id: string
        }
        Insert: {
          id?: string
          invited_by: string
          joined_at?: string | null
          role?: Database["public"]["Enums"]["team_role"]
          team_id: string
          user_id: string
        }
        Update: {
          id?: string
          invited_by?: string
          joined_at?: string | null
          role?: Database["public"]["Enums"]["team_role"]
          team_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          owner_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          owner_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          owner_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          api_keys: Json | null
          created_at: string | null
          email: string
          id: string
          updated_at: string | null
        }
        Insert: {
          api_keys?: Json | null
          created_at?: string | null
          email: string
          id?: string
          updated_at?: string | null
        }
        Update: {
          api_keys?: Json | null
          created_at?: string | null
          email?: string
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      post_status: "draft" | "scheduled" | "published" | "failed"
      suggestion_type: "content" | "hashtags" | "timing" | "optimization"
      team_role: "owner" | "admin" | "editor" | "viewer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      post_status: ["draft", "scheduled", "published", "failed"],
      suggestion_type: ["content", "hashtags", "timing", "optimization"],
      team_role: ["owner", "admin", "editor", "viewer"],
    },
  },
} as const
