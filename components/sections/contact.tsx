"use client";

import type { ChangeEvent, FormEvent } from "react";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle2, AlertCircle } from "lucide-react";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

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
        formData.subject || "Contact from Portfolio",
      )}&body=${encodeURIComponent(emailBody)}`,
    [emailBody, formData.subject],
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitStatus !== "idle") {
      setSubmitStatus("idle");
      setStatusMessage("");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus("success");
        setStatusMessage(
          "Thank you! Your message has been sent directly to tongnguyenhthanhdo@gmail.com. I will reply to you as soon as possible.",
        );
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error(data.error || "Failed to send message.");
      }
    } catch (err: unknown) {
      setSubmitStatus("error");
      const errorMsg = err instanceof Error ? err.message : "Something went wrong.";
      setStatusMessage(`${errorMsg} You can also send directly via Gmail below.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenGmail = () => {
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      contactEmail,
    )}&su=${encodeURIComponent(formData.subject || "Contact Inquiry")}&body=${encodeURIComponent(
      emailBody,
    )}`;

    window.open(gmailUrl, "_blank", "noopener,noreferrer");
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
          Have a project in mind or want to collaborate? Send me a direct message!
        </p>
      </motion.div>

      <div className='grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:gap-12'>
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <form className='space-y-6' onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <div className='space-y-2'>
                <label className='text-sm font-medium' htmlFor='name'>
                  Name <span className='text-danger'>*</span>
                </label>
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
                <label className='text-sm font-medium' htmlFor='email'>
                  Email <span className='text-danger'>*</span>
                </label>
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
              <label className='text-sm font-medium' htmlFor='subject'>
                Subject
              </label>
              <Input
                id='subject'
                name='subject'
                placeholder='Project inquiry, recruitment, or questions...'
                value={formData.subject}
                onChange={handleChange}
              />
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium' htmlFor='message'>
                Message <span className='text-danger'>*</span>
              </label>
              <Textarea
                required
                id='message'
                name='message'
                placeholder='Write your message here...'
                rows={6}
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            {/* Action Button Bar */}
            <div className='flex flex-wrap items-center gap-3 pt-2'>
              <Button
                className='font-semibold'
                color='primary'
                disabled={isSubmitting}
                isLoading={isSubmitting}
                size='md'
                startContent={!isSubmitting && <Send className='h-4 w-4 mr-1' />}
                type='submit'
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>

              <Button
                size='md'
                type='button'
                variant='flat'
                onPress={handleOpenGmail}
              >
                <Mail className='h-4 w-4 mr-1' />
                Compose in Gmail
              </Button>

              <Button
                as='a'
                href={mailtoHref}
                size='md'
                variant='bordered'
              >
                Mail App
              </Button>
            </div>

            {/* Status Notifications */}
            <AnimatePresence>
              {submitStatus === "success" && (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className='p-4 rounded-xl bg-success/15 border border-success/30 text-success text-sm flex items-start gap-3'
                  exit={{ opacity: 0, y: -10 }}
                  initial={{ opacity: 0, y: 10 }}
                >
                  <CheckCircle2 className='h-5 w-5 flex-shrink-0 mt-0.5' />
                  <div>
                    <p className='font-semibold'>Message Delivered!</p>
                    <p className='text-xs opacity-90 mt-0.5'>{statusMessage}</p>
                  </div>
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className='p-4 rounded-xl bg-danger/15 border border-danger/30 text-danger text-sm flex items-start gap-3'
                  exit={{ opacity: 0, y: -10 }}
                  initial={{ opacity: 0, y: 10 }}
                >
                  <AlertCircle className='h-5 w-5 flex-shrink-0 mt-0.5' />
                  <div>
                    <p className='font-semibold'>Failed to Send</p>
                    <p className='text-xs opacity-90 mt-0.5'>{statusMessage}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>

        {/* Contact Information Cards */}
        <motion.div
          className='space-y-6'
          initial={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <div className='grid gap-4 sm:gap-5'>
            <Card className='border border-default-200/60 shadow-sm transition-all hover:border-primary/40 hover:shadow-md'>
              <CardBody className='p-4 sm:p-5'>
                <div className='flex items-center gap-3.5 sm:gap-4'>
                  <div className='flex-shrink-0 p-2.5 sm:p-3 rounded-xl bg-primary/10 text-primary'>
                    <Mail className='h-5 w-5' />
                  </div>
                  <div className='min-w-0 flex-1 space-y-0.5'>
                    <h3 className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'>Email</h3>
                    <p className='text-sm sm:text-base font-medium text-foreground break-all sm:break-words'>
                      <a
                        className='hover:text-primary transition-colors inline-block'
                        href={`mailto:${contactEmail}`}
                      >
                        {contactEmail}
                      </a>
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card className='border border-default-200/60 shadow-sm transition-all hover:border-primary/40 hover:shadow-md'>
              <CardBody className='p-4 sm:p-5'>
                <div className='flex items-center gap-3.5 sm:gap-4'>
                  <div className='flex-shrink-0 p-2.5 sm:p-3 rounded-xl bg-primary/10 text-primary'>
                    <Phone className='h-5 w-5' />
                  </div>
                  <div className='min-w-0 flex-1 space-y-0.5'>
                    <h3 className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'>Phone</h3>
                    <p className='text-sm sm:text-base font-medium text-foreground'>
                      <a className='hover:text-primary transition-colors inline-block' href='tel:+84368761064'>
                        0368761064
                      </a>
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card className='border border-default-200/60 shadow-sm transition-all hover:border-primary/40 hover:shadow-md'>
              <CardBody className='p-4 sm:p-5'>
                <div className='flex items-center gap-3.5 sm:gap-4'>
                  <div className='flex-shrink-0 p-2.5 sm:p-3 rounded-xl bg-primary/10 text-primary'>
                    <MapPin className='h-5 w-5' />
                  </div>
                  <div className='min-w-0 flex-1 space-y-0.5'>
                    <h3 className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'>Location</h3>
                    <p className='text-sm sm:text-base font-medium text-foreground'>
                      Thu Duc - Ho Chi Minh City
                    </p>
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
                className='p-3 rounded-full bg-default-100 hover:bg-primary/20 text-foreground hover:text-primary transition-colors'
                href={siteConfig.links.github}
                rel='noopener noreferrer'
                target='_blank'
              >
                <Github className='h-5 w-5' />
              </a>
              <a
                aria-label='LinkedIn'
                className='p-3 rounded-full bg-default-100 hover:bg-primary/20 text-foreground hover:text-primary transition-colors'
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
