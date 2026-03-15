import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Github, Star, GitFork, ExternalLink, Upload, Plus, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { githubService } from '../services/github';
import type { GitHubRepo } from '../types';

export default function GitHubIntegration() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState('octocat');
  const [token, setToken] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    repoName: '',
    description: '',
    isPrivate: false,
    fileName: '',
    fileContent: '',
  });
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');

  useEffect(() => {
    fetchRepos();
  }, []);

  const fetchRepos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await githubService.getUserRepos(username);
      setRepos(data);
    } catch (err) {
      setError('获取GitHub仓库失败');
    } finally {
      setLoading(false);
    }
  };

  const handleSetToken = () => {
    if (token) {
      githubService.setToken(token);
      alert('Token已设置');
    }
  };

  const handleCreateRepo = async () => {
    if (!uploadForm.repoName) return;
    
    setUploadStatus('uploading');
    try {
      const repo = await githubService.createRepo(
        uploadForm.repoName,
        uploadForm.description,
        uploadForm.isPrivate
      );
      
      if (repo && uploadForm.fileName && uploadForm.fileContent) {
        await githubService.uploadFile(
          repo.owner.login,
          repo.name,
          uploadForm.fileName,
          uploadForm.fileContent,
          'Initial commit'
        );
      }
      
      setUploadStatus('success');
      setTimeout(() => {
        setShowUploadModal(false);
        setUploadStatus('idle');
        setUploadForm({
          repoName: '',
          description: '',
          isPrivate: false,
          fileName: '',
          fileContent: '',
        });
        fetchRepos();
      }, 2000);
    } catch (err) {
      setUploadStatus('error');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <section id="github" className="py-20 lg:py-32 bg-dark-800/50">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary-500/10 text-primary-400 text-sm font-medium mb-4">
            GitHub 集成
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            代码仓库与
            <span className="gradient-text"> 开源贡献</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400 text-lg">
            展示我的GitHub项目，支持直接从网站上传代码
          </p>
        </motion.div>

        {/* Token Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="glass-card p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                GitHub Token (用于创建仓库和上传代码)
              </label>
              <input
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="输入您的GitHub Personal Access Token"
                className="w-full px-4 py-2 rounded-lg bg-dark-900 border border-dark-700 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
              />
            </div>
            <div className="w-full md:w-auto">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                用户名
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="GitHub用户名"
                className="w-full md:w-48 px-4 py-2 rounded-lg bg-dark-900 border border-dark-700 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <motion.button
                onClick={handleSetToken}
                className="btn-secondary flex items-center gap-2 whitespace-nowrap"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                设置Token
              </motion.button>
              <motion.button
                onClick={fetchRepos}
                disabled={loading}
                className="btn-primary flex items-center gap-2 whitespace-nowrap"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Github className="w-4 h-4" />}
                刷新仓库
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Upload Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mb-8"
        >
          <motion.button
            onClick={() => setShowUploadModal(true)}
            className="btn-primary flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus className="w-5 h-5" />
            创建新仓库并上传代码
          </motion.button>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-4 mb-6 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400"
          >
            <AlertCircle className="w-5 h-5" />
            {error}
          </motion.div>
        )}

        {/* Repos Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo, index) => (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
              className="glass-card p-6 group hover:border-primary-500/30 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors line-clamp-1">
                  {repo.name}
                </h3>
                <motion.a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-dark-700 text-gray-400 hover:text-white hover:bg-dark-600 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ExternalLink className="w-4 h-4" />
                </motion.a>
              </div>
              
              <p className="text-sm text-gray-400 mb-4 line-clamp-2 h-10">
                {repo.description || '暂无描述'}
              </p>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  {repo.language && (
                    <span className="flex items-center gap-1 text-gray-400">
                      <span className="w-3 h-3 rounded-full bg-primary-500" />
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-gray-400">
                    <Star className="w-4 h-4" />
                    {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1 text-gray-400">
                    <GitFork className="w-4 h-4" />
                    {repo.forks_count}
                  </span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-dark-700 text-xs text-gray-500">
                更新于 {formatDate(repo.updated_at)}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Upload Modal */}
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowUploadModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Upload className="w-5 h-5 text-primary-400" />
                创建仓库并上传代码
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    仓库名称 *
                  </label>
                  <input
                    type="text"
                    value={uploadForm.repoName}
                    onChange={(e) => setUploadForm({ ...uploadForm, repoName: e.target.value })}
                    placeholder="my-awesome-project"
                    className="w-full px-4 py-2 rounded-lg bg-dark-900 border border-dark-700 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    仓库描述
                  </label>
                  <input
                    type="text"
                    value={uploadForm.description}
                    onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                    placeholder="项目描述..."
                    className="w-full px-4 py-2 rounded-lg bg-dark-900 border border-dark-700 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isPrivate"
                    checked={uploadForm.isPrivate}
                    onChange={(e) => setUploadForm({ ...uploadForm, isPrivate: e.target.checked })}
                    className="w-4 h-4 rounded border-dark-700 bg-dark-900 text-primary-500 focus:ring-primary-500"
                  />
                  <label htmlFor="isPrivate" className="text-sm text-gray-400">
                    私有仓库
                  </label>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    文件名 (可选)
                  </label>
                  <input
                    type="text"
                    value={uploadForm.fileName}
                    onChange={(e) => setUploadForm({ ...uploadForm, fileName: e.target.value })}
                    placeholder="README.md"
                    className="w-full px-4 py-2 rounded-lg bg-dark-900 border border-dark-700 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    文件内容 (可选)
                  </label>
                  <textarea
                    value={uploadForm.fileContent}
                    onChange={(e) => setUploadForm({ ...uploadForm, fileContent: e.target.value })}
                    placeholder="输入文件内容..."
                    rows={6}
                    className="w-full px-4 py-2 rounded-lg bg-dark-900 border border-dark-700 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 resize-none"
                  />
                </div>
              </div>
              
              {uploadStatus === 'success' && (
                <div className="flex items-center gap-2 p-3 mt-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400">
                  <CheckCircle className="w-5 h-5" />
                  仓库创建成功！
                </div>
              )}
              
              {uploadStatus === 'error' && (
                <div className="flex items-center gap-2 p-3 mt-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
                  <AlertCircle className="w-5 h-5" />
                  创建失败，请检查Token和输入
                </div>
              )}
              
              <div className="flex gap-3 mt-6">
                <motion.button
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 btn-secondary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  取消
                </motion.button>
                <motion.button
                  onClick={handleCreateRepo}
                  disabled={uploadStatus === 'uploading' || !uploadForm.repoName}
                  className="flex-1 btn-primary flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {uploadStatus === 'uploading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      创建中...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      创建并上传
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
