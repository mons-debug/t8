"use client";

import { useState, useRef, useTransition } from "react";
import { setCoverImage, deletePhoto } from "@/actions/photos";
import { Button } from "@/components/ui/button";
import { Upload, Star, Trash2, ImageIcon, Loader2 } from "lucide-react";

type PhotoManagerProps = {
  vehicleId: number;
  images: string[];
  coverImage: string | null;
};

export function PhotoManager({ vehicleId, images, coverImage }: PhotoManagerProps) {
  const [uploading, setUploading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleUpload(files: FileList) {
    setUploading(true);
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append("file", files[i]);
      formData.append("vehicleId", vehicleId.toString());
      await fetch("/api/upload", { method: "POST", body: formData });
    }
    setUploading(false);
    window.location.reload();
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    if (e.dataTransfer.files.length) handleUpload(e.dataTransfer.files);
  }

  function handleSetCover(url: string) {
    startTransition(() => setCoverImage(vehicleId, url));
  }

  function handleDelete(url: string) {
    startTransition(() => deletePhoto(vehicleId, url));
  }

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-8 transition-colors hover:border-[#e53935]/40 hover:bg-[#ffebee]/30"
      >
        {uploading ? (
          <Loader2 className="h-8 w-8 animate-spin text-[#e53935]" />
        ) : (
          <Upload className="h-8 w-8 text-gray-400" />
        )}
        <p className="text-sm text-muted-foreground">
          {uploading
            ? "Upload en cours..."
            : "Glisser les photos ici ou cliquer pour sélectionner"}
        </p>
        <p className="text-xs text-gray-400">JPG, PNG — max 10 MB par photo</p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && handleUpload(e.target.files)}
        />
      </div>

      {/* Photo grid */}
      {images.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((url, i) => {
            const isCover = url === coverImage;
            return (
              <div
                key={url}
                className={`group relative overflow-hidden rounded-xl border-2 ${
                  isCover ? "border-[#e53935]" : "border-transparent"
                }`}
              >
                <img
                  src={url}
                  alt={`Photo ${i + 1}`}
                  className="aspect-[4/3] w-full object-cover"
                />
                {isCover && (
                  <span className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-[#e53935] px-2 py-0.5 text-[10px] font-bold text-white">
                    <Star className="h-3 w-3" /> Couverture
                  </span>
                )}
                {/* Overlay actions */}
                <div className="absolute inset-0 flex items-end justify-center gap-2 bg-black/0 p-2 opacity-0 transition-all group-hover:bg-black/40 group-hover:opacity-100">
                  {!isCover && (
                    <Button
                      size="xs"
                      variant="secondary"
                      onClick={() => handleSetCover(url)}
                      disabled={isPending}
                      className="bg-white/90 text-xs"
                    >
                      <Star className="mr-1 h-3 w-3" /> Couverture
                    </Button>
                  )}
                  <Button
                    size="xs"
                    variant="destructive"
                    onClick={() => handleDelete(url)}
                    disabled={isPending}
                    className="text-xs"
                  >
                    <Trash2 className="mr-1 h-3 w-3" /> Supprimer
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border bg-white py-12">
          <ImageIcon className="h-12 w-12 text-gray-200" />
          <p className="mt-2 text-sm text-muted-foreground">Aucune photo</p>
        </div>
      )}
    </div>
  );
}
