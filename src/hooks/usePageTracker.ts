import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const getVisitorId = (): string => {
  const key = "dn_visitor_id";
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
};

export const usePageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const visitorId = getVisitorId();
    supabase
      .from("page_views")
      .insert({ page: location.pathname, visitor_id: visitorId })
      .then(() => {});
  }, [location.pathname]);
};
