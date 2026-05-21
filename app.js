/* ==========================================================================
   Clean Tech Interactive JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Sticky Header & Active Scroll State
    const header = document.getElementById('main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu-container');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
        });
    }

    // Close menu when a link is clicked (for mobile UX)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileToggle && mobileToggle.classList.contains('open')) {
                mobileToggle.classList.remove('open');
                navMenu.classList.remove('open');
            }
        });
    });

    // 3. Scroll Reveal Animation using Intersection Observer
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Unobserve after revealing
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 4. Robotic Fleet Tab System
    const robotData = {
        k3: {
            name: "CREBO K3",
            badge: "Water Tanks & Cooling Towers",
            desc: "각 트랙에 BLDC 모터가 내장된 고무 트랙 주행 방식을 적용하여 민첩한 수중 이동이 가능합니다. 750mm 폭의 유연한 흡입 헤드를 장착하여 바닥면에 밀착되어 슬러지를 제거합니다. 최대 Ø40mm 크기의 입자까지 막힘없이 통과시키며, 원격 조이스틱 컨트롤러와 LED 조명이 내장된 HD 카메라를 통해 수중 모니터링을 진행하며 정밀 청소 작업을 수행합니다.",
            use: "워터파크 수조, 물탱크, 퇴적물이 비교적 적은 냉각탑 수조",
            capacity: "최대 22 m³/hr (내장 슬러지 펌프, Ø50 배출구)",
            depth: "최대 작업 수심 20m (기본 케이블 40m)",
            feature: "크기: 920 x 750 x 460 mm | 무게: 75 kg | 작동 전력: 단상 AC 110/220V (2kW) | IMU 3축 자속도계 탑재",
            img: "assets/robot_k3.png"
        },
        k5: {
            name: "CREBO K5",
            badge: "Reservoirs & Purification Plants",
            desc: "원수 저수지, 정수장, 그리고 퇴적층 두께가 최대 50mm 이하인 물탱크 및 냉각탑 수조 청소에 최적화된 다목적 수중 로봇입니다. 단단하게 굳은 퇴적물도 부수어 흡입할 수 있는 스크류 형태의 디스크 오거(Disc auger) 시스템과 강력한 고성능 슬러지 펌프를 탑재하여 탁월한 작업 능력을 발휘합니다.",
            use: "원수 저수지, 공업용수 정수장, 퇴적층 두께 50mm 이하의 수조 및 냉각탑",
            capacity: "최대 30 m³/hr (Ø75 배출구, 옵션으로 최대 60 m³/h 펌프 업그레이드 가능)",
            depth: "최대 작업 수심 20m (기본 케이블 40m)",
            feature: "크기: 940 x 710 x 520 mm | 무게: 80 kg | 작동 전력: 3상 AC 380V (3kW) | BLDC 구동 모터 및 디스크 오거 장착",
            img: "assets/robot_k5.png"
        },
        k6: {
            name: "CREBO K6",
            badge: "600mm Manhole Specialty",
            desc: "가로 폭을 450mm로 극대화하여 슬림하게 특수 설계된 모델로, 산업 현장의 표준 600mm 원형 맨홀을 통해 직접 밀폐 수조 내부로 투입할 수 있습니다. 스크류 형태의 디스크 오거(Disc auger)를 내장하여 침전물을 효과적으로 파쇄하며, 정수장 배수지, 공장 지하 침전조, 밀폐된 냉각탑 내부 등 특수 환경에서 설비 중단 없이 원격 조작으로 안전하게 준설을 실행합니다.",
            use: "600mm 원형 맨홀 진입이 필수적인 밀폐 수조, 가로 폭이 협소한 침전조",
            capacity: "최대 30 m³/hr (내장 슬러지 펌프, Ø50 배출구)",
            depth: "최대 작업 수심 20m (기본 케이블 40m)",
            feature: "크기: 1000 x 450 x 480 mm | 무게: 65 kg | 작동 전력: 3상 AC 380V (3kW) | 초슬림 기동 프레임 설계, 디스크 오거 장착",
            img: "assets/robot_k6.png"
        },
        k7: {
            name: "CREBO K7",
            badge: "Heavy Industrial Dredging",
            desc: "슬러지, 고농도 슬러리, 굵은 모래 및 자갈이 혼합되어 주행과 흡입이 매우 험난한 대형 산업 현장에 특화된 초대형 고강도 수중 준설 로봇입니다. 130mm 폭의 광폭 트랙과 삼각 섀시, 160mm의 높은 지상고로 험지 돌파력이 극대화되었습니다. 속도 제어가 가능한 스크류 오거와 자가 부상/잠수 시스템을 탑재하여 최대 45 x 55mm 크기의 대형 이물질까지 막힘없이 통과시킵니다.",
            use: "정유사 및 제철소 대형 침전조, 발전소 취수 구조물, 암거(Culvert) 내부 준설, 최대 500mm 퇴적층 원수 저장소",
            capacity: "Ø75 대형 배출구 탑재 (최대 입자 45 x 55mm 통과, 최대 60 m³/h 슬러지 펌프 적용)",
            depth: "최대 작업 수심 20m (기본 고강도 케이블 80m 광대역 작업 가능)",
            feature: "크기: 990 x 730 x 650 mm | 무게: 130 kg | 작동 전력: 3상 AC 380V (6kW) | 자가 부상/잠수 시스템 탑재, 지상고 160mm",
            img: "assets/robot_k7.png"
        }
    };

    const tabButtons = document.querySelectorAll('#robot-tabs .tab-btn');
    const robotNameEl = document.getElementById('robot-name');
    const robotBadgeEl = document.querySelector('#robot-display .robot-badge');
    const robotDescEl = document.getElementById('robot-desc');
    const specUseEl = document.getElementById('spec-use');
    const specCapacityEl = document.getElementById('spec-capacity');
    const specDepthEl = document.getElementById('spec-depth');
    const specFeatureEl = document.getElementById('spec-feature');
    const robotImgEl = document.getElementById('robot-img');
    const robotDisplayCard = document.getElementById('robot-display');
    const scannerLine = document.querySelector('.scanner-line');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active to current
            button.classList.add('active');

            const robotKey = button.getAttribute('data-robot');
            const data = robotData[robotKey];

            if (data) {
                // Add a brief fade-out effect for a smoother transition
                robotDisplayCard.style.opacity = '0.3';
                robotDisplayCard.style.transform = 'translateY(5px)';
                
                setTimeout(() => {
                    robotNameEl.textContent = data.name;
                    robotBadgeEl.textContent = data.badge;
                    robotDescEl.textContent = data.desc;
                    specUseEl.textContent = data.use;
                    specCapacityEl.textContent = data.capacity;
                    specDepthEl.textContent = data.depth;
                    specFeatureEl.textContent = data.feature;
                    
                    if (robotImgEl && data.img) {
                        robotImgEl.src = data.img;
                        robotImgEl.alt = data.name;
                    }
                    
                    // Reset opacity & transform
                    robotDisplayCard.style.opacity = '1';
                    robotDisplayCard.style.transform = 'translateY(0)';
                    
                    // Reset scanner animation to sync up visually
                    if (scannerLine) {
                        scannerLine.style.animation = 'none';
                        void scannerLine.offsetWidth; // Trigger reflow
                        scannerLine.style.animation = 'scanAnimation 3.5s infinite linear';
                    }
                }, 200);
            }
        });
    });

    // 5. Inquiry Contact Form Handling
    const inquiryForm = document.getElementById('inquiry-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('form-submit-btn');
    const agreeCheckbox = document.getElementById('agree');
    const agreementContainer = document.querySelector('.form-agreement');

    if (agreeCheckbox) {
        agreeCheckbox.addEventListener('change', () => {
            if (agreeCheckbox.checked && agreementContainer) {
                agreementContainer.classList.remove('error-highlight');
            }
        });
    }

    if (inquiryForm) {
        inquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Check Privacy Agreement
            if (agreeCheckbox && !agreeCheckbox.checked) {
                if (agreementContainer) {
                    agreementContainer.classList.add('error-highlight', 'error-shake');
                    setTimeout(() => {
                        agreementContainer.classList.remove('error-shake');
                    }, 400);
                }
                showStatus('상담 진행을 위해 개인정보 수집 및 이용 동의가 필요합니다.', 'error');
                return;
            }

            // Get Form Data
            const formData = new FormData(inquiryForm);
            const formObj = {};
            formData.forEach((value, key) => {
                formObj[key] = value;
            });

            // Simulate form submission animation
            submitBtn.disabled = true;
            submitBtn.textContent = '문의 송신 중...';

            // Send actual email using FormSubmit AJAX API
            fetch('https://formsubmit.co/ajax/chongchon3@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    _subject: "[클린텍] 홈페이지 견적 및 상담 의뢰",
                    "회사/기관명": formObj.company,
                    "담당자명": formObj.name,
                    "연락처": formObj.phone,
                    "이메일": formObj.email,
                    "대상 수조 형태": formObj.type,
                    "의뢰 세부내용": formObj.message
                })
            })
            .then(response => {
                if (response.ok) {
                    showStatus('상담 신청이 접수되었습니다. 담당자가 기재해 주신 연락처로 신속하고 친절하게 연락드리겠습니다.', 'success');
                    inquiryForm.reset();
                } else {
                    showStatus('일시적인 오류로 문의 송신에 실패했습니다. 대표번호(010-3099-4561)로 연락해 주시면 바로 안내를 도와드리겠습니다.', 'error');
                }
            })
            .catch(error => {
                showStatus('네트워크 연결이 불안정하여 전송하지 못했습니다. 잠시 후 다시 시도해 주시거나 대표번호(010-3099-4561)로 연락해 주세요.', 'error');
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = '상담 및 견적 신청하기';
                
                // Smooth scroll to status message
                formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            });
        });
    }

    function showStatus(message, type) {
        formStatus.className = 'form-status-msg'; // Reset classes
        formStatus.classList.add(type);
        formStatus.classList.remove('hidden');

        if (type === 'success') {
            formStatus.innerHTML = `
                <div class="status-icon">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5" style="color: var(--accent-emerald);"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                <div class="status-text">
                    <h4>신청이 완료되었습니다</h4>
                    <p>${message}</p>
                </div>
            `;
        } else {
            formStatus.innerHTML = `
                <div class="status-icon">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5" style="color: #ef4444;"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                </div>
                <div class="status-text">
                    <h4>입력 오류가 발생했습니다</h4>
                    <p>${message}</p>
                </div>
            `;
        }

        // Automatically hide errors after 5 seconds, keep success messages visible
        if (type === 'error') {
            setTimeout(() => {
                formStatus.classList.add('hidden');
            }, 6000);
        }
    }
});
