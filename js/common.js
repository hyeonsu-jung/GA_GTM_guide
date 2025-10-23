// Common JavaScript for GA GTM Guide Center

// 챗봇 관련 함수들
function toggleChatbot() {
    const chatbotWindow = document.getElementById('chatbotWindow');
    chatbotWindow.classList.toggle('active');
}

function sendMessage() {
    const input = document.getElementById('chatbotInput');
    const message = input.value.trim();
    
    if (message === '') return;
    
    // 사용자 메시지 추가
    addMessage(message, 'user');
    input.value = '';
    
    // 타이핑 인디케이터 표시
    showTypingIndicator();
    
    // 봇 응답 생성 (지연 시간 시뮬레이션)
    setTimeout(() => {
        hideTypingIndicator();
        const response = generateBotResponse(message);
        addMessage(response, 'bot');
    }, 1000 + Math.random() * 1000);
}

function sendQuickMessage(message) {
    document.getElementById('chatbotInput').value = message;
    sendMessage();
}

function addMessage(content, sender) {
    const messagesContainer = document.getElementById('chatbotMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = sender === 'bot' ? '🤖' : '👤';
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.innerHTML = content;
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(messageContent);
    messagesContainer.appendChild(messageDiv);
    
    // 스크롤을 맨 아래로
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showTypingIndicator() {
    const messagesContainer = document.getElementById('chatbotMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot';
    typingDiv.id = 'typingIndicator';
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = '🤖';
    
    const typingContent = document.createElement('div');
    typingContent.className = 'typing-indicator';
    typingContent.style.display = 'flex';
    typingContent.innerHTML = `
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
    `;
    
    typingDiv.appendChild(avatar);
    typingDiv.appendChild(typingContent);
    messagesContainer.appendChild(typingDiv);
    
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function handleChatbotKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function generateBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // GA4 관련 질문
    if (message.includes('ga4') || message.includes('google analytics')) {
        if (message.includes('설치') || message.includes('설정')) {
            return `
                <strong>GA4 설치 방법</strong><br><br>
                1. <a href="ga-setup.html">GA4 계정 생성</a><br>
                2. 속성 및 데이터 스트림 설정<br>
                3. gtag.js 코드 설치<br>
                4. GTM을 통한 설치 (권장)<br><br>
                <a href="ga-setup.html" style="color: #E60012;">상세 가이드 보기 →</a>
            `;
        } else if (message.includes('이벤트') || message.includes('추적')) {
            return `
                <strong>GA4 이벤트 추적</strong><br><br>
                • 클릭 이벤트: 버튼, 링크 클릭<br>
                • 스크롤 이벤트: 페이지 깊이 측정<br>
                • 동영상 이벤트: 재생, 완료 추적<br>
                • 폼 이벤트: 제출, 오류 추적<br><br>
                <a href="ga-events.html" style="color: #E60012;">이벤트 설정 가이드 →</a>
            `;
        } else if (message.includes('전자상거래') || message.includes('이커머스')) {
            return `
                <strong>GA4 전자상거래 추적</strong><br><br>
                Enhanced Ecommerce를 통해:<br>
                • 상품 조회 추적<br>
                • 장바구니 추가/제거<br>
                • 구매 완료 추적<br>
                • 매출 데이터 분석<br><br>
                <a href="ga-ecommerce.html" style="color: #E60012;">전자상거래 가이드 →</a>
            `;
        } else {
            return `
                <strong>Google Analytics 4 (GA4)</strong><br><br>
                GA4는 Google의 최신 웹 분석 도구입니다.<br><br>
                주요 기능:<br>
                • 사용자 중심 측정<br>
                • 머신러닝 기반 인사이트<br>
                • 크로스 플랫폼 추적<br>
                • 향상된 전자상거래<br><br>
                <a href="ga-intro.html" style="color: #E60012;">GA4 소개 보기 →</a>
            `;
        }
    }
    
    // GTM 관련 질문
    else if (message.includes('gtm') || message.includes('tag manager')) {
        if (message.includes('설치') || message.includes('설정')) {
            return `
                <strong>GTM 설치 방법</strong><br><br>
                1. GTM 계정 및 컨테이너 생성<br>
                2. GTM 코드를 웹사이트에 설치<br>
                3. 태그, 트리거, 변수 설정<br>
                4. 미리보기 및 디버깅<br><br>
                <a href="gtm-setup.html" style="color: #E60012;">GTM 설치 가이드 →</a>
            `;
        } else if (message.includes('운영') || message.includes('관리')) {
            return `
                <strong>GTM 운영 방법</strong><br><br>
                • 태그 관리: GA4, Facebook Pixel 등<br>
                • 트리거 설정: 페이지뷰, 클릭 등<br>
                • 변수 활용: 동적 데이터 전송<br>
                • 버전 관리 및 배포<br><br>
                <a href="gtm-operation.html" style="color: #E60012;">운영 가이드 보기 →</a>
            `;
        } else if (message.includes('데이터 레이어')) {
            return `
                <strong>데이터 레이어</strong><br><br>
                구조화된 데이터를 GTM으로 전송하는 방법:<br>
                • dataLayer.push() 사용<br>
                • 이벤트 데이터 전송<br>
                • 사용자 정의 변수 설정<br>
                • GA4 Enhanced Ecommerce 연동<br><br>
                <a href="gtm-datalayer.html" style="color: #E60012;">데이터 레이어 가이드 →</a>
            `;
        } else {
            return `
                <strong>Google Tag Manager (GTM)</strong><br><br>
                GTM은 코드 수정 없이 태그를 관리할 수 있는 도구입니다.<br><br>
                주요 기능:<br>
                • 태그 중앙 관리<br>
                • 실시간 디버깅<br>
                • 버전 관리<br>
                • 권한 관리<br><br>
                <a href="gtm-intro.html" style="color: #E60012;">GTM 소개 보기 →</a>
            `;
        }
    }
    
    // 전환 관련 질문
    else if (message.includes('전환') || message.includes('conversion')) {
        return `
            <strong>GA4 전환 설정</strong><br><br>
            비즈니스 목표를 전환 이벤트로 설정:<br>
            • 구매 완료<br>
            • 회원가입<br>
            • 문의 폼 제출<br>
            • 파일 다운로드<br><br>
            <a href="ga-conversion.html" style="color: #E60012;">전환 설정 가이드 →</a>
        `;
    }
    
    // 잠재고객 관련 질문
    else if (message.includes('잠재고객') || message.includes('audience')) {
        return `
            <strong>GA4 잠재고객 설정</strong><br><br>
            사용자 세그먼테이션을 통한 타겟 마케팅:<br>
            • 행동 기반 잠재고객<br>
            • 인구통계학적 잠재고객<br>
            • 기술적 잠재고객<br>
            • Google Ads 연동<br><br>
            <a href="ga-audience.html" style="color: #E60012;">잠재고객 가이드 →</a>
        `;
    }
    
    // 일반적인 질문
    else if (message.includes('안녕') || message.includes('hello') || message.includes('hi')) {
        return `
            안녕하세요! 👋<br><br>
            GA & GTM 가이드 AI입니다.<br>
            Google Analytics나 Tag Manager에 대해<br>
            궁금한 것이 있으시면 언제든 물어보세요!
        `;
    }
    
    else if (message.includes('도움') || message.includes('help')) {
        return `
            <strong>도움말</strong><br><br>
            다음과 같은 주제에 대해 도움을 드릴 수 있습니다:<br><br>
            • GA4 설치 및 설정<br>
            • GTM 운영 방법<br>
            • 이벤트 추적 설정<br>
            • 전자상거래 추적<br>
            • 전환 및 잠재고객 설정<br><br>
            구체적인 질문을 해주시면 더 정확한 답변을 드릴 수 있습니다!
        `;
    }
    
    // 기본 응답
    else {
        return `
            죄송합니다. 해당 질문에 대한 답변을 찾을 수 없습니다.<br><br>
            다음과 같은 키워드로 질문해보세요:<br>
            • "GA4 설치"<br>
            • "GTM 설정"<br>
            • "이벤트 추적"<br>
            • "전자상거래"<br>
            • "전환 설정"<br><br>
            또는 <a href="index.html" style="color: #E60012;">홈페이지</a>에서 관련 가이드를 찾아보세요!
        `;
    }
}

// 검색 기능 (홈페이지용)
function searchResources() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        alert('검색어를 입력해주세요.');
        return;
    }
    
    // 검색 가능한 콘텐츠 데이터
    const searchData = [
        { title: 'GA4 마이그레이션 가이드', description: 'Universal Analytics에서 GA4로 전환하는 상세 가이드', category: 'Google Analytics', url: 'ga-intro.html' },
        { title: 'GA4 인터페이스 완벽 가이드', description: '새로운 GA4 인터페이스의 모든 기능을 마스터하세요', category: 'Google Analytics', url: 'ga-intro.html' },
        { title: 'gtag.js 설치 가이드', description: '직접 설치 방식으로 GA4 태그를 웹사이트에 추가', category: 'Google Analytics', url: 'ga-setup.html' },
        { title: 'GTM을 통한 GA4 설치', description: 'Google Tag Manager를 활용한 효율적인 설치 방법', category: 'Google Analytics', url: 'ga-setup.html' },
        { title: 'WordPress 플러그인 설치', description: 'WordPress 사이트에 GA4를 쉽게 설치하는 방법', category: 'Google Analytics', url: 'ga-setup.html' },
        { title: 'SPA 웹사이트 설치', description: 'React, Vue, Angular 등 SPA에서의 구현 방법', category: 'Google Analytics', url: 'ga-setup.html' },
        { title: '클릭 이벤트', description: '버튼, 링크, 이미지 클릭 추적 설정', category: 'Google Analytics', url: 'ga-events.html' },
        { title: '스크롤 이벤트', description: '페이지 스크롤 깊이 측정 설정', category: 'Google Analytics', url: 'ga-events.html' },
        { title: '동영상 이벤트', description: 'YouTube, Vimeo 동영상 추적', category: 'Google Analytics', url: 'ga-events.html' },
        { title: '폼 제출 이벤트', description: '문의, 회원가입 폼 추적 설정', category: 'Google Analytics', url: 'ga-events.html' },
        { title: 'Enhanced Ecommerce', description: '상품 조회, 장바구니 추가, 구매 완료 등 전체 구매 과정 추적', category: 'Google Analytics', url: 'ga-ecommerce.html' },
        { title: 'GTM 기본 개념', description: '태그, 트리거, 변수의 개념과 작동 원리', category: 'Google Tag Manager', url: 'gtm-intro.html' },
        { title: '데이터 레이어', description: '구조화된 데이터 전송을 위한 데이터 레이어 구현', category: 'Google Tag Manager', url: 'gtm-datalayer.html' }
    ];
    
    // 검색 수행
    const results = searchData.filter(item => 
        item.title.toLowerCase().includes(searchTerm) || 
        item.description.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm)
    );
    
    if (results.length > 0) {
        // 첫 번째 결과로 이동
        window.location.href = results[0].url;
    } else {
        alert(`"${searchTerm}"에 대한 검색 결과를 찾을 수 없습니다.`);
    }
}

// Enter 키로 검색
function handleSearchKeyPress(event) {
    if (event.key === 'Enter') {
        searchResources();
    }
}

// 현재 페이지 네비게이션 활성화
function setActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// 사이드바가 있는 페이지에서 메인 콘텐츠에 클래스 추가
function addSidebarClass() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    const footer = document.getElementById('footer');
    
    if (sidebar && mainContent) {
        // 사이드바가 로드되면 with-sidebar 클래스 추가
        const checkSidebar = setInterval(() => {
            if (sidebar.innerHTML.trim() !== '') {
                mainContent.classList.add('with-sidebar');
                if (footer && footer.innerHTML.trim() !== '') {
                    const footerEl = footer.querySelector('.footer');
                    if (footerEl) footerEl.classList.add('with-sidebar');
                }
                clearInterval(checkSidebar);
            }
        }, 100); // 체크 간격 조정
        
        // 5초 후에도 사이드바가 로드되지 않으면 클리어
        setTimeout(() => {
            clearInterval(checkSidebar);
        }, 5000);
    }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    setActiveNavigation();
    
    // has-sidebar 클래스가 있는 경우에만 사이드바 클래스 추가
    if (document.body.classList.contains('has-sidebar')) {
        addSidebarClass();
    }
});
