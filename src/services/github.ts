import type { GitHubRepo } from '../types';

const GITHUB_API_BASE = 'https://api.github.com';

export class GitHubService {
  private token: string | null = null;

  constructor(token?: string) {
    if (token) {
      this.token = token;
    }
  }

  setToken(token: string) {
    this.token = token;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    };
    
    if (this.token) {
      headers['Authorization'] = `token ${this.token}`;
    }
    
    return headers;
  }

  async getUserRepos(username: string): Promise<GitHubRepo[]> {
    try {
      const response = await fetch(
        `${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=10`,
        { headers: this.getHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch GitHub repos:', error);
      return [];
    }
  }

  async getRepoDetails(owner: string, repo: string): Promise<GitHubRepo | null> {
    try {
      const response = await fetch(
        `${GITHUB_API_BASE}/repos/${owner}/${repo}`,
        { headers: this.getHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch repo details:', error);
      return null;
    }
  }

  async createRepo(name: string, description: string, isPrivate: boolean = false): Promise<GitHubRepo | null> {
    if (!this.token) {
      throw new Error('GitHub token is required to create repositories');
    }

    try {
      const response = await fetch(
        `${GITHUB_API_BASE}/user/repos`,
        {
          method: 'POST',
          headers: this.getHeaders(),
          body: JSON.stringify({
            name,
            description,
            private: isPrivate,
            auto_init: true,
          }),
        }
      );
      
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Failed to create repository:', error);
      return null;
    }
  }

  async uploadFile(
    owner: string,
    repo: string,
    path: string,
    content: string,
    message: string,
    branch: string = 'main'
  ): Promise<boolean> {
    if (!this.token) {
      throw new Error('GitHub token is required to upload files');
    }

    try {
      const base64Content = btoa(unescape(encodeURIComponent(content)));
      
      const response = await fetch(
        `${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/${path}`,
        {
          method: 'PUT',
          headers: this.getHeaders(),
          body: JSON.stringify({
            message,
            content: base64Content,
            branch,
          }),
        }
      );
      
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      
      return true;
    } catch (error) {
      console.error('Failed to upload file:', error);
      return false;
    }
  }

  async getRepoLanguages(owner: string, repo: string): Promise<Record<string, number>> {
    try {
      const response = await fetch(
        `${GITHUB_API_BASE}/repos/${owner}/${repo}/languages`,
        { headers: this.getHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch repo languages:', error);
      return {};
    }
  }

  async getReadme(owner: string, repo: string): Promise<string | null> {
    try {
      const response = await fetch(
        `${GITHUB_API_BASE}/repos/${owner}/${repo}/readme`,
        { headers: this.getHeaders() }
      );
      
      if (!response.ok) {
        return null;
      }
      
      const data = await response.json();
      return atob(data.content);
    } catch (error) {
      console.error('Failed to fetch readme:', error);
      return null;
    }
  }
}

export const githubService = new GitHubService();

export default githubService;
