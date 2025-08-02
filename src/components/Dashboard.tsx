import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  BarChart3,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const stats = [
  {
    title: "Total Reach",
    value: "124.5K",
    change: "+12.5%",
    trend: "up",
    icon: TrendingUp,
    description: "People reached this month"
  },
  {
    title: "Engagement Rate",
    value: "4.2%",
    change: "+0.8%",
    trend: "up",
    icon: Users,
    description: "Average engagement across platforms"
  },
  {
    title: "Posts Scheduled",
    value: "23",
    change: "+5",
    trend: "up",
    icon: Calendar,
    description: "Posts scheduled for this week"
  },
  {
    title: "Active Campaigns",
    value: "8",
    change: "+2",
    trend: "up",
    icon: BarChart3,
    description: "Currently running campaigns"
  }
];

const recentPosts = [
  {
    id: 1,
    content: "Excited to share our latest product update! 🚀 New features that will revolutionize your workflow.",
    platforms: ["Twitter", "LinkedIn"],
    status: "published",
    metrics: { views: 1240, likes: 89, comments: 12, shares: 5 },
    publishedAt: "2 hours ago"
  },
  {
    id: 2,
    content: "Behind the scenes: How we built our AI-powered analytics dashboard. Thread below 👇",
    platforms: ["Twitter"],
    status: "published",
    metrics: { views: 856, likes: 67, comments: 23, shares: 8 },
    publishedAt: "5 hours ago"
  },
  {
    id: 3,
    content: "Join us for our upcoming webinar: 'The Future of Social Media Marketing'",
    platforms: ["LinkedIn", "Facebook"],
    status: "scheduled",
    scheduledFor: "Tomorrow at 2:00 PM"
  },
  {
    id: 4,
    content: "Customer spotlight: How @company increased their engagement by 300% using our platform",
    platforms: ["Twitter", "LinkedIn"],
    status: "draft"
  }
];

const upcomingPosts = [
  {
    id: 1,
    content: "Weekly industry insights and trends you shouldn't miss",
    platforms: ["All"],
    scheduledTime: "Today, 6:00 PM"
  },
  {
    id: 2,
    content: "Product demo: See our new features in action",
    platforms: ["LinkedIn"],
    scheduledTime: "Tomorrow, 10:00 AM"
  }
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, John! 👋</h1>
        <p className="text-muted-foreground">
          Here's what's happening with your social media presence today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-border shadow-secondary hover:shadow-glow transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                    {stat.change}
                  </Badge>
                  <span>{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Posts */}
        <Card className="border-border shadow-secondary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Recent Posts
            </CardTitle>
            <CardDescription>Your latest social media activity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentPosts.map((post) => (
              <div key={post.id} className="space-y-3 p-4 rounded-lg bg-muted/50 border border-border/50">
                <div className="flex items-start justify-between">
                  <p className="text-sm line-clamp-2 flex-1">{post.content}</p>
                  <div className="ml-3">
                    {post.status === "published" && (
                      <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Published
                      </Badge>
                    )}
                    {post.status === "scheduled" && (
                      <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">
                        <Clock className="w-3 h-3 mr-1" />
                        Scheduled
                      </Badge>
                    )}
                    {post.status === "draft" && (
                      <Badge variant="secondary" className="bg-muted-foreground/10 text-muted-foreground border-muted-foreground/20">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Draft
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
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Posts */}
        <Card className="border-border shadow-secondary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Upcoming Posts
            </CardTitle>
            <CardDescription>Posts scheduled for the next 24 hours</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingPosts.map((post) => (
              <div key={post.id} className="space-y-3 p-4 rounded-lg bg-gradient-secondary border border-primary/20">
                <p className="text-sm line-clamp-2">{post.content}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {post.platforms.map((platform) => (
                      <Badge key={platform} variant="outline" className="text-xs">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.scheduledTime}
                  </span>
                </div>
              </div>
            ))}
            
            <div className="text-center pt-4">
              <Button variant="outline" size="sm">
                View All Scheduled Posts
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-border shadow-secondary">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks to boost your social media presence</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3">
            <Button variant="gradient" className="justify-start gap-3 h-12">
              <Calendar className="w-4 h-4" />
              Schedule Post
            </Button>
            <Button variant="outline" className="justify-start gap-3 h-12">
              <BarChart3 className="w-4 h-4" />
              View Analytics
            </Button>
            <Button variant="outline" className="justify-start gap-3 h-12">
              <Users className="w-4 h-4" />
              Manage Team
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}