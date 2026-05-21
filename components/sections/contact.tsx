"use client";

import type { ChangeEvent, FormEvent } from "react";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Send } from "lucide-react";
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/react";

import { siteConfig } from "@/config/site";

const contactEmail = "tongnguyenhthanhdo@gmail.com";

export default function ContactComponent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const emailBody = useMemo(
    () =>
      [
        `Name: ${formData.name}`,
        `Email: ${formData.email}`,
        "",
        formData.message,
      ].join("\n"),
    [formData.email, formData.message, formData.name],
  );

  const mailtoHref = useMemo(
    () =>
      `mailto:${contactEmail}?subject=${encodeURIComponent(
        formData.subject,
      )}&body=${encodeURIComponent(emailBody)}`,
    [emailBody, formData.subject],
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setStatus("");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      contactEmail,
    )}&su=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(emailBody)}`;

    window.open(gmailUrl, "_blank", "noopener,noreferrer");
    setStatus("Gmail compose opened with your message filled in.");
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

      <div className='grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:gap-12'>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <form className='space-y-6' onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
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
                rows={7}
                value={formData.message}
                onChange={handleChange}
              />
            </div>
            <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
              <Button color='primary' type='submit'>
                <Send className='mr-2 h-4 w-4' />
                Send with Gmail
              </Button>
              <Button as='a' href={mailtoHref} variant='bordered'>
                <Mail className='mr-2 h-4 w-4' />
                Mail app
              </Button>
            </div>
            {status && <p className='text-sm text-success'>{status}</p>}
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
                        href={`mailto:${contactEmail}`}
                      >
                        {contactEmail}
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
                      <a className='hover:text-primary transition-colors' href='tel:+84368761064'>
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
                    <p className='text-muted-foreground'>Thu Duc - Ho Chi Minh City</p>
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
                href={siteConfig.links.github}
                rel='noopener noreferrer'
                target='_blank'
              >
                <Github className='h-5 w-5' />
              </a>
              <a
                aria-label='LinkedIn'
                className='p-3 rounded-full bg-muted hover:bg-primary/20 transition-colors'
                href={siteConfig.links.linkedin}
                rel='noopener noreferrer'
                target='_blank'
              >
                <Linkedin className='h-5 w-5' />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
