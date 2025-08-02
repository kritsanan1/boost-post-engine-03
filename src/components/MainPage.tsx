import { PostCreator } from "@/components/PostCreator";
import { PostHistoryAndAnalytics } from "@/components/PostHistoryAndAnalytics";

export function MainPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Create & Manage Posts</h1>
        <p className="text-muted-foreground">
          Create new posts with AI assistance and track your social media performance.
        </p>
      </div>

      {/* Main Layout: Form on Left, Analytics on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Post Creation Form */}
        <div className="space-y-6">
          <PostCreator />
        </div>

        {/* Right Column: Post History & Analytics */}
        <div className="space-y-6">
          <PostHistoryAndAnalytics />
        </div>
      </div>
    </div>
  );
}