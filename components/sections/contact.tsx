"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send } from "lucide-react";
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/react";

export default function ContactComponent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    // Show success message
    alert("Message sent successfully!");
  };

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
          Get In Touch
        </h2>
        <p className='text-muted-foreground md:text-xl max-w-[800px] mx-auto'>
          Have a project in mind or want to collaborate? Feel free to reach out!
        </p>
      </motion.div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <form className='space-y-6' onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <label htmlFor='name'>Name</label>
                <Input
                  required
                  id='name'
                  name='name'
                  placeholder='Your name'
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className='space-y-2'>
                <label htmlFor='email'>Email</label>
                <Input
                  required
                  id='email'
                  name='email'
                  placeholder='your.email@example.com'
                  type='email'
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className='space-y-2'>
              <label htmlFor='subject'>Subject</label>
              <Input
                required
                id='subject'
                name='subject'
                placeholder='What is this regarding?'
                value={formData.subject}
                onChange={handleChange}
              />
            </div>
            <div className='space-y-2'>
              <label htmlFor='message'>Message</label>
              <Textarea
                required
                id='message'
                name='message'
                placeholder='Your message...'
                rows={6}
                value={formData.message}
                onChange={handleChange}
              />
            </div>
            <Button className='w-full sm:w-auto' type='submit'>
              <Send className='mr-2 h-4 w-4' />
              Send Message
            </Button>
          </form>
        </motion.div>

        <motion.div
          className='space-y-6'
          initial={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <div className='grid gap-6'>
            <Card>
              <CardBody className='p-6'>
                <div className='flex items-start gap-4'>
                  <div className='p-2 rounded-full bg-primary/10 text-primary'>
                    <Mail className='h-5 w-5' />
                  </div>
                  <div>
                    <h3 className='font-semibold'>Email</h3>
                    <p className='text-muted-foreground'>
                      <a
                        className='hover:text-primary transition-colors'
                        href='mailto:tongnguyenhthanhdo@gmail.com'
                      >
                        tongnguyenhthanhdo@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody className='p-6'>
                <div className='flex items-start gap-4'>
                  <div className='p-2 rounded-full bg-primary/10 text-primary'>
                    <Phone className='h-5 w-5' />
                  </div>
                  <div>
                    <h3 className='font-semibold'>Phone</h3>
                    <p className='text-muted-foreground'>
                      <a className='hover:text-primary transition-colors' href='tel:+1234567890'>
                        0368761064
                      </a>
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody className='p-6'>
                <div className='flex items-start gap-4'>
                  <div className='p-2 rounded-full bg-primary/10 text-primary'>
                    <MapPin className='h-5 w-5' />
                  </div>
                  <div>
                    <h3 className='font-semibold'>Location</h3>
                    <p className='text-muted-foreground'>Thủ Đức - Hồ Chí Minh City</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          <div className='space-y-4'>
            <h3 className='text-xl font-bold'>Connect With Me</h3>
            <div className='flex gap-4'>
              <a
                aria-label='GitHub'
                className='p-3 rounded-full bg-muted hover:bg-primary/20 transition-colors'
                href='https://github.com/'
                rel='noopener noreferrer'
                target='_blank'
              >
                <Github className='h-5 w-5' />
              </a>
              <a
                aria-label='LinkedIn'
                className='p-3 rounded-full bg-muted hover:bg-primary/20 transition-colors'
                href='https://linkedin.com/'
                rel='noopener noreferrer'
                target='_blank'
              >
                <Linkedin className='h-5 w-5' />
              </a>
              <a
                aria-label='Twitter'
                className='p-3 rounded-full bg-muted hover:bg-primary/20 transition-colors'
                href='https://twitter.com/'
                rel='noopener noreferrer'
                target='_blank'
              >
                <Twitter className='h-5 w-5' />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
