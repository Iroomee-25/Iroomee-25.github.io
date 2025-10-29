// Main Application Script - Blog Posts Loader

(function() {
  'use strict';

  let allPosts = [];
  let filteredPosts = [];
  let activeTag = null;

  const postsContainer = document.getElementById('posts-container');
  const tagsContainer = document.getElementById('tags-container');
  const noResultsEl = document.getElementById('no-results');

  // Load posts.json
  async function loadPosts() {
    console.log('📂 [App] posts.json 로딩 시작...');
    
    try {
      const response = await fetch('posts.json');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      allPosts = await response.json();
      filteredPosts = [...allPosts];
      
      console.log(`✅ [App] posts.json 로딩 성공: ${allPosts.length}개의 게시글`);
      
      renderTags();
      renderPosts();
    } catch (error) {
      console.error('❌ [App] posts.json 로딩 실패:', error);
      showError('게시글을 불러올 수 없습니다.');
    }
  }

  // Render tags filter
  function renderTags() {
    if (!tagsContainer) return;

    const tagsSet = new Set();
    allPosts.forEach(post => {
      if (post.tags && Array.isArray(post.tags)) {
        post.tags.forEach(tag => tagsSet.add(tag));
      }
    });

    const tags = Array.from(tagsSet).sort();
    
    console.log('🏷️ [App] 태그 렌더링:', tags.length + '개');

    if (tags.length === 0) {
      tagsContainer.innerHTML = '<p style="color: var(--text-secondary);">태그가 없습니다.</p>';
      return;
    }

    // Add "All" tag
    const allTag = createTagElement('전체', null);
    allTag.classList.add('active');
    tagsContainer.appendChild(allTag);

    // Add individual tags
    tags.forEach(tag => {
      tagsContainer.appendChild(createTagElement(tag, tag));
    });
  }

  // Create tag element
  function createTagElement(label, tagValue) {
    const tagEl = document.createElement('span');
    tagEl.className = 'tag';
    tagEl.textContent = label;
    tagEl.addEventListener('click', () => filterByTag(tagValue, tagEl));
    return tagEl;
  }

  // Filter posts by tag
  function filterByTag(tag, tagEl) {
    activeTag = tag;
    
    console.log('🔍 [App] 태그 필터 적용:', tag || '전체');

    // Update active state
    document.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));
    tagEl.classList.add('active');

    // Filter posts
    if (tag === null) {
      filteredPosts = [...allPosts];
    } else {
      filteredPosts = allPosts.filter(post => 
        post.tags && post.tags.includes(tag)
      );
    }

    console.log(`📊 [App] 필터 결과: ${filteredPosts.length}개의 게시글`);

    renderPosts();
  }

  // Render posts
  function renderPosts() {
    if (!postsContainer) return;

    postsContainer.innerHTML = '';

    if (filteredPosts.length === 0) {
      noResultsEl.style.display = 'block';
      return;
    }

    noResultsEl.style.display = 'none';

    filteredPosts.forEach((post, index) => {
      const card = createPostCard(post, index);
      postsContainer.appendChild(card);
    });

    console.log('✨ [App] 게시글 카드 렌더링 완료');
  }

  // Create post card element
  function createPostCard(post, index) {
    const card = document.createElement('a');
    card.className = 'post-card';
    card.href = `post.html?post=${post.file}`;
    card.style.animationDelay = `${index * 0.1}s`;

    const header = document.createElement('div');
    header.className = 'post-card-header';

    const title = document.createElement('h3');
    title.className = 'post-card-title';
    title.textContent = post.title;

    const date = document.createElement('time');
    date.className = 'post-card-date';
    date.textContent = formatDate(post.date);

    header.appendChild(title);
    header.appendChild(date);

    const excerpt = document.createElement('p');
    excerpt.className = 'post-card-excerpt';
    excerpt.textContent = post.excerpt || post.description || '내용 미리보기가 없습니다.';

    const tagsDiv = document.createElement('div');
    tagsDiv.className = 'post-card-tags';

    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach(tag => {
        const tagSpan = document.createElement('span');
        tagSpan.className = 'post-card-tag';
        tagSpan.textContent = tag;
        tagsDiv.appendChild(tagSpan);
      });
    }

    card.appendChild(header);
    card.appendChild(excerpt);
    card.appendChild(tagsDiv);

    return card;
  }

  // Format date to Korean format
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  }

  // Show error message
  function showError(message) {
    if (postsContainer) {
      postsContainer.innerHTML = `
        <div style="text-align: center; padding: 4rem 0; color: var(--text-secondary);">
          <p style="font-size: 1.2rem; margin-bottom: 1rem;">😢</p>
          <p>${message}</p>
        </div>
      `;
    }
  }

  // Export functions for search.js
  window.blogApp = {
    allPosts,
    setFilteredPosts(posts) {
      filteredPosts = posts;
      renderPosts();
    }
  };

  // Initialize on page load
  document.addEventListener('DOMContentLoaded', loadPosts);

  console.log('🚀 [App] App.js 초기화 완료');
})();

