import { useState, useCallback } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Upload, Scan, Loader2, Image as ImageIcon } from "lucide-react";
import { Card, CardContent } from "@/lib/components/ui/card";
import { Button } from "@/lib/components/ui/button";
import { cn } from "@/lib/components/ui/utils";

export function ScanReceiptPage() {
  const navigate = useNavigate();
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  }, []);

  const handleFile = (file: File) => {
    // Preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Mock upload and scan
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      // Navigate to review page with mock data
      navigate("/review-receipt", {
        state: {
          receiptData: {
            merchant: "The Coffee House",
            date: "Apr 7, 2026",
            items: [
              { id: "1", name: "Caffe Latte", quantity: 2, price: 5.50, total: 11.00, enabled: true },
              { id: "2", name: "Croissant", quantity: 1, price: 4.00, total: 4.00, enabled: true },
              { id: "3", name: "Avocado Toast", quantity: 1, price: 8.50, total: 8.50, enabled: true },
              { id: "4", name: "Orange Juice", quantity: 2, price: 3.50, total: 7.00, enabled: true },
            ],
            subtotal: 30.50,
            tax: 2.75,
            serviceFee: 1.50,
            total: 34.75,
          },
        },
      });
    }, 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto space-y-6"
    >
      {/* Header */}
      <div className="space-y-2 text-center md:text-left">
        <h1 className="text-3xl font-semibold tracking-tight">Scan Receipt</h1>
        <p className="text-muted-foreground">Upload a receipt to automatically extract expenses</p>
      </div>

      {/* Upload Area */}
      <Card className="shadow-lg border-2 border-dashed">
        <CardContent className="p-8">
          <div
            className={cn(
              "relative border-2 border-dashed rounded-2xl p-12 text-center transition-all",
              dragActive ? "border-primary bg-primary/5" : "border-border",
              uploading && "pointer-events-none opacity-60"
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={uploading}
            />

            {uploading ? (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold">Scanning receipt...</p>
                  <p className="text-sm text-muted-foreground">AI is extracting transaction details</p>
                </div>
              </div>
            ) : preview ? (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <img src={preview} alt="Receipt preview" className="max-h-64 rounded-lg shadow-md" />
                </div>
                <p className="text-sm text-muted-foreground">Click or drag to replace</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                    <Scan className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold">Drop your receipt here</p>
                  <p className="text-sm text-muted-foreground">or click to browse from your device</p>
                </div>
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <ImageIcon className="w-4 h-4" />
                  <span>Supports JPG, PNG, PDF</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200/50">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-3 text-blue-900">Tips for best results:</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex gap-2">
              <span>✓</span>
              <span>Ensure the receipt is clear and well-lit</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>Include all edges of the receipt in the photo</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>Avoid shadows and glare</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
}