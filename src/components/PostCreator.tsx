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
  Loader2,
  Target
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
  const [scheduledDate, setScheduledDate] = useState<Date>();
  const [scheduledTime, setScheduledTime] = useState("12:00");
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const [mediaUrl, setMediaUrl] = useState("");
  const [profileKey, setProfileKey] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingSuggestions, setIsGeneratingSuggestions] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [suggestions, setSuggestions] = useState<Array<{content: string, explanation: string}>>([]);
  const [optimizations, setOptimizations] = useState<any>(null);
  const { toast } = useToast();

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const addMediaUrl = () => {
    if (mediaUrl.trim()) {
      setMediaUrls(prev => [...prev, mediaUrl.trim()]);
      setMediaUrl("");
    }
  };

  const removeMediaUrl = (index: number) => {
    setMediaUrls(prev => prev.filter((_, i) => i !== index));
  };

  const generateSuggestions = async () => {
    if (!content.trim()) {
      toast({
        title: "Content Required",
        description: "Please enter some content to get AI suggestions.",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingSuggestions(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-content-suggestions', {
        body: {
          prompt: content,
          tone: 'engaging',
          platform: selectedPlatforms[0] || 'general',
          contentType: 'post'
        }
      });

      if (error) throw error;

      setSuggestions(data.suggestions || []);
      toast({
        title: "Suggestions Generated",
        description: `Generated ${data.suggestions?.length || 0} content suggestions.`,
      });
    } catch (error) {
      console.error('Error generating suggestions:', error);
      toast({
        title: "Error",
        description: "Failed to generate content suggestions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingSuggestions(false);
    }
  };

  const optimizePost = async () => {
    if (!content.trim()) {
      toast({
        title: "Content Required",
        description: "Please enter some content to optimize.",
        variant: "destructive",
      });
      return;
    }

    setIsOptimizing(true);
    try {
      const { data, error } = await supabase.functions.invoke('optimize-post', {
        body: {
          content,
          platform: selectedPlatforms[0] || 'general'
        }
      });

      if (error) throw error;

      setOptimizations(data);
      if (data.optimizedContent && data.optimizedContent !== content) {
        setContent(data.optimizedContent);
      }
      
      toast({
        title: "Post Optimized",
        description: `Found ${data.optimizations?.length || 0} optimization suggestions.`,
      });
    } catch (error) {
      console.error('Error optimizing post:', error);
      toast({
        title: "Error",
        description: "Failed to optimize post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsOptimizing(false);
    }
  };

  const applySuggestion = (suggestion: {content: string, explanation: string}) => {
    setContent(suggestion.content);
    toast({
      title: "Suggestion Applied",
      description: "Content has been updated with the AI suggestion.",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      toast({
        title: "Content Required",
        description: "Please enter some content for your post.",
        variant: "destructive",
      });
      return;
    }

    if (selectedPlatforms.length === 0) {
      toast({
        title: "Platform Required",
        description: "Please select at least one platform.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Create scheduled datetime if date and time are set
      let scheduledFor = null;
      if (scheduledDate && scheduledTime) {
        const [hours, minutes] = scheduledTime.split(':');
        scheduledFor = new Date(scheduledDate);
        scheduledFor.setHours(parseInt(hours), parseInt(minutes));
      }

      const postData = {
        user_id: user.id,
        content: content.trim(),
        media_urls: mediaUrls,
        profile_key: profileKey || null,
        scheduled_for: scheduledFor?.toISOString() || null,
        status: (scheduledFor ? 'scheduled' : 'draft') as 'scheduled' | 'draft',
        platform_id: '00000000-0000-0000-0000-000000000000' // Default platform ID
      };

      // Create post in database
      const { data: post, error: postError } = await supabase
        .from('posts')
        .insert(postData)
        .select()
        .single();

      if (postError) throw postError;

      // If publishing immediately (no schedule), call Ayrshare
      if (!scheduledFor) {
        const { data: publishData, error: publishError } = await supabase.functions.invoke('create-post', {
          body: {
            postId: post.id,
            content: content.trim(),
            platforms: selectedPlatforms,
            mediaUrls,
            profileKey: profileKey || undefined
          }
        });

        if (publishError) {
          console.error('Publishing error:', publishError);
          // Update post status to error
          await supabase
            .from('posts')
            .update({ 
              status: 'failed',
              error_message: publishError.message 
            })
            .eq('id', post.id);
          
          throw publishError;
        }
      }

      toast({
        title: "Success!",
        description: scheduledFor 
          ? `Post scheduled for ${format(scheduledFor, "PPP 'at' p")}`
          : "Post published successfully!",
      });

      // Reset form
      setContent("");
      setSelectedPlatforms([]);
      setScheduledDate(undefined);
      setScheduledTime("12:00");
      setMediaUrls([]);
      setProfileKey("");
      setSuggestions([]);
      setOptimizations(null);

    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCharacterCount = () => {
    if (selectedPlatforms.length === 0) return content.length;
    const selectedPlatform = platforms.find(p => p.id === selectedPlatforms[0]);
    return selectedPlatform ? content.length : content.length;
  };

  const getMaxCharacters = () => {
    if (selectedPlatforms.length === 0) return 280;
    const selectedPlatform = platforms.find(p => p.id === selectedPlatforms[0]);
    return selectedPlatform ? selectedPlatform.maxChars : 280;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          Create New Post
        </CardTitle>
        <CardDescription>
          Create and schedule your social media posts with AI assistance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Content Section */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="content">Post Content</Label>
              <Textarea
                id="content"
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[120px] resize-none"
              />
              <div className="flex justify-between items-center mt-2">
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={generateSuggestions}
                    disabled={isGeneratingSuggestions}
                    className="flex items-center gap-2"
                  >
                    <Sparkles className="h-4 w-4" />
                    {isGeneratingSuggestions ? "Generating..." : "AI Suggestions"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={optimizePost}
                    disabled={isOptimizing}
                    className="flex items-center gap-2"
                  >
                    <Target className="h-4 w-4" />
                    {isOptimizing ? "Optimizing..." : "Optimize"}
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  {getCharacterCount()}/{getMaxCharacters()}
                </div>
              </div>
            </div>

            {/* AI Suggestions */}
            {suggestions.length > 0 && (
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  AI Content Suggestions
                </h4>
                <div className="space-y-3">
                  {suggestions.map((suggestion, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <p className="text-sm mb-2">{suggestion.content}</p>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-muted-foreground">{suggestion.explanation}</p>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => applySuggestion(suggestion)}
                        >
                          Apply
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Optimization Results */}
            {optimizations && (
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Optimization Suggestions
                </h4>
                {optimizations.optimizations && (
                  <div className="space-y-2 mb-4">
                    {optimizations.optimizations.map((opt: any, index: number) => (
                      <div key={index} className="p-2 border rounded text-sm">
                        <div className="font-medium">{opt.type.charAt(0).toUpperCase() + opt.type.slice(1)}</div>
                        <div className="text-muted-foreground">{opt.suggestion}</div>
                        <div className="text-xs text-primary">{opt.reason}</div>
                      </div>
                    ))}
                  </div>
                )}
                {optimizations.historicalMetrics && (
                  <div className="text-xs text-muted-foreground">
                    Based on {optimizations.historicalMetrics.totalPosts} previous posts
                    (Avg engagement: {Math.round(optimizations.historicalMetrics.avgEngagement)})
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Platform Selection */}
          <div>
            <Label>Select Platforms</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
              {platforms.map((platform) => {
                const Icon = platform.icon;
                const isSelected = selectedPlatforms.includes(platform.id);
                return (
                  <button
                    key={platform.id}
                    type="button"
                    onClick={() => togglePlatform(platform.id)}
                    className={cn(
                      "flex items-center gap-2 p-3 rounded-lg border transition-all",
                      isSelected
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{platform.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Media URLs */}
          <div>
            <Label>Media URLs (Optional)</Label>
            <div className="space-y-2 mt-2">
              <div className="flex gap-2">
                <Input
                  placeholder="https://example.com/image.jpg"
                  value={mediaUrl}
                  onChange={(e) => setMediaUrl(e.target.value)}
                />
                <Button type="button" onClick={addMediaUrl} size="sm">
                  Add
                </Button>
              </div>
              {mediaUrls.length > 0 && (
                <div className="space-y-1">
                  {mediaUrls.map((url, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                      <span className="text-sm flex-1 truncate">{url}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMediaUrl(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Profile Key */}
          <div>
            <Label htmlFor="profileKey">Profile Key (Optional)</Label>
            <Input
              id="profileKey"
              placeholder="Enter profile key for specific account"
              value={profileKey}
              onChange={(e) => setProfileKey(e.target.value)}
            />
          </div>

          {/* Schedule Section */}
          <div className="space-y-4">
            <Label>Schedule (Optional)</Label>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="date" className="text-sm">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !scheduledDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {scheduledDate ? format(scheduledDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={scheduledDate}
                      onSelect={setScheduledDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex-1">
                <Label htmlFor="time" className="text-sm">Time</Label>
                <Select value={scheduledTime} onValueChange={setScheduledTime}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => {
                      const hour = i.toString().padStart(2, '0');
                      return (
                        <SelectItem key={`${hour}:00`} value={`${hour}:00`}>
                          {hour}:00
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-2">
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : scheduledDate ? (
                <Clock className="mr-2 h-4 w-4" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              {isSubmitting 
                ? "Creating..." 
                : scheduledDate 
                  ? "Schedule Post" 
                  : "Publish Now"
              }
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}