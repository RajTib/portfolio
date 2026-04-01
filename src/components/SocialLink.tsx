import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface SocialLinkProps {
  href: string;
  Icon: LucideIcon;
}

export const SocialLink = ({ href, Icon }: SocialLinkProps) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.1, y: -2 }}
    whileTap={{ scale: 0.9 }}
    className="p-3 glass rounded-full text-slate-400 hover:text-purple-400 hover:border-purple-500/50 transition-colors"
  >
    <Icon size={20} />
  </motion.a>
);
