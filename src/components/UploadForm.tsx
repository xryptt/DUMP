import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X, Plus } from "lucide-react";
import { uploadDump, categories } from "@/services/supabaseService";
import { useToast } from "@/hooks/use-toast";

const UploadForm = () => {
  const [dumpType, setDumpType] = useState<'text' | 'image' | 'voice'>('text');
  const [textContent, setTextContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      // Auto-detect type based on file
      if (file.type.startsWith('image/')) {
        setDumpType('image');
      } else if (file.type.startsWith('audio/')) {
        setDumpType('voice');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (dumpType === 'text' && !textContent.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text for your dump",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    if ((dumpType === 'image' || dumpType === 'voice' || dumpType === 'video') && !file) {
      toast({
        title: "Error",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    const dumpData = {
      type: dumpType,
      content: dumpType === 'text' ? textContent : URL.createObjectURL(file!),
      tags: selectedTags,
      file: dumpType !== 'text' ? file || undefined : undefined,
    };

    const result = await uploadDump(dumpData);
    
    toast({
      title: result.success ? "Success!" : "Error",
      description: result.message,
      variant: result.success ? "default" : "destructive",
    });

    if (result.success) {
      // Reset form
      setTextContent('');
      setSelectedTags([]);
      setFile(null);
      setDumpType('text');
    }
    
    setIsSubmitting(false);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Submit Your Anonymous Dump</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Type Selection */}
          <div className="space-y-3">
            <Label className="text-base font-medium">What type of dump is this?</Label>
            <div className="flex gap-3">
              {(['text', 'image', 'voice', 'video'] as const).map((type) => (
                <Button
                  key={type}
                  type="button"
                  variant={dumpType === type ? 'default' : 'outline'}
                  onClick={() => setDumpType(type)}
                  className="capitalize flex-1"
                >
                  {type === 'voice' ? 'Audio' : type === 'video' ? 'Video' : type}
                </Button>
              ))}
            </div>
          </div>

          {/* Content Input */}
          {dumpType === 'text' && (
            <div className="space-y-2">
              <Label htmlFor="content">Your Dump</Label>
              <Textarea
                id="content"
                placeholder="Share your thoughts, feelings, or random observations..."
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                className="min-h-32 resize-none"
                maxLength={500}
              />
              <div className="text-sm text-muted-foreground text-right">
                {textContent.length}/500 characters
              </div>
            </div>
          )}

          {(dumpType === 'image' || dumpType === 'voice' || dumpType === 'video') && (
            <div className="space-y-2">
              <Label htmlFor="file">
                Upload {dumpType === 'image' ? 'Image/GIF' : dumpType === 'voice' ? 'Audio File' : 'Video File'}
              </Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                {file ? (
                  <div className="flex items-center justify-between bg-muted rounded-lg p-3">
                    <span className="text-sm font-medium">{file.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setFile(null)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
                    <Input
                      id="file"
                      type="file"
                      onChange={handleFileChange}
                      accept={dumpType === 'image' ? 'image/*' : dumpType === 'voice' ? 'audio/*' : 'video/*'}
                      className="hidden"
                    />
                    <Label
                      htmlFor="file"
                      className="cursor-pointer text-primary hover:text-primary/80"
                    >
                      Click to upload or drag and drop
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      {dumpType === 'image' ? 'PNG, JPG, GIF up to 10MB' : dumpType === 'voice' ? 'MP3, WAV up to 10MB' : 'MP4, MOV up to 50MB'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tags Selection */}
          <div className="space-y-3">
            <Label className="text-base font-medium">
              Tags (optional) - Select up to 3
            </Label>
            <div className="flex flex-wrap gap-2">
              {categories.slice(0, 8).map((category) => (
                <Badge
                  key={category.name}
                  variant={selectedTags.includes(category.name.toLowerCase()) ? 'default' : 'outline'}
                  className="cursor-pointer hover:bg-primary/20 transition-colors"
                  onClick={() => selectedTags.length < 3 || selectedTags.includes(category.name.toLowerCase()) ? 
                    handleTagToggle(category.name.toLowerCase()) : null
                  }
                >
                  {selectedTags.includes(category.name.toLowerCase()) ? (
                    <X className="w-3 h-3 mr-1" />
                  ) : (
                    <Plus className="w-3 h-3 mr-1" />
                  )}
                  {category.name}
                </Badge>
              ))}
            </div>
            {selectedTags.length > 2 && (
              <p className="text-sm text-muted-foreground">
                Maximum 3 tags selected
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Dump Anonymously"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UploadForm;