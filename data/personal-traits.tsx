import { Zap, Rocket, Heart, Lightbulb } from "lucide-react";
import { ReactNode } from "react";

interface PersonalTrait {
  icon: ReactNode;
  title: string;
  description: string;
}

export const personalTraits: PersonalTrait[] = [
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Fast Learner",
    description: "I quickly adapt to new technologies and methodologies.",
  },
  {
    icon: <Rocket className="h-5 w-5" />,
    title: "Problem Solver",
    description: "I enjoy tackling complex challenges with creative solutions.",
  },
  {
    icon: <Heart className="h-5 w-5" />,
    title: "Team Player",
    description:
      "I thrive in collaborative environments and value diverse perspectives.",
  },
  {
    icon: <Lightbulb className="h-5 w-5" />,
    title: "Creative Thinker",
    description: "I bring innovative ideas and approaches to every project.",
  },
];
