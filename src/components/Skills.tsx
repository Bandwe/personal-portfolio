import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { skills, skillCategories } from '../data/profile';


export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter(skill => skill.category === activeCategory);

  const getCategoryColor = (category: string) => {
    const cat = skillCategories.find(c => c.key === category);
    return cat ? cat.color : 'from-gray-500 to-slate-500';
  };

  const getCategoryLabel = (category: string) => {
    const cat = skillCategories.find(c => c.key === category);
    return cat ? cat.label : category;
  };

  return (
    <section id="skills" className="py-20 lg:py-32 bg-dark-800/50">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary-500/10 text-primary-400 text-sm font-medium mb-4">
            专业技能
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            技术栈与
            <span className="gradient-text"> 专业能力</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400 text-lg">
            掌握多种现代技术栈，能够应对各种复杂的开发挑战
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === 'all'
                ? 'bg-primary-500 text-white'
                : 'bg-dark-700 text-gray-400 hover:text-white hover:bg-dark-600'
            }`}
          >
            全部
          </button>
          {skillCategories.map((category) => (
            <button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category.key
                  ? 'bg-primary-500 text-white'
                  : 'bg-dark-700 text-gray-400 hover:text-white hover:bg-dark-600'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="group relative p-4 rounded-xl bg-dark-800 border border-dark-700 hover:border-primary-500/30 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-white group-hover:text-primary-400 transition-colors">
                  {skill.name}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${getCategoryColor(skill.category)} text-white`}>
                  {getCategoryLabel(skill.category)}
                </span>
              </div>
              
              {/* Progress bar */}
              <div className="relative h-2 bg-dark-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : {}}
                  transition={{ duration: 0.8, delay: index * 0.05 + 0.3 }}
                  className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${getCategoryColor(skill.category)}`}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>熟练度</span>
                <span>{skill.level}%</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-4"
        >
          {skillCategories.map((category, index) => {
            const count = skills.filter(s => s.category === category.key).length;
            return (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                className="text-center p-4 rounded-xl bg-dark-800/50 border border-dark-700"
              >
                <div className={`text-3xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent mb-1`}>
                  {count}
                </div>
                <div className="text-sm text-gray-400">{category.label}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
