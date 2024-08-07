import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Paw, Heart, Info, Cat, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Index = () => {
  const [likeCount, setLikeCount] = useState(0);
  const [catFact, setCatFact] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://catfact.ninja/fact")
      .then(response => response.json())
      .then(data => {
        setCatFact(data.fact);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-200 to-pink-200">
      {/* Hero Section */}
      <div className="relative h-[70vh] bg-cover bg-center" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")'}}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
          <motion.h1 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-7xl font-bold text-white text-center mb-4"
          >
            All About Cats
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-2xl text-white text-center max-w-2xl"
          >
            Discover the fascinating world of our feline friends
          </motion.p>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Cat className="mr-2 text-purple-500" /> Cat Fact of the Day
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Progress value={33} className="w-full" />
              ) : (
                <p className="text-lg italic">{`"${catFact}"`}</p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <Tabs defaultValue="characteristics" className="mb-12">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="characteristics">Cat Characteristics</TabsTrigger>
            <TabsTrigger value="breeds">Popular Breeds</TabsTrigger>
          </TabsList>
          <AnimatePresence mode="wait">
            <TabsContent value="characteristics">
              <motion.div
                key="characteristics"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center"><Info className="mr-2 text-purple-500" /> Characteristics of Cats</CardTitle>
                    <CardDescription>What makes cats unique?</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-none pl-6 space-y-4">
                      {["Independent nature", "Excellent hunters with sharp claws and teeth", "Flexible bodies and quick reflexes", "Keen senses, especially hearing and night vision", "Communicate through vocalizations, body language, and scent"].map((item, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center bg-purple-100 p-3 rounded-lg shadow-sm"
                        >
                          <Paw className="mr-3 h-5 w-5 text-purple-500" />
                          <span className="text-lg">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
            <TabsContent value="breeds">
              <motion.div
                key="breeds"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center"><Paw className="mr-2 text-purple-500" /> Popular Cat Breeds</CardTitle>
                    <CardDescription>Some well-known cat breeds around the world</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid grid-cols-2 gap-4">
                      {["Siamese", "Persian", "Maine Coon", "Bengal", "British Shorthair"].map((breed, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg shadow-md flex items-center justify-between"
                        >
                          <span className="text-lg font-semibold">{breed}</span>
                          <Star className="h-5 w-5 text-yellow-500" />
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
        
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button 
            onClick={() => setLikeCount(prev => prev + 1)}
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full text-lg shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <Heart className="mr-2 h-5 w-5" /> Like Cats
          </Button>
          <motion.p 
            className="mt-4 text-2xl font-bold text-purple-700"
            key={likeCount}
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          >
            {likeCount} cat lovers!
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
