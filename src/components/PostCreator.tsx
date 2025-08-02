import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  CalendarIcon, 
  ImageIcon, 
  Sparkles, 
  Send, 
  Clock,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Users,
  X,
  Loader2
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const platforms = [
  { id: "twitter", name: "Twitter", icon: Twitter, color: "bg-[#1DA1F2]", maxChars: 280 },
  { id: "facebook", name: "Facebook", icon: Facebook, color: "bg-[#1877F2]", maxChars: 63206 },
  { id: "instagram", name: "Instagram", icon: Instagram, color: "bg-[#E4405F]", maxChars: 2200 },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "bg-[#0A66C2]", maxChars: 3000 },
  { id: "tiktok", name: "TikTok", icon: Users, color: "bg-black", maxChars: 2200 },
  { id: "pinterest", name: "Pinterest", icon: ImageIcon, color: "bg-[#E60023]", maxChars: 500 },
  { id: "snapchat", name: "Snapchat", icon: Users, color: "bg-[#FFFC00]", maxChars: 250 },
];

const aiSuggestions = [
  "Add relevant hashtags to increase reach",
  "Consider posting during peak hours (6-9 PM)",
  "Include a call-to-action to boost engagement",
  "Add emojis to make your post more engaging",
];

export function PostCreator() {
  const [content, setContent] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const [newMediaUrl, setNewMediaUrl] = useState("");
  const [scheduleDate, setScheduleDate] = useState<Date>();
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);
  const [profileKey, setProfileKey] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const getMaxChars = () => {
    if (selectedPlatforms.length === 0) return 280;
    const selectedPlatformChars = selectedPlatforms.map(id => 
      platforms.find(p => p.id === id)?.maxChars || 280
    );
    return Math.min(...selectedPlatformChars);
  };

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const addMediaUrl = () => {
    if (newMediaUrl.trim()) {
      setMediaUrls(prev => [...prev, newMediaUrl.trim()]);
      setNewMediaUrl("");
    }
  };

  const removeMediaUrl = (index: number) => {
    setMediaUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim() || selectedPlatforms.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please provide content and select at least one platform.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Get current user session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        toast({
          title: "Authentication Error",
          description: "Please log in to create posts.",
          variant: "destructive",
        });
        return;
      }

      // Call the edge function
      const { data, error } = await supabase.functions.invoke('create-post', {
        body: {
          content,
          platforms: selectedPlatforms,
          mediaUrls,
          scheduleDate: scheduleDate?.toISOString(),
          profileKey: profileKey.trim() || undefined,
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        throw error;
      }

      if (data.success) {
        toast({
          title: "Success!",
          description: data.message,
        });

        // Reset form
        setContent("");
        setSelectedPlatforms([]);
        setMediaUrls([]);
        setNewMediaUrl("");
        setScheduleDate(undefined);
        setProfileKey("");
        setShowAiSuggestions(false);
      } else {
        throw new Error(data.error || 'Failed to create post');
      }

    } catch (error: any) {
      console.error('Error creating post:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-border shadow-secondary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Create New Post
          </CardTitle>
          <CardDescription>
            Craft your message and schedule it across multiple platforms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Content */}
            <div className="space-y-2">
              <Label htmlFor="content">Post Content</Label>
              <Textarea
                id="content"
                placeholder="What's on your mind? Share your thoughts..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[120px] resize-none"
              />
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span className={cn(
                  content.length > getMaxChars() && "text-destructive font-medium"
                )}>
                  {content.length}/{getMaxChars()} characters
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAiSuggestions(!showAiSuggestions)}
                  className="gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  AI Suggestions
                </Button>
              </div>
            </div>

            {/* AI Suggestions */}
            {showAiSuggestions && (
              <Card className="bg-gradient-secondary border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    AI-Powered Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {aiSuggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                      {suggestion}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Platform Selection */}
            <div className="space-y-3">
              <Label>Select Platforms</Label>
              <div className="grid grid-cols-2 gap-3">
                {platforms.map((platform) => {
                  const Icon = platform.icon;
                  const isSelected = selectedPlatforms.includes(platform.id);
                  
                  return (
                    <Button
                      key={platform.id}
                      type="button"
                      variant={isSelected ? "default" : "outline"}
                      className={cn(
                        "justify-start gap-3 h-12",
                        isSelected && "shadow-glow"
                      )}
                      onClick={() => togglePlatform(platform.id)}
                    >
                      <div className={cn(
                        "w-6 h-6 rounded flex items-center justify-center", 
                        platform.color,
                        platform.id === "snapchat" && "text-black"
                      )}>
                        <Icon className={cn(
                          "w-3 h-3",
                          platform.id === "snapchat" ? "text-black" : "text-white"
                        )} />
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-sm">{platform.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {platform.maxChars} chars
                        </span>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Profile Key */}
            <div className="space-y-2">
              <Label htmlFor="profileKey">Profile Key (Optional)</Label>
              <Input
                id="profileKey"
                placeholder="Enter profile key for multi-user posting"
                value={profileKey}
                onChange={(e) => setProfileKey(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Add a profile key to enable collaborative posting for your team
              </p>
            </div>

            {/* Media URLs */}
            <div className="space-y-3">
              <Label>Media URLs (Optional)</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="https://example.com/image.jpg"
                  value={newMediaUrl}
                  onChange={(e) => setNewMediaUrl(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addMediaUrl())}
                />
                <Button type="button" variant="outline" onClick={addMediaUrl}>
                  <ImageIcon className="w-4 h-4" />
                </Button>
              </div>
              {mediaUrls.length > 0 && (
                <div className="space-y-2">
                  {mediaUrls.map((url, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded-md">
                      <ImageIcon className="w-4 h-4 text-muted-foreground" />
                      <span className="flex-1 text-sm truncate">{url}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMediaUrl(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Schedule */}
            <div className="space-y-3">
              <Label>Schedule (Optional)</Label>
              <div className="flex gap-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal",
                        !scheduleDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {scheduleDate ? format(scheduleDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={scheduleDate}
                      onSelect={setScheduleDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                
                {scheduleDate && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setScheduleDate(undefined)}
                  >
                    Clear
                  </Button>
                )}
              </div>
            </div>

            <Separator />

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                type="submit"
                variant="gradient"
                className="flex-1"
                disabled={!content.trim() || selectedPlatforms.length === 0 || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {scheduleDate ? "Scheduling..." : "Publishing..."}
                  </>
                ) : scheduleDate ? (
                  <>
                    <Clock className="w-4 h-4" />
                    Schedule Post
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Post Now
                  </>
                )}
              </Button>
              
              <Button type="button" variant="outline" disabled={isSubmitting}>
                Save Draft
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}