import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";

export interface ProductForm {
  name: string;
  description: string;
  price: string;
  old_price: string;
  category: string;
  image_url: string;
}

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: ProductForm;
  setForm: (form: ProductForm) => void;
  editingId: string | null;
  saving: boolean;
  onSave: () => void;
  onReset: () => void;
}

const ProductDialog = ({ open, onOpenChange, form, setForm, editingId, saving, onSave, onReset }: ProductDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={(o) => { onOpenChange(o); if (!o) onReset(); }}>
      <DialogTrigger asChild>
        <Button className="gap-1">
          <Plus className="w-4 h-4" /> Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-display">{editingId ? "Edit Product" : "New Product"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Product name" />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Short description" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Price ($)</Label>
              <Input type="number" step="0.01" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="9.99" />
            </div>
            <div className="space-y-2">
              <Label>Old Price ($)</Label>
              <Input type="number" step="0.01" min="0" value={form.old_price} onChange={(e) => setForm({ ...form, old_price: e.target.value })} placeholder="19.99" />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="PDF">PDF</SelectItem>
                  <SelectItem value="Course">Course</SelectItem>
                  <SelectItem value="Template">Template</SelectItem>
                  <SelectItem value="Tool">Tool</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Image URL</Label>
            <Input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="https://..." />
          </div>
          <Button className="w-full" onClick={onSave} disabled={saving}>
            {saving ? "Saving…" : editingId ? "Update Product" : "Create Product"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
