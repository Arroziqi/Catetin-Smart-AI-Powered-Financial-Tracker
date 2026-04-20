import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { motion } from "motion/react";
import { Check, X, Edit2, Trash2, AlertCircle, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { toast } from "sonner";
import { cn } from "../components/ui/utils";

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

export function ReviewReceiptPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [receiptData, setReceiptData] = useState<ReceiptData>(
    location.state?.receiptData || {
      merchant: "Unknown Merchant",
      date: "Apr 7, 2026",
      items: [],
      subtotal: 0,
      tax: 0,
      serviceFee: 0,
      total: 0,
    }
  );

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<ReceiptItem>>({});

  const handleToggleItem = (itemId: string) => {
    setReceiptData(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === itemId ? { ...item, enabled: !item.enabled } : item
      ),
    }));
  };

  const handleEditStart = (item: ReceiptItem) => {
    setEditingId(item.id);
    setEditValues(item);
  };

  const handleEditSave = (itemId: string) => {
    setReceiptData(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === itemId
          ? { ...item, ...editValues, total: (editValues.quantity || item.quantity) * (editValues.price || item.price) }
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
    setReceiptData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId),
    }));
    toast.success("Item removed");
  };

  const handleSaveAll = () => {
    const enabledItems = receiptData.items.filter(item => item.enabled);
    if (enabledItems.length === 0) {
      toast.error("Please select at least one item to save");
      return;
    }

    // Mock API call
    toast.success(`${enabledItems.length} transactions saved successfully! 🎉`);
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const enabledTotal = receiptData.items
    .filter(item => item.enabled)
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
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/scan")}
          >
            ← Back
          </Button>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">Review Receipt</h1>
        <p className="text-muted-foreground">Review and edit the extracted data before saving</p>
      </div>

      {/* AI Warning */}
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-amber-900">AI-extracted data</p>
              <p className="text-sm text-amber-800">
                Please review all items carefully. AI may occasionally misread information.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Receipt Details */}
      <Card className="shadow-lg">
        <CardHeader className="border-b bg-gradient-to-r from-emerald-50 to-teal-50">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl">{receiptData.merchant}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{receiptData.date}</p>
            </div>
            <Badge variant="outline" className="bg-white">
              {receiptData.items.filter(i => i.enabled).length} of {receiptData.items.length} items
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {/* Items List */}
          <div className="divide-y">
            {receiptData.items.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "p-4 transition-colors",
                  !item.enabled && "bg-muted/30 opacity-60"
                )}
              >
                {editingId === item.id ? (
                  // Edit Mode
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-muted-foreground">Item Name</label>
                        <Input
                          value={editValues.name || item.name}
                          onChange={(e) => setEditValues(prev => ({ ...prev, name: e.target.value }))}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground">Quantity</label>
                        <Input
                          type="number"
                          value={editValues.quantity || item.quantity}
                          onChange={(e) => setEditValues(prev => ({ ...prev, quantity: parseFloat(e.target.value) }))}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Price</label>
                      <Input
                        type="number"
                        step="0.01"
                        value={editValues.price || item.price}
                        onChange={(e) => setEditValues(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                        className="mt-1"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleEditSave(item.id)} className="gap-2">
                        <Check className="w-4 h-4" />
                        Save
                      </Button>
                      <Button size="sm" variant="outline" onClick={handleEditCancel}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={item.enabled}
                      onCheckedChange={() => handleToggleItem(item.id)}
                      className="mt-1"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            ${item.price.toFixed(2)} × {item.quantity}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-semibold">${item.total.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleEditStart(item)}
                        className="h-8 w-8"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleRemoveItem(item.id)}
                        className="h-8 w-8 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="border-t bg-muted/30 p-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${receiptData.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax</span>
              <span>${receiptData.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Service Fee</span>
              <span>${receiptData.serviceFee.toFixed(2)}</span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total (Selected)</span>
              <span className="text-primary">${enabledTotal.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-end sticky bottom-20 md:bottom-6 bg-background/80 backdrop-blur-sm p-4 -mx-4 border-t md:border-0">
        <Button
          variant="outline"
          size="lg"
          onClick={() => navigate("/scan")}
          className="flex-1 md:flex-initial"
        >
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
        <Button
          size="lg"
          onClick={handleSaveAll}
          className="flex-1 md:flex-initial bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 gap-2"
        >
          <Save className="w-4 h-4" />
          Save All Transactions
        </Button>
      </div>
    </motion.div>
  );
}