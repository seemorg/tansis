"use client";

import { Clipboard, Share2, ArrowUpDown, Trash2, Play } from "lucide-react";
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
      <div className="absolute top-0 right-6 transform -translate-y-1/2 flex gap-1">
        <Button
          size="sm"
          variant="outline"
          onClick={handleCopy}
          disabled={!copyText.trim()}
          className="h-7 w-7 sm:h-8 sm:w-8 rounded-full hover:bg-neutral-200 transition-colors cursor-pointer"
        >
          <Clipboard className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleShare}
          disabled={!shareText.trim()}
          className="h-7 w-7 sm:h-8 sm:w-8 rounded-full hover:bg-neutral-200 transition-colors cursor-pointer"
        >
          <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center pt-4 sm:pt-6">
      {/* Convert button first on mobile, last on desktop */}
      <Button
        onClick={onTransliterate}
        disabled={loading}
        className={cn(
          "inline-flex gap-2 px-4 sm:px-5 py-2 rounded-lg sm:rounded-full font-medium shadow-sm cursor-pointer text-sm order-1 sm:order-3",
          "bg-[#9d5148] hover:bg-[#8a463d] focus-visible:outline text-white"
        )}
      >
        <Play className="h-4 w-4" />
        <span className="hidden sm:inline">{loading ? "Transliterating..." : "Transliterate"}</span>
        <span className="sm:hidden">{loading ? "Converting..." : "Convert"}</span>
      </Button>

      <Button
        variant="outline"
        onClick={onClear}
        disabled={disabled}
        className="inline-flex gap-2 px-4 sm:px-5 py-2 rounded-lg sm:rounded-full font-medium cursor-pointer text-sm order-2 sm:order-1"
      >
        <Trash2 className="h-4 w-4" />
        Clear
      </Button>

      <Button
        variant="outline"
        onClick={onSwap}
        disabled={disabled}
        className="inline-flex gap-2 px-4 sm:px-5 py-2 rounded-lg sm:rounded-full font-medium cursor-pointer text-sm order-3 sm:order-2"
      >
        <ArrowUpDown className="h-4 w-4" />
        Swap
      </Button>
    </div>
  );
}