import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, Flag, Volume2, VolumeX } from "lucide-react";
import { Dump, rateDump, reportDump } from "@/utils/mockData"
import { useToast } from "@/hooks/use-toast";

interface DumpCardProps {
  dump: Dump;
  className?: string;
}

const DumpCard = ({ dump, className = "" }: DumpCardProps) => {
  const [localUpvotes, setLocalUpvotes] = useState(dump.upvotes);
  const [localDownvotes, setLocalDownvotes] = useState(dump.downvotes);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

  const handleVote = (voteType: 'up' | 'down') => {
    const result = rateDump(dump.id, voteType);
    
    // Update local state
    if (userVote === voteType) {
      // Removing vote
      if (voteType === 'up') setLocalUpvotes(prev => prev - 1);
      else setLocalDownvotes(prev => prev - 1);
      setUserVote(null);
    } else {
      // Adding or changing vote
      if (userVote === 'up') setLocalUpvotes(prev => prev - 1);
      if (userVote === 'down') setLocalDownvotes(prev => prev - 1);
      
      if (voteType === 'up') setLocalUpvotes(prev => prev + 1);
      else setLocalDownvotes(prev => prev + 1);
      setUserVote(voteType);
    }

    toast({
      title: result.message,
      duration: 2000,
    });
  };

  const handleReport = () => {
    const result = reportDump(dump.id);
    toast({
      title: result.message,
      variant: "destructive",
      duration: 3000,
    });
  };

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
    // In a real app, this would control audio playback
    console.log(`${isPlaying ? 'Stopping' : 'Playing'} audio for dump ${dump.id}`);
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className={`w-full max-w-2xl mx-auto shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in ${className}`}>
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-wrap gap-2">
            {dump.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="capitalize">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{formatTimestamp(dump.timestamp)}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReport}
              className="p-1 h-auto text-muted-foreground hover:text-destructive"
            >
              <Flag className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="mb-6">
          {dump.type === 'text' && (
            <p className="text-lg leading-relaxed text-foreground">
              {dump.content}
            </p>
          )}
          
          {dump.type === 'image' && (
            <div className="relative">
              <img 
                src={dump.content} 
                alt="User uploaded content"
                className="w-full h-auto rounded-lg max-h-96 object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                }}
              />
            </div>
          )}
          
          {dump.type === 'voice' && (
            <div className="bg-muted rounded-lg p-6 flex items-center justify-center">
              <Button
                onClick={toggleAudio}
                variant="outline"
                size="lg"
                className="flex items-center gap-3"
              >
                {isPlaying ? (
                  <VolumeX className="w-6 h-6" />
                ) : (
                  <Volume2 className="w-6 h-6" />
                )}
                {isPlaying ? 'Stop Audio' : 'Play Audio'}
              </Button>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant={userVote === 'up' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleVote('up')}
              className="flex items-center gap-2"
            >
              <ThumbsUp className="w-4 h-4" />
              {localUpvotes}
            </Button>
            
            <Button
              variant={userVote === 'down' ? 'destructive' : 'outline'}
              size="sm"
              onClick={() => handleVote('down')}
              className="flex items-center gap-2"
            >
              <ThumbsDown className="w-4 h-4" />
              {localDownvotes}
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            Rating: {dump.rating.toFixed(1)}★
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DumpCard;