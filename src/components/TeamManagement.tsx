import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  UserPlus, 
  Send, 
  Settings,
  Users,
  Crown,
  Shield,
  Edit,
  Trash2,
  Mail,
  CheckCircle,
  Clock,
  X
} from "lucide-react";

const teamRoles = [
  { value: "owner", label: "Owner", icon: Crown, description: "Full access to everything" },
  { value: "admin", label: "Admin", icon: Shield, description: "Manage posts and team members" },
  { value: "editor", label: "Editor", icon: Edit, description: "Create and edit posts" },
  { value: "viewer", label: "Viewer", icon: Users, description: "View posts and analytics only" },
];

const teamMembers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "owner",
    status: "active",
    avatar: "/placeholder-avatar.jpg",
    joinedAt: "2024-01-15",
    lastActive: "2 hours ago"
  },
  {
    id: 2,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    role: "admin",
    status: "active",
    avatar: "/placeholder-avatar.jpg",
    joinedAt: "2024-02-01",
    lastActive: "1 day ago"
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "editor",
    status: "active",
    avatar: "/placeholder-avatar.jpg",
    joinedAt: "2024-02-15",
    lastActive: "3 hours ago"
  },
  {
    id: 4,
    name: "Emma Davis",
    email: "emma@example.com",
    role: "viewer",
    status: "pending",
    avatar: "/placeholder-avatar.jpg",
    joinedAt: "2024-03-01",
    lastActive: "Pending invitation"
  }
];

const pendingInvitations = [
  {
    id: 1,
    email: "alex@example.com",
    role: "editor",
    invitedBy: "John Doe",
    invitedAt: "2 days ago",
    expiresAt: "5 days"
  },
  {
    id: 2,
    email: "lisa@example.com",
    role: "viewer",
    invitedBy: "Sarah Wilson",
    invitedAt: "1 week ago",
    expiresAt: "2 days"
  }
];

export function TeamManagement() {
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("viewer");

  const handleInviteMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (inviteEmail.trim()) {
      console.log("Inviting:", { email: inviteEmail, role: inviteRole });
      setInviteEmail("");
      setInviteRole("viewer");
    }
  };

  const getRoleIcon = (role: string) => {
    const roleData = teamRoles.find(r => r.value === role);
    return roleData ? roleData.icon : Users;
  };

  const getRoleLabel = (role: string) => {
    const roleData = teamRoles.find(r => r.value === role);
    return roleData ? roleData.label : role;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Team Management</h1>
        <p className="text-muted-foreground">
          Manage your team members and their permissions.
        </p>
      </div>

      {/* Invite New Member */}
      <Card className="border-border shadow-secondary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-primary" />
            Invite Team Member
          </CardTitle>
          <CardDescription>
            Send an invitation to add a new member to your team
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleInviteMember} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="colleague@example.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label>Role</Label>
                <Select value={inviteRole} onValueChange={setInviteRole}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {teamRoles.slice(1).map((role) => { // Skip owner role
                      const Icon = role.icon;
                      return (
                        <SelectItem key={role.value} value={role.value}>
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4" />
                            <div>
                              <div className="font-medium">{role.label}</div>
                              <div className="text-xs text-muted-foreground">{role.description}</div>
                            </div>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button type="submit" className="gap-2" disabled={!inviteEmail.trim()}>
              <Send className="w-4 h-4" />
              Send Invitation
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Team Members */}
      <Card className="border-border shadow-secondary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Team Members ({teamMembers.length})
          </CardTitle>
          <CardDescription>
            Current team members and their roles
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {teamMembers.map((member) => {
            const RoleIcon = getRoleIcon(member.role);
            
            return (
              <div key={member.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border/50">
                <div className="flex items-center gap-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{member.name}</p>
                      {member.status === "pending" && (
                        <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">
                          <Clock className="w-3 h-3 mr-1" />
                          Pending
                        </Badge>
                      )}
                      {member.status === "active" && (
                        <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Active
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                    <p className="text-xs text-muted-foreground">Last active: {member.lastActive}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="gap-1">
                    <RoleIcon className="w-3 h-3" />
                    {getRoleLabel(member.role)}
                  </Badge>
                  
                  {member.role !== "owner" && (
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Pending Invitations */}
      {pendingInvitations.length > 0 && (
        <Card className="border-border shadow-secondary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              Pending Invitations ({pendingInvitations.length})
            </CardTitle>
            <CardDescription>
              Invitations waiting for response
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingInvitations.map((invitation) => (
              <div key={invitation.id} className="flex items-center justify-between p-4 rounded-lg bg-gradient-secondary border border-primary/20">
                <div className="space-y-1">
                  <p className="font-medium">{invitation.email}</p>
                  <p className="text-sm text-muted-foreground">
                    Invited by {invitation.invitedBy} • {invitation.invitedAt}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Expires in {invitation.expiresAt}
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <Badge variant="outline">
                    {getRoleLabel(invitation.role)}
                  </Badge>
                  
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Send className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Role Permissions */}
      <Card className="border-border shadow-secondary">
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
          <CardDescription>
            Understanding what each role can do
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {teamRoles.map((role) => {
              const Icon = role.icon;
              return (
                <div key={role.value} className="space-y-2 p-4 rounded-lg bg-muted/30 border border-border/30">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-primary" />
                    <h4 className="font-medium">{role.label}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{role.description}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}