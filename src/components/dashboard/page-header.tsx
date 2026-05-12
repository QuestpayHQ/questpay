import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui";
import type { ReactNode } from "react";

export type PageHeaderProps = {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  description?: ReactNode;
};

export default function PageHeader({
  breadcrumbs,
  title,
  description,
}: PageHeaderProps) {
  return (
    <header className="space-y-3">
      <Breadcrumbs items={breadcrumbs} />
      <div className="space-y-1">
        <h1 className="font-sans text-2xl font-bold tracking-tight text-main sm:text-3xl">
          {title}
        </h1>
        {description ? (
          <div className="max-w-xl text-sm text-muted">{description}</div>
        ) : null}
      </div>
    </header>
  );
}
