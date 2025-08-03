import { useState, useEffect } from "react";
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
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export function Dashboard() {
  const [stats, setStats] = useState({
    totalReach: 0,
    totalEngagement: 0,
    totalPosts: 0,
    engagementRate: 0
  });
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [upcomingPosts, setUpcomingPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Load posts with analytics
      const { data: posts } = await supabase
        .from('posts')
        .select(`
          *,
          post_analytics (*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (posts) {
        // Calculate stats
        const publishedPosts = posts.filter(p => p.status === 'published');
        const analytics = publishedPosts.flatMap(p => p.post_analytics);
        
        const totalReach = analytics.reduce((sum, a) => sum + (a?.reach || 0), 0);
        const totalLikes = analytics.reduce((sum, a) => sum + (a?.likes || 0), 0);
        const totalComments = analytics.reduce((sum, a) => sum + (a?.comments || 0), 0);
        const totalShares = analytics.reduce((sum, a) => sum + (a?.shares || 0), 0);
        const totalEngagement = totalLikes + totalComments + totalShares;
        const engagementRate = totalReach > 0 ? (totalEngagement / totalReach) * 100 : 0;

        setStats({
          totalReach,
          totalEngagement,
          totalPosts: publishedPosts.length,
          engagementRate
        });

        // Set recent posts (published)
        setRecentPosts(publishedPosts.slice(0, 5));

        // Set upcoming posts (scheduled)
        const upcoming = posts.filter(p => p.status === 'scheduled').slice(0, 5);
        setUpcomingPosts(upcoming);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statsDisplay = [
    {
      title: "Total Reach",
      value: loading ? "..." : stats.totalReach.toLocaleString(),
      change: "+12.5%",
      trend: "up",
      icon: Eye,
    },
    {
      title: "Engagement Rate",
      value: loading ? "..." : `${stats.engagementRate.toFixed(1)}%`,
      change: "+0.8%",
      trend: "up", 
      icon: Heart,
    },
    {
      title: "Total Posts",
      value: loading ? "..." : stats.totalPosts.toString(),
      change: "+23",
      trend: "up",
      icon: MessageCircle,
    },
    {
      title: "Total Engagement",
      value: loading ? "..." : stats.totalEngagement.toLocaleString(),
      change: "-2.1%",
      trend: "up",
      icon: Users,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your social media performance and recent activity.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsDisplay.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
                  ) : (
                    <ArrowDownRight className="mr-1 h-3 w-3 text-red-500" />
                  )}
                  <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>
                    {stat.change}
                  </span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Posts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {loading ? (
                <div className="text-center text-muted-foreground">Loading recent posts...</div>
              ) : recentPosts.length === 0 ? (
                <div className="text-center text-muted-foreground">No published posts yet</div>
              ) : (
                recentPosts.map((post, index) => {
                  const analytics = post.post_analytics?.[0];
                  return (
                    <div key={index} className="flex items-start justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm font-medium mb-2">{post.content.substring(0, 100)}...</p>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="default">
                            {post.status}
                          </Badge>
                          <div className="text-xs text-muted-foreground">
                            {new Date(post.created_at).toLocaleDateString()}
                          </div>
                        </div>
                        {analytics && (
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {analytics.reach || 0}
                            </span>
                            <span className="flex items-center gap-1">
                              <Heart className="h-3 w-3" />
                              {analytics.likes || 0}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="h-3 w-3" />
                              {analytics.comments || 0}
                            </span>
                            <span className="flex items-center gap-1">
                              <Share2 className="h-3 w-3" />
                              {analytics.shares || 0}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Posts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {loading ? (
                <div className="text-center text-muted-foreground">Loading scheduled posts...</div>
              ) : upcomingPosts.length === 0 ? (
                <div className="text-center text-muted-foreground">No scheduled posts</div>
              ) : (
                upcomingPosts.map((post, index) => (
                  <div key={index} className="flex items-start justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm font-medium mb-2">{post.content.substring(0, 100)}...</p>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">scheduled</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {post.scheduled_for ? new Date(post.scheduled_for).toLocaleString() : 'No schedule set'}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            {upcomingPosts.length > 0 && (
              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  View All Scheduled Posts
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button className="h-20 flex-col gap-2">
              <Calendar className="h-6 w-6" />
              Schedule a Post
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <TrendingUp className="h-6 w-6" />
              View Analytics
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Users className="h-6 w-6" />
              Manage Team
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}