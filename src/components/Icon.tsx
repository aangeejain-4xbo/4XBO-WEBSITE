import React from "react";
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Crown,
  Database,
  ExternalLink,
  GitMerge,
  Globe,
  GraduationCap,
  HelpCircle,
  Lock,
  Mail,
  Menu,
  Phone,
  PhoneCall,
  Scale,
  Server,
  Settings,
  Settings2,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ThumbsUp,
  TrendingUp,
  Users,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";

// Explicit icon registry. Only the icons actually used on the site are imported,
// so the rest of lucide-react (~1,400 icons / ~800 kB) is tree-shaken out of the
// bundle. Add an entry here when you introduce a new Lucide icon; unknown names
// fall back to HelpCircle.
const ICONS: Record<string, LucideIcon> = {
  Activity,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Crown,
  Database,
  ExternalLink,
  GitMerge,
  Globe,
  GraduationCap,
  HelpCircle,
  Lock,
  Mail,
  Menu,
  Phone,
  PhoneCall,
  Scale,
  Server,
  Settings,
  Settings2,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ThumbsUp,
  TrendingUp,
  Users,
  X,
  Zap,
};

interface IconProps extends Omit<React.ComponentPropsWithoutRef<"svg">, "name"> {
  name: string;
  size?: number | string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, size = 24, className = "", ...props }) => {
  if (name === "WhatsApp") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        width={size}
        height={size}
        className={className}
        {...(props as any)}
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.863-9.843.002-2.63-1.023-5.101-2.886-6.968C16.634 1.928 14.16 1.155 11.53 1.153c-5.438 0-9.861 4.417-9.865 9.847-.001 1.761.464 3.479 1.349 5.016l-.995 3.637 3.737-.981zm12.39-6.234c-.313-.156-1.854-.915-2.141-1.019-.288-.105-.497-.156-.707.156-.21.312-.81.1-.989 1.207-.179.208-.359.234-.672.078-.313-.156-1.322-.487-2.52-1.555-.93-.83-1.558-1.855-1.74-2.167-.182-.313-.02-.482.137-.638.141-.14.313-.364.47-.546.156-.182.208-.312.313-.52.104-.208.052-.39-.026-.546-.078-.156-.707-1.705-.969-2.33-.255-.614-.514-.531-.707-.541-.182-.01-.39-.012-.598-.012-.208 0-.546.078-.83.39-.283.312-1.08 1.054-1.08 2.57 0 1.517 1.102 2.982 1.257 3.19.156.208 2.17 3.313 5.258 4.646.734.317 1.308.507 1.758.65.738.234 1.41.2 1.942.12.593-.088 1.854-.757 2.115-1.451.261-.693.261-1.288.183-1.414-.078-.125-.288-.208-.6-.364z" />
      </svg>
    );
  }

  const LucideIcon = ICONS[name] ?? HelpCircle;
  return <LucideIcon size={size} className={className} {...props} />;
};
