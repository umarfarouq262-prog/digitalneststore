import { useState, useRef } from "react";
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
import { Plus, Upload, Image, FileText, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface ProductForm {
  name: string;
  description: string;
  price: string;
  old_price: string;
  category: string;
  image_url: string;
  file_url?: string;
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
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadToStorage = async (file: File, prefix: string) => {
    const ext = file.name.split(".").pop();
    const path = `${prefix}/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("digital-products").upload(path, file);
    if (error) throw error;
    const { data } = supabase.storage.from("digital-products").getPublicUrl(path);
    return data.publicUrl;
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    setUploadingImage(true);
    try {
      const url = await uploadToStorage(file, "images");
      setForm({ ...form, image_url: url });
      toast.success("Image uploaded");
    } catch (err: any) {
      toast.error("Image upload failed: " + err.message);
    }
    setUploadingImage(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingFile(true);
    try {
      const url = await uploadToStorage(file, "files");
      setForm({ ...form, file_url: url });
      toast.success("File uploaded");
    } catch (err: any) {
      toast.error("File upload failed: " + err.message);
    }
    setUploadingFile(false);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { onOpenChange(o); if (!o) onReset(); }}>
      <DialogTrigger asChild>
        <Button className="gap-1">
          <Plus className="w-4 h-4" /> Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg bg-card border-border max-h-[90vh] overflow-y-auto">
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

          {/* Image Upload */}
          <div className="space-y-2">
            <Label className="flex items-center gap-1.5"><Image className="w-4 h-4" /> Product Image</Label>
            {form.image_url ? (
              <div className="relative rounded-md overflow-hidden border border-border">
                <img src={form.image_url} alt="Preview" className="w-full h-32 object-cover" />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-1 right-1 w-6 h-6"
                  onClick={() => setForm({ ...form, image_url: "" })}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ) : (
              <div
                className="border-2 border-dashed border-border rounded-md p-4 text-center cursor-pointer hover:border-accent transition-colors"
                onClick={() => imageInputRef.current?.click()}
              >
                <Upload className="w-6 h-6 mx-auto mb-1 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {uploadingImage ? "Uploading…" : "Click to upload image"}
                </p>
              </div>
            )}
            <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            <Input
              value={form.image_url}
              onChange={(e) => setForm({ ...form, image_url: e.target.value })}
              placeholder="Or paste image URL"
              className="text-xs"
            />
          </div>

          {/* Digital File Upload */}
          <div className="space-y-2">
            <Label className="flex items-center gap-1.5"><FileText className="w-4 h-4" /> Digital File (PDF, ZIP, etc.)</Label>
            {form.file_url ? (
              <div className="flex items-center gap-2 p-2 bg-secondary rounded-md border border-border">
                <FileText className="w-4 h-4 text-accent shrink-0" />
                <span className="text-sm text-foreground truncate flex-1">File uploaded</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="w-6 h-6 shrink-0"
                  onClick={() => setForm({ ...form, file_url: "" })}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ) : (
              <div
                className="border-2 border-dashed border-border rounded-md p-4 text-center cursor-pointer hover:border-accent transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-6 h-6 mx-auto mb-1 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {uploadingFile ? "Uploading…" : "Click to upload digital file"}
                </p>
              </div>
            )}
            <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileUpload} />
          </div>

          <Button className="w-full" onClick={onSave} disabled={saving || uploadingImage || uploadingFile}>
            {saving ? "Saving…" : editingId ? "Update Product" : "Create Product"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
