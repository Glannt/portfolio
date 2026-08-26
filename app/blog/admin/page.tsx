"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Lock,
  Plus,
  Edit,
  Trash2,
  Save,
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Eye,
  LogOut,
  Terminal,
} from "lucide-react";
import { Button, Input, Textarea, Card, CardBody } from "@heroui/react";

import { HandbookArticle, handbookCategories } from "@/data/handbook";

export default function HandbookAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [articles, setArticles] = useState<HandbookArticle[]>([]);
  const [activeTab, setActiveTab] = useState<"list" | "edit">("list");
  const [editorMode, setEditorMode] = useState<"edit" | "preview">("edit");
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form State for Editing/Creating
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    id: string;
    title: string;
    slug: string;
    category: string;
    categoryLabel: string;
    excerpt: string;
    readTime: string;
    date: string;
    tags: string;
    summary: string;
    keyTakeaways: string;
    notes: string;
    codeSnippets: { title: string; language: string; code: string }[];
  }>({
    id: "",
    title: "",
    slug: "",
    category: "vps_security",
    categoryLabel: "VPS Security",
    excerpt: "",
    readTime: "5 min read",
    date: "Aug 2026",
    tags: "DevOps, Linux, Security",
    summary: "",
    keyTakeaways: "",
    notes: "",
    codeSnippets: [
      {
        title: "Configuration Snippet",
        language: "bash",
        code: "# Add your configuration here",
      },
    ],
  });

  // Check existing session
  useEffect(() => {
    const token = localStorage.getItem("handbook_admin_token");
    if (token) {
      setIsAuthenticated(true);
      fetchArticles();
    }
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await fetch("/api/handbook");
      const data = await res.json();
      if (Array.isArray(data.articles)) {
        setArticles(data.articles);
      }
    } catch {
      // Ignore
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem("handbook_admin_token", data.token);
        setIsAuthenticated(true);
        fetchArticles();
      } else {
        setLoginError(data.error || "Invalid username or password.");
      }
    } catch {
      setLoginError("Failed to connect to authentication server.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("handbook_admin_token");
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
  };

  const handleStartCreate = () => {
    setEditingId(null);
    setFormData({
      id: "",
      title: "",
      slug: "",
      category: "vps_security",
      categoryLabel: "VPS Security",
      excerpt: "",
      readTime: "5 min read",
      date: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      tags: "DevOps, Production, Linux",
      summary: "",
      keyTakeaways: "",
      notes: "",
      codeSnippets: [
        {
          title: "Runbook Command",
          language: "bash",
          code: "# Runbook commands here",
        },
      ],
    });
    setActiveTab("edit");
    setStatusMessage(null);
  };

  const handleStartEdit = (article: HandbookArticle) => {
    setEditingId(article.id);
    setFormData({
      id: article.id,
      title: article.title,
      slug: article.slug,
      category: article.category,
      categoryLabel: article.categoryLabel,
      excerpt: article.excerpt,
      readTime: article.readTime,
      date: article.date,
      tags: article.tags.join(", "),
      summary: article.content.summary,
      keyTakeaways: (article.content.keyTakeaways || []).join("\n"),
      notes: (article.content.notes || []).join("\n"),
      codeSnippets: article.content.codeSnippets || [],
    });
    setActiveTab("edit");
    setStatusMessage(null);
  };

  const handleAddCodeSnippet = () => {
    setFormData((prev) => ({
      ...prev,
      codeSnippets: [
        ...prev.codeSnippets,
        {
          title: "New Snippet",
          language: "bash",
          code: "",
        },
      ],
    }));
  };

  const handleRemoveCodeSnippet = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      codeSnippets: prev.codeSnippets.filter((_, i) => i !== index),
    }));
  };

  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage(null);

    const formattedArticle: HandbookArticle = {
      id: formData.id || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title: formData.title,
      category: formData.category as any,
      categoryLabel: formData.categoryLabel || formData.category,
      excerpt: formData.excerpt,
      readTime: formData.readTime,
      date: formData.date,
      tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
      content: {
        summary: formData.summary,
        keyTakeaways: formData.keyTakeaways.split("\n").map((k) => k.trim()).filter(Boolean),
        notes: formData.notes.split("\n").map((n) => n.trim()).filter(Boolean),
        codeSnippets: formData.codeSnippets,
      },
    };

    try {
      const method = editingId ? "PUT" : "POST";
      const res = await fetch("/api/handbook", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedArticle),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatusMessage({
          type: "success",
          text: editingId ? "Article updated successfully!" : "New article published successfully!",
        });
        await fetchArticles();
        setTimeout(() => {
          setActiveTab("list");
        }, 1200);
      } else {
        throw new Error(data.error || "Failed to save article.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error saving article.";
      setStatusMessage({ type: "error", text: msg });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteArticle = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;

    try {
      const res = await fetch(`/api/handbook?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setStatusMessage({ type: "success", text: "Article deleted successfully." });
        await fetchArticles();
      }
    } catch {
      setStatusMessage({ type: "error", text: "Failed to delete article." });
    }
  };

  // Login Screen View
  if (!isAuthenticated) {
    return (
      <div className='min-h-[75vh] flex items-center justify-center p-4'>
        <Card className='w-full max-w-md border border-default-200/80 shadow-2xl rounded-3xl bg-content1/90 backdrop-blur-xl'>
          <CardBody className='p-8 space-y-6'>
            <div className='text-center space-y-2'>
              <div className='w-12 h-12 rounded-2xl bg-primary/10 text-primary mx-auto flex items-center justify-center border border-primary/25 shadow-inner'>
                <Lock className='h-6 w-6' />
              </div>
              <h1 className='text-2xl font-bold tracking-tight text-foreground'>
                Handbook Admin Portal
              </h1>
              <p className='text-xs text-muted-foreground'>
                Authenticate with environment credentials to edit and publish notes.
              </p>
            </div>

            <form className='space-y-4' onSubmit={handleLogin}>
              <div className='space-y-1.5'>
                <span className='block text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                  Username
                </span>
                <Input
                  required
                  placeholder='Enter admin username'
                  size='sm'
                  value={username}
                  variant='bordered'
                  onValueChange={setUsername}
                />
              </div>

              <div className='space-y-1.5'>
                <span className='block text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                  Password
                </span>
                <Input
                  required
                  placeholder='••••••••••••'
                  size='sm'
                  type='password'
                  value={password}
                  variant='bordered'
                  onValueChange={setPassword}
                />
              </div>

              {loginError && (
                <div className='p-3 rounded-xl bg-danger/10 border border-danger/25 text-danger text-xs flex items-center gap-2'>
                  <AlertCircle className='h-4 w-4 flex-shrink-0' />
                  <span>{loginError}</span>
                </div>
              )}

              <Button
                className='w-full font-semibold'
                color='primary'
                isLoading={isLoading}
                size='md'
                type='submit'
              >
                Sign In to Editor
              </Button>
            </form>

            <div className='pt-2 text-center'>
              <Button
                as={Link}
                className='text-xs text-muted-foreground hover:text-foreground'
                href='/blog'
                size='sm'
                variant='light'
              >
                <ArrowLeft className='h-3.5 w-3.5 mr-1' />
                Return to Public Handbook
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  // Admin Dashboard Workspace
  return (
    <div className='w-full space-y-8 pb-16'>
      {/* Admin Top Header */}
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-content1 border border-default-200/80 shadow-sm'>
        <div className='space-y-1'>
          <div className='flex items-center gap-2'>
            <span className='px-2 py-0.5 rounded-full bg-success/15 text-success text-xs font-mono font-semibold border border-success/30'>
              ● Logged In
            </span>
            <span className='text-xs text-muted-foreground'>Handbook CMS Workspace</span>
          </div>
          <h1 className='text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight'>
            Production Handbook Manager
          </h1>
        </div>

        <div className='flex items-center gap-2.5'>
          <Button
            as={Link}
            className='text-xs font-medium'
            href='/blog'
            size='sm'
            variant='flat'
          >
            <BookOpen className='h-3.5 w-3.5 mr-1' />
            View Public Handbook
          </Button>

          <Button
            className='text-xs font-semibold'
            color='danger'
            size='sm'
            variant='light'
            onPress={handleLogout}
          >
            <LogOut className='h-3.5 w-3.5 mr-1' />
            Logout
          </Button>
        </div>
      </div>

      {/* Status Notifications */}
      {statusMessage && (
        <div
          className={`p-4 rounded-xl text-xs sm:text-sm flex items-center gap-2.5 ${
            statusMessage.type === "success"
              ? "bg-success/15 border border-success/30 text-success"
              : "bg-danger/15 border border-danger/30 text-danger"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 className='h-4 w-4 flex-shrink-0' />
          ) : (
            <AlertCircle className='h-4 w-4 flex-shrink-0' />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Main Switcher: List vs Editor */}
      {activeTab === "list" ? (
        <div className='space-y-6'>
          <div className='flex items-center justify-between gap-4'>
            <div>
              <h2 className='text-xl font-bold text-foreground'>All Handbook Notes</h2>
              <p className='text-xs text-muted-foreground'>
                {articles.length} production runbooks and architectural notes stored.
              </p>
            </div>

            <Button
              className='font-semibold'
              color='primary'
              size='sm'
              startContent={<Plus className='h-4 w-4' />}
              onPress={handleStartCreate}
            >
              Add New Note
            </Button>
          </div>

          {/* Articles Table */}
          <div className='rounded-2xl border border-default-200/80 overflow-hidden bg-content1 shadow-sm'>
            <div className='divide-y divide-default-100'>
              {articles.map((article) => (
                <div
                  key={article.id}
                  className='p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-default-50/60 transition-colors'
                >
                  <div className='space-y-1 min-w-0 flex-1'>
                    <div className='flex items-center gap-2 flex-wrap'>
                      <span className='px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-mono border border-primary/20'>
                        {article.categoryLabel}
                      </span>
                      <span className='text-xs text-muted-foreground font-mono'>
                        slug: {article.slug}
                      </span>
                    </div>
                    <h3 className='text-base font-bold text-foreground'>{article.title}</h3>
                    <p className='text-xs text-muted-foreground line-clamp-1'>{article.excerpt}</p>
                  </div>

                  <div className='flex items-center gap-2 flex-shrink-0'>
                    <Button
                      size='sm'
                      variant='bordered'
                      onPress={() => handleStartEdit(article)}
                    >
                      <Edit className='h-3.5 w-3.5 mr-1 text-primary' />
                      Edit
                    </Button>

                    <Button
                      color='danger'
                      size='sm'
                      variant='light'
                      onPress={() => handleDeleteArticle(article.id)}
                    >
                      <Trash2 className='h-3.5 w-3.5 mr-1' />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Note Editor Form */
        <div className='space-y-6'>
          <div className='flex items-center justify-between gap-4 pb-4 border-b border-default-100'>
            <div className='flex items-center gap-3'>
              <Button
                size='sm'
                variant='light'
                onPress={() => setActiveTab("list")}
              >
                <ArrowLeft className='h-4 w-4 mr-1' />
                Back to List
              </Button>
              <h2 className='text-xl font-bold text-foreground'>
                {editingId ? "Edit Note" : "Create New Note"}
              </h2>
            </div>

            <div className='flex items-center gap-2'>
              <Button
                size='sm'
                variant={editorMode === "edit" ? "solid" : "bordered"}
                onPress={() => setEditorMode("edit")}
              >
                <Edit className='h-3.5 w-3.5 mr-1' /> Edit Form
              </Button>
              <Button
                size='sm'
                variant={editorMode === "preview" ? "solid" : "bordered"}
                onPress={() => setEditorMode("preview")}
              >
                <Eye className='h-3.5 w-3.5 mr-1' /> Obsidian Preview
              </Button>
            </div>
          </div>

          {editorMode === "edit" ? (
            <form className='space-y-6' onSubmit={handleSaveArticle}>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div className='space-y-1.5'>
                  <span className='block text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                    Note Title <span className='text-danger'>*</span>
                  </span>
                  <Input
                    required
                    placeholder='e.g. 8. Redis Sentinel Cluster Configuration'
                    value={formData.title}
                    variant='bordered'
                    onValueChange={(val) => setFormData((p) => ({ ...p, title: val }))}
                  />
                </div>

                <div className='space-y-1.5'>
                  <span className='block text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                    Slug / Unique ID
                  </span>
                  <Input
                    placeholder='e.g. redis-sentinel-ha'
                    value={formData.slug}
                    variant='bordered'
                    onValueChange={(val) => setFormData((p) => ({ ...p, slug: val }))}
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                <div className='space-y-1.5'>
                  <span className='block text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                    Category Key
                  </span>
                  <select
                    className='w-full h-10 px-3 rounded-xl border border-default-300 bg-content1 text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary'
                    value={formData.category}
                    onChange={(e) => {
                      const selectedKey = e.target.value;
                      const catObj = handbookCategories.find((c) => c.key === selectedKey);
                      setFormData((p) => ({
                        ...p,
                        category: selectedKey,
                        categoryLabel: catObj ? catObj.label.replace(/^[^\s]+\s/, "") : selectedKey,
                      }));
                    }}
                  >
                    {handbookCategories
                      .filter((c) => c.key !== "all")
                      .map((c) => (
                        <option key={c.key} value={c.key}>
                          {c.label}
                        </option>
                      ))}
                  </select>
                </div>

                <div className='space-y-1.5'>
                  <span className='block text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                    Read Time
                  </span>
                  <Input
                    placeholder='e.g. 6 min read'
                    value={formData.readTime}
                    variant='bordered'
                    onValueChange={(val) => setFormData((p) => ({ ...p, readTime: val }))}
                  />
                </div>

                <div className='space-y-1.5'>
                  <span className='block text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                    Tags (Comma-separated)
                  </span>
                  <Input
                    placeholder='Redis, HA, Cache, Linux'
                    value={formData.tags}
                    variant='bordered'
                    onValueChange={(val) => setFormData((p) => ({ ...p, tags: val }))}
                  />
                </div>
              </div>

              <div className='space-y-1.5'>
                <span className='block text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                  Excerpt / Short Summary
                </span>
                <Input
                  placeholder='Brief preview of what this runbook covers'
                  value={formData.excerpt}
                  variant='bordered'
                  onValueChange={(val) => setFormData((p) => ({ ...p, excerpt: val }))}
                />
              </div>

              <div className='space-y-1.5'>
                <span className='block text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                  Executive Summary (Obsidian Callout)
                </span>
                <Textarea
                  placeholder='Full architectural context and background explanation...'
                  rows={4}
                  value={formData.summary}
                  variant='bordered'
                  onValueChange={(val) => setFormData((p) => ({ ...p, summary: val }))}
                />
              </div>

              <div className='space-y-1.5'>
                <span className='block text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                  Key Principles / Takeaways (1 per line)
                </span>
                <Textarea
                  placeholder='- Enforce master-replica quorum&#10;- Configure auto-failover notification'
                  rows={4}
                  value={formData.keyTakeaways}
                  variant='bordered'
                  onValueChange={(val) => setFormData((p) => ({ ...p, keyTakeaways: val }))}
                />
              </div>

              {/* Code Snippets Manager */}
              <div className='space-y-4 pt-4 border-t border-default-100'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <Terminal className='h-4 w-4 text-primary' />
                    <h3 className='text-sm font-bold uppercase tracking-wider text-foreground'>
                      Code Snippets & Runbooks
                    </h3>
                  </div>
                  <Button
                    size='sm'
                    variant='flat'
                    onPress={handleAddCodeSnippet}
                  >
                    + Add Snippet
                  </Button>
                </div>

                <div className='space-y-4'>
                  {formData.codeSnippets.map((snippet, sIdx) => (
                    <div
                      key={sIdx}
                      className='p-4 rounded-xl border border-default-200 bg-content1 space-y-3'
                    >
                      <div className='flex items-center justify-between gap-3'>
                        <Input
                          placeholder='Snippet Title (e.g. Sentinel Configuration)'
                          size='sm'
                          value={snippet.title}
                          variant='bordered'
                          onValueChange={(val) => {
                            const updated = [...formData.codeSnippets];
                            updated[sIdx].title = val;
                            setFormData((p) => ({ ...p, codeSnippets: updated }));
                          }}
                        />

                        <Input
                          className='max-w-[120px]'
                          placeholder='bash/yaml'
                          size='sm'
                          value={snippet.language}
                          variant='bordered'
                          onValueChange={(val) => {
                            const updated = [...formData.codeSnippets];
                            updated[sIdx].language = val;
                            setFormData((p) => ({ ...p, codeSnippets: updated }));
                          }}
                        />

                        {formData.codeSnippets.length > 1 && (
                          <Button
                            color='danger'
                            isIconOnly
                            size='sm'
                            variant='light'
                            onPress={() => handleRemoveCodeSnippet(sIdx)}
                          >
                            <Trash2 className='h-4 w-4' />
                          </Button>
                        )}
                      </div>

                      <Textarea
                        className='font-mono text-xs'
                        placeholder='Paste code / commands here...'
                        rows={6}
                        value={snippet.code}
                        variant='bordered'
                        onValueChange={(val) => {
                          const updated = [...formData.codeSnippets];
                          updated[sIdx].code = val;
                          setFormData((p) => ({ ...p, codeSnippets: updated }));
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes / Callouts */}
              <div className='space-y-1.5 pt-2'>
                <span className='block text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                  Warning & Caution Notes (1 per line)
                </span>
                <Textarea
                  placeholder='Always backup configuration files before editing.'
                  rows={2}
                  value={formData.notes}
                  variant='bordered'
                  onValueChange={(val) => setFormData((p) => ({ ...p, notes: val }))}
                />
              </div>

              {/* Form Action Buttons */}
              <div className='flex items-center justify-end gap-3 pt-6 border-t border-default-100'>
                <Button
                  size='md'
                  variant='light'
                  onPress={() => setActiveTab("list")}
                >
                  Cancel
                </Button>

                <Button
                  className='font-semibold'
                  color='primary'
                  isLoading={isLoading}
                  size='md'
                  startContent={<Save className='h-4 w-4 mr-1' />}
                  type='submit'
                >
                  {editingId ? "Update Note" : "Publish Note"}
                </Button>
              </div>
            </form>
          ) : (
            /* Live Obsidian Preview */
            <div className='p-6 rounded-2xl bg-content1 border border-default-200/80 shadow-md space-y-6'>
              <div className='space-y-2 pb-4 border-b border-default-100'>
                <span className='text-xs font-mono text-primary uppercase'>
                  {formData.categoryLabel} / #{formData.slug || "note-preview"}
                </span>
                <h1 className='text-2xl sm:text-3xl font-bold'>{formData.title || "Untitled Note"}</h1>
                <div className='text-xs text-muted-foreground flex gap-2'>
                  <span>{formData.date}</span>
                  <span>•</span>
                  <span>{formData.readTime}</span>
                </div>
              </div>

              {formData.summary && (
                <div className='p-4 rounded-xl bg-primary/10 border border-primary/20 text-sm'>
                  <div className='font-bold text-primary text-xs uppercase mb-1'>Summary</div>
                  <p>{formData.summary}</p>
                </div>
              )}

              {formData.keyTakeaways && (
                <div className='space-y-2'>
                  <div className='font-bold text-xs uppercase text-muted-foreground'>Key Takeaways</div>
                  <ul className='space-y-1.5 text-xs sm:text-sm'>
                    {formData.keyTakeaways.split("\n").map((line, idx) => (
                      <li key={idx} className='flex items-center gap-2'>
                        <CheckCircle2 className='h-4 w-4 text-success flex-shrink-0' />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {formData.codeSnippets.map((snippet, idx) => (
                <div key={idx} className='rounded-xl bg-zinc-950 p-4 font-mono text-xs border border-zinc-800 text-zinc-100'>
                  <div className='text-zinc-400 font-bold mb-2 pb-1 border-b border-zinc-800 flex justify-between'>
                    <span>{snippet.title}</span>
                    <span className='uppercase'>{snippet.language}</span>
                  </div>
                  <pre className='overflow-x-auto'><code>{snippet.code}</code></pre>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
