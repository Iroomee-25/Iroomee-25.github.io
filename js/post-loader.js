// Post Loader - Loads and renders markdown posts

(function() {
  'use strict';

  // Get post filename from URL parameter
  function getPostFilename() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('post');
  }

  // Parse Front Matter from markdown
  function parseFrontMatter(content) {
    const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = content.match(frontMatterRegex);

    if (!match) {
      return {
        metadata: {},
        content: content
      };
    }

    const frontMatter = match[1];
    const postContent = match[2];
    const metadata = {};

    // Parse front matter lines
    const lines = frontMatter.split('\n');
    lines.forEach(line => {
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const key = line.substring(0, colonIndex).trim();
        let value = line.substring(colonIndex + 1).trim();

        // Remove quotes
        if ((value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }

        // Parse array (tags)
        if (key === 'tags' && value.startsWith('[') && value.endsWith(']')) {
          try {
            value = JSON.parse(value);
          } catch {
            value = value.slice(1, -1)
              .split(',')
              .map(tag => tag.trim().replace(/^['"]|['"]$/g, ''));
          }
        }

        metadata[key] = value;
      }
    });

    console.log('📋 [Post] Front Matter 파싱 완료:', metadata);

    return {
      metadata,
      content: postContent
    };
  }

  // Load and render post
  async function loadPost() {
    const filename = getPostFilename();

    if (!filename) {
      console.error('❌ [Post] URL에 post 파라미터가 없습니다.');
      showError('게시글을 찾을 수 없습니다.');
      return;
    }

    console.log('📂 [Post] 마크다운 파일 로딩 시작:', filename);

    try {
      const response = await fetch(`pages/${filename}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const markdown = await response.text();
      console.log('✅ [Post] 마크다운 파일 로딩 완료');

      const { metadata, content } = parseFrontMatter(markdown);

      // Render post
      renderPost(metadata, content);

      // Load navigation
      await loadNavigation(filename);

      // Load Giscus comments
      loadGiscus();

      console.log('🎉 [Post] 게시글 렌더링 완료');
    } catch (error) {
      console.error('❌ [Post] 마크다운 파일 로딩 실패:', error);
      showError('게시글을 불러올 수 없습니다.');
    }
  }

  // Render post content
  function renderPost(metadata, content) {
    // Update page title
    const pageTitle = document.getElementById('post-title');
    const postTitleDisplay = document.getElementById('post-title-display');
    const title = metadata.title || '제목 없음';

    if (pageTitle) {
      pageTitle.textContent = `${title} - Iroomee's Blog`;
    }
    if (postTitleDisplay) {
      postTitleDisplay.textContent = title;
    }

    // Update date
    const postDate = document.getElementById('post-date');
    if (postDate && metadata.date) {
      postDate.textContent = formatDate(metadata.date);
    }

    // Update tags
    const postTags = document.getElementById('post-tags');
    if (postTags && metadata.tags && Array.isArray(metadata.tags)) {
      postTags.innerHTML = '';
      metadata.tags.forEach(tag => {
        const tagSpan = document.createElement('span');
        tagSpan.className = 'post-tag';
        tagSpan.textContent = tag;
        postTags.appendChild(tagSpan);
      });
    }

    // Render markdown content
    const postContent = document.getElementById('post-content');
    if (postContent) {
      // Configure marked
      marked.setOptions({
        breaks: true,
        gfm: true,
        headerIds: true,
        mangle: false
      });

      postContent.innerHTML = marked.parse(content);

      // Apply syntax highlighting
      Prism.highlightAllUnder(postContent);
      
      console.log('✨ [Post] 마크다운 렌더링 및 코드 하이라이팅 완료');
    }
  }

  // Load navigation (previous/next posts)
  async function loadNavigation(currentFile) {
    try {
      const response = await fetch('posts.json');
      if (!response.ok) return;

      const posts = await response.json();
      const currentIndex = posts.findIndex(post => post.file === currentFile);

      if (currentIndex === -1) return;

      // Previous post
      if (currentIndex > 0) {
        const prevPost = posts[currentIndex - 1];
        const prevLink = document.getElementById('prev-post');
        if (prevLink) {
          prevLink.href = `post.html?post=${prevPost.file}`;
          prevLink.querySelector('.nav-title').textContent = prevPost.title;
          prevLink.style.display = 'flex';
        }
      }

      // Next post
      if (currentIndex < posts.length - 1) {
        const nextPost = posts[currentIndex + 1];
        const nextLink = document.getElementById('next-post');
        if (nextLink) {
          nextLink.href = `post.html?post=${nextPost.file}`;
          nextLink.querySelector('.nav-title').textContent = nextPost.title;
          nextLink.style.display = 'flex';
        }
      }

      console.log('🔗 [Post] 게시글 네비게이션 로드 완료');
    } catch (error) {
      console.warn('⚠️ [Post] 네비게이션 로드 실패:', error);
    }
  }

  // Load Giscus comments
  function loadGiscus() {
    const container = document.getElementById('giscus-container');
    if (!container) return;

    console.log('💬 [Post] Giscus 댓글 시스템 로드 시작');

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'Iroomee-25/Iroomee-25.github.io');
    script.setAttribute('data-repo-id', 'YOUR_REPO_ID'); // TODO: Replace with actual repo ID
    script.setAttribute('data-category', 'General');
    script.setAttribute('data-category-id', 'YOUR_CATEGORY_ID'); // TODO: Replace with actual category ID
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '1');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', 'preferred_color_scheme');
    script.setAttribute('data-lang', 'ko');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    container.appendChild(script);

    console.log('✅ [Post] Giscus 스크립트 로드 완료 (설정 필요)');
  }

  // Format date to Korean format
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}년 ${month}월 ${day}일`;
  }

  // Show error message
  function showError(message) {
    const postContent = document.getElementById('post-content');
    if (postContent) {
      postContent.innerHTML = `
        <div style="text-align: center; padding: 4rem 0; color: var(--text-secondary);">
          <p style="font-size: 1.2rem; margin-bottom: 1rem;">😢</p>
          <p>${message}</p>
          <a href="index.html" style="color: var(--accent-primary); text-decoration: none; font-weight: 600;">← 홈으로 돌아가기</a>
        </div>
      `;
    }
  }

  // Initialize on page load
  document.addEventListener('DOMContentLoaded', loadPost);

  console.log('🚀 [Post] Post-loader.js 초기화 완료');
})();

