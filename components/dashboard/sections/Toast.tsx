"use client";

import { useEffect, useState } from "react";
import s from "@/app/dashboard.module.css";
import Icon from "@/components/Icon";

/** Small bottom toast for demo actions. Returns [node to render, show(text)]. */
export function useToast(): [React.ReactNode, (text: string) => void] {
  const [text, setText] = useState<string | null>(null);
  useEffect(() => {
    if (!text) return;
    const t = setTimeout(() => setText(null), 2600);
    return () => clearTimeout(t);
  }, [text]);
  const node = text ? (
    <div className={s.toast} role="status">
      <Icon name="checkCircle" size={16} />
      {text}
    </div>
  ) : null;
  return [node, setText];
}
