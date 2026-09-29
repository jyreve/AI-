/**
 * 무인도에서 살아남기 · 건강권 AAAQ 어드벤처 게임 엔진
 * 100% Standalone / No API Key / Pure Web Audio & Game Animation
 */

// ==========================================
// 1. 데이터 정의 (8가지 생존 카드 & 재난 시나리오)
// ==========================================

const SURVIVAL_ITEMS = [
  {
    id: "health_room",
    name: "보건실과 약",
    icon: "🏥",
    category: "A1",
    categoryName: "가용성 (Availability)",
    tagClass: "aaaq-tag-a1",
    shortDesc: "치료받고 약을 조제할 수 있는 필수 보건 시설",
    fullDesc: "갑자기 열이 나거나 다쳤을 때 전문가의 치료와 필수 의약품을 공급받을 수 있는 기본적인 보건 인프라입니다."
  },
  {
    id: "flat_path",
    name: "평평한 길",
    icon: "♿",
    category: "A2",
    categoryName: "접근성 (Accessibility)",
    tagClass: "aaaq-tag-a2",
    shortDesc: "누구나 위험 없이 안전하게 이동할 수 있는 도로",
    fullDesc: "다친 환자나 휠체어, 노약자 등 누구나 차별과 지리적 장벽 없이 의료시설과 안전지대로 신속히 갈 수 있는 환경입니다."
  },
  {
    id: "clean_water",
    name: "깨끗한 물",
    icon: "💧",
    category: "Q",
    categoryName: "질 (Quality) / 필수 자원",
    tagClass: "aaaq-tag-q",
    shortDesc: "탈수와 수인성 감염병을 막아주는 안전한 생명수",
    fullDesc: "병원균이나 독성 물질에 오염되지 않은 안전한 음용수는 인간의 생명을 유지하는 가장 기본적이고 질 높은 생명권입니다."
  },
  {
    id: "privacy_shield",
    name: "비밀 보장 방패",
    icon: "🤐",
    category: "A3",
    categoryName: "수용성 (Acceptability)",
    tagClass: "aaaq-tag-a3",
    shortDesc: "나의 건강과 질병 비밀을 지켜주는 존중의 방패",
    fullDesc: "진료 내용과 민감한 개인정보가 보호받을 때, 사람들은 수치심이나 차별에 대한 두려움 없이 안심하고 솔직하게 치료받을 수 있습니다."
  },
  {
    id: "safe_food",
    name: "섭취가능한 음식",
    icon: "🥗",
    category: "A1",
    categoryName: "가용성 (Availability)",
    tagClass: "aaaq-tag-a1",
    shortDesc: "안전하게 영양을 공급받을 수 있는 식량",
    fullDesc: "상하거나 독성이 없는 안전한 영양 공급원은 면역력을 유지하고 조난 상황에서 살아남기 위한 필수 조건입니다."
  },
  {
    id: "clean_air",
    name: "미세먼지 없는 공기",
    icon: "🌳",
    category: "Q",
    categoryName: "질 (Quality) / 환경권",
    tagClass: "aaaq-tag-q",
    shortDesc: "호흡기를 보호하는 맑고 깨끗한 대기 환경",
    fullDesc: "유독가스나 미세먼지, 화산재가 없는 깨끗한 공기는 호흡기 질환을 예방하고 건강한 신체 기능을 유지하는 필수 환경 권리입니다."
  },
  {
    id: "safety_rules",
    name: "건강 안전 규칙",
    icon: "📜",
    category: "A3",
    categoryName: "수용성 (Acceptability) / 제도",
    tagClass: "aaaq-tag-a3",
    shortDesc: "모두가 지켜야 할 위생 및 감염 예방 수칙",
    fullDesc: "손 씻기, 격리, 안전 수칙 등 사회적 약속과 윤리적 기준이 있어야 무질서한 감염 확산과 안전사고를 막을 수 있습니다."
  },
  {
    id: "safe_facility",
    name: "안전한 시설",
    icon: "🚨",
    category: "A2",
    categoryName: "접근성 (Accessibility) / 물리적 보호",
    tagClass: "aaaq-tag-a2",
    shortDesc: "비바람과 재난을 피할 수 있는 튼튼한 대피소",
    fullDesc: "거친 날씨와 위험으로부터 안전하게 몸을 보호하고 휴식할 수 있는 물리적 대피 공간입니다."
  }
];

const DISASTER_SCENARIOS = [
  {
    id: "d1",
    round: 1,
    name: "☀️ 극심한 폭염과 가뭄 발생!",
    bossIcon: "☀️🏜️",
    requiredCardIds: ["clean_water"],
    requiredCardNames: ["💧 깨끗한 물"],
    story: "무인도에 찌는 듯한 살인적 폭염이 닥치고 모든 물웅덩이가 말라붙었습니다! 체온이 급격히 올라가며 극심한 탈수 갈증이 찾아옵니다.",
    consequence: "깨끗한 물이 없는 모둠은 탈수 증상과 열사병으로 쓰러집니다. (생명 -1)",
    discussion: "선생님 발문: '왜 깨끗한 물은 누구나 차별 없이 보장받아야 하는 기본 건강권일까요? 오염된 물을 마시면 어떤 일이 생길까요?'",
    aaaqLesson: "[Quality / 질] 안전하고 깨끗한 수질은 생명 유지를 위한 가장 근본적인 건강권 요소입니다."
  },
  {
    id: "d2",
    round: 2,
    name: "🦟 정체불명의 모기 & 풍토병 유행!",
    bossIcon: "🦟🌡️",
    requiredCardIds: ["health_room"],
    requiredCardNames: ["🏥 보건실과 약"],
    story: "섬의 열대 모기 떼에 물린 탐정 대원들이 고열과 오한으로 앓아눕기 시작했습니다! 긴급한 해열 치료제와 의료 조치가 필요합니다.",
    consequence: "보건실과 약이 없는 모둠은 고열을 치료하지 못해 심각한 합병증에 걸립니다. (생명 -1)",
    discussion: "선생님 발문: '만약 우리 동네에 병원이나 보건소가 아예 없다면 어떨까요? 의료 인프라가 존재하는 것(가용성)의 중요성에 대해 이야기해봅시다.'",
    aaaqLesson: "[Availability / 가용성] 필수 의약품과 보건 의료 시설이 실제로 충분히 마련되어 있어야 합니다."
  },
  {
    id: "d3",
    round: 3,
    name: "🌋 화산 폭발 & 매캐한 화산재 구름!",
    bossIcon: "🌋💨",
    requiredCardIds: ["clean_air", "safe_facility"],
    matchAny: true,
    requiredCardNames: ["🌳 미세먼지 없는 공기 또는 🚨 안전한 시설"],
    story: "무인도 중앙 화산이 굉음과 함께 분화하며 섬 전체가 유독가스와 잿빛 화산재로 뒤덮였습니다! 숨을 쉴 수가 없습니다.",
    consequence: "맑은 공기나 안전한 대피 시설이 없는 모둠은 유독가스를 흡입하여 호흡 곤란에 빠집니다. (생명 -1)",
    discussion: "선생님 발문: '미세먼지나 대기오염은 개인의 잘못일까요, 아니면 사회와 국가가 함께 지켜야 할 건강 환경권일까요?'",
    aaaqLesson: "[Quality & Accessibility] 깨끗한 대기 환경과 신속히 몸을 피할 수 있는 대피소는 필수 건강권입니다."
  },
  {
    id: "d4",
    round: 4,
    name: "💥 산사태 & 응급 골절 환자 발생!",
    bossIcon: "🧗‍♂️🚑",
    requiredCardIds: ["flat_path"],
    requiredCardNames: ["♿ 평평한 길"],
    story: "지진으로 거대한 바위가 굴러떨어져 대원이 다리를 심하게 다쳤습니다! 들것으로 환자를 안전지대까지 긴급 이송해야 합니다.",
    consequence: "평평한 길이 없는 모둠은 험한 바윗길 때문에 환자를 제때 옮기지 못해 구조 골든타임을 놓칩니다. (생명 -1)",
    discussion: "선생님 발문: '몸이 불편하거나 다친 친구가 보건실에 가려고 할 때, 계단만 있고 경사로가 없다면 어떨까요? 이동권과 건강권의 관계를 생각해봅시다.'",
    aaaqLesson: "[Accessibility / 접근성] 물리적, 경제적, 지리적 장벽 없이 누구나 쉽게 의료 서비스에 도달할 수 있어야 합니다."
  },
  {
    id: "d5",
    round: 5,
    name: "🤫 감염 의심자 발생과 낙인·소외 위기!",
    bossIcon: "👥🤐",
    requiredCardIds: ["privacy_shield"],
    requiredCardNames: ["🤐 비밀 보장 방패"],
    story: "한 대원이 피부에 이상 발진이 돋았습니다. 소문이 퍼질까 두려워 치료를 숨기다가 섬 전체에 공포와 혐오가 번질 위기입니다!",
    consequence: "비밀 보장 방패가 없는 모둠은 환자가 낙인이 두려워 진료를 기피하다가 상태가 악화됩니다. (생명 -1)",
    discussion: "선생님 발문: '내가 아프다는 사실이 전교에 소문난다면 병원에 가기 꺼려질 수 있겠죠? 환자의 프라이버시가 왜 치료에 결정적일까요?'",
    aaaqLesson: "[Acceptability / 수용성] 환자의 인권과 존엄성, 비밀이 존중되어야 누구나 두려움 없이 치료를 수용할 수 있습니다."
  },
  {
    id: "d6",
    round: 6,
    name: "🍄 식량 고갈 & 유혹의 독버섯 군락!",
    bossIcon: "🍄🤢",
    requiredCardIds: ["safe_food"],
    requiredCardNames: ["🥗 섭취가능한 음식"],
    story: "배고픔이 극에 달한 조난 대원들 앞에 화려하고 먹음직스러운 야생 버섯이 보입니다. 하지만 치명적인 독버섯입니다!",
    consequence: "안전한 음식을 챙기지 못한 모둠은 굶주림에 못 이겨 독버섯을 섭취해 심각한 식중독에 걸립니다. (생명 -1)",
    discussion: "선생님 발문: '학교 급식이나 마트의 식품이 안전하게 검사되어 나오는 것은 어떤 건강권과 관련될까요?'",
    aaaqLesson: "[Availability & Quality] 안전하고 위생적인 영양 섭취는 생존과 면역의 기본입니다."
  },
  {
    id: "d7",
    round: 7,
    name: "🌪️ 초강력 태풍 상륙 & 집단 패닉!",
    bossIcon: "🌪️🌊",
    requiredCardIds: ["safety_rules", "safe_facility"],
    matchAny: true,
    requiredCardNames: ["📜 건강 안전 규칙 또는 🚨 안전한 시설"],
    story: "거대한 초대형 태풍이 상륙했습니다! 무질서하게 흩어지면 집채만 한 파도에 휩쓸려 조난될 수 있습니다.",
    consequence: "안전 규칙이나 안전 시설이 없는 모둠은 혼란 속에서 큰 부상을 입습니다. (생명 -1)",
    discussion: "선생님 발문: '재난이나 감염병 유행 시 모두가 규칙(마스크 쓰기, 안전 수칙)을 지키는 것이 왜 중요할까요?'",
    aaaqLesson: "[Acceptability & Safety] 공동체의 안전 규칙 준수와 든든한 방호 시설은 집단의 생명을 지킵니다."
  }
];

// ==========================================
// 2. Web Audio 사운드 신디사이저 엔진
// ==========================================

class GameSoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq, duration, type = 'sine', gainVal = 0.2) {
    if (this.muted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  playClick() { this.playTone(600, 0.08, 'triangle', 0.15); }
  playSelect() { this.playTone(880, 0.12, 'sine', 0.2); }
  
  playSuccess() {
    if (this.muted) return;
    this.playTone(523.25, 0.12, 'triangle', 0.2);
    setTimeout(() => this.playTone(659.25, 0.12, 'triangle', 0.2), 90);
    setTimeout(() => this.playTone(783.99, 0.15, 'triangle', 0.2), 180);
    setTimeout(() => this.playTone(1046.50, 0.3, 'triangle', 0.25), 270);
  }

  playDamage() {
    if (this.muted) return;
    this.playTone(200, 0.25, 'sawtooth', 0.35);
    setTimeout(() => this.playTone(110, 0.4, 'sawtooth', 0.4), 140);
  }

  playAlert() {
    if (this.muted) return;
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        this.playTone(880, 0.1, 'square', 0.25);
        setTimeout(() => this.playTone(587, 0.1, 'square', 0.25), 110);
      }, i * 240);
    }
  }

  playFanfare() {
    if (this.muted) return;
    const notes = [523.25, 659.25, 783.99, 1046.50, 880, 1046.50];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, 0.22, 'triangle', 0.25), idx * 130);
    });
  }
}

const sounds = new GameSoundEngine();

// ==========================================
// 3. 메인 게임 앱 컨트롤러
// ==========================================

class IslandGameApp {
  constructor() {
    this.currentStep = 1;
    this.teamCount = 4;
    this.initialHearts = 2;
    this.teams = [];
    this.currentDisasterIndex = 0;
    this.revealedDisasters = {};
    this.channel = null;

    this.initBroadcastChannel();
    this.loadStateFromStorage();
    this.bindEvents();
    this.renderCurrentStep();
  }

  initBroadcastChannel() {
    if ('BroadcastChannel' in window) {
      this.channel = new BroadcastChannel('health_rights_island_sync');
      this.channel.onmessage = (event) => {
        const { type, payload } = event.data;
        if (type === 'TEAM_SELECTION_UPDATED') {
          this.handleRemoteTeamSelection(payload.teamId, payload.selectedItems);
        }
      };
    }
  }

  broadcastTeamUpdate(teamId, selectedItems) {
    if (this.channel) {
      this.channel.postMessage({
        type: 'TEAM_SELECTION_UPDATED',
        payload: { teamId, selectedItems }
      });
    }
  }

  initTeams(count = 4, hearts = 2) {
    this.teamCount = count;
    this.initialHearts = hearts;
    this.teams = [];
    const teamIcons = ["🏕️", "⛺", "🧭", "🔦", "🗺️", "🛡️", "⛵", "🏝️"];
    for (let i = 1; i <= count; i++) {
      this.teams.push({
        id: `team_${i}`,
        num: i,
        name: `${i}모둠 탐정단 ${teamIcons[(i-1) % teamIcons.length]}`,
        hearts: hearts,
        maxHearts: hearts,
        selectedItems: [],
        eliminated: false,
        eliminatedAtRound: null
      });
    }
    this.saveStateToStorage();
  }

  loadStateFromStorage() {
    try {
      const saved = localStorage.getItem('health_island_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        this.currentStep = parsed.currentStep || 1;
        this.teamCount = parsed.teamCount || 4;
        this.initialHearts = parsed.initialHearts || 2;
        this.teams = parsed.teams || [];
        this.currentDisasterIndex = parsed.currentDisasterIndex || 0;
      } else {
        this.initTeams(4, 2);
      }
    } catch (e) {
      this.initTeams(4, 2);
    }
  }

  saveStateToStorage() {
    try {
      const state = {
        currentStep: this.currentStep,
        teamCount: this.teamCount,
        initialHearts: this.initialHearts,
        teams: this.teams,
        currentDisasterIndex: this.currentDisasterIndex
      };
      localStorage.setItem('health_island_state', JSON.stringify(state));
    } catch (e) {}
  }

  setStep(stepNum) {
    sounds.playClick();
    this.currentStep = stepNum;
    this.saveStateToStorage();
    this.renderCurrentStep();
  }

  handleRemoteTeamSelection(teamId, selectedItems) {
    const team = this.teams.find(t => t.id === teamId || t.num == teamId);
    if (team) {
      team.selectedItems = selectedItems;
      this.saveStateToStorage();
      if (this.currentStep === 3) {
        this.renderStep3();
      }
      sounds.playSuccess();
    }
  }

  bindEvents() {
    document.querySelectorAll('.quest-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const step = parseInt(chip.dataset.step, 10);
        this.setStep(step);
      });
    });

    const soundBtn = document.getElementById('btnSoundToggle');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        sounds.muted = !sounds.muted;
        soundBtn.textContent = sounds.muted ? "🔇 효과음 끔" : "🔊 효과음 켬";
      });
    }

    const resetBtn = document.getElementById('btnResetAll');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm("게임을 처음 상태로 초기화할까요? 모둠과 선택 데이터가 리셋됩니다.")) {
          this.initTeams(this.teamCount, this.initialHearts);
          this.currentDisasterIndex = 0;
          this.setStep(1);
        }
      });
    }

    const fullBtn = document.getElementById('btnFullscreen');
    if (fullBtn) {
      fullBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(e => {});
        } else {
          document.exitFullscreen();
        }
      });
    }
  }

  renderCurrentStep() {
    document.querySelectorAll('.quest-chip').forEach(chip => {
      const step = parseInt(chip.dataset.step, 10);
      chip.classList.remove('active', 'completed');
      if (step === this.currentStep) {
        chip.classList.add('active');
      } else if (step < this.currentStep) {
        chip.classList.add('completed');
      }
    });

    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
    const targetSec = document.getElementById(`stepSection${this.currentStep}`);
    if (targetSec) targetSec.classList.add('active');

    if (this.currentStep === 1) this.renderStep1();
    if (this.currentStep === 2) this.renderStep2();
    if (this.currentStep === 3) this.renderStep3();
    if (this.currentStep === 4) this.renderStep4();
    if (this.currentStep === 5) this.renderStep5();
  }

  // Helper for pixel hearts
  renderHeartsHtml(current, max) {
    let html = '';
    for (let i = 0; i < max; i++) {
      if (i < current) {
        html += `<span class="pixel-heart">❤️</span>`;
      } else {
        html += `<span class="pixel-heart lost">💔</span>`;
      }
    }
    return html;
  }

  // ==========================================
  // Step 1: 탐정단 결성 (모둠 설정)
  // ==========================================
  renderStep1() {
    const container = document.getElementById('stepSection1');
    container.innerHTML = `
      <div class="game-parchment-panel">
        <div class="story-dialog-box">
          <div class="story-avatar-box">🕵️‍♂️</div>
          <div class="story-text-content">
            <h2>무인도 탐정단 본부 결성!</h2>
            <p>
              안녕하세요, 보건 선생님! 오늘 우리 반 탐정단원들과 함께 <strong>건강권(AAAQ) 무인도 생존 퀘스트</strong>를 떠납니다.<br>
              수업을 진행할 <strong>참여 모둠 수</strong>와 모둠별 <strong>기본 생명(하트)</strong>을 설정하고 탐험을 시작하세요!
            </p>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; margin-top: 20px;">
          <div style="background: #ffffff; border: 4px solid #78350f; border-radius: var(--radius-md); padding: 24px; box-shadow: var(--box-shadow-card);">
            <h3 style="font-family: var(--font-title); font-size: 1.5rem; color: #78350f; margin-bottom: 16px;">
              ⚙️ 탐정단 설정
            </h3>
            <div style="margin-bottom: 16px;">
              <label style="display:block; font-weight:800; margin-bottom:6px; color:#451a03;">🚩 참여 모둠 수 (2 ~ 8모둠)</label>
              <input type="number" id="inputTeamCount" class="game-btn" style="width:100%; background:#fff; text-align:left;" min="2" max="8" value="${this.teamCount}">
            </div>
            <div style="margin-bottom: 20px;">
              <label style="display:block; font-weight:800; margin-bottom:6px; color:#451a03;">💖 모둠별 기본 생명 하트 수</label>
              <input type="number" id="inputInitialHearts" class="game-btn" style="width:100%; background:#fff; text-align:left;" min="1" max="5" value="${this.initialHearts}">
            </div>
            <button id="btnSaveTeams" class="game-btn game-btn-success" style="width: 100%; font-size: 1.2rem; padding: 12px;">
              🏝️ 탐험 준비 완료 & 아이템 공개로!
            </button>
          </div>

          <div style="background: #ffffff; border: 4px solid #78350f; border-radius: var(--radius-md); padding: 24px; box-shadow: var(--box-shadow-card);">
            <h3 style="font-family: var(--font-title); font-size: 1.5rem; color: #78350f; margin-bottom: 16px;">
              👥 참가 모둠 탐정단 목록
            </h3>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
              ${this.teams.map(team => `
                <div style="background: #fef08a; border: 2px solid #b45309; border-radius: 12px; padding: 10px; text-align: center; font-family: var(--font-game); color: #78350f;">
                  <strong>${team.name}</strong><br>
                  <span style="font-size: 0.9rem;">❤️ x ${team.hearts}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('btnSaveTeams').addEventListener('click', () => {
      sounds.playSuccess();
      const count = parseInt(document.getElementById('inputTeamCount').value, 10) || 4;
      const hearts = parseInt(document.getElementById('inputInitialHearts').value, 10) || 2;
      this.initTeams(count, hearts);
      this.setStep(2);
    });
  }

  // ==========================================
  // Step 2: 생존템 공개 (8가지 건강권 카드)
  // ==========================================
  renderStep2() {
    const container = document.getElementById('stepSection2');
    container.innerHTML = `
      <div class="game-parchment-panel">
        <div class="story-dialog-box">
          <div class="story-avatar-box">🌊</div>
          <div class="story-text-content">
            <h2>"우리는 미지의 무인도에 조난되었다!"</h2>
            <p>
              "얘들아! 비행선이 불시착해 우리는 고립된 무인도에 떨어졌어. 구조대가 <strong>8가지 귀중한 생존 카드</strong>를 나누어 줄 거야.<br>
              하지만 배낭 무게 한계 때문에 <strong>모든 아이템을 다 챙길 수는 없어!</strong> 모둠원들이 머리를 맞대고 <strong>딱 4개만 선택</strong>해야 해!"
            </p>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px; flex-wrap: wrap; gap: 10px;">
          <h3 style="font-family: var(--font-title); font-size: 1.6rem; color: #78350f;">
            📦 구조대가 제시한 8가지 생존 보물 카드
          </h3>
          <button id="btnGoToSelection" class="game-btn game-btn-blue">
            👉 모둠별 인벤토리 장착 화면으로 이동
          </button>
        </div>

        <div class="game-items-grid">
          ${SURVIVAL_ITEMS.map(item => `
            <div class="game-item-card">
              <div class="game-item-header">
                <div class="game-item-icon-frame">${item.icon}</div>
                <div class="game-item-title">
                  <h4>${item.name}</h4>
                  <span class="aaaq-badge ${item.tagClass}">${item.categoryName}</span>
                </div>
              </div>
              <div class="game-item-body">
                <strong>${item.shortDesc}</strong><br>
                <span style="font-size: 0.85rem; color: #57534e;">${item.fullDesc}</span>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="teacher-quest-guide">
          <span class="guide-icon">💡</span>
          <div>
            <h5>보건 선생님 수업 코칭 팁</h5>
            <p>
              학생들에게 8가지 카드를 소개하면서 "왜 이 카드가 우리 생존에 필요할까?" 생각해보게 하세요.<br>
              각 카드는 <strong>건강권의 4대 기준 (AAAQ: 가용성, 접근성, 수용성, 질)</strong>을 상징하며, 현실에서 누구나 누려야 할 필수 보건 권리입니다.
            </p>
          </div>
        </div>
      </div>
    `;

    document.getElementById('btnGoToSelection').addEventListener('click', () => {
      this.setStep(3);
    });
  }

  // ==========================================
  // Step 3: 모둠별 인벤토리 장착 현황 (교사용 대시보드)
  // ==========================================
  renderStep3() {
    const container = document.getElementById('stepSection3');

    const pickCounts = {};
    SURVIVAL_ITEMS.forEach(item => pickCounts[item.id] = 0);
    this.teams.forEach(team => {
      team.selectedItems.forEach(itemId => {
        if (pickCounts[itemId] !== undefined) pickCounts[itemId]++;
      });
    });

    container.innerHTML = `
      <div class="game-parchment-panel">
        <div class="story-dialog-box">
          <div class="story-avatar-box">🎒</div>
          <div class="story-text-content">
            <h2>모둠별 생존 인벤토리 장착 대시보드</h2>
            <p>
              각 모둠 탐정단이 선택한 4개의 생존 카드가 실시간으로 교사용 보드에 장착됩니다!<br>
              학생들이 학생 화면(<code>student.html</code>)에서 제출하거나, 아래 각 모둠 카드에서 <strong>[✏️ 장착/수정]</strong> 버튼을 눌러 직접 고를 수도 있습니다.
            </p>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-top: 20px;">
          <button id="btnOpenStudentTab" class="game-btn game-btn-blue">
            📱 학생용 모둠 선택창 새 탭 열기
          </button>
          <button id="btnStartDisasters" class="game-btn game-btn-danger" style="font-size: 1.25rem; padding: 12px 28px;">
            ⚡ 4단계: 무인도 재난 배틀 시작하기!
          </button>
        </div>

        <!-- Teams Camp Cards Grid -->
        <div class="teams-camp-grid">
          ${this.teams.map(team => {
            const isComplete = team.selectedItems.length === 4;
            return `
              <div class="team-camp-box" id="camp_${team.id}">
                <div class="team-camp-header">
                  <div class="team-camp-title">
                    <span>${team.name}</span>
                  </div>
                  <div class="pixel-hearts-bar">
                    ${this.renderHeartsHtml(team.hearts, team.maxHearts)}
                  </div>
                </div>

                <div style="font-size: 0.9rem; font-weight: 700; color: ${isComplete ? '#15803d' : '#b91c1c'}; margin-bottom: 8px;">
                  ${isComplete ? '✨ 4개 아이템 장착 완료!' : `⏳ 장착 중 (${team.selectedItems.length} / 4개)`}
                </div>

                <!-- 4 Slot Inventory -->
                <div class="inventory-slots-row">
                  ${[0, 1, 2, 3].map(slotIdx => {
                    const itemId = team.selectedItems[slotIdx];
                    if (itemId) {
                      const item = SURVIVAL_ITEMS.find(i => i.id === itemId);
                      return `
                        <div class="inventory-slot occupied">
                          <span>${item.icon}</span>
                          <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${item.name}</span>
                        </div>
                      `;
                    } else {
                      return `
                        <div class="inventory-slot empty-slot">
                          <span>➕ 빈 슬롯</span>
                        </div>
                      `;
                    }
                  }).join('')}
                </div>

                <button class="game-btn btn-edit-team-items" data-team-id="${team.id}" style="width: 100%; font-size: 0.95rem; padding: 6px 12px;">
                  ✏️ 이 모둠 아이템 직접 선택/수정
                </button>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Pick Stats Chart -->
        <div style="background: #ffffff; border: 4px solid #78350f; border-radius: var(--radius-md); padding: 24px; margin-top: 28px; box-shadow: var(--box-shadow-card);">
          <h3 style="font-family: var(--font-title); font-size: 1.5rem; color: #78350f; margin-bottom: 12px;">
            📊 우리 반 생존템 선택 통계 분석
          </h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px;">
            ${SURVIVAL_ITEMS.map(item => {
              const count = pickCounts[item.id] || 0;
              const pct = this.teams.length ? Math.round((count / this.teams.length) * 100) : 0;
              return `
                <div style="background: #fffbeb; border: 2px solid #b45309; border-radius: 12px; padding: 10px;">
                  <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                    <span style="font-weight: 800; font-size: 0.95rem;">${item.icon} ${item.name}</span>
                    <span style="font-family: var(--font-game); color: #78350f; font-size: 1.1rem;">${count}개 (${pct}%)</span>
                  </div>
                  <div style="background: #e7e5e4; border-radius: 99px; height: 10px; overflow: hidden;">
                    <div style="background: #22c55e; width: ${pct}%; height: 100%; transition: width 0.5s;"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;

    container.querySelectorAll('.btn-edit-team-items').forEach(btn => {
      btn.addEventListener('click', () => {
        const teamId = btn.dataset.teamId;
        this.openItemSelectionModal(teamId);
      });
    });

    document.getElementById('btnOpenStudentTab').addEventListener('click', () => {
      window.open('student.html', '_blank');
    });

    document.getElementById('btnStartDisasters').addEventListener('click', () => {
      const unselected = this.teams.filter(t => t.selectedItems.length !== 4);
      if (unselected.length > 0) {
        if (!confirm(`아직 아이템 4개를 다 고르지 않은 모둠(${unselected.map(t => t.name).join(', ')})이 있습니다. 그래도 재난을 시작할까요?`)) {
          return;
        }
      }
      this.currentDisasterIndex = 0;
      this.setStep(4);
    });
  }

  // Teacher modal for manual edit
  openItemSelectionModal(teamId) {
    sounds.playClick();
    const team = this.teams.find(t => t.id === teamId);
    if (!team) return;

    let modal = document.getElementById('itemSelectModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'itemSelectModal';
      modal.className = 'modal-overlay';
      document.body.appendChild(modal);
    }

    let tempSelected = [...team.selectedItems];

    const renderModalBody = () => {
      modal.innerHTML = `
        <div class="modal-window">
          <div class="modal-header">
            <h3>🎒 [${team.name}] 아이템 4개 선택</h3>
            <button class="btn-close-modal" id="btnCloseModal">✕</button>
          </div>
          <p style="margin-bottom: 14px; font-weight: 800; color: #78350f;">
            선택된 슬롯: <span style="color: #ef4444; font-size: 1.3rem;">${tempSelected.length} / 4개</span>
          </p>

          <div style="display: grid; grid-template-columns: 1fr; gap: 10px; max-height: 50vh; overflow-y: auto; padding: 4px;">
            ${SURVIVAL_ITEMS.map(item => {
              const isSelected = tempSelected.includes(item.id);
              return `
                <div class="game-item-card ${isSelected ? 'selected' : ''}" data-item-id="${item.id}" style="padding: 10px;">
                  <div class="game-item-header" style="margin-bottom: 0;">
                    <div class="game-item-icon-frame" style="width: 44px; height: 44px; font-size: 1.6rem;">${item.icon}</div>
                    <div class="game-item-title">
                      <h4>${item.name}</h4>
                      <span class="aaaq-badge ${item.tagClass}">${item.categoryName}</span>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px;">
            <button class="game-btn" id="btnCancelModal">취소</button>
            <button class="game-btn game-btn-success" id="btnSaveModal" ${tempSelected.length !== 4 ? 'disabled style="opacity:0.5"' : ''}>
              장착 완료
            </button>
          </div>
        </div>
      `;

      modal.querySelectorAll('.game-item-card').forEach(card => {
        card.addEventListener('click', () => {
          const itemId = card.dataset.itemId;
          if (tempSelected.includes(itemId)) {
            tempSelected = tempSelected.filter(id => id !== itemId);
            sounds.playClick();
          } else {
            if (tempSelected.length < 4) {
              tempSelected.push(itemId);
              sounds.playSelect();
            } else {
              alert("아이템은 딱 4개까지만 고를 수 있습니다!");
              return;
            }
          }
          renderModalBody();
        });
      });

      modal.querySelector('#btnCloseModal').addEventListener('click', () => modal.classList.remove('active'));
      modal.querySelector('#btnCancelModal').addEventListener('click', () => modal.classList.remove('active'));
      
      const saveBtn = modal.querySelector('#btnSaveModal');
      if (saveBtn) {
        saveBtn.addEventListener('click', () => {
          team.selectedItems = tempSelected;
          this.broadcastTeamUpdate(team.id, team.selectedItems);
          this.saveStateToStorage();
          modal.classList.remove('active');
          sounds.playSuccess();
          this.renderStep3();
        });
      }
    };

    modal.classList.add('active');
    renderModalBody();
  }

  // ==========================================
  // Step 4: 재난 배틀 시뮬레이션 (보스 레이드 연출)
  // ==========================================
  renderStep4() {
    const container = document.getElementById('stepSection4');
    const scenario = DISASTER_SCENARIOS[this.currentDisasterIndex];
    const isRevealed = !!this.revealedDisasters[this.currentDisasterIndex];

    container.innerHTML = `
      <div class="game-parchment-panel">
        <!-- Disaster Boss Raid Battle Arena -->
        <div class="disaster-battle-arena">
          <div class="disaster-phase-badge">
            🔥 제 ${scenario.round}차 재난 위기 (라운드 ${this.currentDisasterIndex + 1} / ${DISASTER_SCENARIOS.length})
          </div>
          <h2 class="disaster-boss-title">${scenario.bossIcon} ${scenario.name}</h2>
          <div class="disaster-boss-story">${scenario.story}</div>
          
          <!-- Answer Box (Hidden Quiz vs Revealed) -->
          ${isRevealed ? `
            <div class="disaster-shield-card-box">
              <span>🛡️ 생존 방어 필수템:</span>
              <strong>${scenario.requiredCardNames.join(' / ')}</strong>
            </div>
            <div class="disaster-boss-penalty">
              ⚠️ ${scenario.consequence}
            </div>
          ` : `
            <div class="disaster-quiz-box">
              <span>❓ 퀴즈 타임:</span>
              <strong>"이 재난을 막아줄 생존 필수 카드는 무엇일까요?"</strong>
            </div>
            <div style="color: #fde047; font-size: 1.1rem; margin-top: 14px; font-weight: 700;">
              🗣️ 아이들과 함께 이 재난 상황을 이겨낼 필수 아이템이 무엇일지 먼저 토론해보세요!
            </div>
          `}

          <!-- Disaster Control Action Buttons -->
          <div style="display: flex; justify-content: center; gap: 14px; margin-top: 24px; flex-wrap: wrap; align-items: center;">
            ${!isRevealed ? `
              <button id="btnRevealAnswer" class="game-btn" style="background: linear-gradient(180deg, #fef08a 0%, #facc15 100%); font-size: 1.3rem; padding: 14px 36px; box-shadow: 0 0 25px rgba(250, 204, 21, 0.8);">
                🔍 정답 필수 카드 공개하기!
              </button>
            ` : `
              <button id="btnPlayDisasterJudge" class="game-btn game-btn-danger" style="font-size: 1.3rem; padding: 14px 36px; box-shadow: 0 0 25px rgba(239, 68, 68, 0.8);">
                ⚡ 이번 재난 판정 실행 & 하트 차감!
              </button>
              <button id="btnHideAnswer" class="game-btn" style="font-size: 0.95rem; padding: 10px 16px;">
                🙈 정답 다시 가리기
              </button>
            `}

            <button id="btnPrevDisaster" class="game-btn" ${this.currentDisasterIndex === 0 ? 'disabled' : ''}>
              ◀ 이전 재난
            </button>
            <button id="btnNextDisaster" class="game-btn game-btn-blue" ${this.currentDisasterIndex === DISASTER_SCENARIOS.length - 1 ? 'disabled' : ''}>
              다음 재난 ▶
            </button>
            <button id="btnGoToResult" class="game-btn game-btn-success">
              🏆 최종 결과 발표
            </button>
          </div>
        </div>

        <!-- Live Teams Camps Under Disaster -->
        <h3 style="font-family: var(--font-title); font-size: 1.6rem; color: #78350f; margin-bottom: 14px;">
          🏕️ 모둠별 방어 성공 여부 및 생존 상태
        </h3>

        <div class="teams-camp-grid">
          ${this.teams.map(team => {
            let hasRequired = false;
            if (scenario.matchAny) {
              hasRequired = scenario.requiredCardIds.some(reqId => team.selectedItems.includes(reqId));
            } else {
              hasRequired = scenario.requiredCardIds.every(reqId => team.selectedItems.includes(reqId));
            }

            return `
              <div class="team-camp-box ${team.eliminated ? 'eliminated' : ''}" id="disaster_camp_${team.id}">
                <div class="team-camp-header">
                  <div class="team-camp-title">
                    <span>${team.name}</span>
                  </div>
                  <div class="pixel-hearts-bar">
                    ${this.renderHeartsHtml(team.hearts, team.maxHearts)}
                  </div>
                </div>

                <!-- Status indicator: hidden during quiz, revealed after click -->
                <div style="margin-bottom: 10px; font-weight: 800;">
                  ${isRevealed ? (
                    hasRequired ? 
                      '<span style="color: #15803d; font-size: 1.05rem;">🛡️ 방어 성공! (필수 카드 보유)</span>' : 
                      '<span style="color: #b91c1c; font-size: 1.05rem;">💔 방어 실패! (아이템 미보유)</span>'
                  ) : (
                    '<span style="color: #78350f; font-size: 1rem;">⏳ 토론 진행 중 (정답 확인 전)</span>'
                  )}
                </div>

                <!-- Inventory slots -->
                <div class="inventory-slots-row">
                  ${team.selectedItems.map(itemId => {
                    const item = SURVIVAL_ITEMS.find(i => i.id === itemId);
                    const isMatch = isRevealed && scenario.requiredCardIds.includes(itemId);
                    return `
                      <div class="inventory-slot occupied ${isMatch ? 'match-disaster' : ''}">
                        <span>${item.icon}</span>
                        <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${item.name}</span>
                      </div>
                    `;
                  }).join('')}
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px; background: #ffffff88; padding: 6px 10px; border-radius: 8px;">
                  <span style="font-size: 0.85rem; font-weight: 700; color: #78350f;">선생님 하트 조절:</span>
                  <div style="display: flex; gap: 6px;">
                    <button class="game-btn game-btn-danger btn-mod-heart" data-team-id="${team.id}" data-mod="-1" style="padding: 4px 10px; font-size: 0.85rem;">-1 💔</button>
                    <button class="game-btn game-btn-success btn-mod-heart" data-team-id="${team.id}" data-mod="1" style="padding: 4px 10px; font-size: 0.85rem;">+1 💖</button>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Teacher Quest Guide -->
        <div class="teacher-quest-guide">
          <span class="guide-icon">💬</span>
          <div>
            <h5>👨‍🏫 선생님의 토론 발문 & 건강권 핵심 해설</h5>
            <p style="margin-bottom: 6px; font-weight: 700; color: #14532d;">${scenario.discussion}</p>
            ${isRevealed ? `
              <div style="background: #ffffffdd; padding: 8px 14px; border-radius: 8px; border: 1px solid #86efac; font-size: 0.95rem; color: #166534; animation: popAnswer 0.3s ease-out;">
                💡 <strong>건강권 핵심 개념:</strong> ${scenario.aaaqLesson}
              </div>
            ` : `
              <div style="background: #fefce8; padding: 6px 12px; border-radius: 8px; font-size: 0.9rem; color: #854d0e;">
                🔒 정답을 공개하면 이 재난과 관련된 건강권(AAAQ) 핵심 해설이 나타납니다.
              </div>
            `}
          </div>
        </div>
      </div>
    `;

    // Bind event handlers
    const revealBtn = document.getElementById('btnRevealAnswer');
    if (revealBtn) {
      revealBtn.addEventListener('click', () => {
        sounds.playSuccess();
        this.revealedDisasters[this.currentDisasterIndex] = true;
        this.renderStep4();
      });
    }

    const hideBtn = document.getElementById('btnHideAnswer');
    if (hideBtn) {
      hideBtn.addEventListener('click', () => {
        sounds.playClick();
        this.revealedDisasters[this.currentDisasterIndex] = false;
        this.renderStep4();
      });
    }

    const judgeBtn = document.getElementById('btnPlayDisasterJudge');
    if (judgeBtn) {
      judgeBtn.addEventListener('click', () => {
        this.executeDisasterJudgment(scenario);
      });
    }

    document.getElementById('btnPrevDisaster').addEventListener('click', () => {
      if (this.currentDisasterIndex > 0) {
        this.currentDisasterIndex--;
        sounds.playClick();
        this.renderStep4();
      }
    });

    document.getElementById('btnNextDisaster').addEventListener('click', () => {
      if (this.currentDisasterIndex < DISASTER_SCENARIOS.length - 1) {
        this.currentDisasterIndex++;
        sounds.playClick();
        this.renderStep4();
      }
    });

    document.getElementById('btnGoToResult').addEventListener('click', () => {
      this.setStep(5);
    });

    container.querySelectorAll('.btn-mod-heart').forEach(btn => {
      btn.addEventListener('click', () => {
        const teamId = btn.dataset.teamId;
        const mod = parseInt(btn.dataset.mod, 10);
        this.modifyTeamHeart(teamId, mod);
      });
    });
  }

  executeDisasterJudgment(scenario) {
    sounds.playAlert();
    let anyDamaged = false;

    this.teams.forEach(team => {
      if (team.eliminated) return;

      let hasRequired = false;
      if (scenario.matchAny) {
        hasRequired = scenario.requiredCardIds.some(reqId => team.selectedItems.includes(reqId));
      } else {
        hasRequired = scenario.requiredCardIds.every(reqId => team.selectedItems.includes(reqId));
      }

      if (!hasRequired) {
        anyDamaged = true;
        team.hearts = Math.max(0, team.hearts - 1);
        if (team.hearts === 0) {
          team.eliminated = true;
          team.eliminatedAtRound = scenario.round;
        }
      }
    });

    if (anyDamaged) {
      setTimeout(() => sounds.playDamage(), 500);
    } else {
      setTimeout(() => sounds.playSuccess(), 500);
    }

    this.saveStateToStorage();
    setTimeout(() => {
      this.renderStep4();
    }, 600);
  }

  modifyTeamHeart(teamId, delta) {
    const team = this.teams.find(t => t.id === teamId);
    if (!team) return;

    team.hearts = Math.max(0, Math.min(team.maxHearts + 2, team.hearts + delta));
    if (team.hearts > 0) {
      team.eliminated = false;
    } else {
      team.eliminated = true;
    }

    if (delta > 0) sounds.playSuccess();
    if (delta < 0) sounds.playDamage();

    this.saveStateToStorage();
    this.renderStep4();
  }

  // ==========================================
  // Step 5: 최종 탈출 결과 & 건강권(AAAQ) 배움 정리
  // ==========================================
  renderStep5() {
    sounds.playFanfare();
    const container = document.getElementById('stepSection5');

    const survivedTeams = this.teams.filter(t => !t.eliminated);
    const eliminatedTeams = this.teams.filter(t => t.eliminated);

    container.innerHTML = `
      <div class="game-parchment-panel">
        <div class="story-dialog-box" style="background: linear-gradient(180deg, #14532d 0%, #064e3b 100%); border-color: #4ade80;">
          <div class="story-avatar-box">⛵</div>
          <div class="story-text-content">
            <h2 style="color: #4ade80;">🎉 구조선 도착! 무인도 최종 탈출 성공!</h2>
            <p>
              끝까지 생존한 탐정단과 아쉽게 구조 신호를 보낸 탐정단 모두 훌륭한 탐험을 마쳤습니다!<br>
              우리가 버렸던 아이템과 챙겼던 아이템을 돌아보며, <strong>왜 인간에게 건강권(AAAQ)의 모든 요소가 필수적인지</strong> 함께 정리해봅시다.
            </p>
          </div>
        </div>

        <!-- Trophy Showcase -->
        <div class="trophy-showcase-grid">
          <div style="background: #ffffff; border: 4px solid #16a34a; border-radius: var(--radius-md); padding: 22px; box-shadow: var(--box-shadow-card);">
            <h3 style="font-family: var(--font-title); font-size: 1.5rem; color: #15803d; margin-bottom: 14px;">
              🏆 무인도 생존 성공 모둠 (${survivedTeams.length}개)
            </h3>
            ${survivedTeams.length === 0 ? '<p style="color:#78350f;">생존한 모둠이 없습니다.</p>' : `
              <div style="display: flex; flex-direction: column; gap: 10px;">
                ${survivedTeams.map(t => `
                  <div style="background: #f0fdf4; border: 2px solid #86efac; border-radius: 12px; padding: 12px; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-family: var(--font-game); font-size: 1.25rem; color: #166534;">🏅 ${t.name}</span>
                    <div class="pixel-hearts-bar" style="font-size: 1.3rem;">${this.renderHeartsHtml(t.hearts, t.maxHearts)}</div>
                  </div>
                `).join('')}
              </div>
            `}
          </div>

          <div style="background: #ffffff; border: 4px solid #dc2626; border-radius: var(--radius-md); padding: 22px; box-shadow: var(--box-shadow-card);">
            <h3 style="font-family: var(--font-title); font-size: 1.5rem; color: #b91c1c; margin-bottom: 14px;">
              ⛵ 구조선 긴급 구조 모둠 (${eliminatedTeams.length}개)
            </h3>
            ${eliminatedTeams.length === 0 ? '<p style="color:#15803d; font-weight:800;">모든 모둠이 완벽하게 생존했습니다!</p>' : `
              <div style="display: flex; flex-direction: column; gap: 10px;">
                ${eliminatedTeams.map(t => `
                  <div style="background: #fef2f2; border: 2px solid #fca5a5; border-radius: 12px; padding: 12px; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-family: var(--font-game); font-size: 1.15rem; color: #991b1b;">🩹 ${t.name}</span>
                    <span style="font-size: 0.9rem; color: #b91c1c; font-weight:700;">(라운드 ${t.eliminatedAtRound || '?'} 구조)</span>
                  </div>
                `).join('')}
              </div>
            `}
          </div>
        </div>

        <!-- AAAQ 4 Pillars Learning Cards -->
        <h3 style="font-family: var(--font-title); font-size: 1.7rem; color: #78350f; margin: 32px 0 16px;">
          📚 오늘 우리가 탐험으로 배운 건강권의 4대 기준: AAAQ 프레임워크
        </h3>

        <div class="aaaq-recap-grid">
          <div class="aaaq-recap-card card-theme-a1">
            <h4 style="color: #991b1b;">🏥 Availability (가용성)</h4>
            <p style="font-size: 0.95rem; color: #4b5563; margin-bottom: 10px;">
              생명과 치료에 필요한 보건의료 시설, 인력, 의약품, 식수, 음식이 실제로 충분히 <strong>'존재'</strong>해야 합니다.
            </p>
            <div style="background:#fff1f2; padding:8px 12px; border-radius:8px; font-size:0.9rem; font-weight:800; color:#9f1239;">
              관련 카드: 🏥 보건실과 약, 🥗 섭취가능한 음식
            </div>
          </div>

          <div class="aaaq-recap-card card-theme-a2">
            <h4 style="color: #1e40af;">♿ Accessibility (접근성)</h4>
            <p style="font-size: 0.95rem; color: #4b5563; margin-bottom: 10px;">
              장애, 나이, 지역, 경제적 형편과 관계없이 누구나 물리적·경제적으로 차별 없이 의료 혜택에 <strong>'도달'</strong>할 수 있어야 합니다.
            </p>
            <div style="background:#eff6ff; padding:8px 12px; border-radius:8px; font-size:0.9rem; font-weight:800; color:#1e40af;">
              관련 카드: ♿ 평평한 길, 🚨 안전한 시설
            </div>
          </div>

          <div class="aaaq-recap-card card-theme-a3">
            <h4 style="color: #92400e;">🤐 Acceptability (수용성)</h4>
            <p style="font-size: 0.95rem; color: #4b5563; margin-bottom: 10px;">
              환자의 인권과 존엄성을 존중하고, 비밀을 보장하며, 사회적 안전 규범을 지켜 누구나 안심하고 진료를 <strong>'수용'</strong>할 수 있어야 합니다.
            </p>
            <div style="background:#fefce8; padding:8px 12px; border-radius:8px; font-size:0.9rem; font-weight:800; color:#92400e;">
              관련 카드: 🤐 비밀 보장 방패, 📜 건강 안전 규칙
            </div>
          </div>

          <div class="aaaq-recap-card card-theme-q">
            <h4 style="color: #166534;">💧 Quality (질)</h4>
            <p style="font-size: 0.95rem; color: #4b5563; margin-bottom: 10px;">
              의료 서비스와 생활 환경이 과학적으로 안전하고 오염되지 않은 <strong>'높은 수준의 품질'</strong>을 유지해야 합니다.
            </p>
            <div style="background:#f0fdf4; padding:8px 12px; border-radius:8px; font-size:0.9rem; font-weight:800; color:#166534;">
              관련 카드: 💧 깨끗한 물, 🌳 미세먼지 없는 맑은 공기
            </div>
          </div>
        </div>

        <!-- Teacher's Final Closing Message -->
        <div style="background: #ffffff; border: 4px solid #78350f; border-radius: var(--radius-md); padding: 24px; margin-top: 28px; box-shadow: var(--box-shadow-card);">
          <h3 style="font-family: var(--font-title); font-size: 1.5rem; color: #78350f; margin-bottom: 8px;">
            💌 보건 선생님의 마무리 말씀
          </h3>
          <p style="font-size: 1.15rem; line-height: 1.8; color: #451a03;">
            "게임에서는 비행선 무게 때문에 4개만 골라야 했지만, <strong>현실의 건강권은 어느 하나도 버려져서는 안 되는 소중한 기본 인권</strong>입니다.<br>
            물이 오염되어도, 병원이 없어도, 비밀이 지켜지지 않아도, 길이 울퉁불퉁해도 우리는 생명과 건강을 위협받습니다.<br>
            우리 모두가 서로의 건강권을 소중히 여기고 지켜주는 멋진 탐정단이 됩시다!"
          </p>
        </div>
      </div>
    `;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.gameApp = new IslandGameApp();
});
