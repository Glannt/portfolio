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
    title: "IoT & Systems Integrator",
    description: "I design robust pipelines connecting hardware controllers (Arduino/Pi) with responsive web systems.",
  },
  {
    icon: <Rocket className="h-5 w-5" />,
    title: "Monorepo Architect",
    description: "I orchestrate scalable frontend and backend architectures using state-of-the-art monorepo frameworks.",
  },
  {
    icon: <Heart className="h-5 w-5" />,
    title: "Relentless Problem Solver",
    description: "I enjoy tackling complex database schemas, transaction flows, and real-time microservices syncing.",
  },
  {
    icon: <Lightbulb className="h-5 w-5" />,
    title: "Creative Automation Thinker",
    description: "I integrate automated workflow engines like n8n and AI generations to solve modern product requirements.",
  },
];
