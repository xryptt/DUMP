// Mock dataset for dumps
export interface Dump {
  id: number;
  type: 'text' | 'image' | 'voice';
  content: string;
  tags: string[];
  rating: number;
  upvotes: number;
  downvotes: number;
  timestamp: string;
}

export const mockDumps: Dump[] = [
  {
    id: 1,
    type: 'text',
    content: "I just ate 3 samosas at 2am and I'm not even sorry. Life is too short for food guilt.",
    tags: ['funny', 'food'],
    rating: 4.2,
    upvotes: 156,
    downvotes: 23,
    timestamp: '2024-01-15T02:30:00Z'
  },
  {
    id: 2,
    type: 'text',
    content: "Sometimes I feel like my cat understands me better than my therapist. She just sits there and judges me silently.",
    tags: ['deep', 'pets'],
    rating: 4.7,
    upvotes: 203,
    downvotes: 15,
    timestamp: '2024-01-14T18:45:00Z'
  },
  {
    id: 3,
    type: 'text',
    content: "I've been practicing my Oscar acceptance speech in the shower for a career I don't even have.",
    tags: ['funny', 'dreams'],
    rating: 4.5,
    upvotes: 187,
    downvotes: 31,
    timestamp: '2024-01-14T12:20:00Z'
  },
  {
    id: 4,
    type: 'text',
    content: "Why do we say 'after dark' when it's actually during dark? English is weird, man.",
    tags: ['deep', 'weird'],
    rating: 3.8,
    upvotes: 92,
    downvotes: 45,
    timestamp: '2024-01-13T23:15:00Z'
  },
  {
    id: 5,
    type: 'text',
    content: "I accidentally said 'you too' when the waiter said 'enjoy your meal' and now I have to move to another country.",
    tags: ['funny', 'awkward'],
    rating: 4.9,
    upvotes: 312,
    downvotes: 8,
    timestamp: '2024-01-13T19:30:00Z'
  },
  {
    id: 6,
    type: 'text',
    content: "The silence between songs on shuffle is where my anxiety lives.",
    tags: ['sad', 'deep'],
    rating: 4.1,
    upvotes: 145,
    downvotes: 28,
    timestamp: '2024-01-12T16:45:00Z'
  },
  {
    id: 7,
    type: 'text',
    content: "I put my phone in airplane mode and threw it. It didn't fly. 1/10 would not recommend.",
    tags: ['funny', 'weird'],
    rating: 3.9,
    upvotes: 167,
    downvotes: 52,
    timestamp: '2024-01-12T14:20:00Z'
  },
  {
    id: 8,
    type: 'text',
    content: "Being an adult is basically just saying 'I should probably eat something' and then not eating anything for 6 hours.",
    tags: ['funny', 'adult-life'],
    rating: 4.6,
    upvotes: 298,
    downvotes: 19,
    timestamp: '2024-01-11T21:10:00Z'
  }
];

export const categories = [
  { name: 'Funny', count: 45, color: 'bg-yellow-100 text-yellow-800' },
  { name: 'Deep', count: 32, color: 'bg-purple-100 text-purple-800' },
  { name: 'Weird', count: 28, color: 'bg-green-100 text-green-800' },
  { name: 'Sad', count: 23, color: 'bg-blue-100 text-blue-800' },
  { name: 'Dreams', count: 19, color: 'bg-pink-100 text-pink-800' },
  { name: 'Food', count: 16, color: 'bg-orange-100 text-orange-800' },
  { name: 'Adult-life', count: 14, color: 'bg-gray-100 text-gray-800' },
  { name: 'Awkward', count: 12, color: 'bg-red-100 text-red-800' }
];

// Placeholder API functions
export const uploadDump = (dumpData: Omit<Dump, 'id' | 'rating' | 'upvotes' | 'downvotes' | 'timestamp'>) => {
  console.log("Uploaded dump:", dumpData);
  return {
    success: true,
    message: "Dump submitted successfully!"
  };
};

export const getRandomDump = (): Dump => {
  const randomIndex = Math.floor(Math.random() * mockDumps.length);
  return mockDumps[randomIndex];
};

export const rateDump = (id: number, rating: 'up' | 'down') => {
  console.log(`Rated dump ${id}: ${rating}`);
  return {
    success: true,
    message: `${rating === 'up' ? 'Upvoted' : 'Downvoted'} successfully!`
  };
};

export const reportDump = (id: number) => {
  console.log(`Reported dump ${id}`);
  return {
    success: true,
    message: "Dump reported for moderation"
  };
};

export const getDumpsByCategory = (category: string): Dump[] => {
  return mockDumps.filter(dump => 
    dump.tags.some(tag => tag.toLowerCase() === category.toLowerCase())
  );
};

export const getTopRatedDumps = (): Dump[] => {
  return [...mockDumps].sort((a, b) => b.rating - a.rating).slice(0, 5);
};