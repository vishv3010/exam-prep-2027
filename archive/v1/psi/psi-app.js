/**
 * Gujarat Police PSI Preparation Engine - Main Application Coordinator
 * Namespaced cleanly under window.PSI_APP
 */
(function(root) {
  'use strict';

  var PSI_APP = {
    storage: null,
    bank: null,
    srs: null,
    engine: null,
    ui: null,
    isInitialized: false,

    init: function() {
      if (this.isInitialized) return;

      var mountPoint = document.getElementById('psi-root');
      if (!mountPoint) {
        console.warn('[PSI App] #psi-root container not found in DOM.');
        return;
      }

      this.storage = root.PSIStorage;
      this.bank = root.PSI_QUESTION_BANK;
      this.srs = root.PSISRS;
      this.config = root.PSI_EXAM_CONFIG;

      // Ensure any pending question datasets are flushed into the registry
      if (this.bank && typeof this.bank.flushPending === 'function') {
        this.bank.flushPending();
      }

      this.engine = new root.PSIQuestionEngine(this.bank, this.storage, this.srs, this.config);
      this.ui = new root.PSIUI(mountPoint, this.engine, this.storage, this.bank, this.srs, this.config);

      if (root.GoalScheduler) {
        this.scheduler = new root.GoalScheduler(this.storage, this.bank, this.srs, this.engine);
        var todayEl = document.getElementById('todaycard');
        if (todayEl) {
          this.scheduler.renderTodayCard(todayEl);
        }
      }

      this.setupViewRouting();
      this.renderDashboardDiagnosticCTA();
      this.isInitialized = true;
      console.log('[PSI App] Initialized successfully with ' + this.bank.getAll().length + ' verified questions.');
    },

    /**
     * Toggles between the master CDS/CGL plan view and the mobile PSI Engine view
     */
    setupViewRouting: function() {
      var self = this;
      var dashboardWrap = document.querySelector('.wrap');
      var psiRoot = document.getElementById('psi-root');
      var navPsiBtn = document.getElementById('nav-psi-tab');

      function syncHash() {
        var hash = window.location.hash;
        if (hash === '#psi' || hash === '#psi-trainer') {
          self.showPsiView();
        } else {
          self.showDashboardView();
        }
      }

      if (navPsiBtn) {
        navPsiBtn.addEventListener('click', function(e) {
          e.preventDefault();
          window.location.hash = 'psi-trainer';
          self.showPsiView();
        });
      }

      var otherNavLinks = document.querySelectorAll('.nav-links a:not(#nav-psi-tab)');
      for (var i = 0; i < otherNavLinks.length; i++) {
        otherNavLinks[i].addEventListener('click', function() {
          self.showDashboardView();
        });
      }

      window.addEventListener('hashchange', syncHash);

      // Check on initial load if hash is set
      if (window.location.hash === '#psi' || window.location.hash === '#psi-trainer') {
        self.showPsiView();
      }
    },

    showPsiView: function() {
      var dashboardWrap = document.querySelector('.wrap');
      var psiRoot = document.getElementById('psi-root');
      var navPsiBtn = document.getElementById('nav-psi-tab');
      var savebar = document.querySelector('.savebar');

      if (dashboardWrap) dashboardWrap.style.display = 'none';
      if (savebar) savebar.style.display = 'none';
      if (psiRoot) psiRoot.style.display = 'block';
      if (navPsiBtn) {
        navPsiBtn.classList.add('active');
        navPsiBtn.style.color = 'var(--accent)';
        navPsiBtn.style.background = 'var(--accent-soft)';
      }
      window.scrollTo({ top: 0, behavior: 'auto' });
    },

    showDashboardView: function() {
      if (this.ui && typeof this.ui.stopMetroTimer === 'function') {
        this.ui.stopMetroTimer();
      }
      var dashboardWrap = document.querySelector('.wrap');
      var psiRoot = document.getElementById('psi-root');
      var navPsiBtn = document.getElementById('nav-psi-tab');
      var savebar = document.querySelector('.savebar');

      if (dashboardWrap) dashboardWrap.style.display = 'block';
      if (savebar) savebar.style.display = '';
      if (psiRoot) psiRoot.style.display = 'none';
      if (navPsiBtn) {
        navPsiBtn.classList.remove('active');
        navPsiBtn.style.color = '';
        navPsiBtn.style.background = '';
      }
      this.renderDashboardDiagnosticCTA();
      if (this.scheduler) {
        var todayEl = document.getElementById('todaycard');
        if (todayEl) this.scheduler.renderTodayCard(todayEl);
      }
    },

    renderDashboardDiagnosticCTA: function() {
      var ctaEl = document.getElementById('goal-diagnostic-cta');
      if (!ctaEl) return;
      var diag = this.storage ? this.storage.getDiagnosticResult() : null;
      var self = this;

      function escapeHtml(str) {
        if (!str) return '';
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
      }

      if (diag) {
        var pScore = (typeof diag.overallPreparednessScore === 'number') ? diag.overallPreparednessScore : (diag.accuracy || 0);
        var bTitle = diag.overallLevel || (pScore >= 75 ? 'Exam Ready' : (pScore >= 45 ? 'Developing' : 'Foundation'));
        var weakestName = (diag.criticalWeaknesses && diag.criticalWeaknesses[0]) ? diag.criticalWeaknesses[0].sectionName : 'None flagged';

        ctaEl.innerHTML = '<div style="background:var(--surface);border:1px solid var(--accent-border);border-left:4px solid var(--accent);border-radius:var(--radius);padding:14px 18px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;box-shadow:var(--shadow);">' +
          '<div>' +
            '<span class="eyebrow" style="margin-bottom:4px;">BASELINE DIAGNOSTIC RESULT</span>' +
            '<div style="font-size:16px;font-weight:700;color:var(--ink);">' +
              'Preparedness Score: <span style="color:var(--accent);">' + pScore + ' / 100</span> &middot; Level: <span style="color:var(--good);">' + escapeHtml(bTitle) + '</span>' +
            '</div>' +
            '<div style="font-size:12.5px;color:var(--ink-soft);margin-top:2px;">' +
              'Net Marks: ' + (diag.netScore || diag.score || 0) + ' / ' + (diag.totalQuestions || 25) + ' &middot; Focus: ' + escapeHtml(weakestName) +
            '</div>' +
          '</div>' +
          '<div style="display:flex;gap:8px;">' +
            '<button class="btn" id="dash-view-diag-btn" style="padding:7px 15px;font-size:13px;">View 7-Day Plan &rarr;</button>' +
            '<button class="btn ghost" id="dash-retake-diag-btn" style="padding:7px 15px;font-size:13px;">Retake Test</button>' +
          '</div>' +
        '</div>';
      } else {
        ctaEl.innerHTML = '<div style="background:var(--surface);border:1px solid var(--brass-border);border-left:4px solid var(--brass);border-radius:var(--radius);padding:16px 20px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px;box-shadow:var(--shadow);">' +
          '<div>' +
            '<span class="eyebrow" style="color:var(--brass);border-color:var(--brass-border);background:var(--brass-soft);margin-bottom:4px;">DIAGNOSTIC ASSESSMENT REQUIRED</span>' +
            '<h3 style="font-size:17px;font-weight:700;color:var(--ink);margin:0;">Take the Multi-Domain Baseline Diagnostic (25 Questions)</h3>' +
            '<p style="font-size:13px;color:var(--ink-soft);margin-top:4px;max-width:620px;">' +
              'Calibrate your true starting baseline across CDS Elementary Maths, Reasoning, English Grammar, Indian Constitution, and Gujarat Administrative GK.' +
            '</p>' +
          '</div>' +
          '<button class="btn" id="dash-start-diag-btn" style="padding:10px 18px;font-size:13.5px;font-weight:700;background:var(--accent);color:#fff;white-space:nowrap;">' +
            'START DIAGNOSTIC TEST &rarr;' +
          '</button>' +
        '</div>';
      }

      var startBtn = document.getElementById('dash-start-diag-btn');
      if (startBtn) {
        startBtn.onclick = function() {
          window.location.hash = 'psi-trainer';
          self.showPsiView();
          if (self.ui) self.ui.startSession('diagnostic');
        };
      }
      var retakeBtn = document.getElementById('dash-retake-diag-btn');
      if (retakeBtn) {
        retakeBtn.onclick = function() {
          window.location.hash = 'psi-trainer';
          self.showPsiView();
          if (self.ui) self.ui.startSession('diagnostic');
        };
      }
      var viewBtn = document.getElementById('dash-view-diag-btn');
      if (viewBtn) {
        viewBtn.onclick = function() {
          window.location.hash = 'psi-trainer';
          self.showPsiView();
          if (self.ui) self.ui.switchTab('diagnostic_summary');
        };
      }
    }
  };

  root.PSI_APP = PSI_APP;

  // Auto-init on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { PSI_APP.init(); });
  } else {
    PSI_APP.init();
  }
})(typeof window !== 'undefined' ? window : this);
