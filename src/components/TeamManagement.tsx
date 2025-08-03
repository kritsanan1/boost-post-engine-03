import { useState, useEffect } from "react";
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
  X,
  MoreHorizontal
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const teamRoles = [
  { value: "owner", label: "Owner", icon: Crown, description: "Full access to everything" },
  { value: "admin", label: "Admin", icon: Shield, description: "Manage posts and team members" },
  { value: "editor", label: "Editor", icon: Edit, description: "Create and edit posts" },
  { value: "viewer", label: "Viewer", icon: Users, description: "View posts and analytics only" },
];

export function TeamManagement() {
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'viewer' | 'editor' | 'admin'>('viewer');
  const [teams, setTeams] = useState<any[]>([]);
  const [currentTeam, setCurrentTeam] = useState<any>(null);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadTeamData();
  }, []);

  const loadTeamData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Load user's teams
      const { data: userTeams } = await supabase
        .from('teams')
        .select('*')
        .eq('owner_id', user.id);

      // Also load teams where user is a member
      const { data: memberTeams } = await supabase
        .from('team_members')
        .select(`
          *,
          teams (*)
        `)
        .eq('user_id', user.id);

      const allTeams = [
        ...(userTeams || []),
        ...(memberTeams?.map(m => m.teams).filter(Boolean) || [])
      ];

      setTeams(allTeams);

      if (allTeams.length > 0) {
        setCurrentTeam(allTeams[0]);
        loadTeamMembers(allTeams[0].id);
      }
    } catch (error) {
      console.error('Error loading team data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadTeamMembers = async (teamId: string) => {
    try {
      const { data: members } = await supabase
        .from('team_members')
        .select('*')
        .eq('team_id', teamId);

      setTeamMembers(members || []);
    } catch (error) {
      console.error('Error loading team members:', error);
    }
  };

  const createTeam = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: team, error } = await supabase
        .from('teams')
        .insert({
          name: 'My Team',
          description: 'Default team',
          owner_id: user.id
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Team Created",
        description: "Your team has been created successfully.",
      });

      loadTeamData();
    } catch (error) {
      console.error('Error creating team:', error);
      toast({
        title: "Error",
        description: "Failed to create team. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleInviteMember = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentTeam) {
      toast({
        title: "No Team Selected",
        description: "Please select or create a team first.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // In a real app, you would send an email invitation
      // For now, we'll just add them directly if they exist
      const { data: invitedUser } = await supabase
        .from('users')
        .select('id')
        .eq('email', inviteEmail)
        .single();

      if (!invitedUser) {
        toast({
          title: "User Not Found",
          description: "This user doesn't exist in the system yet.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('team_members')
        .insert({
          team_id: currentTeam.id,
          user_id: invitedUser.id,
          role: inviteRole,
          invited_by: user.id
        });

      if (error) throw error;

      toast({
        title: "Member Invited",
        description: `${inviteEmail} has been added to the team.`,
      });

      setInviteEmail('');
      setInviteRole('viewer');
      loadTeamMembers(currentTeam.id);
    } catch (error) {
      console.error('Error inviting member:', error);
      toast({
        title: "Error",
        description: "Failed to invite member. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getRoleIcon = (role: string) => {
    const roleData = teamRoles.find(r => r.value === role);
    return roleData ? <roleData.icon className="h-3 w-3 mr-1" /> : null;
  };

  const getRoleLabel = (role: string) => {
    const roleData = teamRoles.find(r => r.value === role);
    return roleData ? roleData.label : role;
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading team data...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Team Management</h1>
            <p className="text-muted-foreground">
              Manage your team members, roles, and permissions.
            </p>
          </div>
          {teams.length === 0 && (
            <Button onClick={createTeam}>
              <UserPlus className="h-4 w-4 mr-2" />
              Create Team
            </Button>
          )}
        </div>
        {currentTeam && (
          <div className="text-sm text-muted-foreground">
            Managing: <span className="font-medium">{currentTeam.name}</span>
          </div>
        )}
      </div>

      {/* Invite New Member */}
      {currentTeam && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Invite Team Member
            </CardTitle>
            <CardDescription>
              Add new members to your team and assign them appropriate roles.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleInviteMember} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="team@example.com"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select value={inviteRole} onValueChange={(value: any) => setInviteRole(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="viewer">Viewer</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button type="submit" className="w-full md:w-auto">
                <Mail className="mr-2 h-4 w-4" />
                Send Invitation
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Current Team Members */}
      {currentTeam && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Team Members ({teamMembers.length})
            </CardTitle>
            <CardDescription>
              Manage existing team members and their permissions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {teamMembers.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                No team members yet. Invite someone to get started!
              </div>
            ) : (
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {member.user_id.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Team Member</div>
                        <div className="text-sm text-muted-foreground">{member.user_id}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={member.role === 'owner' ? 'default' : 'secondary'}>
                            {getRoleIcon(member.role)}
                            {getRoleLabel(member.role)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-xs text-muted-foreground text-right">
                        <div>Joined {new Date(member.joined_at).toLocaleDateString()}</div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            Edit Role
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Role Permissions */}
      <Card>
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
          <CardDescription>
            Understanding what each role can do in your team.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamRoles.map((role) => {
              const Icon = role.icon;
              return (
                <div key={role.value} className="flex items-center gap-3 p-3 border rounded-lg">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="font-medium">{role.label}</div>
                    <div className="text-sm text-muted-foreground">{role.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}