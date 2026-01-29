import { Users, MessageCircle, Calendar, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

// Mock study groups data
const studyGroups = [
  {
    id: 'sg-1',
    name: 'Web Tech Study Group',
    module: 'Web Technologies',
    members: 12,
    nextMeeting: '2024-01-25',
    description: 'Weekly study sessions for Web Technologies, focusing on React and JavaScript.',
    avatars: ['A', 'B', 'C', 'D']
  },
  {
    id: 'sg-2',
    name: 'Database Wizards',
    module: 'Databases',
    members: 8,
    nextMeeting: '2024-01-23',
    description: 'SQL practice and database design discussions.',
    avatars: ['E', 'F', 'G']
  },
  {
    id: 'sg-3',
    name: 'Stats & R Crew',
    module: 'Statistics / R Programming',
    members: 15,
    nextMeeting: '2024-01-26',
    description: 'Combined study group for Statistics and R Programming.',
    avatars: ['H', 'I', 'J', 'K']
  },
  {
    id: 'sg-4',
    name: 'Marketing Minds',
    module: 'Marketing Fundamentals',
    members: 10,
    nextMeeting: '2024-01-24',
    description: 'Case study discussions and marketing strategy practice.',
    avatars: ['L', 'M', 'N']
  }
];

export default function StudyGroupsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Study Groups</h1>
          <p className="text-muted-foreground">
            Join study groups and collaborate with fellow students
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Group
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {studyGroups.map((group) => (
          <Card key={group.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{group.name}</CardTitle>
                <Badge variant="secondary">{group.module}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {group.description}
              </p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {group.members} members
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Next: {new Date(group.nextMeeting).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {group.avatars.map((initial, idx) => (
                    <Avatar key={idx} className="h-8 w-8 border-2 border-background">
                      <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                        {initial}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {group.members > group.avatars.length && (
                    <Avatar className="h-8 w-8 border-2 border-background">
                      <AvatarFallback className="text-xs bg-muted text-muted-foreground">
                        +{group.members - group.avatars.length}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Chat
                  </Button>
                  <Button size="sm">Join</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Card className="inline-block">
          <CardContent className="pt-6 px-8">
            <Users className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
            <h3 className="font-semibold mb-2">Can't find your group?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Create a new study group and invite your classmates!
            </p>
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Create New Group
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
