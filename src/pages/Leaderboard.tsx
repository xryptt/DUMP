import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DumpCard from "@/components/DumpCard";
import { getTopRatedDumps, mockDumps } from "@/utils/mockData";
import { Trophy, TrendingUp, Clock, Star } from "lucide-react";

const Leaderboard = () => {
  const topRatedDumps = getTopRatedDumps();
  const recentDumps = [...mockDumps].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  ).slice(0, 3);

  const dumpOfTheDay = topRatedDumps[0];

  const stats = [
    { label: "Total Dumps", value: "10,247", icon: TrendingUp },
    { label: "Active Today", value: "1,234", icon: Clock },
    { label: "Top Rating", value: "4.9★", icon: Star },
    { label: "Categories", value: "8", icon: Trophy },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-6 pt-24 pb-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
            LEADERBOARD
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            The most loved dumps from our community. Rankings update in real-time based on user votes.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-accent/10 rounded-full -translate-y-10 translate-x-10"></div>
                <stat.icon className="w-12 h-12 text-accent mx-auto mb-4 relative z-10" />
                <div className="text-3xl font-black text-white mb-2 relative z-10">
                  {stat.value}
                </div>
                <div className="text-white/70 text-base font-medium relative z-10">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dump of the Day */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Trophy className="w-8 h-8 text-yellow-400" />
              <h2 className="text-3xl font-bold text-white">Dump of the Day</h2>
              <Trophy className="w-8 h-8 text-yellow-400" />
            </div>
            <p className="text-white/80">
              The highest-rated dump in the last 24 hours
            </p>
          </div>
          
          {dumpOfTheDay && (
            <div className="relative">
              <div className="absolute -top-4 -left-4 z-10">
                <Badge className="bg-yellow-400 text-black font-bold text-lg px-4 py-2">
                  #1 Today
                </Badge>
              </div>
              <DumpCard dump={dumpOfTheDay} className="border-2 border-yellow-400/50 shadow-xl shadow-yellow-400/20" />
            </div>
          )}
        </div>

        {/* Top Rated Dumps */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Top Rated Dumps</h2>
            <p className="text-white/80">
              All-time favorites from the community
            </p>
          </div>

          <div className="space-y-8">
            {topRatedDumps.slice(1).map((dump, index) => (
              <div key={dump.id} className="relative">
                <div className="absolute -top-4 -left-4 z-10">
                  <Badge 
                    variant="secondary" 
                    className="bg-white/20 text-white font-bold text-lg px-4 py-2"
                  >
                    #{index + 2}
                  </Badge>
                </div>
                <DumpCard dump={dump} className="animate-fade-in" />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Recent Activity</h2>
            <p className="text-white/80">
              Latest dumps from the community
            </p>
          </div>

          <div className="space-y-8">
            {recentDumps.map((dump) => (
              <div key={dump.id} className="relative">
                <div className="absolute -top-4 -left-4 z-10">
                  <Badge 
                    variant="outline" 
                    className="bg-green-500/20 border-green-500 text-green-400 font-bold px-3 py-1"
                  >
                    New
                  </Badge>
                </div>
                <DumpCard dump={dump} className="animate-fade-in" />
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-primary border-0 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Want to see your dump here?
              </h3>
              <p className="text-white/90 mb-6">
                Submit your anonymous thoughts and see how the community reacts. 
                The best dumps make it to the top of the leaderboard!
              </p>
              <Badge className="bg-white text-primary font-bold px-6 py-2">
                Submit a Dump →
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;