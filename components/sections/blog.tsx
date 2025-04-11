"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Badge, Button, Card, CardBody, CardFooter } from "@heroui/react";

const blogPosts = [
  {
    id: 1,
    title: "Building Scalable React Applications with Next.js",
    excerpt:
      "Learn how to leverage Next.js features to build performant and scalable React applications that can handle growth.",
    image: "/placeholder.svg?height=400&width=600",
    date: "Apr 15, 2023",
    readTime: "8 min read",
    categories: ["React", "Next.js", "Performance"],
    url: "#",
  },
  {
    id: 2,
    title: "The Power of TypeScript: Why You Should Make the Switch",
    excerpt:
      "Discover the benefits of TypeScript and how it can improve your development workflow, code quality, and team collaboration.",
    image: "/placeholder.svg?height=400&width=600",
    date: "Mar 22, 2023",
    readTime: "6 min read",
    categories: ["TypeScript", "JavaScript", "Development"],
    url: "#",
  },
  {
    id: 3,
    title: "Optimizing Database Performance in Node.js Applications",
    excerpt:
      "Practical tips and techniques for improving database performance in your Node.js applications, from indexing to query optimization.",
    image: "/placeholder.svg?height=400&width=600",
    date: "Feb 10, 2023",
    readTime: "10 min read",
    categories: ["Node.js", "Database", "Performance"],
    url: "#",
  },
];

export default function BlogComponent() {
  return (
    <div className='space-y-12'>
      <motion.div
        className='space-y-4 text-center'
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
          Blog & Articles
        </h2>
        <p className='text-muted-foreground md:text-xl max-w-[800px] mx-auto'>
          Sharing my knowledge, insights, and experiences in web development.
        </p>
      </motion.div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {blogPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <Card className='h-full flex flex-col overflow-hidden'>
              <div className='relative h-48'>
                <Image
                  fill
                  alt={post.title}
                  className='object-cover transition-transform duration-300 hover:scale-105'
                  src={post.image || "/placeholder.svg"}
                />
              </div>
              <CardBody className='p-6 flex-grow'>
                <div className='space-y-4'>
                  <div className='flex flex-wrap gap-2'>
                    {post.categories.map((category, i) => (
                      <Badge key={i} variant='shadow'>
                        {category}
                      </Badge>
                    ))}
                  </div>
                  <h3 className='text-xl font-bold'>{post.title}</h3>
                  <p className='text-muted-foreground'>{post.excerpt}</p>
                </div>
              </CardBody>
              <CardFooter className='p-6 pt-0 flex justify-between items-center'>
                <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                  <div className='flex items-center gap-1'>
                    <Calendar className='h-4 w-4' />
                    <span>{post.date}</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <Clock className='h-4 w-4' />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <Button size='sm' variant='ghost'>
                  <Link className='flex items-center gap-1' href={post.url}>
                    Read
                    <ArrowRight className='h-4 w-4' />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className='flex justify-center'>
        <Button>
          <Link className='flex items-center gap-2' href='#'>
            View All Articles
            <ArrowRight className='h-4 w-4' />
          </Link>
        </Button>
      </div>
    </div>
  );
}
