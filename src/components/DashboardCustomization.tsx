import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { 
  Settings,
  Palette,
  Bell,
  Shield,
  Globe,
  Database,
  Sparkles,
  Layout,
  BarChart3,
  Save,
  RefreshCw
} from "lucide-react";

const dashboardWidgets = [
  { id: "analytics", name: "Analytics Overview", enabled: true },
  { id: "recent-posts", name: "Recent Posts", enabled: true },
  { id: "scheduled", name: "Scheduled Posts", enabled: true },
  { id: "engagement", name: "Engagement Metrics", enabled: false },
  { id: "team-activity", name: "Team Activity", enabled: true },
  { id: "ai-insights", name: "AI Insights", enabled: false },
  { id: "platform-stats", name: "Platform Statistics", enabled: true },
  { id: "top-content", name: "Top Performing Content", enabled: false }
];

const themes = [
  { value: "dark", label: "Dark Theme", preview: "bg-slate-900" },
  { value: "light", label: "Light Theme", preview: "bg-white" },
  { value: "blue", label: "Blue Theme", preview: "bg-blue-900" },
  { value: "purple", label: "Purple Theme", preview: "bg-purple-900" }
];

export function DashboardCustomization() {
  const [widgets, setWidgets] = useState(dashboardWidgets);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    digest: true,
    mentions: true,
    teamUpdates: false
  });
  const [preferences, setPreferences] = useState({
    theme: "dark",
    timezone: "UTC",
    dateFormat: "MM/dd/yyyy",
    defaultView: "dashboard",
    autoRefresh: true,
    compactMode: false
  });
  const [aiSettings, setAiSettings] = useState({
    enabled: true,
    suggestions: true,
    autoOptimize: false,
    contentAnalysis: true,
    trendAnalysis: true
  });

  const toggleWidget = (widgetId: string) => {
    setWidgets(prev => prev.map(widget => 
      widget.id === widgetId 
        ? { ...widget, enabled: !widget.enabled }
        : widget
    ));
  };

  const handleSave = () => {
    console.log("Saving settings:", { widgets, notifications, preferences, aiSettings });
    // Save to backend
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Customization</h1>
        <p className="text-muted-foreground">
          Personalize your dashboard and application preferences.
        </p>
      </div>

      {/* Dashboard Layout */}
      <Card className="border-border shadow-secondary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layout className="w-5 h-5 text-primary" />
            Dashboard Widgets
          </CardTitle>
          <CardDescription>
            Choose which widgets to display on your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {widgets.map((widget) => (
              <div key={widget.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/30">
                <div>
                  <Label htmlFor={widget.id} className="font-medium">
                    {widget.name}
                  </Label>
                </div>
                <Switch
                  id={widget.id}
                  checked={widget.enabled}
                  onCheckedChange={() => toggleWidget(widget.id)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Appearance Settings */}
      <Card className="border-border shadow-secondary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-primary" />
            Appearance
          </CardTitle>
          <CardDescription>
            Customize the look and feel of your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label>Theme</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {themes.map((theme) => (
                <div key={theme.value} className="space-y-2">
                  <button
                    onClick={() => setPreferences(prev => ({ ...prev, theme: theme.value }))}
                    className={`w-full h-20 rounded-lg border-2 ${
                      preferences.theme === theme.value 
                        ? "border-primary shadow-glow" 
                        : "border-border"
                    } ${theme.preview} transition-all hover:scale-105`}
                  />
                  <p className="text-sm text-center">{theme.label}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Date Format</Label>
              <Select 
                value={preferences.dateFormat} 
                onValueChange={(value) => setPreferences(prev => ({ ...prev, dateFormat: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MM/dd/yyyy">MM/dd/yyyy</SelectItem>
                  <SelectItem value="dd/MM/yyyy">dd/MM/yyyy</SelectItem>
                  <SelectItem value="yyyy-MM-dd">yyyy-MM-dd</SelectItem>
                  <SelectItem value="MMM dd, yyyy">MMM dd, yyyy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Timezone</Label>
              <Select 
                value={preferences.timezone} 
                onValueChange={(value) => setPreferences(prev => ({ ...prev, timezone: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC">UTC</SelectItem>
                  <SelectItem value="America/New_York">Eastern Time</SelectItem>
                  <SelectItem value="America/Chicago">Central Time</SelectItem>
                  <SelectItem value="America/Denver">Mountain Time</SelectItem>
                  <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                  <SelectItem value="Europe/London">London</SelectItem>
                  <SelectItem value="Europe/Paris">Paris</SelectItem>
                  <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto Refresh Dashboard</Label>
                <p className="text-sm text-muted-foreground">Automatically refresh data every 5 minutes</p>
              </div>
              <Switch
                checked={preferences.autoRefresh}
                onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, autoRefresh: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Compact Mode</Label>
                <p className="text-sm text-muted-foreground">Display more content in less space</p>
              </div>
              <Switch
                checked={preferences.compactMode}
                onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, compactMode: checked }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Settings */}
      <Card className="border-border shadow-secondary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            AI Features
          </CardTitle>
          <CardDescription>
            Configure AI-powered features and suggestions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Enable AI Features</Label>
              <p className="text-sm text-muted-foreground">Turn on AI-powered suggestions and insights</p>
            </div>
            <Switch
              checked={aiSettings.enabled}
              onCheckedChange={(checked) => setAiSettings(prev => ({ ...prev, enabled: checked }))}
            />
          </div>

          {aiSettings.enabled && (
            <>
              <Separator />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Content Suggestions</Label>
                    <p className="text-sm text-muted-foreground">Get AI suggestions for your posts</p>
                  </div>
                  <Switch
                    checked={aiSettings.suggestions}
                    onCheckedChange={(checked) => setAiSettings(prev => ({ ...prev, suggestions: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-Optimization</Label>
                    <p className="text-sm text-muted-foreground">Automatically optimize posts for better performance</p>
                  </div>
                  <Switch
                    checked={aiSettings.autoOptimize}
                    onCheckedChange={(checked) => setAiSettings(prev => ({ ...prev, autoOptimize: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Content Analysis</Label>
                    <p className="text-sm text-muted-foreground">Analyze content performance and engagement</p>
                  </div>
                  <Switch
                    checked={aiSettings.contentAnalysis}
                    onCheckedChange={(checked) => setAiSettings(prev => ({ ...prev, contentAnalysis: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Trend Analysis</Label>
                    <p className="text-sm text-muted-foreground">Monitor trends and suggest optimal posting times</p>
                  </div>
                  <Switch
                    checked={aiSettings.trendAnalysis}
                    onCheckedChange={(checked) => setAiSettings(prev => ({ ...prev, trendAnalysis: checked }))}
                  />
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="border-border shadow-secondary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            Notifications
          </CardTitle>
          <CardDescription>
            Manage how you receive updates and alerts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive important updates via email</p>
            </div>
            <Switch
              checked={notifications.email}
              onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, email: checked }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Push Notifications</Label>
              <p className="text-sm text-muted-foreground">Get instant notifications in your browser</p>
            </div>
            <Switch
              checked={notifications.push}
              onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, push: checked }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Weekly Digest</Label>
              <p className="text-sm text-muted-foreground">Receive a weekly summary of your performance</p>
            </div>
            <Switch
              checked={notifications.digest}
              onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, digest: checked }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Mentions & Tags</Label>
              <p className="text-sm text-muted-foreground">Get notified when you're mentioned</p>
            </div>
            <Switch
              checked={notifications.mentions}
              onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, mentions: checked }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Team Updates</Label>
              <p className="text-sm text-muted-foreground">Notifications about team member activity</p>
            </div>
            <Switch
              checked={notifications.teamUpdates}
              onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, teamUpdates: checked }))}
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Settings */}
      <div className="flex gap-3">
        <Button onClick={handleSave} className="gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </Button>
        <Button variant="outline" className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Reset to Defaults
        </Button>
      </div>
    </div>
  );
}