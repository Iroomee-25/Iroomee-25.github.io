# Iroomee's Blog ✨

화려하고 모던한 스타일의 GitHub Pages 정적 블로그입니다.

[![Deploy](https://github.com/Iroomee-25/Iroomee-25.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/Iroomee-25/Iroomee-25.github.io/actions/workflows/deploy.yml)

## 🌐 배포 주소

**https://Iroomee-25.github.io**

## ✨ 주요 기능

- 🎨 **다크/라이트 모드**: 자동으로 저장되는 테마 설정
- 🔍 **실시간 검색**: 제목, 태그, 내용에서 검색
- 🏷️ **태그 필터링**: 관심 주제별로 게시글 필터링
- 💬 **Giscus 댓글**: GitHub Discussions 기반 댓글 시스템
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 최적화
- ✍️ **마크다운 지원**: 간편한 게시글 작성
- 🎯 **코드 하이라이팅**: Prism.js를 통한 아름다운 코드 표시
- ⚡ **자동 배포**: GitHub Actions로 푸시 시 자동 배포

## 🎨 디자인 특징

- **글래스모피즘(Glassmorphism)** 카드 디자인
- **그라디언트 배경** 애니메이션 효과
- **부드러운 트랜지션** 및 호버 효과
- **Google Fonts**: Inter (본문), Poppins (제목)
- **모던한 컬러 팔레트**: 다크/라이트 모드 최적화

## 🛠️ 기술 스택

- **HTML/CSS/Vanilla JavaScript**: 프레임워크 없는 순수 웹 기술
- **marked.js**: 마크다운 파싱
- **Prism.js**: 코드 신택스 하이라이팅
- **Giscus**: GitHub Discussions 기반 댓글
- **GitHub Actions**: 자동 빌드 및 배포
- **GitHub Pages**: 호스팅

## 📁 프로젝트 구조

```
/
├── .nojekyll               # Jekyll 비활성화 (중요!)
├── index.html              # 메인 페이지
├── post.html               # 게시글 상세 페이지
├── css/
│   ├── style.css          # 메인 스타일
│   └── prism.css          # 코드 하이라이팅 테마
├── js/
│   ├── app.js             # 메인 애플리케이션 로직
│   ├── post-loader.js     # 마크다운 로더
│   ├── search.js          # 검색 기능
│   └── theme.js           # 테마 토글
├── pages/                  # 마크다운 게시글 폴더
│   └── example.md
├── .github/
│   ├── workflows/
│   │   └── deploy.yml     # GitHub Actions 워크플로우
│   └── scripts/
│       └── generate-posts.js  # posts.json 생성 스크립트
└── posts.json              # 게시글 메타데이터
```

## 📝 게시글 작성 방법

### 1. 마크다운 파일 생성

`pages/` 폴더에 `.md` 파일을 생성하세요:

```markdown
---
title: '게시글 제목'
date: 2025-01-26
tags: ['JavaScript', 'Web']
category: 'Development'
description: '게시글 설명'
---

# 본문 제목

본문 내용을 작성하세요...
```

### 2. Front Matter 필드

- `title`: 게시글 제목 (필수)
- `date`: 작성일 (YYYY-MM-DD 형식)
- `tags`: 태그 배열 (예: `['JavaScript', 'Web']`)
- `category`: 카테고리
- `description`: 게시글 설명

### 3. Git 커밋 & 푸시

```bash
git add pages/your-post.md
git commit -m "feat: 새 게시글 추가"
git push origin main
```

GitHub Actions가 자동으로 `posts.json`을 생성하고 배포합니다!

## 🚀 배포 방법

### 1. GitHub 저장소 생성

저장소 이름을 반드시 **`Iroomee-25.github.io`**로 생성하세요.

### 2. GitHub Pages 설정

1. 저장소 **Settings** → **Pages**
2. **Source**: `GitHub Actions` 선택

### 3. 코드 푸시

```bash
git init
git add .
git commit -m "feat: 초기 블로그 설정"
git branch -M main
git remote add origin https://github.com/Iroomee-25/Iroomee-25.github.io.git
git push -u origin main
```

### 4. 배포 확인

- **Actions** 탭에서 워크플로우 실행 상태 확인
- 완료 후 https://Iroomee-25.github.io 접속

## 💬 Giscus 댓글 설정

댓글 기능을 활성화하려면 다음 단계를 따라하세요:

### 1. GitHub Discussions 활성화

1. 저장소 **Settings** → **General** → **Features**
2. **Discussions** 체크박스 활성화

### 2. Giscus 앱 설치

1. https://github.com/apps/giscus 접속
2. **Install** 클릭
3. **Iroomee-25.github.io** 저장소 선택
4. **Install** 클릭

### 3. Giscus 설정

1. https://giscus.app/ko 접속
2. **저장소**: `Iroomee-25/Iroomee-25.github.io` 입력
3. 설정:
   - **페이지 ↔️ Discussions 매핑**: `pathname` 선택
   - **Discussion 카테고리**: `General` 또는 `Announcements` 선택
   - **테마**: `preferred_color_scheme` (자동 다크/라이트)

4. 생성된 코드에서 다음 값을 복사:
   - `data-repo-id`
   - `data-category-id`

### 4. 코드에 적용

`js/post-loader.js` 파일의 `loadGiscus()` 함수를 업데이트하세요:

```javascript
// 177번 줄 근처
script.setAttribute('data-repo-id', 'YOUR_REPO_ID');        // 여기에 복사한 값 입력
script.setAttribute('data-category-id', 'YOUR_CATEGORY_ID'); // 여기에 복사한 값 입력
```

### 5. 커밋 & 푸시

```bash
git add js/post-loader.js
git commit -m "feat: Giscus 댓글 설정"
git push origin main
```

## 🎯 로컬 테스트

로컬에서 블로그를 테스트하려면 간단한 HTTP 서버를 실행하세요:

```bash
# Python 3를 사용하는 경우
python3 -m http.server 8000

# Node.js http-server를 사용하는 경우
npx http-server -p 8000
```

브라우저에서 http://localhost:8000 접속

## 🔧 커스터마이징

### 색상 변경

`css/style.css` 파일의 CSS 변수를 수정하세요:

```css
:root {
  --accent-primary: #ff6b9d;    /* 메인 강조색 */
  --accent-secondary: #c44569;  /* 보조 강조색 */
  /* ... 다른 색상들 */
}
```

### 폰트 변경

`index.html`과 `post.html`의 Google Fonts 링크를 수정하세요:

```html
<link href="https://fonts.googleapis.com/css2?family=YourFont&display=swap" rel="stylesheet">
```

그리고 `css/style.css`의 폰트 변수를 업데이트하세요:

```css
:root {
  --font-body: 'YourFont', sans-serif;
  --font-heading: 'YourHeadingFont', sans-serif;
}
```

## 📌 중요 사항

### ⚠️ .nojekyll 파일은 필수입니다!

`.nojekyll` 파일이 없으면 GitHub Pages가 Jekyll로 빌드를 시도하여 일부 파일이 제대로 서빙되지 않습니다. 반드시 루트 디렉토리에 빈 `.nojekyll` 파일을 포함하세요.

### 📦 posts.json 관리

`posts.json`은 Git에 포함되어야 합니다. `.gitignore`에 추가하지 마세요!

GitHub Actions가 배포 시 자동으로 업데이트하므로 충돌 걱정 없습니다.

## 🐛 문제 해결

### 게시글이 404 에러로 표시됨

- `.nojekyll` 파일이 있는지 확인
- `pages/` 폴더와 마크다운 파일이 Git에 커밋되었는지 확인

### 댓글이 표시되지 않음

- GitHub Discussions가 활성화되어 있는지 확인
- Giscus 앱이 설치되어 있는지 확인
- `data-repo-id`와 `data-category-id`가 올바른지 확인

### GitHub Actions 빌드 실패

- **Actions** 탭에서 에러 로그 확인
- `.github/workflows/deploy.yml` 파일이 올바른지 확인
- `pages/` 폴더가 존재하는지 확인

## 📄 라이선스

MIT License

## 👤 작성자

**Iroomee**

- GitHub: [@Iroomee-25](https://github.com/Iroomee-25)
- Blog: https://Iroomee-25.github.io

## 🙏 감사의 말

이 블로그는 다음 오픈소스 프로젝트를 사용합니다:

- [marked.js](https://marked.js.org/) - 마크다운 파서
- [Prism.js](https://prismjs.com/) - 코드 하이라이팅
- [Giscus](https://giscus.app/) - 댓글 시스템

---

⭐ 이 프로젝트가 마음에 드신다면 Star를 눌러주세요!

