"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Folder,
  FolderOpen,
  FileText,
  ChevronRight,
  ChevronDown,
  Search,
  Copy,
  Check,
  CheckCircle2,
  Terminal,
  BookOpen,
  Lock,
  Tag,
  Clock,
  Calendar,
  Sparkles,
  Layers,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Button, Input } from "@heroui/react";

import {
  HandbookArticle,
  handbookArticles as defaultArticles,
  handbookCategories as defaultCategories,
} from "@/data/handbook";

export default function BlogComponent() {
  const [articles, setArticles] = useState<HandbookArticle[]>(defaultArticles);
  const [categories, setCategories] = useState(defaultCategories);
  const [activeArticleId, setActiveArticleId] = useState<string>(defaultArticles[0]?.id || "ssh-hardening");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedSnippetIndex, setCopiedSnippetIndex] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Expanded folders state: folder key -> boolean
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    vps_security: true,
    docker_linux: true,
    networking: true,
    deployment: true,
    database: true,
  });

  // Fetch live articles from API if available
  useEffect(() => {
    fetch("/api/handbook")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.articles) && data.articles.length > 0) {
          setArticles(data.articles);
          if (data.categories) setCategories(data.categories);
        }
      })
      .catch(() => {
        // Fallback to static seed
      });
  }, []);

  const toggleFolder = (folderKey: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderKey]: !prev[folderKey],
    }));
  };

  const expandAll = () => {
    const next: Record<string, boolean> = {};
    categories.forEach((c) => {
      if (c.key !== "all") next[c.key] = true;
    });
    setExpandedFolders(next);
  };

  const collapseAll = () => {
    setExpandedFolders({});
  };

  // Filtered articles based on search
  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) return articles;
    const q = searchQuery.toLowerCase();

    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.categoryLabel.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q)) ||
        a.content.summary.toLowerCase().includes(q) ||
        a.content.codeSnippets?.some(
          (s) => s.title.toLowerCase().includes(q) || s.code.toLowerCase().includes(q),
        ),
    );
  }, [articles, searchQuery]);

  // Group filtered articles by category
  const groupedArticles = useMemo(() => {
    const map: Record<string, HandbookArticle[]> = {};
    categories.forEach((cat) => {
      if (cat.key !== "all") map[cat.key] = [];
    });

    filteredArticles.forEach((art) => {
      if (!map[art.category]) {
        map[art.category] = [];
      }
      map[art.category].push(art);
    });

    return map;
  }, [categories, filteredArticles]);

  const activeArticle = useMemo(() => {
    return articles.find((a) => a.id === activeArticleId) || articles[0];
  }, [articles, activeArticleId]);

  const activeIndex = useMemo(() => {
    return articles.findIndex((a) => a.id === activeArticle?.id);
  }, [articles, activeArticle]);

  const prevArticle = activeIndex > 0 ? articles[activeIndex - 1] : null;
  const nextArticle = activeIndex < articles.length - 1 ? articles[activeIndex + 1] : null;

  const handleCopySnippet = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippetIndex(idx);
    setTimeout(() => setCopiedSnippetIndex(null), 2000);
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className='w-full space-y-6'>
      {/* Top Header Banner */}
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-default-200/70'>
        <div className='space-y-1'>
          <div className='flex items-center gap-2'>
            <div className='p-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20'>
              <BookOpen className='h-4 w-4' />
            </div>
            <span className='text-xs font-semibold uppercase tracking-wider text-primary'>
              Obsidian Knowledge Base
            </span>
          </div>
          <h1 className='text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground'>
            DevOps & VPS Production Handbook
          </h1>
        </div>

        <div className='flex items-center gap-2.5'>
          <Button
            as={Link}
            className='text-xs font-medium text-muted-foreground hover:text-foreground'
            href='/'
            size='sm'
            variant='light'
          >
            <ArrowLeft className='h-3.5 w-3.5 mr-1' />
            Back to Home
          </Button>

          <Button
            as={Link}
            className='text-xs font-semibold'
            color='primary'
            href='/blog/admin'
            size='sm'
            variant='flat'
          >
            <Lock className='h-3.5 w-3.5 mr-1' />
            Admin Editor
          </Button>
        </div>
      </div>

      {/* Main Obsidian Split Workspace */}
      <div className='grid grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)] gap-6 items-start'>
        {/* Left Obsidian Tree Sidebar */}
        <aside className='w-full rounded-2xl bg-content1 border border-default-200/80 shadow-md p-4 space-y-4 lg:sticky lg:top-20'>
          {/* Vault Title & Expand controls */}
          <div className='flex items-center justify-between gap-2 pb-3 border-b border-default-100'>
            <div className='flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground'>
              <Layers className='h-3.5 w-3.5 text-primary' />
              <span>Production Vault</span>
              <span className='px-1.5 py-0.5 rounded-md bg-default-100 text-muted-foreground text-[10px] font-mono'>
                {articles.length} notes
              </span>
            </div>

            <div className='flex items-center gap-1 text-[11px] text-muted-foreground'>
              <button
                className='hover:text-foreground hover:underline'
                type='button'
                onClick={expandAll}
              >
                Expand
              </button>
              <span>/</span>
              <button
                className='hover:text-foreground hover:underline'
                type='button'
                onClick={collapseAll}
              >
                Collapse
              </button>
            </div>
          </div>

          {/* Quick Search in Vault */}
          <Input
            classNames={{
              inputWrapper: "h-9 bg-default-100/80 hover:bg-default-200/80 rounded-xl text-xs",
            }}
            placeholder='Quick search notes (Cmd+K)...'
            size='sm'
            startContent={<Search className='h-3.5 w-3.5 text-muted-foreground mr-1' />}
            value={searchQuery}
            variant='flat'
            onValueChange={setSearchQuery}
          />

          {/* Collapsible Category Folders & Documents Tree */}
          <div className='space-y-2 max-h-[600px] overflow-y-auto pr-1 scrollbar-thin'>
            {categories
              .filter((c) => c.key !== "all")
              .map((cat) => {
                const folderArticles = groupedArticles[cat.key] || [];
                const isExpanded = !!expandedFolders[cat.key] || searchQuery.trim().length > 0;
                const hasActiveInFolder = folderArticles.some((a) => a.id === activeArticleId);

                if (searchQuery.trim().length > 0 && folderArticles.length === 0) {
                  return null;
                }

                return (
                  <div key={cat.key} className='space-y-1'>
                    {/* Folder Header Row */}
                    <button
                      className={`w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                        hasActiveInFolder
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-default-100 text-foreground"
                      }`}
                      type='button'
                      onClick={() => toggleFolder(cat.key)}
                    >
                      <div className='flex items-center gap-2 min-w-0'>
                        {isExpanded ? (
                          <ChevronDown className='h-3.5 w-3.5 text-muted-foreground flex-shrink-0' />
                        ) : (
                          <ChevronRight className='h-3.5 w-3.5 text-muted-foreground flex-shrink-0' />
                        )}

                        {isExpanded ? (
                          <FolderOpen className='h-4 w-4 text-primary flex-shrink-0' />
                        ) : (
                          <Folder className='h-4 w-4 text-muted-foreground flex-shrink-0' />
                        )}

                        <span className='truncate text-left'>{cat.label}</span>
                      </div>

                      <span className='text-[10px] font-mono text-muted-foreground px-1.5 py-0.5 rounded bg-default-100 flex-shrink-0'>
                        {folderArticles.length}
                      </span>
                    </button>

                    {/* Folder Children (Articles) */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          animate={{ opacity: 1, height: "auto" }}
                          className='pl-6 space-y-0.5 border-l-2 border-default-100 ml-3.5 overflow-hidden'
                          exit={{ opacity: 0, height: 0 }}
                          initial={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.15 }}
                        >
                          {folderArticles.length === 0 ? (
                            <div className='text-[11px] text-muted-foreground py-1 px-2 italic'>
                              Empty folder
                            </div>
                          ) : (
                            folderArticles.map((art) => {
                              const isActive = art.id === activeArticleId;

                              return (
                                <button
                                  key={art.id}
                                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-all text-left cursor-pointer ${
                                    isActive
                                      ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                                      : "text-muted-foreground hover:text-foreground hover:bg-default-100"
                                  }`}
                                  type='button'
                                  onClick={() => setActiveArticleId(art.id)}
                                >
                                  <FileText
                                    className={`h-3.5 w-3.5 flex-shrink-0 ${
                                      isActive ? "text-primary-foreground" : "text-muted-foreground"
                                    }`}
                                  />
                                  <span className='truncate'>{art.title}</span>
                                </button>
                              );
                            })
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
          </div>

          {/* Sidebar Footer Link */}
          <div className='pt-3 border-t border-default-100 flex items-center justify-between text-xs text-muted-foreground'>
            <span className='flex items-center gap-1'>
              <ShieldCheck className='h-3.5 w-3.5 text-success' />
              Tested on Linux 24.04
            </span>
            <Link
              className='text-primary hover:underline font-semibold'
              href='/blog/admin'
            >
              + Add Note
            </Link>
          </div>
        </aside>

        {/* Right Obsidian Reading Workspace */}
        <main className='w-full min-w-0 rounded-2xl bg-content1 border border-default-200/80 shadow-md p-6 sm:p-8 lg:p-10 space-y-8'>
          {activeArticle ? (
            <>
              {/* Document Header & Breadcrumb Trail */}
              <div className='space-y-3 pb-6 border-b border-default-100'>
                {/* Breadcrumbs */}
                <div className='flex items-center justify-between gap-2 flex-wrap text-xs text-muted-foreground font-mono'>
                  <div className='flex items-center gap-1.5'>
                    <span>Vault</span>
                    <span>/</span>
                    <span className='text-foreground font-semibold'>
                      {activeArticle.categoryLabel}
                    </span>
                    <span>/</span>
                    <span className='text-primary truncate max-w-[200px] sm:max-w-xs'>
                      {activeArticle.slug}
                    </span>
                  </div>

                  <div className='flex items-center gap-2'>
                    <Button
                      className='text-xs h-7 px-2.5 text-muted-foreground hover:text-foreground'
                      size='sm'
                      variant='light'
                      onPress={handleCopyLink}
                    >
                      {copiedLink ? (
                        <>
                          <Check className='h-3 w-3 mr-1 text-success' /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className='h-3 w-3 mr-1' /> Share
                        </>
                      )}
                    </Button>

                    <Button
                      as={Link}
                      className='text-xs h-7 px-2.5 text-primary'
                      href={`/blog/admin?edit=${activeArticle.id}`}
                      size='sm'
                      variant='flat'
                    >
                      Edit Note
                    </Button>
                  </div>
                </div>

                {/* Article Title */}
                <h1 className='text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight leading-snug'>
                  {activeArticle.title}
                </h1>

                {/* Metadata Ribbon */}
                <div className='flex flex-wrap items-center gap-3 pt-2 text-xs text-muted-foreground'>
                  <div className='flex items-center gap-1'>
                    <Calendar className='h-3.5 w-3.5 text-primary' />
                    <span>{activeArticle.date}</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <Clock className='h-3.5 w-3.5 text-primary' />
                    <span>{activeArticle.readTime}</span>
                  </div>
                  <div className='flex items-center gap-1.5 flex-wrap'>
                    <Tag className='h-3.5 w-3.5 text-primary' />
                    {activeArticle.tags.map((tag) => (
                      <span
                        key={tag}
                        className='px-2 py-0.5 rounded-md bg-default-100 text-foreground font-mono text-[11px] border border-default-200'
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Obsidian Callout: Executive Summary */}
              <div className='p-4 sm:p-5 rounded-2xl bg-primary/10 border border-primary/25 space-y-2'>
                <div className='flex items-center gap-2 text-primary font-bold text-sm'>
                  <Sparkles className='h-4 w-4' />
                  <span>Executive Architecture Summary</span>
                </div>
                <p className='text-sm sm:text-base text-foreground/90 leading-relaxed'>
                  {activeArticle.content.summary}
                </p>
              </div>

              {/* Obsidian Key Takeaways & Checklist */}
              {activeArticle.content.keyTakeaways && activeArticle.content.keyTakeaways.length > 0 && (
                <div className='space-y-3'>
                  <h2 className='text-base font-bold text-foreground uppercase tracking-wider flex items-center gap-2'>
                    <span>📋 Core Engineering Principles</span>
                  </h2>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                    {activeArticle.content.keyTakeaways.map((takeaway, idx) => (
                      <div
                        key={idx}
                        className='flex items-start gap-2.5 p-3.5 rounded-xl bg-default-50 border border-default-200/60 text-xs sm:text-sm text-foreground/90'
                      >
                        <CheckCircle2 className='h-4 w-4 text-success flex-shrink-0 mt-0.5' />
                        <span>{takeaway}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Code Snippets & Terminal Runbooks */}
              {activeArticle.content.codeSnippets && activeArticle.content.codeSnippets.length > 0 && (
                <div className='space-y-5'>
                  <h2 className='text-base font-bold text-foreground uppercase tracking-wider flex items-center gap-2'>
                    <Terminal className='h-4 w-4 text-primary' />
                    <span>Configuration & Execution Runbooks</span>
                  </h2>

                  <div className='space-y-4'>
                    {activeArticle.content.codeSnippets.map((snippet, sIdx) => {
                      const isCopied = copiedSnippetIndex === sIdx;

                      return (
                        <div
                          key={sIdx}
                          className='rounded-xl overflow-hidden border border-default-200/90 shadow-md bg-zinc-950 font-mono text-xs'
                        >
                          {/* Code Block Header */}
                          <div className='flex items-center justify-between px-4 py-2.5 bg-zinc-900 border-b border-zinc-800 text-zinc-300'>
                            <div className='flex items-center gap-2 truncate'>
                              <div className='flex gap-1.5'>
                                <span className='w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block' />
                                <span className='w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block' />
                                <span className='w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block' />
                              </div>
                              <span className='font-semibold text-zinc-200 truncate pl-1'>
                                {snippet.title}
                              </span>
                              <span className='px-1.5 py-0.5 rounded bg-zinc-800 text-primary text-[10px] uppercase font-bold'>
                                {snippet.language}
                              </span>
                            </div>

                            <button
                              aria-label='Copy code'
                              className='flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs transition-colors cursor-pointer'
                              type='button'
                              onClick={() => handleCopySnippet(snippet.code, sIdx)}
                            >
                              {isCopied ? (
                                <>
                                  <Check className='h-3.5 w-3.5 text-success' />
                                  <span className='text-success font-semibold'>Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className='h-3.5 w-3.5' />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>

                          {/* Code Content */}
                          <pre className='p-4 text-zinc-100 overflow-x-auto leading-relaxed text-[13px] scrollbar-thin'>
                            <code>{snippet.code}</code>
                          </pre>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Obsidian Admonitions / Notes */}
              {activeArticle.content.notes && activeArticle.content.notes.length > 0 && (
                <div className='space-y-2'>
                  {activeArticle.content.notes.map((note, nIdx) => (
                    <div
                      key={nIdx}
                      className='p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs sm:text-sm flex items-start gap-2.5'
                    >
                      <span className='font-bold text-sm'>💡 Note:</span>
                      <span>{note}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Next / Previous Note Navigation Footer */}
              <div className='pt-8 border-t border-default-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4'>
                {prevArticle ? (
                  <button
                    className='flex-1 p-3.5 rounded-xl border border-default-200 hover:border-primary/50 text-left transition-all group cursor-pointer'
                    type='button'
                    onClick={() => setActiveArticleId(prevArticle.id)}
                  >
                    <div className='text-[11px] text-muted-foreground flex items-center gap-1 group-hover:text-primary'>
                      <ArrowLeft className='h-3 w-3' /> Previous Note
                    </div>
                    <div className='text-xs sm:text-sm font-bold text-foreground truncate mt-0.5'>
                      {prevArticle.title}
                    </div>
                  </button>
                ) : (
                  <div className='flex-1' />
                )}

                {nextArticle && (
                  <button
                    className='flex-1 p-3.5 rounded-xl border border-default-200 hover:border-primary/50 text-right transition-all group cursor-pointer'
                    type='button'
                    onClick={() => setActiveArticleId(nextArticle.id)}
                  >
                    <div className='text-[11px] text-muted-foreground flex items-center justify-end gap-1 group-hover:text-primary'>
                      Next Note <ArrowRight className='h-3 w-3' />
                    </div>
                    <div className='text-xs sm:text-sm font-bold text-foreground truncate mt-0.5'>
                      {nextArticle.title}
                    </div>
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className='text-center py-20 space-y-3'>
              <BookOpen className='h-12 w-12 text-muted-foreground mx-auto' />
              <h3 className='text-lg font-bold'>No Note Selected</h3>
              <p className='text-sm text-muted-foreground'>
                Choose a note from the left Obsidian tree sidebar to begin reading.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
