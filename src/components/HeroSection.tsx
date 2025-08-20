import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getRandomDump, type Dump } from "@/services/supabaseService";
import DumpCard from "@/components/DumpCard";
import UploadForm from "@/components/UploadForm";
import { Shuffle, Plus } from "lucide-react";

const HeroSection = () => {
  const [currentDump, setCurrentDump] = useState<Dump | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [key, setKey] = useState(0); // For re-triggering animations

  const handleGetRandomDump = async () => {
    setIsLoading(true);
    
    try {
      const dump = await getRandomDump();
      setCurrentDump(dump);
      setKey(prev => prev + 1); // Trigger re-animation
    } catch (error) {
      console.error('Failed to fetch random dump:', error);
      // You might want to show an error toast here
    }
    
    setIsLoading(false);
  };

  const toggleUploadForm = () => {
    setShowUploadForm(!showUploadForm);
  };

  return (
    <section className="min-h-screen bg-gradient-hero flex items-center justify-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 pt-24 pb-12">
        {!showUploadForm ? (
          // Main Dump Experience
          <div className="text-center">
            {/* Large Brand Typography */}
            <div className="mb-8">
              <div className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-none tracking-tight mb-4 relative">
                <span className="bg-gradient-to-r from-white via-accent to-white bg-clip-text text-transparent animate-pulse">
                  DUMPPP
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white via-accent to-white bg-clip-text text-transparent opacity-20 blur-sm">
                  DUMPPP
                </div>
              </div>
              <div className="text-4xl md:text-5xl lg:text-6xl font-black text-white/80 leading-none tracking-tight -mt-2">
                SPACE
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-8 leading-tight max-w-3xl mx-auto">
              Anonymous thoughts, feelings & random dumps from real people
            </h1>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                onClick={handleGetRandomDump}
                disabled={isLoading}
                variant="cta" 
                size="lg" 
                className="text-xl px-12 py-6 h-auto rounded-full flex items-center gap-3"
              >
                <Shuffle className="w-6 h-6" />
                {isLoading ? "Loading..." : "Give me a dump!"}
              </Button>
              
              <Button
                onClick={toggleUploadForm}
                variant="secondary"
                size="lg"
                className="text-xl px-12 py-6 h-auto rounded-full bg-white/20 text-white border border-white/30 hover:bg-white/30 flex items-center gap-3"
              >
                <Plus className="w-6 h-6" />
                Submit a Dump
              </Button>
            </div>

            {/* Current Dump Display */}
            {currentDump && (
              <div key={key} className="animate-fade-in">
                <DumpCard dump={currentDump} />
              </div>
            )}

            {/* Initial State */}
            {!currentDump && !isLoading && (
              <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-white/80">
                <p className="text-lg mb-4">
                  Welcome to DumpSpace - where real people share their unfiltered thoughts
                </p>
                <p className="text-base">
                  Click "Give me a dump!" to see a random anonymous post, or submit your own!
                </p>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm rounded-3xl p-12 text-white">
                <div className="animate-pulse">
                  <div className="flex justify-center mb-4">
                    <div className="w-8 h-8 bg-white/20 rounded-full animate-bounce"></div>
                    <div className="w-8 h-8 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-8 h-8 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <p className="text-lg">Finding the perfect dump for you...</p>
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="mt-16 text-center">
              <div className="text-4xl md:text-5xl font-black text-white/90 mb-2">
                10,000+
              </div>
              <div className="text-lg text-white/80">
                anonymous dumps shared
              </div>
            </div>
          </div>
        ) : (
          // Upload Form
          <div className="w-full">
            <div className="text-center mb-8">
              <Button
                onClick={toggleUploadForm}
                variant="ghost"
                className="text-white hover:text-white/80 mb-4"
              >
                ← Back to Dumps
              </Button>
              <h2 className="text-4xl font-bold text-white mb-4">Share Your Dump</h2>
              <p className="text-white/80 text-lg">
                Completely anonymous. No judgments. Just pure, unfiltered expression.
              </p>
            </div>
            <UploadForm />
          </div>
        )}
      </div>

      {/* Cool Graphics Section */}
      {!showUploadForm && (
        <div className="relative py-24 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-32 h-32 bg-accent/20 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
            <div className="absolute top-32 right-20 w-24 h-24 bg-white/10 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
            <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-primary/10 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
            <div className="absolute bottom-32 right-1/3 w-28 h-28 bg-accent/15 rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}></div>
          </div>

          {/* Main Graphics Content */}
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                WHERE <span className="text-accent">THOUGHTS</span> BECOME <span className="text-accent">REALITY</span>
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Join thousands of people sharing their unfiltered thoughts in a judgment-free space
              </p>
            </div>

            {/* Interactive Graphics Grid */}
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Card 1 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center hover:bg-white/15 transition-all duration-300 transform hover:scale-105 group">
                <div className="w-20 h-20 bg-gradient-to-br from-accent to-primary rounded-full mx-auto mb-6 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  <div className="text-3xl">💭</div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Anonymous</h3>
                <p className="text-white/70">Share without fear. Your identity stays completely private.</p>
              </div>

              {/* Card 2 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center hover:bg-white/15 transition-all duration-300 transform hover:scale-105 group">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-6 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  <div className="text-3xl">🌟</div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Authentic</h3>
                <p className="text-white/70">Real thoughts from real people. No filters, no pretense.</p>
              </div>

              {/* Card 3 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center hover:bg-white/15 transition-all duration-300 transform hover:scale-105 group">
                <div className="w-20 h-20 bg-gradient-to-br from-accent to-primary rounded-full mx-auto mb-6 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  <div className="text-3xl">🚀</div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Limitless</h3>
                <p className="text-white/70">Express anything. Funny, deep, weird - all thoughts welcome.</p>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="mt-16 relative">
              <div className="absolute left-1/4 top-0 w-2 h-2 bg-accent rounded-full animate-ping"></div>
              <div className="absolute right-1/3 top-8 w-3 h-3 bg-white/50 rounded-full animate-pulse"></div>
              <div className="absolute left-1/2 bottom-0 w-1 h-1 bg-primary rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;