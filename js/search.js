// Search Functionality with Debouncing

(function() {
  'use strict';

  const searchInput = document.getElementById('search-input');
  let searchTimeout;
  const DEBOUNCE_DELAY = 300; // milliseconds

  // Search posts based on query
  function searchPosts(query) {
    const trimmedQuery = query.trim().toLowerCase();

    if (trimmedQuery === '') {
      console.log('🔍 [Search] 검색어 초기화 - 전체 게시글 표시');
      // Reset to all posts
      if (window.blogApp) {
        window.blogApp.setFilteredPosts(window.blogApp.allPosts);
      }
      return;
    }

    console.log('🔍 [Search] 검색 시작:', trimmedQuery);

    // Get all posts from blogApp
    if (!window.blogApp || !window.blogApp.allPosts) {
      console.warn('⚠️ [Search] blogApp이 아직 초기화되지 않았습니다.');
      return;
    }

    const allPosts = window.blogApp.allPosts;

    // Filter posts
    const results = allPosts.filter(post => {
      // Search in title
      if (post.title && post.title.toLowerCase().includes(trimmedQuery)) {
        return true;
      }

      // Search in description
      if (post.description && post.description.toLowerCase().includes(trimmedQuery)) {
        return true;
      }

      // Search in excerpt
      if (post.excerpt && post.excerpt.toLowerCase().includes(trimmedQuery)) {
        return true;
      }

      // Search in tags
      if (post.tags && Array.isArray(post.tags)) {
        return post.tags.some(tag => 
          tag.toLowerCase().includes(trimmedQuery)
        );
      }

      // Search in category
      if (post.category && post.category.toLowerCase().includes(trimmedQuery)) {
        return true;
      }

      return false;
    });

    console.log(`📊 [Search] 검색 완료: "${trimmedQuery}" - ${results.length}개의 결과`);

    // Update filtered posts
    window.blogApp.setFilteredPosts(results);
  }

  // Debounced search handler
  function handleSearchInput(event) {
    const query = event.target.value;

    // Clear previous timeout
    clearTimeout(searchTimeout);

    // Set new timeout
    searchTimeout = setTimeout(() => {
      searchPosts(query);
    }, DEBOUNCE_DELAY);
  }

  // Add event listener to search input
  if (searchInput) {
    searchInput.addEventListener('input', handleSearchInput);
    console.log('✅ [Search] 검색 이벤트 리스너 등록 완료');
  }

  console.log('🚀 [Search] Search.js 초기화 완료');
})();

