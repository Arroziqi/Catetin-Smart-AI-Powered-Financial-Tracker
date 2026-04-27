"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { Check, X, Edit2, Trash2, AlertCircle, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/lib/components/ui/card";
import { Button } from "@/lib/components/ui/button";
import { Checkbox } from "@/lib/components/ui/checkbox";
import { Input } from "@/lib/components/ui/input";
import { Badge } from "@/lib/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/components/ui/utils";

interface ReceiptItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
  enabled: boolean;
}

interface ReceiptData {
  merchant: string;
  date: string;
  items: ReceiptItem[];
  subtotal: number;
  tax: number;
  serviceFee: number;
  total: number;
}

export default function ReviewReceiptPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // kalau nanti mau kirim data via query/localStorage
  const [receiptData, setReceiptData] = useState<ReceiptData>({
    merchant: "Unknown Merchant",
    date: "Apr 7, 2026",
    items: [],
    subtotal: 0,
    tax: 0,
    serviceFee: 0,
    total: 0,
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<ReceiptItem>>({});

  const handleToggleItem = (itemId: string) => {
    setReceiptData((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === itemId
          ? { ...item, enabled: !item.enabled }
          : item
      ),
    }));
  };

  const handleEditStart = (item: ReceiptItem) => {
    setEditingId(item.id);
    setEditValues(item);
  };

  const handleEditSave = (itemId: string) => {
    setReceiptData((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === itemId
          ? {
              ...item,
              ...editValues,
              total:
                Number(editValues.quantity ?? item.quantity) *
                Number(editValues.price ?? item.price),
            }
          : item
      ),
    }));

    setEditingId(null);
    setEditValues({});
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditValues({});
  };

  const handleRemoveItem = (itemId: string) => {
    setReceiptData((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== itemId),
    }));

    toast.success("Item removed");
  };

  const handleSaveAll = () => {
    const enabledItems = receiptData.items.filter((item) => item.enabled);

    if (enabledItems.length === 0) {
      toast.error("Please select at least one item to save");
      return;
    }

    toast.success(
      `${enabledItems.length} transactions saved successfully! 🎉`
    );

    setTimeout(() => {
      router.push("/");
    }, 1000);
  };

  const enabledTotal = receiptData.items
    .filter((item) => item.enabled)
    .reduce((sum, item) => sum + item.total, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl mx-auto space-y-6"
    >
      {/* Header */}
      <div className="space-y-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/scan")}
        >
          ← Back
        </Button>

        <h1 className="text-3xl font-semibold tracking-tight">
          Review Receipt
        </h1>

        <p className="text-muted-foreground">
          Review and edit the extracted data before saving
        </p>
      </div>

      {/* Warning */}
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />

            <div>
              <p className="text-sm font-medium text-amber-900">
                AI-extracted data
              </p>

              <p className="text-sm text-amber-800">
                Please review all items carefully.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Receipt */}
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>{receiptData.merchant}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {receiptData.date}
              </p>
            </div>

            <Badge variant="outline">
              {receiptData.items.filter((i) => i.enabled).length} of{" "}
              {receiptData.items.length}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="divide-y">
            {receiptData.items.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "p-4",
                  !item.enabled && "opacity-60 bg-muted/30"
                )}
              >
                {editingId === item.id ? (
                  <div className="space-y-3">
                    <Input
                      value={editValues.name ?? item.name}
                      onChange={(e) =>
                        setEditValues((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                    />

                    <Input
                      type="number"
                      value={editValues.quantity ?? item.quantity}
                      onChange={(e) =>
                        setEditValues((prev) => ({
                          ...prev,
                          quantity: Number(e.target.value),
                        }))
                      }
                    />

                    <Input
                      type="number"
                      value={editValues.price ?? item.price}
                      onChange={(e) =>
                        setEditValues((prev) => ({
                          ...prev,
                          price: Number(e.target.value),
                        }))
                      }
                    />

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleEditSave(item.id)}
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Save
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleEditCancel}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <Checkbox
                      checked={item.enabled}
                      onCheckedChange={() =>
                        handleToggleItem(item.id)
                      }
                    />

                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>

                      <p className="text-sm text-muted-foreground">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>

                    <p className="font-semibold">
                      ${item.total.toFixed(2)}
                    </p>

                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleEditStart(item)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>

                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="border-t p-6 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${receiptData.subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Tax</span>
              <span>${receiptData.tax.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Service Fee</span>
              <span>${receiptData.serviceFee.toFixed(2)}</span>
            </div>

            <div className="flex justify-between font-semibold text-lg pt-2 border-t">
              <span>Total Selected</span>
              <span>${enabledTotal.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-3 justify-end">
        <Button
          variant="outline"
          onClick={() => router.push("/scan")}
        >
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>

        <Button onClick={handleSaveAll}>
          <Save className="w-4 h-4 mr-2" />
          Save All Transactions
        </Button>
      </div>
    </motion.div>
  );
}