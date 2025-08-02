import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Eye,
  Heart,
  MessageCircle,
  Share2,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  BarChart3
} from "lucide-react";

const postHistory = [
  {
    id: 1,
    content: "Excited to share our latest product update! 🚀 New features that will revolutionize your workflow.",
    platforms: ["Twitter", "LinkedIn"],
    status: "published",
    metrics: { views: 1240, likes: 89, comments: 12, shares: 5 },
    publishedAt: "2 hours ago",
    engagement: 7.2
  },
  {
    id: 2,
    content: "Behind the scenes: How we built our AI-powered analytics dashboard. Thread below 👇",
    platforms: ["Twitter"],
    status: "published",
    metrics: { views: 856, likes: 67, comments: 23, shares: 8 },
    publishedAt: "5 hours ago",
    engagement: 11.4
  },
  {
    id: 3,
    content: "Join us for our upcoming webinar: 'The Future of Social Media Marketing'",
    platforms: ["LinkedIn", "Facebook"],
    status: "scheduled",
    scheduledFor: "Tomorrow at 2:00 PM",
    engagement: 0
  },
  {
    id: 4,
    content: "Customer spotlight: How @company increased their engagement by 300% using our platform",
    platforms: ["Twitter", "LinkedIn"],
    status: "draft",
    engagement: 0
  }
];

const analyticsData = {
  totalReach: { value: "124.5K", change: 12.5, trend: "up" },
  engagement: { value: "4.2%", change: 0.8, trend: "up" },
  clicks: { value: "2.8K", change: -5.2, trend: "down" },
  conversions: { value: "156", change: 18.3, trend: "up" }
};

const weeklyPerformance = [
  { day: "Mon", posts: 3, engagement: 4.2 },
  { day: "Tue", posts: 2, engagement: 6.1 },
  { day: "Wed", posts: 4, engagement: 3.8 },
  { day: "Thu", posts: 1, engagement: 8.5 },
  { day: "Fri", posts: 3, engagement: 5.3 },
  { day: "Sat", posts: 2, engagement: 7.2 },
  { day: "Sun", posts: 1, engagement: 4.9 }
];

export function PostHistoryAndAnalytics() {
  return (
    <div className="space-y-6">
      {/* Analytics Dashboard */}
      <Card className="border-border shadow-secondary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Analytics Overview
          </CardTitle>
          <CardDescription>Performance metrics for the last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {Object.entries(analyticsData).map(([key, data]) => (
              <div key={key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground capitalize">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </span>
                  <div className="flex items-center gap-1">
                    {data.trend === "up" ? (
                      <TrendingUp className="w-3 h-3 text-success" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-destructive" />
                    )}
                    <span className={`text-xs ${data.trend === "up" ? "text-success" : "text-destructive"}`}>
                      {data.change > 0 ? "+" : ""}{data.change}%
                    </span>
                  </div>
                </div>
                <div className="text-2xl font-bold">{data.value}</div>
                <Progress 
                  value={Math.abs(data.change) * 2} 
                  className="h-2"
                />
              </div>
            ))}
          </div>

          {/* Weekly Performance */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Weekly Performance</h4>
            <div className="grid grid-cols-7 gap-2">
              {weeklyPerformance.map((day) => (
                <div key={day.day} className="text-center space-y-1">
                  <div className="text-xs text-muted-foreground">{day.day}</div>
                  <div className="h-12 bg-muted rounded flex items-end justify-center p-1">
                    <div 
                      className="w-full bg-primary rounded" 
                      style={{ height: `${(day.engagement / 10) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs">{day.posts}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Post History */}
      <Card className="border-border shadow-secondary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Recent Posts
          </CardTitle>
          <CardDescription>Your latest social media activity and performance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {postHistory.map((post) => (
            <div key={post.id} className="space-y-3 p-4 rounded-lg bg-muted/50 border border-border/50 hover:bg-muted/70 transition-colors">
              <div className="flex items-start justify-between">
                <p className="text-sm line-clamp-2 flex-1 pr-4">{post.content}</p>
                <div className="flex flex-col gap-2">
                  {post.status === "published" && (
                    <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Published
                    </Badge>
                  )}
                  {post.status === "scheduled" && (
                    <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">
                      <Calendar className="w-3 h-3 mr-1" />
                      Scheduled
                    </Badge>
                  )}
                  {post.status === "draft" && (
                    <Badge variant="secondary" className="bg-muted-foreground/10 text-muted-foreground border-muted-foreground/20">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Draft
                    </Badge>
                  )}
                  
                  {post.engagement > 0 && (
                    <Badge variant="outline" className="text-xs">
                      {post.engagement}% engagement
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {post.platforms.map((platform) => (
                    <Badge key={platform} variant="outline" className="text-xs">
                      {platform}
                    </Badge>
                  ))}
                </div>
                
                {post.status === "published" && post.metrics && (
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {post.metrics.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      {post.metrics.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      {post.metrics.comments}
                    </span>
                    <span className="flex items-center gap-1">
                      <Share2 className="w-3 h-3" />
                      {post.metrics.shares}
                    </span>
                  </div>
                )}
                
                {post.status === "scheduled" && (
                  <span className="text-xs text-muted-foreground">
                    {post.scheduledFor}
                  </span>
                )}
                
                {post.publishedAt && (
                  <span className="text-xs text-muted-foreground">
                    {post.publishedAt}
                  </span>
                )}
              </div>
            </div>
          ))}
          
          <div className="text-center pt-4">
            <Button variant="outline" size="sm">
              View All Posts
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}