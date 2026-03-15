import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, Briefcase, GraduationCap, Heart } from 'lucide-react';
import { profile } from '../data/profile';

const highlights = [
  {
    icon: Briefcase,
    title: '工作经验',
    description: '8年以上软件开发经验，曾在多家知名科技公司担任技术负责人',
  },
  {
    icon: GraduationCap,
    title: '教育背景',
    description: '计算机科学硕士学位，专注于软件工程和人工智能领域',
  },
  {
    icon: Award,
    title: '专业认证',
    description: 'AWS解决方案架构师、Google云认证专家',
  },
  {
    icon: Heart,
    title: '工作态度',
    description: '热爱技术，注重细节，追求卓越代码质量',
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-20 lg:py-32 bg-dark-900">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary-500/10 text-primary-400 text-sm font-medium mb-4">
            关于我
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            专业背景与
            <span className="gradient-text"> 技术热情</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400 text-lg">
            我是一名充满热情的全栈工程师，致力于创造卓越的数字体验
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image/Avatar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-purple-500/20 rounded-3xl transform rotate-6" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-purple-500/10 rounded-3xl transform -rotate-3" />
              
              {/* Main content card */}
              <div className="relative glass-card p-8 h-full flex flex-col items-center justify-center text-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-4xl font-bold text-white mb-6">
                  {profile.name.charAt(0)}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{profile.name}</h3>
                <p className="text-primary-400 font-medium mb-4">{profile.title}</p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {profile.bio.slice(0, 100)}...
                </p>
                
                {/* Experience badges */}
                <div className="flex flex-wrap justify-center gap-2 mt-6">
                  {['React', 'Node.js', 'Python', 'AWS'].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-dark-700 text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side - Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="flex gap-4 p-6 rounded-2xl bg-dark-800/50 border border-dark-700 hover:border-primary-500/30 transition-colors"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">{item.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
