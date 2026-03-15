import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';
import { profile } from '../data/profile';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: '导航',
      links: [
        { label: '首页', href: '#hero' },
        { label: '关于我', href: '#about' },
        { label: '技能', href: '#skills' },
        { label: '项目', href: '#projects' },
      ],
    },
    {
      title: '联系',
      links: [
        { label: '邮箱', href: `mailto:${profile.contact.email}` },
        { label: 'GitHub', href: profile.contact.github },
        { label: 'LinkedIn', href: profile.contact.linkedin },
      ],
    },
  ];

  return (
    <footer className="py-12 bg-dark-900 border-t border-dark-800">
      <div className="section-container">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white font-bold">
                {profile.name.charAt(0)}
              </div>
              <span className="text-xl font-bold gradient-text">{profile.name}</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4 max-w-md">
              {profile.bio}
            </p>
            <div className="flex gap-3">
              <motion.a
                href={profile.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-lg bg-dark-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-dark-700 transition-colors"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href={profile.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-lg bg-dark-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-dark-700 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                href={`mailto:${profile.contact.email}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-lg bg-dark-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-dark-700 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-dark-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500" /> by {profile.name} © {currentYear}
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-lg bg-dark-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-dark-700 transition-colors"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
