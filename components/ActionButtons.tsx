"use client";

import { Clipboard, Share2, RotateCcw, Trash2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ActionButtonsProps {
  variant: "inline" | "footer";
  onCopy?: () => void;
  onShare?: () => void;
  onSwap?: () => void;
  onClear?: () => void;
  onTransliterate?: () => void;
  copyText?: string;
  shareText?: string;
  disabled?: boolean;
  loading?: boolean;
}

export function ActionButtons({
  variant,
  onCopy,
  onShare,
  onSwap,
  onClear,
  onTransliterate,
  copyText = "",
  shareText = "",
  disabled = false,
  loading = false,
}: ActionButtonsProps) {
  const handleCopy = async () => {
    if (!copyText.trim()) {
      toast.error("Nothing to copy");
      return;
    }

    try {
      await navigator.clipboard.writeText(copyText);
      toast.success("Copied to clipboard");
      onCopy?.();
    } catch {
      toast.error("Failed to copy");
    }
  };

  const handleShare = async () => {
    if (!shareText.trim()) {
      toast.error("Nothing to share");
      return;
    }

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Arabic Transliteration",
          text: shareText,
        });
      } else {
        // Fallback to copying URL with text
        const url = window.location.href;
        const shareContent = `${shareText}\n\nTransliterated using: ${url}`;
        await navigator.clipboard.writeText(shareContent);
        toast.success("Shared content copied to clipboard");
      }
      onShare?.();
    } catch {
      toast.error("Failed to share");
    }
  };

  if (variant === "inline") {
    return (
      <div className="absolute -top-2 -right-2 flex gap-1">
        <Button
          size="sm"
          variant="outline"
          onClick={handleCopy}
          disabled={disabled || !copyText.trim()}
          className="p-2 rounded-full hover:bg-neutral-200 transition"
        >
          <Clipboard className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleShare}
          disabled={disabled || !shareText.trim()}
          className="p-2 rounded-full hover:bg-neutral-200 transition"
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex gap-3 justify-center pt-6">
      <Button
        variant="outline"
        onClick={onClear}
        disabled={disabled}
        className="inline-flex gap-2 px-5 py-2 rounded-full font-medium"
      >
        <Trash2 className="h-4 w-4" />
        Clear
      </Button>

      <Button
        variant="outline"
        onClick={onSwap}
        disabled={disabled}
        className="inline-flex gap-2 px-5 py-2 rounded-full font-medium"
      >
        <RotateCcw className="h-4 w-4" />
        Swap
      </Button>

      <Button
        onClick={onTransliterate}
        disabled={loading}
        className={cn(
          "inline-flex gap-2 px-5 py-2 rounded-full font-medium shadow-sm",
          "bg-[#9d5148] hover:bg-[#8a463d] focus-visible:outline text-white"
        )}
      >
        <Play className="h-4 w-4" />
        {loading ? "Transliterating..." : "Transliterate"}
      </Button>
    </div>
  );
}