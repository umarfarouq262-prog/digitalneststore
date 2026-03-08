import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { LogOut, Package } from "lucide-react";
import StatsCards from "@/components/dashboard/StatsCards";
import AnalyticsCharts from "@/components/dashboard/AnalyticsCharts";
import ProductDialog, { ProductForm } from "@/components/dashboard/ProductDialog";
import ProductTable from "@/components/dashboard/ProductTable";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  old_price: number | null;
  image_url: string | null;
  file_url: string | null;
  category: string;
  created_at: string;
}

const emptyForm: ProductForm = { name: "", description: "", price: "", old_price: "", category: "PDF", image_url: "" };

const adminApi = async (body: Record<string, unknown>) => {
  const token = sessionStorage.getItem("admin_token");
  const { data, error } = await supabase.functions.invoke("admin-api", {
    body: { ...body, token },
  });
  if (error) throw new Error(error.message);
  if (data?.error) throw new Error(data.error);
  return data;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // Analytics state
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [visitorData, setVisitorData] = useState<{ date: string; visitors: number }[]>([]);
  const [salesData, setSalesData] = useState<{ date: string; sales: number; revenue: number }[]>([]);
  const [categoryData, setCategoryData] = useState<{ name: string; value: number }[]>([]);

  const fetchProducts = useCallback(async () => {
    try {
      const data = await adminApi({ action: "list" });
      if (data.products) setProducts(data.products);
    } catch (err: any) {
      if (err.message === "Unauthorized") {
        sessionStorage.removeItem("admin_token");
        navigate("/admin");
      }
    }
  }, [navigate]);

  const fetchAnalytics = useCallback(async () => {
    try {
      const data = await adminApi({ action: "analytics" });
      if (data) {
        setTotalVisitors(data.totalVisitors || 0);
        setTotalSales(data.totalSales || 0);
        setTotalRevenue(data.totalRevenue || 0);
        setVisitorData(data.visitorData || []);
        setSalesData(data.salesData || []);
        setCategoryData(data.categoryData || []);
      }
    } catch {
      // Analytics might fail silently
    }
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("admin_token");
    if (!token) {
      navigate("/admin");
      return;
    }
    fetchProducts();
    fetchAnalytics();
  }, [navigate, fetchProducts, fetchAnalytics]);

  const handleSave = async () => {
    if (!form.name || !form.price) {
      toast.error("Name and price are required");
      return;
    }
    setSaving(true);
    try {
      await adminApi({
        action: editingId ? "update" : "create",
        ...(editingId ? { id: editingId } : {}),
        name: form.name,
        description: form.description || null,
        price: parseFloat(form.price),
        old_price: form.old_price ? parseFloat(form.old_price) : null,
        category: form.category,
        image_url: form.image_url || null,
      });
      toast.success(editingId ? "Product updated" : "Product created");
      setDialogOpen(false);
      resetForm();
      fetchProducts();
      fetchAnalytics();
    } catch (err: any) {
      toast.error(err.message);
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    try {
      await adminApi({ action: "delete", id });
      toast.success("Deleted");
      fetchProducts();
      fetchAnalytics();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const openEdit = (p: any) => {
    setForm({
      name: p.name,
      description: p.description || "",
      price: String(p.price),
      old_price: p.old_price ? String(p.old_price) : "",
      category: p.category,
      image_url: p.image_url || "",
    });
    setEditingId(p.id);
    setDialogOpen(true);
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSignOut = () => {
    sessionStorage.removeItem("admin_token");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-accent" />
            <span className="font-display text-lg font-bold">
              Digital<span className="text-accent">Nest</span> Admin
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-1" /> Sign out
          </Button>
        </div>
      </header>

      <main className="container py-8 space-y-8">
        <h1 className="text-3xl font-display font-bold">Dashboard</h1>

        <StatsCards
          totalProducts={products.length}
          totalVisitors={totalVisitors}
          totalSales={totalSales}
          totalRevenue={totalRevenue}
        />

        <AnalyticsCharts
          visitorData={visitorData}
          salesData={salesData}
          categoryData={categoryData}
        />

        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-display font-bold">Products</h2>
          <ProductDialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            form={form}
            setForm={setForm}
            editingId={editingId}
            saving={saving}
            onSave={handleSave}
            onReset={resetForm}
          />
        </div>

        <ProductTable
          products={products}
          onEdit={openEdit}
          onDelete={handleDelete}
        />
      </main>
    </div>
  );
};

export default Dashboard;
